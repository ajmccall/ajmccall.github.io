---
date: 2015-12-11 21:29
description: How to write clean code unit test (#1)
filename: how-to-write-a-unit-test
tags: 
---
It's become intuitive that writing unit tests is a good thing. It's less intuitive why it's important to have clean, maintainable unit test code. It is perhaps even more important the clean, maintainable production code. Why? Imagine this scenario...

>After a disastrous few releases, the development team decide in their retro that they want to sufficiently cover the code base to prevent further bugs. Their PM, begrudgingly, gives them 1 month to retroactively write tests.  

>The developers feel that since they are not writing production code, they can write quick and unstructured unit test code. 

> After 1 month, both developers and the PM are happy. Developers because they have 85% coverage. The PM because he has stable code base.

> As time progresses though, the team may as well have not spent that 1 month in the first place. New developers battle to read the unit tests and can't add to them. While new features, either break the unit tests, in which case the tests are commented out, or are simply not added due to the overheard of refactoring the unit test class.

As the scenario above highlights, once a team is committed to writing unit tests, it is vital to keep that code base as well maintained, ***or better***, as your production code. 

As Uncle Bob puts it better

> [asymmetrical]. The quality of the production code depends on the tests; but the quality of the tests is _independent_ of the production code.

In this two parter, I'll demonstrate how I like to structure my unit tests and show you some of the rules and conventions to use to make your unit tests readable, reusable and maintainable.

-- -- 
####The setup

Below is a simplified version of a real world class called `AppStoreRater`. This class prompts users to rate our app ([MTV Trax](http://www.mtvtrax.com)) after a certain number of tracks have been played.

```objc
@interface AppStoreRater : NSObject

@property (nonatomic, strong) AlertManager *alertManager;
@property (nonatomic, strong) Analytics *analytics;
@property (nonatomic, weak) id<PlaybackNotifier> playbackNotifier; 

@end
```

It is not important to explain how to use this class except perhaps to mention that the property `PlaybackNotifier` is used to "tell" `AppStoreRater` when a track has been played. After a set number of plays, the "Please rate this app" popup dialogue will appear.

`PlaybackNotifier` follows the observer pattern and has the follow methods

```objc
- (void)addObserver:(id<PlaybackObserver>)observer;
- (void)removeObserver:(id<PlaybackObserver>)observer;
```

####The skeleton unit test
A skeleton unit test class is given below, and although it contains no tests yet, it is still performing validations.

```objc
@interface TestAppStoreRater : XCTestCase

// use class properties as often as you can 
@property (nonatomic, strong) id mockAlertManager;
@property (nonatomic, strong) id mockAnalytics;
@property (nonatomic, strong) id mockPlaybackNotifier;

// only 1 object, your tested class, should be real
@property (nonatomic, strong) AppStoreRater *appStoreRater;
@end

@implementation TestAppStoreRater

#pragma mark - Test

#pragma mark - SetUp

- (void)setUp {
    [super setUp];
    
    // order of setUp, should mirror order of tearDown
    [self setUpAlertManager];
    [self setUpAnalytics];
    [self setUpPlaybackNotifier];


    // only 1 object, your tested class, should be real
    self.appStoreRater = [[AppStoreRater alloc] init];
    self.appStoreRater.alertManager = self.mockAlertManager;
    self.appStoreRater.analytics = self.mockAnalytics;
}

- (void)setUpAlertManager {
    
    // always use STRICT mocks if possible
    self.mockAlertManager = OCMStrictClassMock([AlertManager class]);
}

- (void)setUpAnalytics {
    
    self.mockAnalytics = OCMStrictClassMock([AnalyticsController class]);
}

- (void)setUpPlaybackNotifier {

    self.mockPlaybackNotifier = OCMStrictProtocolMock(@protocol(PlaybackNotifier));

    // We expect that AppStoreRater always adds and removes  
    // itself as an observer during it's lifecycle.
    OCMExpect(self.mockPlaybackNotifier addObserver:[OCMArgs any]);
    OCMExpect(self.mockPlaybackNotifier removeObserver:[OCMArgs any]);
}

#pragma mark - TearDown

- (void)tearDown {
    
    // order of tearDown, should mirror order of setUp
    self.appStoreRater = nil;
    [self tearDownPlaybackNotifier];
    [self tearDownAnalytics];
    [self tearDownAlertManager];
    
    [super tearDown];
}

- (void)tearDownPlaybackNotifier {
    
    OCMVerifyAll(self.mockPlaybackNotifier);
    self.mockPlaybackNotifier = nil;
}

- (void)tearDownAnalytics {
    
    OCMVerifyAll(self.mockAnalytics);
    self.mockAnalytics = nil;
}

- (void)tearDownAlertManager {
    
    OCMVerifyAll(self.mockAlertManager);
    self.mockAlertManager = nil;
}
@end
```

Some things to note to go with the commented sections

######Only ever have one real object
There should only ever be one class that is initialised, and that is class the one you are testing. `AppStoreRater`. All other classes should be mocked. 

*I use [OCMock](http://ocmock.org/) for objective-c*

######Have as many properties as you can

Class properties, created in `setUp` and then verified and torn down in `tearDown` save you loads of repetitive code. Mocked class properties can still be mocked with `expected` behaviours in the test methods themselves, but you will see that `OCMVerifyAll(mock)` is called in the `tearDown`.

_This makes you unit test classes more readable and maintainable._

######Use STRICT over PARTIAL mocks
It is generally always better to use _strict_ mocks over _partial_ mocks. A strict mock will throw an exception if any unexpected method or property is called, while a partial mock will return `nil` or do nothing. 

*Partial mocks hide bugs. If you can't use a strict mock, then it probably suggests your class isn't structured right.*

######SetUp and TearDown mirror each other
The order of setting up and tearing down of the mocks and tested class is important. Notice that in `tearDown`, the objects are being nilled in the reverse order to their creation in `setup`. This is an important habit to get into, as it allows mocked objects modified during the tested class's lifecycle to verify those actions.

Perhaps a worked example will explain better.

Remember that `AppStoreRater` adds itself as an observer of `playbackNotifier` when that property is set. It also removes itself as an observer during `dealloc` when the `AppStoreRater` object is destroyed.

I our `tearDown` method
```objc
- (void)tearDown {
    
    self.appStoreRater = nil;
```

`self.appStoreRater = nil` will call `dealloc` on our tested class

```objc
- (void)dealloc {
    [self.playbackNotifier removeObserver:self]
}
```

Since `self.playbackNotifier` is a mock object itself. It must not be `nil` so we can record the call to `removeObserver:`. This method call is verified moments later in 

```objc
- (void)tearDownPlaybackNotifier {
    
    OCMVerifyAll(self.mockPlaybackNotifier);
```

_Even if your tested class doesn't have observers or use `NSNotificationCenter` getting the `setUp` and `tearDown` order right is just a good habit to get into._

######Follow clean code practises
Follow all clean code practises. Break up the code into well named short methods. Groups methods that call one another close together. And in `objc` use `pragma mark` to make it easier to skim read the class.
 
-- --

Right, so now we have a good unit test skeleton to work with. I part two we'll discuss how to implement the test methods.
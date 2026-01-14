---
date: 2017-06-08 14:16
description: xCode compilation error using named @objc attribute
filename: xcode-compilation-error-using-named-objc-attribute
tags: 
---
I recently stumbled on this interesting issue and decided to jot it down.

### @objc
xCode allows [mix and matching](https://developer.apple.com/library/content/documentation/Swift/Conceptual/BuildingCocoaApps/MixandMatch.html) Swift and Objective-c code within a single project.

A Swift file's functionality is exposed to Objective-c classes via the `@objc` attribute as such

```
@objc public class SimpleSwift : NSObject {

}
``` 

When compiled, xCode will generate an Objective-c interface for this Swift class in an auto-generated interface `$(SWIFT_MODULE_NAME)-Swift.h`. This file will contain something that looks like this

```
SWIFT_CLASS("_TtC14SwiftObjcSwift11SimpleSwift")
@interface SimpleSwift : NSObject
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
@end
```

Additionally we can use `objc(name)` to control the generated interface _name_. This can be useful in a few places. For instance at [Trainline.com](http://trainline.com) we do this to maintain our the Objective-c style naming convention of `XXXClassName` of our legacy codebase. 


This test Swift class becomes
```
@objc(SOSSimpleSwift) public class SimpleSwift : NSObject {

}
```
Now the auto-generated interface becomes
```
SWIFT_CLASS_NAMED("SimpleSwift")
@interface SOSSimpleSwift : NSObject
- (nonnull instancetype)init OBJC_DESIGNATED_INITIALIZER;
@end
```

### The Issue

Now let's use this interface in an Objective-c class and then extend that in a Swift file. 

```swift
#import <Foundation/Foundation.h>
@class SOSSimpleSwift;

@interface SOSBaseObjc : NSObject

- (void)foo:(SOSSimpleSwift *)simpleSwift;
- (void)bar:(NSString *)aString;

@end
```

A Swift subclass
```swift
class ExtendedSwift : SOSBaseObjc {

    // This method declaration will not compile
    override func foo(_ simpleSwift: SOSSimpleSwift!) {
    }
    
    override func bar(_ aString: String!) {
    }
}
```

### Solution
The only solution at time of writing is dropping the _name_ from `@objc(name)` attribute.

My good friend [Mark](https://twitter.com/defragged) may have an answer from his stint at WWDC.

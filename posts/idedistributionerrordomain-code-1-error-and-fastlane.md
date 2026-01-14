---
date: 2016-02-16 15:53
description: IDEDistributionErrorDomain Code=1 error and Fastlane
filename: idedistributionerrordomain-code-1-error-and-fastlane
tags: 
---
If you are not using the amazing [FastLane](https://fastlane.tools/) build tools then it's time you did. 

If you are though, you may have noticed that your build servers are breaking, especially when using the [deliver](https://github.com/fastlane/fastlane/blob/master/docs/Actions.md#deliver) or [pilot](https://github.com/fastlane/fastlane/blob/master/docs/Actions.md#pilot) actions.

A sample error below

```Error Domain=IDEDistributionErrorDomain Code=1 
The operation couldn't be completed. (IDEDistributionErrorDomain error 1.)```

#####The problem

Apple's WWDR certificate expired on 14/02/16 and simply replacing this certificate with the new one should solve the issue.


#####The fix

- Download the new certificate https://developer.apple.com/certificationauthority/AppleWWDRCA.cer
- Open keychain and remove the expired certificate from `login` and `system`
- Add new certificate

#####References
- https://github.com/fastlane/gym/issues/100#issuecomment-184026293
- [https://www.reddit.com/r/iOSProgramming/comments/45siza/this_certificate_has_an_invalid_issuer/](https://www.reddit.com/r/iOSProgramming/comments/45siza/this_certificate_has_an_invalid_issuer/) 
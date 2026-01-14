---
date: 2015-01-22 18:59
description: iTunes Receipt Validation Helper
filename: itunes-connect-receipt-validation
tags: 
---
There is lots of [documentation](https://developer.apple.com/library/ios/releasenotes/General/ValidateAppStoreReceipt/Chapters/ValidateRemotely.html), [tutorials](http://www.raywenderlich.com/23266/in-app-purchases-in-ios-6-tutorial-consumables-and-receipt-validation) and [articles](http://www.objc.io/issue-17/receipt-validation.html) covering iTunes receipt validation. This is not one of them.

Instead I'm offering an iOS client tool to help you and your server team develop iOS receipt validation faster. 

######Scenario

Your exciting start up is ready to validate all purchases made on it's new iOS app and the server lead wants to know how receipt validation works. After showing them the [documentation](https://developer.apple.com/library/ios/releasenotes/General/ValidateAppStoreReceipt/Chapters/ValidateRemotely.html) the first question will invariably be 

*"Can you give me an iTunes receipt?"* 

Which is immediately followed by

*"What does Apple's receipt validation response look like?"*

And so begins the painful process of generating iTunes receipts using phsyical devices and test sandbox users.  

######Solution

To streamline this process I created a simple iOS application

https://github.com/ajmccall/iOSReceiptValidationHelper

It does the following

- Generates an iTunes in-app purchase receipt.
- Validates the receipt against iTunes Connection sandbox server.
- Display validation response.
- Email receipt and validation responses.

Feel free to download and use this application to provide live data for your server team.

![](https://googledrive.com/host/0B9_o9wJ25OmFZFhoRWxiOTVDUGs/ajmccall/receipt-validation/screenshot04.png)
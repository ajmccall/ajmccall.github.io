---
date: 2019-11-03 12:26
description: How to compile Xcode for device with newer iOS version
filename: how-to-compile-xcode-for-device-with-newer-ios-version
tags: 
---
I always forget how to compile and run my apps on a device with a high OS version than the supported OS of my Xcode - here's how.

###### Download

- Download the version of Xcode which will compile to the device - I like to use [xcversion](https://github.com/xcpretty/xcode-install) to manage my Xcodes.
- Link (or copy) the iPhoneOS device support file from the download Xcode directory to the current Xcode directory
- Restart Xcode

###### Example

Compile for an 11.1 device on Xcode 10.1
```
ls -s /Applications/Xcode-13.1.app/Contents/Developer/Platforms/iPhoneOS.platform/DeviceSupport/13.1 /Applications/Xcode-10.1.app/Contents/Developer/Platforms/iPhoneOS.platform/DeviceSupport/13.1
```

_Note:_ To save up disk space copy `cp` rather than link `ln` the support files. Then delete the entire `Xcode-13.3.app` folder.

---
date: 2017-05-15 09:39
description: Recording a video of the Xcode simulator
filename: recording-a-video-of-the-xcode-simulator
tags: 
---
I have always used QuickTime to record video of a simulator session. And yet there has existed, for quite sometime too, a far easier way to do this using `xcrun` tool.

```
xcrun simctl io booted recordVideo ~/Desktop/simulator-recording.mov
```

And voila, a high fidelity video of whatever it is you did on your simulator.

I found this, and a bunch of other pro `xcrun` tips, on this excellent Medium article, [iOS Simulator Power Ups](https://medium.com/the-traveled-ios-developers-guide/ios-simulator-power-ups-407060863b3c)

Among the excellent top tips, and one which I did know (#smallwins), is to use `xcrun` to depp links.

> Another increasingly common part of iOS development is testing url schemes. With deep linking becoming a powerful tool to incorporate both as a consumer and a provider, simctl can help here too:

```
xcrun simctl openurl booted https://www.dreaminginbinary.co/
```
> And just like that, the active device pops open Safari with the URL. Of course, if you know other app’s schemes — those are fair game, too:

```
xcrun simctl openurl booted sms: #Open Messages
```

Go on, give them all a quick go. 
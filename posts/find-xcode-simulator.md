---
date: 2014-11-26 21:42
description: Find xCode Simulator
filename: find-xcode-simulator
tags: 
---
It's the little things that piss you off the most. 

I, like most iOS developers, have found Apple's decision to revamp xCode's simulator _bloody_ annoying. 

- It *was* located in one place. 
- It *was* simple to identify a simulator.
- It *was* easy to find the app you were debugging.

I was so tired of finding my application's folder inside the myriad of alpha-numeric folders that now consitute xCode's simulators, that I wrote a script to help me.

https://github.com/ajmccall/showSim

The script concatenates a few Mac/xCode commands to find, and then open the _currently active_ simulator's root folder. 

The commands are

```
xcrun simctl list | grep Boot | tr -d '()' | awk {'print "open ~/Library/Developer/CoreSimulator/Devices/"$3"/data/Containers/Data/Application"'} | sh
```

I hope to make a few improvements soon. It would be nice to open the _currently installed_ application's root folder
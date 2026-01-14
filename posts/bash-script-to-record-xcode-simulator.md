---
date: 2020-01-02 16:41
description: BASH Script to Record Xcode Simulator
filename: bash-script-to-record-xcode-simulator
tags: 
---
I've previous [written](http://alasda.ir/recording-a-video-of-the-xcode-simulator/) how to use `xcrun simctl` to record the simulator in an easy to use command line - I've improved this with a simple bash script.

##### Record Xcode Simulator

```
recxcsim() {
  tmpfile="$(mktemp -d)/xcode-simulator-recording.mov"
  trap "open $tmpfile && sleep 0.5 && rm $tmpfile" EXIT
  echo "Recording booted simulator. Press CRT+C to stop and open file..."
	xcrun simctl io booted recordVideo $tmpfile
}
```

Drop this bash function into your `~/.bash_profile` or equalivant (I use [ZSH](https://ohmyz.sh/)) and run `recxsim` at the command line. This will start 

* start recording a booted simulator until cancelled (CRT+C)
* open the video in default player (Qtime usually)
* remove the temporary .mov file


###### Motivation

It's very common to want to record of video of your Xcode simulator, either for demo purposes or, in my case, to check what some UI test did. It's very tedious watching the simulator and the urge visit [/r/yesyesyesno/](https://www.reddit.com/r/yesyesyesno/) can be too great.

Now I can launch my tests, surf the internet for a bit, a
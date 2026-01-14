---
date: 2014-11-13 22:00
description: A Cocoapods xCode tutorial.
filename: a-cocoapods-xcode-tutorial
tags: 
---
_Whether you're developing an iOS or Mac application, if you're not using [Cocoapods](http://www.cocoapods.org) then you're simply doing it wrong!_ Ok, maybe not _wrong_, but you're definitely not developing as fast or effectively as possible.

Cocoapods manages third-party library dependencies for Xcode projects. It allows stand alone projects to ___easily___ access hundreds of open-source libraries, while also giving development teams the ability to ___automatically___ and ___safely___ work together.

- ___Easy___ - Simply add a single file to the xCode project's root folder and you're ready to go.
- ___Automatic___ - Run a single command and your project will be setup with the same libraries used by the rest of your team.
- ___Safe___ - Cocoapods's use of [semantic versioning](http://semver.org/) ensures that you'll only get the library updates you want and trust. Future updates are propagated across the team ensuring that everyone is working on exactly the same code base.

## Getting started

Head over to Cocoapods's [getting started](http://guides.cocoapods.org/using/getting-started.html) guide for instructions on downloading and installing the `pod` command line tool.

Inside your Xcode project's root folder run the following commands.

- Run `touch Podfile` to create an empty pod file
- Run `pod install` to add Cocoapods to your project
- Run `open YourProject.xcworkspace` to your new Xcode project's workspace.

![enter image description here](https://googledrive.com/host/0B9_o9wJ25OmFZFhoRWxiOTVDUGs/ajmccall/a-cocoapods-xcode-tutorial/binpress_cocoapods_01.png)

Notice the new ___pods___ project that has been added to your Xcode project's workspace. It is empty for now.

![enter image description here](https://googledrive.com/host/0B9_o9wJ25OmFZFhoRWxiOTVDUGs/ajmccall/a-cocoapods-xcode-tutorial/binpress_cocoapods_02.png)

## Finding and installing a pod

Now that we have a Cocoapods-enabled Xcode project, we can add third-party libraries to it. For this demo, let's add the [Facebook's iOS SDK](https://developers.facebook.com/docs/ios) in order to implement a Facebook login feature.

To find the Facebook library, we use the [Cocoapods](http://cocoapods.org) web search bar. Simply type `Facebook` in the search bar and find the pod best suited to your needs. You can always click on the `site` link to see who owns this pod.

![enter image description here](https://googledrive.com/host/0B9_o9wJ25OmFZFhoRWxiOTVDUGs/ajmccall/a-cocoapods-xcode-tutorial/binpress_cocoapods_03.png)

Copy the pod spec text to your clipboard, and paste it into your `Podfile`.

![enter image description here](https://googledrive.com/host/0B9_o9wJ25OmFZFhoRWxiOTVDUGs/ajmccall/a-cocoapods-xcode-tutorial/binpress_cocoapods_04.png)

Then run `pod install`

![enter image description here](https://googledrive.com/host/0B9_o9wJ25OmFZFhoRWxiOTVDUGs/ajmccall/a-cocoapods-xcode-tutorial/binpress_cocoapods_05.png)

...and open your Xcode project's workspace.

Notice that the ___pods___ project now contains a few new targets. These will be the targets to compile and build the Facebook SDK and any libraries it depends on.

![enter image description here](https://googledrive.com/host/0B9_o9wJ25OmFZFhoRWxiOTVDUGs/ajmccall/a-cocoapods-xcode-tutorial/binpress_cocoapods_06.png)

Notice too that we have not performed any configuration within our Xcode project. All necessary core frameworks have been added, additional pod dependencies resolved and our main project is now aware of the new Facebook pod.

For more information on what was installed and how, checkout the [pod specification file](http://guides.cocoapods.org/syntax/podspec.html) listed for the [Facebook-iOS-SDK](https://github.com/CocoaPods/Specs/blob/master/Specs/Facebook-iOS-SDK/3.16.2/Facebook-iOS-SDK.podspec.json) pod.

## Using a pod

Remember that each pod could require configuration before use. For more information on each pod and how it's used, consult that pod's website via [Cocoapods](http://cocoapods.org).

Following the [Facebook Login](https://developers.facebook.com/docs/facebook-login/ios/v2.1) documentation, we're required to add a Facebook app id our project's `info.plist` file.

And now the fun part of implementing a simple Facebook login. Add a `UIView` component to our storyboard's first view controller and change that component's class from `UIView` to `FBLoginView` using the Identity Inspector (`⌥⌘3` keyboard shortcut)

![enter image description here](https://googledrive.com/host/0B9_o9wJ25OmFZFhoRWxiOTVDUGs/ajmccall/a-cocoapods-xcode-tutorial/binpress_cocoapods_07.png)

Enhance our login view controller (optional).

![enter image description here](https://googledrive.com/host/0B9_o9wJ25OmFZFhoRWxiOTVDUGs/ajmccall/a-cocoapods-xcode-tutorial/binpress_cocoapods_08.png)

Run the application.

If you've correctly added the Facebook app id to your project, when a user hits the 'Log in with Facebook' button, they'll be presented with the most appropriate Facebook login view.

![enter image description here](https://googledrive.com/host/0B9_o9wJ25OmFZFhoRWxiOTVDUGs/ajmccall/a-cocoapods-xcode-tutorial/binpress_cocoapods_sim_01.png)

You may log in to Facebook, and because we're using Facebook's native view, our users can log out, too.

![enter image description here](https://googledrive.com/host/0B9_o9wJ25OmFZFhoRWxiOTVDUGs/ajmccall/a-cocoapods-xcode-tutorial/binpress_cocoapods_sim_04.png)

While this is a very simple application, it should not take away from what's been achieved here. With almost no effort, we've added the entire Facebook SDK to our project. This involved, among other things:

- Downloading Facebook SDK code and any other libraries dependent on it.
- Adding all necessary core frameworks to the project.
- Compiling all source code to work within your project's target platform and architecture.
- Making all public headers and compiled source available to your project's targets.

We have used Cocoapods to decrease the amount of time configuring, and increase the amount of time coding.

## Updating a pod

In this tutorial we installed the Facebook SDK by adding the following to the `Podfile`.

`pod 'Facebook-iOS-SDK', '~> 3.16'`

This tells the pod command tool to install the latest version of the `Facebook-iOS-SDK` pod version 3.16.x and up to but not including 3.17. Below is a complete list of pod versioning operators [[1]](http://guides.cocoapods.org/syntax/podfile.html#pod)

> *   `> 0.1` Any version higher than 0.1.
> *   `>= 0.1` Version 0.1 and any higher version.
> *   `< 0.1` Any version lower than 0.1.*   `<= 0.1` Version 0.1 and any lower version.
> *   `~> 0.1.2` Version 0.1.2 and the versions up to 0.2, not including 0.2. This operator works based on the last component that you specify in your version requirement. The example is equal to >= 0.1.2 combined with &lt; 0.2.0 and will always match the latest known version matching your requirements.

When it comes time to upgrade to a newer version of any pod, simply run the command `pod outdated`.

![enter image description here](https://googledrive.com/host/0B9_o9wJ25OmFZFhoRWxiOTVDUGs/ajmccall/a-cocoapods-xcode-tutorial/binpress_cocoapods_10.png)

It will alert you to any new version of your installed pods. You can then run  `pod update` to update all pods or  `pod update <pod_name>`  to update individual pods.

![enter image description here](https://googledrive.com/host/0B9_o9wJ25OmFZFhoRWxiOTVDUGs/ajmccall/a-cocoapods-xcode-tutorial/binpress_cocoapods_11.png)

You may notice that if you change a pod's version within your `Podfile` and run `pod install` again, you'll always get the same version that you installed the first time.

This is because on first install, a special `Podfile.lock` file is created. This file "locks" the versions of all pods at the first time of installation. `Podfile.lock` should ideally not be edited. Use `pod update` to update your pods. More on this in the next section.

## Working in a team

If you're working in a team, you'll want to push your changes to your fellow developers. Any pod-enabled Xcode project should look something like this.

![enter image description here](https://googledrive.com/host/0B9_o9wJ25OmFZFhoRWxiOTVDUGs/ajmccall/a-cocoapods-xcode-tutorial/binpress_cocoapods_09.png)

All that's required to get your fellow developers using this new pod is to commit the following two files.

 - `Podfile` the file that describes how pod was initially setup
 - `Podfile.lock` the file that describes the current state of the pod project

When a team member pulls your new changes, they simply need to run `pod install`. This will install all pods specified in `Podfile` and install the versions of those pods specified in the `Podfile.lock`.

The combination of a `Podfile` and `Podfile.lock` ensure that every member of your team is working off exactly the same third-party code base as you are.

## Popular pods

All mainstream and popular open-source libraries are available on [Cocoapods.org](http://cocoapods.org) as this is becoming the de facto mechanism to manage and install third-party libraries.

Below are some popular, almost essential pods to use

- [AFNetworking](http://cocoapods.org/?q=afnetworking): The only framework to use for your networking needs.
- [OCMock](http://cocoapods.org/?q=ocmock): Your one-stop unit test mock framework.
- [Facebook-iOS-SDK](http://cocoapods.org/?q=facebook-ios-sdk): Maintained by Facebook, so you know it's legit.
- [Google](http://cocoapods.org/?q=google-ios): All things Google.
- [Custom ViewController](http://cocoapods.org/?q=viewcontroller)
- [API Integrations](http://cocoapods.org/?q=api)
- And [loads](https://github.com/CocoaPods/Specs) more.

Thanks for reading!
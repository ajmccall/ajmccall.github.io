---
date: 2015-09-30 19:19
description: Google SignIn profile image crash
filename: google-signin-crash
tags: 
---
####TL;DR
Downgrade `GoogleSignIn` pod to `2.2.0`

####Under the hood

The latest version of Google's SignIn cocoapod, `Google/SignIn (2.3.0)` crashes when requesting the user's profile image.

```
func signIn(signIn: GIDSignIn!, didSignInForUser user: GIDGoogleUser!, withError error: NSError!) {

    if (error == nil) {

        let userId = user.userID
        let name = user.profile.name
        let email = user.profile.email
        if user.profile.hasImage{
            // crash here !!!!!!!! 
            let imageUrl = user.profile.imageURLWithDimension(200)
        }
    //...
}
```

The crash is 

```
2015-09-30 18:56:46.968 GoogleLogin[96614:5594982] -[NSURL isFIFEUrl]: unrecognized selector sent to instance 0x7fe248f11f20
```

It looks like Google accidentally released an SDK with a typo in it because clearly the line should be `- [NSURL isFILEUrl]:`

Simply downgrade to the latest, _stable_, release to prevent these crashes. My `PodFile` looks like this

```
pod 'Google/SignIn', '1.0.7'
```


[StackOverflow](http://stackoverflow.com/a/32872065/179843)
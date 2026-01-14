---
date: 2018-06-25 19:35
description: Easy Command Line Silent Push using Houston
filename: easy-command-line-silent-push-using-houston
tags: 
---
Here is a quick command line to tool to send silent background push notifications to your iOS applications.

### Houston

In  a pre-[Fastlane](https://fastlane.tools/) world, we had the brilliant and prolific [@mattt](https://twitter.com/mattt?lang=en) to thank for the wonderful [Nomad-CLI](https://nomad-cli.com/). A small and powerful set of tools to make life just a little easier for us Apple developers.

One of them, [Houston](https://github.com/nomad/houston) allows for easy communication with Apple’s PN.

To install
`gem install houston`

and test
`apn push "<token>" -c /path/to/apple_push_notification.pem -m "Test" `

### Silent pushes
A silent push is used to wake an application and get it to do small chunks of work. These pushes are not guaranteed to be sent or received by device. In the worst case, if the device's OS detects abuse of this 30 seconds of work, your silent push notifications will just be ignore.

Once you're tested that Houston works, to send a silent push notification simply use the command line

```
apn push “<token>” -c /path/to/apple_push_notification.pem -P "{\"aps\" : {\"content-available\" : 1},\"acme1\" : \"bar\",\"acme2\" : 42}"
```

Note the use of escape character `\` to allow JSON string formats. 

In this example above any device targeted by `<token>` will wake up and received the payload

```
"acme1": "bar",
"acme2": 42
```

Happy pushing.

### Addendum 

* To generate a pemfile, it is recommended to use [fastlane pem](https://fastlane.tools/pem) , which completely automates the process of creating the certificate.
* Make sure your app allows background updates and can receive pushes. [Push tutorial](https://www.raywenderlich.com/8164-push-notifications-tutorial-getting-started)
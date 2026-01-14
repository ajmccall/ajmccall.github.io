---
date: 2019-08-09 13:47
description: Using Xcode to review big a pull request
filename: using-xcode-to-review-big-a-pull-request
tags: 
---
Large pull requests (PRs) are not great and we should always strive for smaller PRs. The reality of working with a large code base, where a small change can affect lots of areas, mean large, many lined PRs are often unavoidable. *

GitHub offers a very good desktop web app for reviewing pull requests. For small and medium sized review this is often good enough. For larger reviews I prefer to these tools _with_ Xcode.

##### How to use Xcode for large pull requests

For this worked example the PR is from a branch `v_big` into `develop`.

###### 1. Get all file changes

From the command line, checkout the PR branch and do a _soft_ reset on top of the branch being merged into. 

```bash
git checkout v_big
git reset --soft <commit hash>
```

Where the hash value is the git commit where the PR's branch diverged from.

###### 2. Show in Xcode

Open the project using Xcode. Open the _Project Navigator_ (`⌘+1`) and then apply the _Show only modified files_ filter at the bottom of the navigator pane - see red arrow.

![Xcode showing changed files](/images/post-using-xcode-pull-request-xcode.png)

In the _Project Navigator_ we can see all the files that have changed in this PR. 

If you switch to use the _Version Editor_ (`⇧ + ⎇ + ⌘ + Return`) we can see all the changes.

Now you can move around between the modified files and getting a clearer picture of the changes. 

Of course don't forget to leave comments

###### Benefits

The benefits of this approach mean that the reviewer can navigator around the changes, using action like _Jump to..._ to inspect what new changes have been made. 

Often a project is structure to represent a directory-file system - with grouping of similar code or functionalities. Using this Xcode view, the reviewer can see where cluster of changes have occurred as well as being able to quickly choose the critical areas to focus on - while ignoring others.

Another reason I prefer this approach from Github, is that I'm now reviewing in my _most_ natural environment with my familiar styling and shortcuts - which helps focus the mind.

Enjoy.

***

***** Of course if a small change results in many file changes, this a massive red flag that the code base is far too interconnected. A refactoring to decouple structures would be the next thing you do.

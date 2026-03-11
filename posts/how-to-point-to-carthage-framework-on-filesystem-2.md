---
date: 2020-05-17 19:50
description: How to point to a local Carthage framework.
filename: how-to-point-to-carthage-framework-on-filesystem-2
tags: [first, article]
---
Often a Cathage framework included in your code, is a framework that you've developed yourself. Soemtimes you might find yourself needing to update this framework and test the changes in your code.

The quickest way to do this is to modify your `Cartfile` like this

```bash
#github "https://github.url.com/your_framework"
git "file:///file/path/to/your_framework" "branch or tag"
```

Once changed, run
```
carthage update
```

to include the framework you are currently developing.

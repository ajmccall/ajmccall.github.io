---
date: 2015-11-20 22:20
description: Apple Music and changes to iTunes Affiliate urls
filename: apple-music-itunes-affiliate
tags: 
---
When Apple released Apple Music, they made a small change to the way their [iTunes affiliate](https://www.apple.com/itunes/affiliates/) program worked.

Previously, any url that linked to some iTunes content, would always open iTunes itself.

After Apple Music, only urls with the `app=itunes` parameter would do this. Older style urls, ones without this parameter now open Apple Music by default.

Oh very sneaky Apple. We see what you did there.

Our app [MTV Trax](http://mtvtrax.com) allows users to buy any track they would like to keep. And for a few months, our buy buttons would direct our lovely users to a competing service. _To a competing service!_

Very sneaky.

The changes were documented [here](https://www.apple.com/itunes/affiliates/resources/blog/apple-music-is-now-live-1.html) although I'm not sure how well it was publicised.

If you are picky about where your users go after tapping on a buy link, you might want to reexamine your links.

######Example

For instance

`https://itunes.apple.com/us/album/cool-for-the-summer-single/id1013069897?app=music`

will take your user to Apple Music where they can stream the song, while

`https://itunes.apple.com/us/album/cool-for-the-summer-single/id1013069897?app=itunes`

takes you to the iTunes Store where you can buy the song. 

######How much do I earn?

In both cases you'll still be paid by Apple for sending users their way, although even here it has change.

For iTunes redirects, an affiliate member earns 7% of any sales within 24hrs on iTunes. 

For Apple Music redirects, an affiliate member earns a one-off *$5* fee, if the user purchases/renews their subscription.

Back of the envelope calculates suggest that if your user spends more than *$70* on iTunes you are better off sending them to iTunes. 

######Summary

It seems like a no brainer to always redirect to iTunes. 

For one, iTunes redirects always earn commission unlike the Apple Music one-off payment. An iTunes redirect commission is also paid on *all* purchases made, not just the item you linked to. Movies, TV shows, books and games are included. 

Lastly, you only get paid by Apple if, and that's a big *if*, the user subscribes at the end of their trial.

My advise? 

Don't feed the Apple Music monster. 

Send your users to iTunes and receive a little more cash in return.

#####Further reading

- [Why it's worth it to join the affiliate program](http://awkwardhare.com/post/117029547150/use-the-itunes-affiliate-program-its-worth-it)
- [iTunes Affiliate Program](https://www.apple.com/itunes/affiliates/)
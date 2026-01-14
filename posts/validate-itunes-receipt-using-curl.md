---
date: 2015-10-19 15:27
description: Validate iTunes receipt using cURL
filename: validate-itunes-receipt-using-curl
tags: 
---
Create a JSON file called `body.json`

```
{
	"receipt-data" : "<your receipt base64 encoded>",
	"password" :"<your shared secret>"
}
```

- `receipt-data` must contain your receipt as a base64 encoded string. 
- `password` is only needed if the receipt if for a recurring subscription product. The shared secret password is available from your team's iTunes Connect account.

Open favourite terminal, navigate to `body.json` file's location and type

```
curl -H "Content-Type: application/json" --data @body.json https://buy.itunes.apple.com/verifyReceipt
```

A `200` response and a full JSON detailing the product purchase is returned if all is good.

Look out for `21007` error, which implies that a test receipt was sent to the production server. Simply change the url to `https://sandbox.itunes.apple.com/verifyReceipt`. 

All other `2000x` response errors and their meanings can be found here, [Apple Docs](https://developer.apple.com/library/ios/releasenotes/General/ValidateAppStoreReceipt/Chapters/ValidateRemotely.html#//apple_ref/doc/uid/TP40010573-CH104-SW4). 

---
I enjoy prettify the output using [jazor](https://github.com/mconigliaro/jazor).

```
[sudo] gem install jazor bundler
curl -H "Content-Type: application/json" --data @body.json https://buy.itunes.apple.com/verifyReceipt | jazor -c
```

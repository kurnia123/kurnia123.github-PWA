let webPush = require("web-push");
 
const vapidKeys = {
   "publicKey": "BNyoaDUH960xEc3KIbVSSapF93vCkorQAdiW-1IT-Yu3kAX-mexeftPF_gZTuCz5W6eZDhHrzM16Zm8pEZguvhY",
   "privateKey": "29UN7Luhk7J8kW2wBOwedEfhZL9Gla4qvc-xcIb0TSI"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/eDyBl19u4vA:APA91bFs1uQa90yS3Saoj9gHCrlVQZeIhLRTk8PlVn-2cGiqytdlMFLs_zPRRhaI-7iw7pzDysjWa_nqamcvoLGjg_ScNIhTOTNfVOM-ClP2rJvKTisweRKkvUVZi35jHu48CsOOMQ5E",
   "keys": {
       "p256dh": "BOsqhnSBjyfi5Oi5oeHSlv2FyGlh9cxmxRDTxuq1Q5UDXGhR+cGBak2pind/+TCBddo1ABkYPO6lBHZ36sNpggw=       ",
       "auth": "gX0y0EDXVLBfaKzHwE82VQ=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '162402818659',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
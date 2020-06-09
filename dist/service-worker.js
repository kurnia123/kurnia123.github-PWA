importScripts("precache-manifest.ed8355f5965f83082394f79226aed9da.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js')

workbox.precaching.precacheAndRoute(/*self.__WB_MANIFEST,*/[
    {url: './',revision: '1'},
    {url: './index.html',revision: '1'},
    {url: './manifest.json',revision: '1'},
    {url: './nav.html', revision: '1'},
    {url: './assets/icon_192x192.png',revision: '1'},
    {url: './assets/icon_512x512.png',revision: '1'},
    {url: './index/index_bundle.js',revision: '1'},
    {url: './manifest.json',revision: '1'},
    {url: './detail/detail.html',revision: '1'},
    {url: `./detail/detail.html?id=[0-9]`,revision: '1'},
    {url: './detail/detail.html?id=[0-9]&save=true',revision: '1'},
    {url: './detail/detail_bundle.js',revision: '1'},
], {
  ignoreUrlParametersMatching: [/.*/]
})


workbox.routing.registerRoute(    
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate()
);


self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: 'img/notification.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
});

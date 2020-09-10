const staticCacheName = 'site-static';
const assets = [
  '/',
  '/index.html',
  '/app.js',
  '/style.css',
  '/img/logo-wfa.png',
  '/img/9QKgpuACjU.webp',
  '/img/ivcvKj4rmq.webp',
];

//Install Service worker - listening to install  event inside the service worker
self.addEventListener('install', evt => { 
  // console.log('service worker has been installed');
  evt.waitUntil(
    caches.open(staticCacheName).then(cache => {
      console.log('caching shell assests'); 
      cache.addAll(assets);
    })
  )
});


// activate service worker
self.addEventListener('activate', evt => {
  console.log('service has been activated');
});

// fetch event
self.addEventListener('fetch', evt => {
  // console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});
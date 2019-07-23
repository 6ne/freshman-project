const $CACHE_STORE = 'freshman-project'
const $FILES = [
  './',
  './index.html',
  './assets/css/fontawesome.min.css',
  './assets/css/poppins.min.css',
  './assets/css/style-desktop.css',
  './assets/css/style-tablet.css',
  './assets/css/style.css',
  './assets/font/fontawesome.ttf',
  './assets/font/poppins.woff2',
  './assets/img/favicon/128.ico',
  './assets/img/favicon/64.ico',
  './assets/img/favicon/32.ico',
  './assets/img/favicon/16.ico',
  './assets/img/logo/128.png',
  './assets/img/logo/64.png',
  './assets/img/logo/32.png',
  './assets/img/logo/16.png'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open($CACHE_STORE)
      .then(cache => cache.addAll($FILES))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.open($CACHE_STORE)
      .then(cache => cache.keys()
        .then(cacheNames => Promise.all(cacheNames
          .filter(cacheName => $FILES.indexOf(cacheName) !== -1)
          .map(cacheName => caches.delete(cacheName))))
        .then(() => self.clients.claim()))
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response ? response : fetch(event.request))
  )
})
const $CACHE_STORE = 'freshman-project'
const $FILES = [
  './',
  './index.html',
  './assets/css/fontawesome.min.css',
  './assets/css/poppins.min.css',
  './assets/css/style-desktop.min.css',
  './assets/css/style-mobile.min.css',
  './assets/font/fontawesome.ttf',
  './assets/font/poppins.woff2',
  './assets/img/favicon/128.ico',
  './assets/img/logo/128.png',
  './assets/js/index.min.js'
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
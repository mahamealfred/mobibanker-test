const PRECACHE = 'Mobibanker-v1';
const RUNTIME = 'runtime';

const PRECACHE_URLS = [
  'index.html',
   './', 
  'offline.html'
];
const self = this;
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', (event) => {
  event.respondWith(
      caches.match(event.request)
          .then(() => {
              return fetch(event.request) 
                  .catch(() => caches.match('offline.html'))
          })
  )
});

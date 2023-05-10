const staticCache= "Mobibanker-staic-v2";
const dynamicCache="Mobibanker-dynamic-v2"

const urlsToCache = [
  '/',
  'index.html',
  'offline.html',
  'i18n/banks/en.json',
  'i18n/banks/fr.json',
  'i18n/banks/ki.json',
  'i18n/cbhi/en.json',
  'i18n/cbhi/fr.json',
  'i18n/cbhi/ki.json',
  'i18n/common/en.json',
  'i18n/common/fr.json',
  'i18n/common/ki.json',
  'i18n/home/en.json',
  'i18n/home/fr.json',
  'i18n/home/ki.json',
  'i18n/login/en.json',
  'i18n/login/fr.json',
  'i18n/login/ki.json',
  'i18n/ltss/en.json',
  'i18n/ltss/fr.json',
  'i18n/ltss/ki.json',
  'i18n/rnit/en.json',
  'i18n/rnit/fr.json',
  'i18n/rnit/ki.json',
  'i18n/rra/en.json',
  'i18n/rra/fr.json',
  'i18n/rra/ki.json',
  'images/balance1.png',
  'images/bankservices.png',
  'images/commission.png',
  'images/deposit.png',
  'images/ejoheza.png',
  'images/electricity.png',
  'images/gtbank.png',
  'images/gtbankImg.png',
  'images/gtbanklogo.png',
  'images/knowledge.png',
  'images/logos.png',
  'images/mobibankerIcon.png',
  'images/mobibk.png',
  'images/mobishuli.png',
  'images/mutuelli.png',
  'images/mutuweli.jpg',
  'images/mutuwel.png',
  'images/openaccount.png',
  'images/rnit.png',
  'images/rra.png',
  'images/rssb.png',
  'images/support.png',
  'images/topup.png',
  'images/withdraw.png',
  'images/img_144.png',
  'images/img_192.png',
  'images/img_512.png',
  'images/img_1024.png',
  'images/logo.png',
  'src/assets/images/logo.png',
  'src/assets/images/gtlogo.png',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css',
  'manifest.json'
];
const self = this;
//install sw
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
      caches.open(staticCache)
          .then((cache) => {
              return cache.addAll(urlsToCache);
          })
  )
});
//activate sw
self.addEventListener('activate', (event) => {
  event.waitUntil(
      caches.keys().then((cacheNames) => {
     return Promise.all(
          cacheNames.filter(cacheName => cacheName!==staticCache && cacheName !== dynamicCache)
          .map((cacheName) => {
                  return caches.delete(cacheName);  
          })
      )})
          
  )
});

// Listen for requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
      caches.match(event.request)
          .then((cachRes) => {
              return cachRes || fetch(event.request).then(fetchRes=>{
return caches.open(dynamicCache).then(cache=>{
  cache.put(event.request.url,fetchRes.clone())
  return fetchRes;
});
              }).catch(() => caches.match('offline.html'))
          })
  )
});
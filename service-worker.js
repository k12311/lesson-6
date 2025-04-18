const CACHE_VERSION = 'v3'; // << 每次更新請手動改版本號
const CACHE_NAME = `nihongo-${CACHE_VERSION}`;
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/bgm.mp3',
  '/usagi.gif',
  '/splash-screen.png',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/translator-practice.html',
  '/lesson1.html',
  '/lesson2.html',
  '/lesson3.html',
  '/lesson4.html',
  '/lesson5.html',
  '/lesson6.html',
  '/lesson7.html',
  '/lesson8.html',
  '/lesson9.html',
  '/lesson10.html',
  '/lesson11.html',
  '/lesson12.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('📦 快取中:', CACHE_NAME);
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
          console.log('🧹 移除舊快取:', key);
          return caches.delete(key);
        }
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});



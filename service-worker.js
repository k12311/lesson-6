const CACHE_NAME = 'nihongo-v6';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/bgm.mp3',
  '/splash-screen.png',
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.json',
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
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) {
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


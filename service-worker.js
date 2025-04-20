const CACHE_VERSION = 'v10'; // << 每次更新請改版本號
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
    caches.open(CACHE_NAME).then(async cache => {
      console.log('📦 開始快取:', CACHE_NAME);
      for (const file of FILES_TO_CACHE) {
        try {
          await cache.add(file);
          console.log('✅ 快取成功:', file);
        } catch (e) {
          console.warn('⚠️ 快取失敗:', file, e);
        }
      }
    })
  );
  self.skipWaiting(); // ⏩ 安裝完就跳過等待
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
  self.clients.claim(); // ⛳ 立即控制所有頁面
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => {
      return resp || fetch(event.request);
    })
  );
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



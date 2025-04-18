const CACHE_NAME = 'minna-v4'; // ✅ 每次更新時改這裡：v3 → v4 → v5...

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './splash-screen.png',
  './bgm.mp3'
];

// 📥 安裝時：快取重要資源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// ♻️ 啟用時：刪掉舊快取版本
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // ❌ 刪掉舊的
          }
        })
      );
    })
  );
});

// 🌐 使用中：攔截 fetch，優先從快取拿
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request); // 沒有就去抓新的
    })
  );
});

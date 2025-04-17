self.addEventListener('install', (e) => {
  console.log('🔧 Service Worker 安裝完成');
  e.waitUntil(
    caches.open('minna-cache').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './icon-192.png',
        './icon-512.png'
        // 也可加入其他頁面如 lesson1.html...
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});

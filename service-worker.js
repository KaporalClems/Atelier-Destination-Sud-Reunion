// service-worker.js
// Ce fichier est vide pour le moment, mais il est nécessaire pour que l'enregistrement du Service Worker réussisse.
// Vous pouvez ajouter des stratégies de mise en cache ici plus tard.

self.addEventListener('install', (event) => {
  console.log('Service Worker installé.');
  // event.waitUntil(
  //   caches.open('my-cache').then((cache) => {
  //     return cache.addAll([
  //       '/',
  //       '/index.html',
  //       '/admin.html',
  //       '/style.css',
  //       '/manifest.json',
  //       // Ajoutez d'autres ressources à mettre en cache ici
  //     ]);
  //   })
  // );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activé.');
  // event.waitUntil(
  //   caches.keys().then((cacheNames) => {
  //     return Promise.all(
  //       cacheNames.map((cacheName) => {
  //         if (cacheName !== 'my-cache') {
  //           return caches.delete(cacheName);
  //         }
  //       })
  //     );
  //   })
  // );
});

self.addEventListener('fetch', (event) => {
  // console.log('Requête fetch interceptée pour:', event.request.url);
  // event.respondWith(
  //   caches.match(event.request).then((response) => {
  //     return response || fetch(event.request);
  //   })
  // );
});

// service-worker.js
const CACHE_NAME = 'atelier-dsr-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/admin.html',
    '/style.css',
    '/app.js',
    '/admin.js',
    '/manifest.json',
    'https://cdn.tailwindcss.com',
    'https://srias.re/wp-content/uploads/2020/12/Destination-Sud-Reunion-png-1-min.png'
];

// Installation du Service Worker et mise en cache des ressources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache ouvert');
                return cache.addAll(urlsToCache);
            })
    );
});

// Interception des requêtes et renvoi des ressources depuis le cache ou le réseau
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si la ressource est dans le cache, la renvoyer
                if (response) {
                    return response;
                }
                // Sinon, la récupérer depuis le réseau
                return fetch(event.request).then(
                    response => {
                        // Vérifier si nous avons reçu une réponse valide
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Cloner la réponse car elle est un flux et ne peut être consommée qu'une seule fois
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

// Activation du Service Worker et suppression des anciens caches
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

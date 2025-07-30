const CACHE_NAME = 'atelier-dsr-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/admin.html',
    '/style.css',
    '/app.js',
    '/admin.js',
    '/manifest.json',
    'https://srias.re/wp-content/uploads/2020/12/Destination-Sud-Reunion-png-1-min.png'
];

// Étape d'installation : ouvrir le cache et stocker les fichiers
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache ouvert');
                return cache.addAll(urlsToCache);
            })
    );
});

// Étape de fetch : intercepter les requêtes réseau
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si la ressource est dans le cache, on la retourne
                if (response) {
                    return response;
                }
                // Sinon, on effectue la requête réseau
                return fetch(event.request);
            })
    );
});

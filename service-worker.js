const CACHE_NAME = 'atelier-dsr-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    // Ajoutez ici d'autres ressources statiques que vous souhaitez mettre en cache
    // Par exemple, si vous avez des icônes ou des images spécifiques en dehors de celles chargées dynamiquement
    // '/icon-192x192.png',
    // '/icon-512x512.png',
    // Note: main.js sera le bundle de votre application React
    '/main.js' 
];

self.addEventListener('install', (event) => {
    console.log('Service Worker: Installation en cours...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Mise en cache des ressources.');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Service Worker: Échec de la mise en cache lors de l\'installation', error);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Si la ressource est dans le cache, la retourner
                if (response) {
                    console.log('Service Worker: Servir depuis le cache:', event.request.url);
                    return response;
                }
                // Sinon, récupérer la ressource du réseau
                console.log('Service Worker: Récupérer du réseau:', event.request.url);
                return fetch(event.request);
            })
            .catch(error => {
                console.error('Service Worker: Erreur lors de la récupération:', error);
                // Vous pouvez retourner une page hors ligne ici si nécessaire
                // return caches.match('/offline.html');
            })
    );
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activation en cours...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Suppression de l\'ancien cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

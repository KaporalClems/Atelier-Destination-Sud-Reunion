// service-worker.js
// Ce fichier est un Service Worker. Pour l'instant, il est minimaliste.
// Son enregistrement dans index.html et admin.html est commenté pour éviter les erreurs de protocole
// rencontrées précédemment dans certains environnements de déploiement.
// Si vous souhaitez activer les fonctionnalités PWA (mise en cache hors ligne, etc.),
// vous devrez décommenter son enregistrement et ajouter des stratégies de mise en cache ici.

// Événement 'install' : se déclenche lorsque le Service Worker est installé pour la première fois.
self.addEventListener('install', (event) => {
  console.log('Service Worker installé.');
  // Utilisez event.waitUntil() pour s'assurer que l'installation est terminée avant de passer à l'activation.
  // Exemple de mise en cache de ressources statiques lors de l'installation :
  /*
  event.waitUntil(
    caches.open('atelier-dsr-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/admin.html',
        '/style.css',
        '/manifest.json',
        // Ajoutez ici toutes les ressources critiques pour le fonctionnement hors ligne
        'https://cdn.tailwindcss.com', // Tailwind CSS CDN
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', // Google Fonts CSS
        'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js', // Firebase SDK
        'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js',
        'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js',
        'https://srias.re/wp-content/uploads/2020/12/Destination-Sud-Reunion-png-1-min.png', // Logo
        // Images du carrousel (si vous voulez qu'elles soient disponibles hors ligne)
        'https://www.sudreuniontourisme.fr/fileadmin/_processed_/e/7/csm_plagestpierre_6d8d01c749.jpg',
        'https://www.sudreuniontourisme.fr/fileadmin/_processed_/e/d/csm_grandeanse_08fc85f413.jpg',
        'https://www.sudreuniontourisme.fr/fileadmin/_processed_/6/5/csm_plage_etangsale_c966b457a8.jpg',
        'https://www.sudreuniontourisme.fr/fileadmin/_processed_/a/8/csm_foret_tevelave_c152cf6493.jpg',
        'https://www.sudreuniontourisme.fr/fileadmin/_processed_/3/a/csm_fenetremakesreunion_de8b1a11d6.jpg'
      ]);
    })
  );
  */
});

// Événement 'activate' : se déclenche lorsque le Service Worker est activé.
// C'est un bon endroit pour nettoyer les caches obsolètes.
self.addEventListener('activate', (event) => {
  console.log('Service Worker activé.');
  /*
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Supprime les anciens caches qui ne correspondent pas au cache actuel
          if (cacheName !== 'atelier-dsr-cache-v1') {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  */
});

// Événement 'fetch' : intercepte les requêtes réseau de l'application.
// Permet de servir des ressources depuis le cache ou le réseau.
self.addEventListener('fetch', (event) => {
  // console.log('Requête fetch interceptée pour:', event.request.url);
  /*
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Si la ressource est dans le cache, la retourne
      if (response) {
        return response;
      }
      // Sinon, la récupère du réseau
      return fetch(event.request);
    })
  );
  */
});

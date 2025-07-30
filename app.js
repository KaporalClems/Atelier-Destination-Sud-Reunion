document.addEventListener('DOMContentLoaded', () => {
    // Affiche l'animation de lancement pendant 3 secondes
    setTimeout(() => {
        const splashScreen = document.getElementById('splash-screen');
        const mainContent = document.getElementById('main-content');

        splashScreen.style.opacity = '0';
        // Attendre la fin de la transition avant de cacher l'élément
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            mainContent.style.display = 'block';
        }, 500);

    }, 3000);

    // Enregistre le Service Worker pour la PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => console.log('✅ Service Worker enregistré'))
                .catch(error => console.log('❌ Échec de l\'enregistrement du Service Worker:', error));
        });
    }

    // Ici, vous pourriez charger dynamiquement les événements de l'agenda
});

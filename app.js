document.addEventListener('DOMContentLoaded', () => {
    // --- ANIMATION DE LANCEMENT ---
    setTimeout(() => {
        const splashScreen = document.getElementById('splash-screen');
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            document.getElementById('main-content').style.display = 'block';
        }, 500);
    }, 2500); // Réduit à 2.5 secondes

    // --- GESTION DU MENU HAMBURGER ---
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');

    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('hidden');
    });

    // --- SERVICE WORKER ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => console.log('✅ Service Worker enregistré'))
                .catch(error => console.log('❌ Échec de l\'enregistrement du Service Worker:', error));
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const accessCodeInput = document.getElementById('access-code');
    const errorMessage = document.getElementById('error-message');
    const loginForm = document.getElementById('login-form');
    const adminPanel = document.getElementById('admin-panel');

    const ADMIN_CODE = "admin2025"; // IMPORTANT : Change ce code !

    // Vérifie le code d'accès
    loginButton.addEventListener('click', () => {
        if (accessCodeInput.value === ADMIN_CODE) {
            loginForm.classList.add('hidden');
            adminPanel.classList.remove('hidden');
        } else {
            errorMessage.classList.remove('hidden');
            setTimeout(() => errorMessage.classList.add('hidden'), 3000);
        }
    });

    // Logique pour ajouter des événements (à lier à une base de données plus tard)
    const addEventButton = document.getElementById('add-event-button');
    addEventButton.addEventListener('click', () => {
        const title = document.getElementById('event-title').value;
        const date = document.getElementById('event-date').value;
        
        if (title && date) {
            alert(`Événement "${title}" pour le ${date} ajouté ! (simulation)`);
            // Ici, vous ajouteriez le code pour sauvegarder l'événement
        } else {
            alert("Veuillez remplir le titre et la date.");
        }
    });
});

const { useState, useEffect, createContext, useContext } = React;

// --- CONTEXTE GLOBAL ---
// Permet de partager des informations et des fonctions dans toute l'app
const AppContext = createContext();

// --- CONSTANTES ---
const LOGO_URL = "https://srias.re/wp-content/uploads/2020/12/Destination-Sud-Reunion-png-1-min.png";
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "password123"; // Changez ceci !

// --- COMPOSANTS ---

// 1. Écran de lancement (Splash Screen)
const SplashScreen = ({ onAnimationEnd }) => {
    useEffect(() => {
        const timer = setTimeout(onAnimationEnd, 2500); // Durée: 2.5 secondes
        return () => clearTimeout(timer);
    }, [onAnimationEnd]);

    return (
        <div className="fixed inset-0 bg-blue-50 flex items-center justify-center z-50">
            <style>{`
                @keyframes scale-in-out {
                    0% { transform: scale(0.9); opacity: 0.7; }
                    50% { transform: scale(1); opacity: 1; }
                    100% { transform: scale(0.9); opacity: 0.7; }
                }
                .animate-scale-in-out { animation: scale-in-out 2.5s ease-in-out infinite; }
            `}</style>
            <img src={LOGO_URL} alt="Logo DSR" className="w-48 animate-scale-in-out" />
        </div>
    );
};

// 2. Menu Hamburger et Navigation
const HamburgerMenu = () => {
    const { setView } = useContext(AppContext);
    const [isOpen, setIsOpen] = useState(false);

    const navigate = (targetView) => {
        setIsOpen(false);
        setView(targetView);
    };

    return (
        <div>
            <button onClick={() => setIsOpen(true)} className="p-2 text-blue-800 bg-blue-100 rounded-full hover:bg-blue-200">☰</button>
            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setIsOpen(false)}></div>
                    <div className="fixed top-0 left-0 h-full bg-white w-64 shadow-xl z-50 p-4">
                        <h2 className="text-xl font-bold text-blue-700 mb-6">Menu</h2>
                        <nav className="flex flex-col space-y-4">
                            <button onClick={() => navigate('user')} className="text-left text-gray-700 hover:text-blue-600">Accueil & Ateliers</button>
                            <button onClick={() => navigate('login')} className="text-left text-gray-700 hover:text-blue-600">Accès Administrateur</button>
                        </nav>
                    </div>
                </>
            )}
        </div>
    );
};

// 3. En-tête (Header)
const Header = () => (
    <header className="bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-30">
        <HamburgerMenu />
        <h1 className="text-xl font-bold text-blue-700">Atelier DSR</h1>
        <img src={LOGO_URL} alt="Logo DSR" className="h-10 w-auto rounded-lg" />
    </header>
);

// 4. Pied de page (Footer)
const Footer = () => (
    <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Atelier DSR. Tous droits réservés.</p>
            <p className="mt-1 text-gray-400">Développé pour la Destination Sud Réunion.</p>
            {/* Vous pouvez ajouter des liens vers des pages de mentions légales ici */}
        </div>
    </footer>
);

// 5. Vue Utilisateur (Liste des ateliers)
const UserDashboard = () => {
    const { events } = useContext(AppContext);
    
    return (
        <main className="p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Nos Prochains Ateliers</h2>
            {events.length === 0 ? (
                <p className="text-gray-500">Aucun atelier programmé pour le moment. Revenez bientôt !</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {events.map(event => (
                        <div key={event.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                             <img src={event.image || "https://placehold.co/600x400/E0F2F7/2C3E50?text=Atelier"} alt={event.title} className="w-full h-48 object-cover"/>
                            <div className="p-4">
                                <p className="text-sm font-semibold text-blue-600">{new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <h3 className="text-xl font-bold mt-1">{event.title}</h3>
                                <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700">Réserver ma place</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

// 6. Page de Connexion Administrateur
const LoginPage = () => {
    const { handleLogin } = useContext(AppContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const attemptLogin = () => {
        const success = handleLogin(username, password);
        if (!success) {
            setError('Identifiant ou mot de passe incorrect.');
        }
    };

    return (
        <div className="flex-grow flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Connexion Admin</h2>
                <input
                    type="text"
                    placeholder="Identifiant"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full p-3 border rounded-lg mb-4"
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full p-3 border rounded-lg mb-4"
                />
                <button onClick={attemptLogin} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">Se connecter</button>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
};


// 7. Panneau d'Administration
const AdminDashboard = () => {
    const { events, addEvent, deleteEvent, handleLogout } = useContext(AppContext);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState(null);

    const handleAddEvent = () => {
        if (!title || !date) {
            alert("Le titre et la date sont obligatoires.");
            return;
        }
        addEvent({ title, date, image });
        // Réinitialiser le formulaire
        setTitle('');
        setDate('');
        setImage(null);
        document.getElementById('event-image-input').value = null;
    };
    
    // Gère la conversion de l'image en Base64 pour le stockage local
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-4">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Gérer les Ateliers</h2>
                <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">Déconnexion</button>
            </div>
            
            {/* Formulaire d'ajout */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-4">Ajouter un nouvel atelier</h3>
                <input type="text" placeholder="Titre de l'atelier" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded mb-2" />
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border rounded mb-2" />
                <input type="file" id="event-image-input" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded mb-4" />
                <button onClick={handleAddEvent} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Ajouter l'Atelier</button>
            </div>

            {/* Liste des ateliers existants */}
            <div>
                <h3 className="text-xl font-semibold mb-4">Ateliers existants</h3>
                {events.map(event => (
                     <div key={event.id} className="bg-white p-4 rounded-lg shadow-sm mb-3 flex justify-between items-center">
                        <div>
                            <p className="font-bold">{event.title}</p>
                            <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString('fr-FR')}</p>
                        </div>
                        <button onClick={() => deleteEvent(event.id)} className="bg-gray-200 text-red-600 py-1 px-3 rounded-md hover:bg-gray-300">Supprimer</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- COMPOSANT PRINCIPAL DE L'APPLICATION ---
const App = () => {
    const [view, setView] = useState('splash'); // 'splash', 'user', 'login', 'admin'
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [events, setEvents] = useState([]);

    // Charger les événements depuis le localStorage au démarrage
    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        setEvents(storedEvents);
    }, []);

    // Mettre à jour le localStorage quand les événements changent
    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    const handleLogin = (username, password) => {
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            setIsLoggedIn(true);
            setView('admin');
            return true;
        }
        return false;
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setView('user');
    };

    const addEvent = (eventData) => {
        const newEvent = { id: Date.now(), ...eventData };
        setEvents(prevEvents => [...prevEvents, newEvent].sort((a,b) => new Date(a.date) - new Date(b.date)));
    };

    const deleteEvent = (eventId) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
            setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
        }
    };
    
    // Gère la transition après l'écran de lancement
    const handleAnimationEnd = () => {
        setView('user');
    };
    
    const renderView = () => {
        if (view === 'splash') {
            return <SplashScreen onAnimationEnd={handleAnimationEnd} />;
        }
        
        let currentViewComponent;
        switch (view) {
            case 'login':
                currentViewComponent = <LoginPage />;
                break;
            case 'admin':
                currentViewComponent = isLoggedIn ? <AdminDashboard /> : <LoginPage />;
                break;
            case 'user':
            default:
                currentViewComponent = <UserDashboard />;
                break;
        }

        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <div className="flex-grow">
                    {currentViewComponent}
                </div>
                <Footer />
            </div>
        );
    };

    return (
        <AppContext.Provider value={{ setView, handleLogin, handleLogout, events, addEvent, deleteEvent }}>
            {renderView()}
        </AppContext.Provider>
    );
};

// --- RENDU DE L'APPLICATION ---
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

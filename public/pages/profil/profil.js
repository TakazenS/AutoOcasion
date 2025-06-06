// Vérifie la connexion au chargement du DOM
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const authRes = await fetch('http://localhost:3000/check-auth', {
            method: 'GET',
            credentials: 'include'
        });

        const isConnected = authRes.ok;

        const roleRes = await fetch('http://localhost:3000/get-user-role', {
            method: 'GET',
            credentials: 'include'
        });

        const roleData = roleRes.ok ? await roleRes.json() : { isAdmin: false };

        // Logique d'affichage unique
        if (!isConnected) {
            // Non connecté : montrer uniquement le bouton connexion
            document.getElementById('dashboard-btn-id').style.display = "none";
            document.getElementById('deco-btn-id').style.display = "none";
            document.getElementById('connexion-btn-id').style.display = "flex";
        } else if (roleData.isAdmin) {
            // Admin connecté
            document.getElementById('connexion-btn-id').style.display = "none";
            document.getElementById('deco-btn-id').style.display = "flex";
            document.getElementById('dashboard-btn-id').style.display = "flex";
        } else {
            // Utilisateur connecté mais pas admin
            document.getElementById('dashboard-btn-id').style.display = "none";
            document.getElementById('connexion-btn-id').style.display = "none";
            document.getElementById('deco-btn-id').style.display = "flex";
        }

    } catch (err) {
        console.error("Erreur de session ou de rôle :", err);
    }
});

// Vérifie si l'on est bien administrateur
document.getElementById('dashboard-btn-id').addEventListener('click', async () => {
    try {
        const res = await fetch('http://localhost:3000/get-user-role', {
            method: 'GET',
            credentials: 'include' // Inclut les cookies pour vérifier la session
        });

        if (res.ok) {
            const roleData = await res.json();
            if (roleData.isAdmin) {
                window.location.href = '/public/pages/admin/admin.php';
            } else {
                window.location.href = '/index.php';
                return window.alert('Vous nêtes pas administrateur !')
            }
        } else {
                window.location.href = '/index.php';
                return window.alert("Vous n'êtes pas administrateur !");
        }
    } catch (error) {
        console.error("Erreur lors de la vérification du rôle utilisateur :", err);
    }
});

// Déconnection
document.getElementById('deco-btn-id').addEventListener('click', async (e) => {
    e.preventDefault(); // empêche le lien de rediriger immédiatement

    try {
        const res = await fetch('http://localhost:3000/logout', {
            method: 'GET',
            credentials: 'include'
        });

        if (res.ok) {
            window.location.href = '/index.php'; // Redirige après déconnexion
        } else {
            console.error('Erreur lors de la déconnexion');
        }
    } catch (err) {
        console.error('Erreur réseau pendant la déconnexion', err);
    }
});

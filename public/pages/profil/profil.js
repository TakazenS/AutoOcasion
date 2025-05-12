// Vérifie si l'on est connecté au chargement du DOM
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('http://localhost:3000/check-auth', {
            method: 'GET',
            credentials: 'include'
        });

        if (res.ok) {
            document.getElementById('button-right').innerHTML = ``;
            console.log('Utilisateur connecté !')
        } else if (res.status === 401) {
            console.log('Utilisateur non connecté !')
            return 0;
        }
    } catch (err) {
        console.error("Erreur de session sur /check-auth:", err);
        return 0;
    }
    
    // Vérifie si l'utilisateur est connecté et affiche le bouton d'administration si c'est le cas
    try {
        const res = await fetch('/get-user-role', {
            method: 'GET',
            credentials: 'include' // Inclut les cookies pour vérifier la session
        });

        if (res.ok) {
            const roleData = await res.json();
            if (roleData.role === 'admin') {
                // Ajouter le bouton pour accéder au panneau d'administration
                const adminButton = document.createElement('button');
                adminButton.textContent = 'Dashboard';
                adminButton.className = 'btn-ann';
                adminButton.addEventListener('click', () => {
                    window.location.href = '/public/pages/admin/admin.php'; // Redirige vers la page admin
                });

                document.getElementById('button-right').appendChild(adminButton);
            }
        }
    } catch (err) {
        console.error("Erreur lors de la vérification du rôle utilisateur :", err);
    }
});
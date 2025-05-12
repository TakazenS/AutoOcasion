// Vérifie l'entrée pour l'e-mail
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

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
            document.getElementById('connexion-btn-id').style.display = "flex";
        } else if (roleData.isAdmin) {
            // Admin connecté
            document.getElementById('dashboard-btn-id').style.display = "flex";
            document.getElementById('connexion-btn-id').style.display = "none";
        } else {
            // Utilisateur connecté mais pas admin
            document.getElementById('dashboard-btn-id').style.display = "none";
            document.getElementById('connexion-btn-id').style.display = "none";
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
                window.location.href = '/';
                return window.alert('Vous nêtes pas administrateur !')
            }
        } else {
                window.location.href = '/';
                return window.alert("Vous n'êtes pas administrateur !");
        }
    } catch (error) {
        console.error("Erreur lors de la vérification du rôle utilisateur :", err);
    }
});

// Formulaire de création de compte
document.getElementById('button-send').addEventListener('click', async (e) => {
    e.preventDefault();

    const nom_uti = document.getElementById('lastname').value;
    const prenom_uti = document.getElementById('firstname').value;
    const mail_uti = document.getElementById('mail').value;
    const mdp_uti = document.getElementById('password').value;
    const confirm_mdp = document.getElementById('confirm-password').value;

    if (!nom_uti || !prenom_uti || !mail_uti || !mdp_uti) {
        document.getElementById('forms-button').style.marginTop = '10px';
        document.getElementById('mdp-incorect').innerHTML = '<p id="mdp-verif">Tous les champs sont requis !</p>';
        const styleMDP = document.getElementById('mdp-incorect').style;
        styleMDP.position = 'relative';
        styleMDP.marginTop = '5px';
        document.getElementById('mdp-verif').style.color = 'red';
        return 0;
    }

    if (!isValidEmail(mail_uti)) {
        document.getElementById('forms-button').style.marginTop = '10px';
        document.getElementById('mdp-incorect').innerHTML = '<p id="mdp-verif">Adresse e-mail invalide !</p>';
        const styleMDP = document.getElementById('mdp-incorect').style;
        styleMDP.position = 'relative';
        styleMDP.marginTop = '5px';
        document.getElementById('mdp-verif').style.color = 'red';
        return 0;
    }
    
    if (mdp_uti.length < 8) {
        document.getElementById('forms-button').style.marginTop = '10px';
        document.getElementById('mdp-incorect').innerHTML = '<p id="mdp-verif">Le mot de passe doit faire au moins 8 caractères !</p>';
        const styleMDP = document.getElementById('mdp-incorect').style;
        styleMDP.position = 'relative';
        styleMDP.marginTop = '5px';
        document.getElementById('mdp-verif').style.color = 'red';
        return 0;
    }
    
    if (mdp_uti != confirm_mdp) {
        document.getElementById('forms-button').style.marginTop = '10px';
        document.getElementById('mdp-incorect').innerHTML = '<p id="mdp-verif">Les mots de passe ne correspondent pas !</p>';
        const styleMDP = document.getElementById('mdp-incorect').style;
        styleMDP.position = 'relative';
        styleMDP.marginTop = '5px';
        document.getElementById('mdp-verif').style.color = 'red';
        return 0;
    }

    try {
        const response = await fetch('http://localhost:3000/create-uti', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nom_uti,
                prenom_uti,
                mail_uti,
                mdp_uti
            })
        });
        
        if (response.ok) {
            console.log('Création du compte réussie !');
            window.location.href = '/public/pages/connexion/connexion.php';
        } else {
            const errorText = await response.text();
            console.log(errorText);
        }

    } catch (err) {
        console.error("Erreur lors de la requête :", err);
        console.log("Erreur réseau ou serveur.");
    }

});
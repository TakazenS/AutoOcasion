// Vérifie l'entrée pour l'e-mail
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

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
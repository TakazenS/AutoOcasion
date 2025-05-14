// Vérifie l'entrée pour l'e-mail
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Vérifie l'entrée pour les mdp
function isValidPwd(pwd) {
    const regexVerifPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;
    return regexVerifPwd.test(pwd);
}

// Vérification du premier mdp
const passwordInput = document.getElementById('password');
    ['copy', 'paste', 'cut'].forEach(eventType => {
        passwordInput.addEventListener(eventType, (e) => {
            e.preventDefault();
        });
});

// Vérification du deuxième mdp
const passwordVerifInput = document.getElementById('confirm-password');
    ['copy', 'paste', 'cut'].forEach(eventType => {
        passwordVerifInput.addEventListener(eventType, (e) => {
            e.preventDefault();
        });
});

// Import des éléments pour afficher/cacher le mdp
const passwordInputEye = document.getElementById('password');
const eye1 = document.getElementById('eye1');
const passwordInputVerifEye = document.getElementById('confirm-password');
const eye2 = document.getElementById('eye2');

// Affiche/cache le mdp du premier champ
eye1.addEventListener('click', () => {
    if (passwordInputEye.type === 'text') {
        passwordInputEye.type = 'password';
        eye1.src = '/public/images/password/closedEye.png';
    } else {
        passwordInputEye.type = 'text';
        eye1.src = '/public/images/password/openedEye.png';
    }
});

// Affiche/cache le mdp du second champ
eye2.addEventListener('click', () => {
    if (passwordInputVerifEye.type === 'text') {
        passwordInputVerifEye.type = 'password';
        eye2.src = '/public/images/password/closedEye.png';
    } else {
        passwordInputVerifEye.type = 'text';
        eye2.src = '/public/images/password/openedEye.png';
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
    
    if (mdp_uti.length < 10) {
        document.getElementById('forms-button').style.marginTop = '10px';
        document.getElementById('mdp-incorect').innerHTML = '<p id="mdp-verif">Le mot de passe doit faire au moins 10 caractères !</p>';
        const styleMDP = document.getElementById('mdp-incorect').style;
        styleMDP.position = 'relative';
        styleMDP.marginTop = '5px';
        document.getElementById('mdp-verif').style.color = 'red';
        return 0;
    }

    if (isValidPwd(mdp_uti) != true) {
        document.getElementById('forms-button').style.marginTop = '10px';
        document.getElementById('mdp-incorect').innerHTML = '<p id="mdp-verif" class="mdp-verif">Le mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial !</p>';
        const styleMDP = document.getElementById('mdp-incorect').style;
        styleMDP.position = 'relative';
        styleMDP.marginTop = '5px';
        styleMDP.width = '480px';
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
            console.log('Création du compte réussi !');
        } else {
            const errorTxt = await response.text();
            console.log(errorTxt);
        }
    
    } catch (err) {
        console.error("Erreur lors de la requête :", err);
        console.log("Erreur réseau ou serveur.");
    }
    

    const response = await fetch('http://localhost:3000/get-code-uti', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ mail_uti })
    })

    const resData = await response.json();
    const code_uti = resData.code_uti;
    console.log(code_uti);

    const pseudo_profile = '' + prenom_uti + nom_uti;
    const photo = document.getElementById('defaultImg');
    const photoUrl = photo.src;

    const photoFetched = await fetch(photoUrl);
    const photo_profile = await photoFetched.blob();

    const formData = new FormData();
    const fileName = 'default.png'
    formData.append('photo_profile', photo_profile, fileName);
    formData.append('pseudo_profile', pseudo_profile);
    formData.append('code_uti', code_uti);
    
    try {
        const upload = await fetch('http://localhost:3000/add-profile', {
            method: 'POST',
            body: formData
        })

        if (upload.ok) {
            console.log('Création du profil réussi !');
            window.location.href = '/public/pages/connexion/connexion.php';
        } else {
            const errorUpload = await upload.text();
            console.log(errorUpload);
        }

    } catch (err) {
        console.error("Erreur lors de la requête :", err);
        console.log("Erreur réseau ou serveur.");
    }

});
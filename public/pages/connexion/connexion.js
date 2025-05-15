// Vérification du mdp
const passwordInput = document.getElementById('password');
    ['copy', 'paste', 'cut'].forEach(eventType => {
        passwordInput.addEventListener(eventType, (e) => {
            e.preventDefault();
        });
});

// Import des éléments pour afficher/cacher le mdp
const passwordInputEye = document.getElementById('password');
const eye1 = document.getElementById('eye1');

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

// Formulaire de connection
document.getElementById('button-send').addEventListener('click', async (e) => {
    e.preventDefault();

    const mail_uti = document.getElementById('mail').value;
    const mdp_uti = document.getElementById('password').value;

    if (!mail_uti || !mdp_uti) {
        document.getElementById('forms-button').style.marginTop = '10px';
        document.getElementById('mdp-incorect').innerHTML = '<p id="mdp-verif">Tous les champs sont requis !</p>';
        const styleMDP = document.getElementById('mdp-incorect').style;
        styleMDP.position = 'relative';
        styleMDP.marginTop = '5px';
        document.getElementById('mdp-verif').style.color = 'red';
        return 0;
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mail_uti,
                mdp_uti
            })
        });

        if (response.ok) {
            console.log('Connexion réussie !');
            window.location.href = '/index.php';
        } else {
            const error = await response.json();
            console.error("Erreur :", error);

            if (error.type === "EMAIL_NOT_FOUND") {
                document.getElementById('forms-button').style.marginTop = '10px';
                document.getElementById('mdp-incorect').innerHTML = '<p id="mdp-verif">Aucun compte correspondant !</p>';
                const styleMDP = document.getElementById('mdp-incorect').style;
                styleMDP.position = 'relative';
                styleMDP.marginTop = '5px';
                document.getElementById('mdp-verif').style.color = 'red';
                return 0;
            } else if (error.type === "WRONG_PASSWORD") {
                document.getElementById('forms-button').style.marginTop = '10px';
                document.getElementById('mdp-incorect').innerHTML = '<p id="mdp-verif">Mot de passe incorrect !</p>';
                const styleMDP = document.getElementById('mdp-incorect').style;
                styleMDP.position = 'relative';
                styleMDP.marginTop = '5px';
                document.getElementById('mdp-verif').style.color = 'red';
                const errorText = await response.text();
                console.log(errorText);
            } else {
                console.log("Erreur lors de la connexion.");
            }
        }

    } catch (err) {
        console.error("Erreur lors de la requête :", err);
        console.log("Erreur réseau ou serveur.");
    }
});



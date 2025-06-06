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

// Fonction pour récupérer et afficher les annonces
async function fetchAnnonces() {
    try {
        const response = await fetch('http://localhost:3000/annonces', {
            method: 'GET',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        const annonces = await response.json();
        console.log('Annonces récupérées :', annonces);
    } catch (err) {
        console.error('Erreur lors de la récupération des annonces :', err);
    }
}

// Ajout d'annonce et vérification des champs
document.getElementById('annonceForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Créer un objet FormData pour inclure les données du formulaire
    const form = document.getElementById('annonceForm');
    const formData = new FormData(document.getElementById('annonceForm'));
    const message = document.getElementById('message');

    const prix = parseFloat(formData.get('prix_vehi'));
    const portes = parseInt(formData.get('portes_vehi'), 10);
    const annee = formData.get('annee_vehi');
    const codePostal = formData.get('codeP_vehi');
    const type_vehi = formData.get('type_vehi');

    // Vérification des champs obligatoires
    if (type_vehi === '') {
        message.textContent = 'Veuillez sélectionner un type de véhicule.';
        message.style.color = 'red';
        return;
    }

    if (prix <= 0) {
        message.textContent = 'Le prix du véhicule doit être supérieur à 0.';
        message.style.color = 'red';
        return;
    }

    if (portes <= 0) {
        message.textContent = 'Le nombre de portes doit être supérieur à 0.';
        message.style.color = 'red';
        return;
    }

    if (!/^\d{4}$/.test(annee)) {
        message.textContent = 'L\'année doit être composée de 4 chiffres.';
        message.style.color = 'red';
        return;
    }

    if (!/^\d{5}$/.test(codePostal)) {
        message.textContent = 'Le code postal doit être composé de 5 chiffres.';
        message.style.color = 'red';
        return;
    }

    const regex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    const description = formData.get('description_vehi');
    if (regex.test(description)) {
        message.textContent = 'La description ne doit pas contenir de balises script.';
        message.style.color = 'red';
        return;
    }

    // Récupération du code_uti
    const authRes = await fetch('http://localhost:3000/check-auth-code-uti', {
      method: 'GET',
      credentials: 'include'
    });
    
    if (!authRes.ok) throw new Error('Non connecté');

    const user = await authRes.json();
    const code_uti = user.code_uti;

    // Récupération de l'id_profile
    const resProfile = await fetch('http://localhost:3000/get-id-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ code_uti })
    });

    const profile = await resProfile.json();
    const id_profile = profile.id_profile;

    formData.append('id_profile', id_profile);
    formData.append('code_uti', code_uti)

    // Envoi des données vers le serveur
    const response = await fetch('http://localhost:3000/add-annonce', {
        method: 'POST',
        body: formData
    });

    const result = await response.text();

    if (response.ok) {
        form.reset();
        message.textContent = 'Demande de création d`annonce réalisée avec succès !';
        message.style.color = 'green';

        // Rafraîchir la liste des annonces après l'ajout
        fetchAnnonces();
    } else {
        message.textContent = `Erreur lors de la création de l'annonce : ${result}`;
        message.style.color = 'red';
    }
});

// Aperçu des images sélectionnées
document.getElementById('photo').addEventListener('change', function (event) {
    const files = event.target.files;
    const previewContainer = document.createElement('div');
    previewContainer.id = 'image-preview';
    previewContainer.style.display = 'flex';
    previewContainer.style.flexWrap = 'wrap';
    previewContainer.style.gap = '10px';

    // Supprimer les aperçus précédents
    const existingPreview = document.getElementById('image-preview');
    if (existingPreview) {
        existingPreview.remove();
    }

    // Ajouter un conteneur pour les aperçus
    event.target.parentElement.appendChild(previewContainer);

    // Parcourir les fichiers sélectionnés
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.width = '100px';
            img.style.height = '100px';
            img.style.objectFit = 'cover';
            img.style.border = '1px solid #ddd';
            img.style.borderRadius = '5px';
            previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
});

// Burger Menu
var sidenav = document.getElementById('mySidenav');
var openBtn = document.getElementById('openBtn');
var closeBtn = document.getElementById('closeBtn');

openBtn.onclick = openNav;
closeBtn.onclick = closeNav;
window.addEventListener("scroll", closeScroll);

function openNav() {
    sidenav.classList.add('active');
}

function closeNav() {
    sidenav.classList.remove('active');
}

function closeScroll() {
    sidenav.classList.remove('active');
}

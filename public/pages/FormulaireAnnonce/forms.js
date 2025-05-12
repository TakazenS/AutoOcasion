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
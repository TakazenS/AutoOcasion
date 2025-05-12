document.addEventListener('DOMContentLoaded', async () => {
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

    const annoncesList = document.getElementById('annonces-list');

    try {
        // Appel à la route backend pour récupérer les annonces en attente
        const res = await fetch('http://localhost:3000/admin/annonces-pending', { credentials: 'include' });

        if (!res.ok) {
            throw new Error(`Erreur HTTP : ${res.status}`);
        }

        const annonces = await res.json(); // Parse la réponse JSON

        annonces.forEach(annonce => {
            const annonceDiv = document.createElement('div');
            annonceDiv.className = 'annonce-item';
            annonceDiv.innerHTML = `
                <h3>${annonce.marque_vehi} ${annonce.model_vehi}</h3>
                <p>${annonce.description_vehi}</p>
                <button class="approve-btn" data-id="${annonce.code_annonce}">Valider</button>
                <button class="reject-btn" data-id="${annonce.code_annonce}">Rejeter</button>
                <button class="view-details-btn" data-id="${annonce.code_annonce}" data-annonce='${JSON.stringify(annonce)}'>Voir les détails</button>
            `;

            annoncesList.appendChild(annonceDiv);

            // Gestionnaire pour le bouton "Valider"
            annonceDiv.querySelector('.approve-btn').addEventListener('click', async () => {
                await updateAnnonceStatus(annonce.code_annonce, 'validée');
            });

            // Gestionnaire pour le bouton "Rejeter"
            annonceDiv.querySelector('.reject-btn').addEventListener('click', async () => {
                await updateAnnonceStatus(annonce.code_annonce, 'rejetée');
            });

            // Gestionnaire pour le bouton "Voir les détails"
            annonceDiv.querySelector('.view-details-btn').addEventListener('click', () => {
                showAnnonceDetails(annonce);
            });
        });
    } catch (err) {
        console.error('Erreur lors de la récupération des annonces :', err);
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

// Fonction pour mettre à jour le statut d'une annonce
async function updateAnnonceStatus(annonceId, action) {
    try {
        const res = await fetch(`http://localhost:3000/admin/annonce/${annonceId}/validate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ action }) // Envoie l'action ("validée" ou "rejetée")
        });

        if (!res.ok) {
            throw new Error(`Erreur HTTP : ${res.status}`);
        }

        alert(`Annonce ${action} avec succès.`);
        location.reload(); // Recharge la liste des annonces
    } catch (err) {
        console.error(`Erreur lors de la mise à jour de l'annonce :`, err);
        alert('Une erreur est survenue lors de la mise à jour de l\'annonce.');
    }
}

// Fonction pour afficher les détails d'une annonce avec un carrousel d'images
function showAnnonceDetails(annonce) {
    const overlay = document.getElementById('overlay');
    const carouselContainer = document.getElementById('carousel-container');
    const fullAnnonceContent = document.getElementById('full-annonce-content');

    // Récupérer les images de l'annonce
    fetch(`http://localhost:3000/admin/annonce/${annonce.code_annonce}/photos`, { credentials: 'include' })
        .then(res => {
            if (!res.ok) {
                throw new Error('Erreur lors de la récupération des photos.');
            }
            return res.json();
        })
        .then(photos => {
            // Générer le carrousel
            const carouselHTML = `
                <div class="carousel">
                    <button class="carousel-btn prev" onclick="changeSlide(-1)">&#10094;</button>
                    <div class="carousel-slides">
                        ${photos.map((code_photo, index) => `
                            <div class="carousel-slide ${index === 0 ? 'active' : ''}">
                                <img src="http://localhost:3000/photo/${code_photo}" alt="Image ${index + 1}" class="img-fluid">
                            </div>
                        `).join('')}
                    </div>
                    <button class="carousel-btn next" onclick="changeSlide(1)">&#10095;</button>
                </div>
            `;
            carouselContainer.innerHTML = carouselHTML;

            // Générer les détails de l'annonce
            fullAnnonceContent.innerHTML = `
        <h2 class="titre-annonce">${annonce.marque_vehi.charAt(0).toUpperCase()}${annonce.marque_vehi.substring(1).toLowerCase()} ${annonce.model_vehi}</h2>
        <p><strong>Prix : </strong>${annonce.prix_vehi} €</p>
        <p><strong>Date d'ajout : </strong><i>${annonce.date_ajout ? new Date(annonce.date_ajout).toLocaleString('fr-FR') : 'Date non disponible'}</i></p>
        <br><br><hr><br><hr><br><br>
        <h3>Détails de l'annonce</h3>
    <div class="details">
        <p><img class="icon" src="/public/pages/ListeAnnonce/icon/liste-de-controle.png"><strong>Marque</strong><br>${annonce.marque_vehi.charAt(0).toUpperCase()}${annonce.marque_vehi.substring(1).toLowerCase()}</p>
        <p><img class="icon" src="/public/pages/ListeAnnonce/icon/auto.png"><strong>Modèle</strong><br>${annonce.model_vehi}</p>
        <p><img class="icon" src="/public/pages/ListeAnnonce/icon/palette-de-couleurs.png"><strong>Couleur</strong><br>${annonce.couleur_vehi.charAt(0).toUpperCase()}${annonce.couleur_vehi.substring(1).toLowerCase()}</p>
        <p><img class="icon" src="/public/pages/ListeAnnonce/icon/compteur-de-vitesse.png"><strong>Kilométrage du véhicule</strong><br>${annonce.kilometrage_vehi} Km</p>
        <p><img class="icon" src="/public/pages/ListeAnnonce/icon/boite-de-vitesses.png"><strong>Boîte de vitesse</strong><br>${annonce.boite_vitesse_vehi.charAt(0).toUpperCase()}${annonce.boite_vitesse_vehi.substring(1).toLowerCase()}</p>
        <p><img class="icon" src="/public/pages/ListeAnnonce/icon/carburant.png"><strong>Carburant</strong><br>${annonce.carburant_vehi.charAt(0).toUpperCase()}${annonce.carburant_vehi.substring(1).toLowerCase()}</p>
        <p><img class="icon" src="/public/pages/ListeAnnonce/icon/calendrier.png"><strong>Année</strong><br>${annonce.annee_vehi}</p>
        <p><img class="icon" src="/public/pages/ListeAnnonce/icon/portiere-de-voiture.png"><strong>Nombre de places</strong><br>${annonce.places_vehi}</p>
        <p><img class="icon" src="/public/pages/ListeAnnonce/icon/portiere-de-voiture.png"><strong>Nombre de portes</strong><br>${annonce.portes_vehi}</p>
        <p><img class="icon" src="/public/pages/ListeAnnonce/icon/moteur.png"><strong>Puissance fiscale</strong><br>${annonce.puissance_fiscale_vehi} Cv</p>
        <p><img class="icon" src="/public/pages/ListeAnnonce/icon/moteur.png"><strong>Puissance DIN</strong><br>${annonce.puissance_din_vehi} Kw</p>
        <p><img class="icon" src="/public/pages/ListeAnnonce/icon/liste-de-controle.png"><strong>Cylindrée</strong><br>PROCHAINEMENT</p>
        <p><img class="icon" src="/public/pages/ListeAnnonce/icon/liste-de-controle.png"><strong>Crit'Air</strong><br>${annonce.critair_vehi}</p>
        <p><img class="icon" src="/public/pages/ListeAnnonce/icon/permis-de-conduire.png"><strong>Type de permis</strong><br>${annonce.type_permis.toUpperCase()}</p>
        <p><img class="icon" src="/public/pages/ListeAnnonce/icon/ville.png"><strong>Ville</strong><br>${annonce.ville_vehi.charAt(0).toUpperCase()}${annonce.ville_vehi.substring(1)}</p>
        <p><img class="icon" src="/public/pages/ListeAnnonce/icon/ville.png"><strong>Code postal</strong><br>${annonce.codeP_vehi}</p>
    </div>
        <br><br><hr><br><br>
        <h3>Options :</h3>
        <p>${annonce.options_vehi}</p>
        <br><br><hr><br><br>
        <h3>Description :</h3>
        <p>${annonce.description_vehi}</p>
        <br><br><hr><br><br>
        <h3>Contact :</h3><br>
        <p><img class="icon" src="/public/pages/ListeAnnonce/icon/liste-de-controle.png"><strong>Numéro de téléphone</strong><br>${annonce.numero_telephone}</p><br>
        <p><img class="icon" src="/public/pages/ListeAnnonce/icon/liste-de-controle.png"><strong>Adresse Mail</strong><br>${annonce.adresse_mail}</p>

            `;

            overlay.style.display = 'flex';
        })
        .catch(err => {
            console.error('Erreur lors de l\'affichage des détails de l\'annonce :', err);
        });
}

// Fermer les détails de l'annonce
document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('overlay').style.display = 'none';
});

// Carrousel
let currentSlide = 0;
function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    slides[currentSlide].classList.remove('active');

    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
}

// Fonction pour afficher le total des annonces en attente
async function totalAnnonceAttente() {
    try {
        const res = await fetch('http://localhost:3000/annonces/total-annonces-attente', { credentials: 'include' });

        if (!res.ok) {
            throw new Error(`Erreur HTTP : ${res.status}`);
        }

        const total = await res.json(); // Parse la réponse JSON
        document.getElementById('total-annonces-attente').textContent = `Total des annonces en attente : ${total.total}`;
    } catch (err) {
        console.error('Erreur lors de la récupération du total des annonces en attente : ', err);
    }
}
totalAnnonceAttente(); // Appel de la fonction pour afficher le total des annonces en attente

// Fonction pour afficher le total des annonces validées
async function totalAnnonces() {
    try {
        const res = await fetch('http://localhost:3000/admin/total-annonces', { credentials: 'include' });

        if (!res.ok) {
            throw new Error(`Erreur HTTP : ${res.status}`);
        }

        const total = await res.json(); // Parse la réponse JSON
        document.getElementById('total-annonces').textContent = `Total des annonces listées : ${total.total}`;
    } catch (err) {
        console.error('Erreur lors de la récupération du total des annonces :', err);
    }
}
totalAnnonces(); // Appel de la fonction pour afficher le total des annonces
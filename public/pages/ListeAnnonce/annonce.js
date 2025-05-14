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

        // Récupérer le nombre d'annonces en attente
        const totalRes = await fetch('http://localhost:3000/annonces/total-annonces-attente', {
            method: 'GET',
            credentials: 'include'
        });

        let total = 0;
        if (totalRes.ok) {
            const totalData = await totalRes.json();
            total = totalData.total;
        }

        // Ajouter dynamiquement la notification uniquement si total > 0
        if (total > 0) {
            const notification = document.createElement('span');
            notification.className = 'notification';
            notification.textContent = total;
            adminContainer.appendChild(notification);
        }
    } catch (error) {
        console.error("Erreur :", err);
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

// Affiche une pop up de connexion si l'on veut ajouter une annonce lorsque l'on est déconnecté
document.getElementById('link-create-ann').addEventListener('click', async (e) => {
    try {
        const res = await fetch('http://localhost:3000/check-auth', {
            method: 'GET',
            credentials: 'include'
        });

        if (res.ok) {
            e.preventDefault();
            window.location.href = "/public/pages/FormulaireAnnonce/forms.php";
        } else {
            const result = await res.json();

            if (result.type === "NOT_CONNECTED") {
                e.preventDefault(); // empêcher la navigation
                const popup = document.getElementById('popup');
                popup.style.display = 'flex';

                // Fermer la popup sur clic du bouton
                document.getElementById('closePopup').addEventListener('click', () => {
                    popup.style.display = 'none';
                });

                // Fermer la popup en cliquant en dehors
                window.addEventListener('click', (e) => {
                    if (e.target === popup) {
                        popup.style.display = 'none';
                    }
                });
            }
        }
    } catch (err) {
        console.error("Erreur de session :", err);
    }
});

// Fonction pour récupérer et afficher les annonces
async function fetchAnnonces() {
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

        // Récupérez les annonces
        const response = await fetch('http://localhost:3000/annonces');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des annonces');
        }

        const annonces = await response.json();
        console.log('Annonces récupérées :', annonces);

        const output = document.getElementById('output');
        output.innerHTML = ''; // Réinitialiser l'affichage

        annonces.forEach(annonce => {
            const annonceDiv = document.createElement('div');
            annonceDiv.className = 'card';
            annonceDiv.innerHTML = `
                <img src="${annonce.codes_photos[0] ? `http://localhost:3000/photo/${annonce.codes_photos[0]}` : '/public/images/no-image.png'}" alt="Image de l'annonce" class="img-fluid">
                <div class="card-body">
                    <h5 class="card-title">${annonce.marque_vehi.charAt(0).toUpperCase()}${annonce.marque_vehi.substring(1).toLowerCase()} ${annonce.model_vehi}</h5>
                    <p class="card-text">Prix : ${annonce.prix_vehi} €</p>
                    <p class="card-text">Ville : ${annonce.ville_vehi}</p>
                    <p class="card-text"><small class="text-muted">Date ajoutée : ${annonce.date_ajout ? new Date(annonce.date_ajout).toLocaleString('fr-FR') : 'Date non disponible'}</small></p>
                    ${roleData.isAdmin ? `<button class="btn-delete" data-id="${annonce.code_annonce}">Supprimer</button>` : ''}
                </div>
            `;

        // Ajouter un événement pour afficher l'annonce en grand
        annonceDiv.addEventListener('click', (e) => {
            // Empêcher l'événement si le bouton "Supprimer" est cliqué
            if (e.target.classList.contains('btn-delete')) return;

            showFullAnnonce(annonce);
        });
            
        // Ajouter un événement de clic sur le bouton "Supprimer"
        if (roleData.isAdmin) {
            annonceDiv.querySelector('.btn-delete').addEventListener('click', async (e) => {
                const annonceId = e.target.getAttribute('data-id');
                const deleteRes = await fetch(`http://localhost:3000/annonce/${annonceId}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });

                if (deleteRes.ok) {
                    e.target.closest('.card').remove(); // Supprime l'annonce du DOM
                    console.log('Annonce supprimée avec succès.');
                } else {
                    console.error('Erreur lors de la suppression de l\'annonce.');
                }
            });
        }

        output.appendChild(annonceDiv);
        });
    } catch (err) {
        console.error('Erreur lors de la récupération des annonces :', err);
    }
}

// Fonction pour afficher les détails de l'annonce
function showFullAnnonce(annonce) {
    const overlay = document.getElementById('overlay');
    const carouselContainer = document.getElementById('carousel-container');
    const fullAnnonceContent = document.getElementById('full-annonce-content');

    // Générer le carrousel
    const carouselHTML = `
        <div class="carousel">
            <button class="carousel-btn prev" onclick="changeSlide(-1)">&#10094;</button>
            <div class="carousel-slides">
                ${annonce.codes_photos.map((code_photo, index) => `
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
        <h2 class="titre-annonce">${annonce.marque_vehi.charAt(0).toUpperCase()}${annonce.marque_vehi.substring(1).toLowerCase()} ${annonce.model_vehi.toUpperCase()}</h2>
        <p><strong>Prix : </strong>${annonce.prix_vehi} €</p>
        <p><strong>Date d'ajout : </strong><i>${annonce.date_ajout ? new Date(annonce.date_ajout).toLocaleString('fr-FR') : 'Date non disponible'}</i></p>
        <br><br><hr><br><hr><br><br>
        <h3>Détails de l'annonce</h3>
    <div class="details">
        <p><img class="icon" src="icon/liste-de-controle.png"><strong>Marque</strong><br>${annonce.marque_vehi.toUpperCase()}</p>
        <p><img class="icon" src="icon/auto.png"><strong>Modèle</strong><br>${annonce.model_vehi.toUpperCase()}</p>
        <p><img class="icon" src="icon/boite-de-vitesses.png"><strong>Boîte de vitesse</strong><br>${annonce.boite_vitesse_vehi.charAt(0).toUpperCase()}${annonce.boite_vitesse_vehi.substring(1).toLowerCase()}</p>
        <p><img class="icon" src="icon/carburant.png"><strong>Carburant</strong><br>${annonce.carburant_vehi.charAt(0).toUpperCase()}${annonce.carburant_vehi.substring(1).toLowerCase()}</p>
        <p><img class="icon" src="icon/compteur-de-vitesse.png"><strong>Kilométrage du véhicule</strong><br>${annonce.kilometrage_vehi} Km</p>
        <p><img class="icon" src="icon/calendrier.png"><strong>Année</strong><br>${annonce.annee_vehi}</p>
        <p><img class="icon" src="icon/permis-de-conduire.png"><strong>Type de permis</strong><br>${annonce.type_permis.toUpperCase()}</p>
        <p><img class="icon" src="icon/portiere-de-voiture.png"><strong>Nombre de places</strong><br>${annonce.places_vehi}</p>
        <p><img class="icon" src="icon/portiere-de-voiture.png"><strong>Nombre de portes</strong><br>${annonce.portes_vehi}</p>
        <p><img class="icon" src="icon/palette-de-couleurs.png"><strong>Couleur</strong><br>${annonce.couleur_vehi.charAt(0).toUpperCase()}${annonce.couleur_vehi.substring(1).toLowerCase()}</p>
        <p><img class="icon" src="icon/liste-de-controle.png"><strong>Crit'Air</strong><br>${annonce.critair_vehi}</p>
        <p><img class="icon" src="icon/moteur.png"><strong>Puissance fiscale</strong><br>${annonce.puissance_fiscale_vehi} Cv</p>
        <p><img class="icon" src="icon/moteur.png"><strong>Puissance DIN</strong><br>${annonce.puissance_din_vehi} Ch</p>
    </div>
        <br><br><hr><br><br>
        <h3>Options :</h3>
        <p>${annonce.options_vehi}</p>
        <br><br><hr><br><br>
        <h3>Description :</h3>
        <p>${annonce.description_vehi}</p>
        <br><br><hr><br><br>
        <h3>Contact :</h3><br>
        <p><img class="icon" src="icon/liste-de-controle.png"><strong>Adresse Mail : </strong><br>${annonce.adresse_mail}</p>
        <p><img class="icon" src="icon/ville.png"><strong>Ville</strong><br>${annonce.ville_vehi.charAt(0).toUpperCase()}${annonce.ville_vehi.substring(1)}</p>
        <p><img class="icon" src="icon/ville.png"><strong>Code postal</strong><br>${annonce.codeP_vehi}</p>
    `;

    overlay.style.display = 'flex';
    
    // Ferme les détails de l'annonce lorsque l'on clique à côté
    window.addEventListener('click', (e) => {
        if (e.target === document.getElementById('overlay')) {
            document.getElementById('overlay').style.display = 'none';
        }
    });
}

// Ferme les détails de l'annonce
document.getElementById('close-btn').addEventListener('click', () => {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
})

// Caroussel
let currentSlide = 0;
function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    slides[currentSlide].classList.remove('active');

    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    slides[currentSlide].classList.add('active');
}

// Afficher les annonces au chargement de la page lorsque la page se charge
fetchAnnonces();

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

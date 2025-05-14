const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const session = require("express-session");
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
require("dotenv").config();

// Initialisation du serveur Node.js et récupération du front-end
const app = express();
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true
}));
app.use(express.json());
app.use(express.static('public'));

// Middleware pour traiter les données JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,     // à false en local, true si HTTPS
        httpOnly: true,
        sameSite: 'lax'    // ou 'none' si HTTPS + cross-domain
    }
}));

// Middleware pour gérer l'upload de fichier avec express-fileupload
app.use(fileUpload({
    createParentPath: true
}));

// Connexion à la base de donnée
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Fonction pour maintenir la connexion active
function keepAlive() {
    connection.query('SELECT 1', (err) => {
        if (err) {
            console.error('Erreur de keep-alive :', err);
        }
    });
}

// Exécuter keepAlive toutes les 10 minutes
setInterval(keepAlive, 600000);

// Route qui vérifie si l'on est authentifié
app.get('/check-auth', (req, res) => {
    if (req.session.user) {
        return res.json({ authenticated: true });
    }
    return res.status(401).json({ error: "Non connecté", type: "NOT_CONNECTED" });
});

// Route pour créer un utilisateur
app.post('/create-uti', (req, res) => {
    const { nom_uti, prenom_uti, mail_uti, mdp_uti } = req.body;

    if (!nom_uti || !prenom_uti || !mail_uti || !mdp_uti) {
        return res.status(400).send('Tous les champs sont requis !')
    }

    bcrypt.hash(mdp_uti, 10, (err, hash) => {
        if (err) {
            console.error("Erreur de hachage du mot de passe :", err);
            return res.status(500).send("Erreur interne du serveur !");
        }

        connection.query(
            'INSERT INTO UTILISATEUR (nom_uti, prenom_uti, mail_uti, mdp_uti) VALUES (?, ?, ?, ?)',
            [
                nom_uti, prenom_uti, mail_uti, hash
            ],
            (err) => {
                if (err) {
                    console.error("Erreur lors de l\'insertion de l'utilisateur dans la base de données :", err);
                    return res.status(500).send('Erreur interne du serveur !');
                }
                res.send('Utilisateur ajouté avec succès !');
            }
        );
    });
});

app.post("/add-profile", (req, res) => {
    const pseudo_profile = req.body.pseudo_profile;
    const photo_default = req.body.photo_default;

    photo_default = photo_default.data;

    connection.query(
        'INSERT INTO PROFILE (pseudo_profile, photo_profile) VALUES (?, ?)',
    [
        pseudo_uti, photo_profile
    ],
    (err) => {
        if (err) {
            console.error("Erreur lors de l\'insertion de l'utilisateur dans la base de données :", err);
            return res.status(500).send('Erreur interne du serveur !');
        }
        res.send('Profil ajouté avec succès !');
    });
});

// Route pour se connecter à son compte
app.post("/login", (req, res) => {
    const { mail_uti, mdp_uti } = req.body;
    connection.query("SELECT * FROM UTILISATEUR WHERE mail_uti = ?;", [mail_uti], (err, result) => {
        if (err) return res.status(500).send("Erreur serveur");

        if (result.length === 0) {
            return res.status(401).json({ error: "Email invalide", type: "EMAIL_NOT_FOUND" });
        }

        const user = result[0];
        bcrypt.compare(mdp_uti, user.mdp_uti, (err, same) => {
            if (err) return res.status(500).send("Erreur de comparaison");
            
            if (same) {
                req.session.user = user;
                res.json({ message: "Connexion réussie !" });
            } else {
                res.status(401).json({ error: "Mot de passe incorrect", type: "WRONG_PASSWORD" });
            }
        });
    });
});

app.get('/get-user-role', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Utilisateur non connecté' });
    }

    const userId = req.session.user.code_uti;

    console.log(userId);

    connection.query('SELECT role FROM UTILISATEUR WHERE code_uti = ? LIMIT 1', [userId], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération du rôle :', err);
            return res.status(500).json({ error: 'Erreur serveur' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        const role = results[0].role;
        res.json({ role, isAdmin: role === 'admin' });
    });
});

// Route pour insérer une annonce avec image en utilisant express-fileupload
app.post('/add-annonce', async (req, res) => {
    console.log('Données reçues (body):', req.body);
    console.log('Fichier(s) reçus (files):', req.files);

    const {
        marque_vehi, model_vehi, boite_vitesse_vehi, carburant_vehi, prix_vehi, annee_vehi, type_permis,
        places_vehi, portes_vehi, couleur_vehi, critair_vehi, puissance_fiscale_vehi,
        puissance_din_vehi, options_vehi, description_vehi, ville_vehi, 
        codeP_vehi, kilometrage_vehi, adresse_mail
    } = req.body;

    if (!model_vehi || !prix_vehi || !description_vehi || !marque_vehi || !ville_vehi) {
        return res.status(400).send('Tous les champs obligatoires sont requis.');
    }

    if (!req.files || !req.files.photo) {
        return res.status(400).send("Aucune image fournie.");
    }

    const photos = Array.isArray(req.files.photo) ? req.files.photo : [req.files.photo];

    // Insertion de l'annonce dans la table ANNONCE
    const insertAnnonceQuery = `
        INSERT INTO ANNONCE (
            marque_vehi, model_vehi, boite_vitesse_vehi, carburant_vehi, prix_vehi, annee_vehi, type_permis,
            places_vehi, portes_vehi, couleur_vehi, critair_vehi, puissance_fiscale_vehi,
            puissance_din_vehi, options_vehi, description_vehi, ville_vehi,
            codeP_vehi, kilometrage_vehi, adresse_mail 
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const annonceValues = [
        marque_vehi, model_vehi, boite_vitesse_vehi, carburant_vehi, prix_vehi, annee_vehi, type_permis,
        places_vehi, portes_vehi, couleur_vehi, critair_vehi, puissance_fiscale_vehi,
        puissance_din_vehi, options_vehi, description_vehi, ville_vehi, 
        codeP_vehi, kilometrage_vehi, adresse_mail
    ];

    connection.query(insertAnnonceQuery, annonceValues, (annonceErr, annonceResults) => {
        if (annonceErr) {
            console.error('Erreur lors de l\'insertion de l\'annonce :', annonceErr);
            return res.status(500).send('Erreur interne du serveur lors de l\'insertion de l\'annonce.');
        }

        const code_annonce = annonceResults.insertId; // Récupérer le code_annonce généré

        // Insertion des photos dans la table PHOTO
        const insertPhotoQuery = 'INSERT INTO PHOTO (photos_vehi, code_annonce) VALUES (?, ?)';
        photos.forEach(photo => {
            const photoData = photo.data;
            connection.query(insertPhotoQuery, [photoData, code_annonce], (photoErr) => {
                if (photoErr) {
                    console.error("Erreur lors de l'insertion de la photo :", photoErr);
                }
            });
        });

        res.send('Annonce et photos ajoutées avec succès.');
    });
});

app.get('/annonces', (req, res) => {
    const query = `
        SELECT 
            ANNONCE.*, 
            IFNULL(GROUP_CONCAT(PHOTO.photos_vehi), '') AS photos,
            IFNULL(GROUP_CONCAT(PHOTO.code_photo), '') AS codes_photos
        FROM ANNONCE
        LEFT JOIN PHOTO ON ANNONCE.code_annonce = PHOTO.code_annonce
        WHERE ANNONCE.statut = 'validée'
        GROUP BY ANNONCE.code_annonce
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des annonces :', err);
            return res.status(500).send('Erreur interne du serveur.');
        }

        const annonces = results.map(annonce => ({
            ...annonce,
            photos: typeof annonce.photos === 'string' && annonce.photos.length > 0 ? annonce.photos.split(',') : [],
            codes_photos: typeof annonce.codes_photos === 'string' && annonce.codes_photos.length > 0 ? annonce.codes_photos.split(',') : []
        }));

        res.json(annonces);
    });
});

// Route pour supprimer une annonce
app.delete('/annonce/:id', (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        console.error('Accès refusé : utilisateur non administrateur ou non connecté.');
        return res.status(403).send('Accès refusé : vous devez être administrateur.');
    }

    const annonceId = req.params.id;
    console.log(`Tentative de suppression de l'annonce avec ID : ${annonceId}`);

    // Supprimer les photos associées
    const deletePhotosQuery = 'DELETE FROM PHOTO WHERE code_annonce = ?';
    connection.query(deletePhotosQuery, [annonceId], (photoErr) => {
        if (photoErr) {
            console.error('Erreur lors de la suppression des photos :', photoErr);
            return res.status(500).send('Erreur interne du serveur lors de la suppression des photos.');
        }

        // Supprimer l'annonce
        const deleteAnnonceQuery = 'DELETE FROM ANNONCE WHERE code_annonce = ?';
        connection.query(deleteAnnonceQuery, [annonceId], (annonceErr, result) => {
            if (annonceErr) {
                console.error('Erreur lors de la suppression de l\'annonce :', annonceErr);
                return res.status(500).send('Erreur interne du serveur.');
            }

            if (result.affectedRows === 0) {
                console.error('Annonce non trouvée pour l\'ID :', annonceId);
                return res.status(404).send('Annonce non trouvée.');
            }

            console.log('Annonce supprimée avec succès, ID :', annonceId);
            res.send('Annonce supprimée avec succès.');
        });
    });
});

// Affichage du nombre d'annonce en attente
app.get('/annonces/total-annonces-attente', (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).send('Accès refusé : vous devez être administrateur.');
    }

    const query = 'SELECT COUNT(*) AS total FROM ANNONCE WHERE statut = "en attente"';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération du nombre total d\'annonces en attente :', err);
            return res.status(500).send('Erreur interne du serveur.');
        }

        const total = results[0].total;
        res.json({ total });
    });
});

// Route pour récupérer les annonces en attente
app.get('/admin/annonces-pending', (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        console.error('Accès refusé : utilisateur non administrateur ou non connecté.');
        return res.status(403).json({ error: 'Accès refusé : vous devez être administrateur.' });
    }

    const query = 'SELECT * FROM ANNONCE WHERE statut = "en attente"';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des annonces en attente :', err);
            return res.status(500).json({ error: 'Erreur interne du serveur.' });
        }

        res.json(results); // Renvoie les annonces en attente sous forme de JSON
    });
});

// Route pour valider ou rejeter une annonce
app.post('/admin/annonce/:id/validate', (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).send('Accès refusé : vous devez être administrateur.');
    }

    const annonceId = req.params.id;
    const { action } = req.body; 

    if (!['validée', 'rejetée'].includes(action)) {
        return res.status(400).send('Action invalide.');
    }

    const query = 'UPDATE ANNONCE SET statut = ? WHERE code_annonce = ?';
    connection.query(query, [action, annonceId], (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour du statut de l\'annonce :', err);
            return res.status(500).send('Erreur interne du serveur.');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Annonce non trouvée.');
        }

        res.send(`Annonce ${action === 'validée' ? 'validée' : 'rejetée'} avec succès.`);
    });
});

// Route pour récupérer les images d'une annonce spécifique
app.get('/admin/annonce/:id/photos', (req, res) => {
    const annonceId = req.params.id;

    const query = 'SELECT code_photo FROM PHOTO WHERE code_annonce = ?';
    connection.query(query, [annonceId], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des photos :', err);
            return res.status(500).send('Erreur interne du serveur.');
        }

        if (results.length === 0) {
            return res.status(404).send('Aucune photo trouvée pour cette annonce.');
        }

        res.json(results.map(photo => photo.code_photo));
    });
});

// Route pour récupérer le nombre total d'annonces validées
app.get('/admin/total-annonces', (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).send('Accès refusé : vous devez être administrateur.');
    }

    const query = 'SELECT COUNT(*) AS total FROM ANNONCE WHERE statut = "validée"';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération du nombre total d\'annonces :', err);
            return res.status(500).send('Erreur interne du serveur.');
        }

        const total = results[0].total;
        res.json({ total });
    });
})

app.get('/photo/:code_photo', (req, res) => {
    const { code_photo } = req.params;

    const query = 'SELECT photos_vehi FROM PHOTO WHERE code_photo = ?';
    connection.query(query, [code_photo], (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération de la photo :', err);
            return res.status(500).send('Erreur interne du serveur.');
        }

        if (results.length === 0) {
            console.error('Photo non trouvée pour code_photo :', code_photo);
            return res.status(404).send('Photo non trouvée.');
        }

        const photo = results[0].photos_vehi;

        if (!photo) {
            console.error('La photo est vide ou invalide pour code_photo :', code_photo);
            return res.status(500).send('Erreur : la photo est vide ou invalide.');
        }

        // Définir le type MIME pour l'image (par exemple, image/png ou image/jpeg)
        res.setHeader('Content-Type', 'image/jpeg'); // Changez en 'image/png' si nécessaire
        res.send(photo);
    });
});

// Route de déconnection
app.get('/logout', (req, res) => {
    req.session?.destroy?.(); // si tu utilises express-session
    res.status(200).json({ message: 'Déconnecté' });
});

// Test de la connexion à la base de données
connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données MySQL :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL !');
});

// Logs prévenant le fonctionnement du serveur sur son port
app.listen(3000, () => {
    console.log('Node.js API écoute sur le port 3000');
});
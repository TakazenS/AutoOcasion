<!DOCTYPE html>
<html lang="fr-FR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="/public/images/logo.png" type="image/png">
        <link rel="apple-touch-icon" href="/public/images/logo.png" type="image/png">
        <link rel="stylesheet" href="/public/pages/ListeAnnonce/annonce.css">
        <link rel="stylesheet" href="/includes.css">
        <title>AUT'OCCASION - Liste des Annonces</title>
    </head>
    <body class="bg-light">
        <?php include('../includes/header/headerAnnonce.php'); ?>
        <section class="main-container">
            <div class="wrapper">
                <div class="content">
                    <h2 class="text-center">Liste des annonces</h2>
                    <div id="output" class=""></div>
                    <!-- Conteneur pour afficher l'annonce en grand -->
                    <div id="overlay" class="overlay" style="display: none;">
                        <div class="full-annonce">
                            <div class="header-full-annonce">
                                <img class="img-header-fullannonce" src="/public/images/logo.png" alt="logo-header">
                                <h1>Aut'Occasion</h1>
                            </div>
                            <hr>
                                <button class="close-btn" id="close-btn">&times;</button>
                                <div id="carousel-container"></div>
                            </hr>
                            <div id="full-annonce-content"></div>
                        </div>
                    </div>
                    <div id="popup" class="popup">
                        <div class="popup-content">
                            <span id="closePopup" class="close">&times;</span>
                            <h2>Vous n'êtes pas connecté !</h2>
                            <p>Afin de poster une annonce, vous devez vous connecter en cliquant sur le bouton ci-dessous :</p>
                            <div id="button-popup" class="button-right">
                                <a class="link-connexion-popup" id="popup-btn-id" href="/public/pages/connexion/connexion.php"><button class="btn-ann btn-popup">Connexion</button></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <?php include('../includes/footer/footer.php') ?>
        <script src="/public/pages/ListeAnnonce/annonce.js" defer></script>
    </body>
</html>
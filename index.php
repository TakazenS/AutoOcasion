<!DOCTYPE html>
<html lang="fr-FR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AUT'OCASSION - Page d'Accueil</title>
        <link rel="shortcut icon" href="/public/images/logo.png" type="image/png">
        <link rel="apple-touch-icon" href="/public/images/logo.png" type="image/png">
        <link rel="stylesheet" href="/styles.css">
        <link rel="stylesheet" href="/includes.css">
    </head>
    <body>
        <?php include('./public/pages/includes/header/header.php'); ?>
        <main>
            <div class="container">
                <section class="hero">
                    <div class="hero-content">
                        <h1>Bienvenue sur AUT'OCASSION</h1>
                        <p>Vendez votre voiture en toute simplicité, entre particuliers.</p>
                        <a href="/public/pages/ListeAnnonce/annonce.php" class="cta-btn">Voir les annonces</a>
                    </div>
                </section>
            </div>
            <section class="about">
                <div class="about-logo">
                    <img src="/public/images/logo-texte.png" alt="Bannière" class="banner">
                </div>
                <div class="about-content">
                    <h2>Qui sommes-nous ?</h2>
                    <p>
                        Une entreprise spécialisée dans la mise en relation entre particuliers
                        propose une plateforme en ligne où les utilisateurs peuvent publier 
                        des annonces pour vendre leur propre voiture. Grâce à une interface 
                        intuitive, ils peuvent ajouter des photos, une description détaillée et 
                        un prix. Une fois validée, l’annonce est affichée sur la page dédiée 
                        aux véhicules en vente, offrant ainsi une visibilité optimale aux 
                        potentiels acheteurs. Cette solution simplifie la vente de voitures
                        entre particuliers en évitant les intermédiaires et en facilitant 
                        les transactions en toute transparence.
                    </p>
                </div>
            </section>
        </main>
        <?php include('./public/pages/includes/footer/footer.php') ?>
        <script src="/script.js"></script>
    </body>
</html>

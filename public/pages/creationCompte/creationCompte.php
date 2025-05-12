<!DOCTYPE html>
<html lang="fr-FR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="/public/images/logo.png" type="image/png">
        <link rel="apple-touch-icon" href="/public/images/logo.png" type="image/png">
        <link rel="stylesheet" href="/public/pages/creationCompte/creationCompte.css">
        <link rel="stylesheet" href="/includes.css">
        <title>AUT'OCCASION - Création de Compte</title>
    </head>
    <body class="body" id="body">
        <div class="creationCompte">
            <header class="header-creation-compte">
                <div class="index-header-link">
                    <a class="index-link" href="/">
                        <img src="/public/images/logo.png" alt="logo-header">
                        <h1>AUT'OCCASION</h1>
                    </a>
                </div>
                <div class="right-header">
                    <div class="annonces-header-link">
                        <a class="annonces-link" href="/public/pages/ListeAnnonce/annonce.php">Annonces</a>
                    </div>
                    <div id="button-right" class="button-right">
                        <a id="connexion-btn-id" href="/public/pages/connexion/connexion.php"><button class="button-connexion">Connexion</button></a>
                    </div>
                </div>
            </header>
            <main class="main-creation-compte">
                <section class="container-forms">
                    <div class="forms">
                        <span class="forms-title">
                            <p>Créez votre compte :</p>
                        </span>
                        <span class="forms-inputs">
                            <input type="text" name="lastname" class="inputs" id="lastname" placeholder="Nom*">
                            <input type="text" name="firstname" class="inputs" id="firstname" placeholder="Prénom*">
                            <input type="email" name="mail" class="inputs" id="mail" placeholder="Adresse mail*">
                            <input type="password" name="password" class="inputs" id="password" placeholder="Mot de passe*">
                            <input type="password" name="confirm-password" class="inputs" id="confirm-password" placeholder="Valider mot de passe*">
                        </span>
                        <span class="forms-rgpd">
                            <p>L'utilisation des données ci-dessus est en accord avec le RGPD.</p>
                        </span>
                        <span class="forms-connect">
                            <p>Vous avez déjà un compte : </p>
                            <a href="/public/pages/connexion/connexion.php">Connexion</a>
                        </span>
                        <span id="mdp-incorect">
                            <!--Injected with JS-->
                        </span>
                        <span class="forms-button" id="forms-button">
                            <button class="button-send" id="button-send">Envoyer</button>
                        </span>
                    </div>
                </section>
            </main>
            <footer class="footer-creation-compte">
                <div class="copyright">
                    <p>Copyright ©2024/2025 Tout droits reservé</p>
                </div>
                <div class="legal-mentions">
                    <p>Mentions légales</p>
                </div>
            </footer>
        </div>
        <script src="/public/pages/creationCompte/creationCompte.js"></script>
    </body>
</html>
<!DOCTYPE html>
<html lang="fr-FR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="/public/images/logo.png" type="image/png">
        <link rel="apple-touch-icon" href="/public/images/logo.png" type="image/png">
        <link rel="stylesheet" href="/public/pages/connexion/connexion.css">
        <link rel="stylesheet" href="/includes.css">
        <title>AUT'OCCASION - Connexion</title>
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
                <div class="annonces-header-link">
                    <a class="annonces-link" href="/public/pages/ListeAnnonce/annonce.php">Annonces</a>
                </div>
            </header>
            <main class="main-creation-compte">
                <section class="container-forms">
                    <div class="forms">
                        <span class="forms-title">
                            <p>Connectez vous :</p>
                        </span>
                        <span class="forms-inputs">
                            <input type="email" name="mail" class="inputs" id="mail" placeholder="Adresse mail*">
                            <input type="password" name="password" class="inputs" id="password" placeholder="Mot de passe*">
                        </span>
                        <span class="forms-connect">
                            <p>Vous n'avez pas de compte : </p><a href="/public/pages/creationCompte/creationCompte.php">Créer un compte</a>
                        </span>
                        <span id="mdp-incorect">
                            <!--Injected with JS-->
                        </span>
                        <span class="forms-button" id="forms-button">
                            <button class="button-send" id="button-send">Se connecter</button>
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
        <script src="/public/pages/connexion/connexion.js"></script>
    </body>
</html>
<!DOCTYPE html>
<html lang="fr-FR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="/public/images/favicon/favicon.png" type="image/png">
        <link rel="apple-touch-icon" href="/public/images/favicon/favicon.png" type="image/png">
        <link rel="stylesheet" href="/public/pages/connexion/connexion.css">
        <link rel="stylesheet" href="/includes.css">
        <title>AUT'OCCASION - Connexion</title>
    </head>
    <body class="body" id="body">
        <?php include('../includes/header/headerConnection.php'); ?>
        <section class="main-section">
            <div class="creationCompte">
                <main class="main-creation-compte">
                    <section class="container-forms">
                        <div class="forms">
                            <span class="forms-title">
                                <p>Connectez vous :</p>
                            </span>
                            <span class="forms-inputs">
                                <input type="email" name="mail" class="inputs" id="mail" placeholder="Adresse mail*">
                                <div class="input-wrapper">
                                    <input type="password" name="password" class="inputs" id="password" placeholder="Mot de passe*">
                                    <img class="eye" id="eye1" src="/public/images/password/closedEye.png" alt="eye">
                                </div>
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
            </div>
        </section>
        <?php include('../includes/footer/footer.php') ?>
        <script src="/public/pages/connexion/connexion.js"></script>
    </body>
</html>
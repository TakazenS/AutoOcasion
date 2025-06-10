<!DOCTYPE html>
<html lang="fr-FR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="/public/images/favicon/favicon.png" type="image/png">
        <link rel="apple-touch-icon" href="/public/images/favicon/favicon.png" type="image/png">
        <link rel="stylesheet" href="/public/pages/creationCompte/creationCompte.css">
        <link rel="stylesheet" href="/includes.css">
        <title>AUT'OCCASION - Création de Compte</title>
    </head>
    <body class="body" id="body">
        <?php include('../includes/header/headerCreation.php') ?>
        <section class="main-section">
            <div class="creationCompte">
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
                                <div class="input-wrapper">
                                    <input type="password" name="password" class="inputs" id="password" placeholder="Mot de passe*">
                                    <img class="eye" id="eye1" src="/public/images/password/closedEye.png" alt="eye">
                                </div>
                                <div class="input-wrapper">
                                    <input type="password" name="confirm-password" class="inputs" id="confirm-password" placeholder="Valider mot de passe*">
                                    <img class="eye" id="eye2" src="/public/images/password/closedEye.png" alt="eye">
                                </div>
                            </span>
                            <span class="forms-rgpd">
                                <p>L'utilisation des données ci-dessus est en accord avec le RGPD.</p>
                            </span>
                            <span class="forms-connect">
                                <p>Vous avez déjà un compte : </p>
                                <a href="/public/pages/connexion/connexion.php">Connexion</a>
                            </span>
                            <span id="mdp-incorect" class="mdp-incorect">
                                <!--Injected with JS-->
                            </span>
                            <span class="forms-button" id="forms-button">
                                <button class="button-send" id="button-send">Créer un compte</button>
                            </span>
                        </div>
                    </section>
                </main>
            </div>
        </section>
        <?php include('../includes/footer/footer.php') ?>
        <img class="defaultImg" id="defaultImg" src="/public/images/profile/default.png" alt="default">
        <script src="/public/pages/creationCompte/creationCompte.js"></script>
    </body>
</html>
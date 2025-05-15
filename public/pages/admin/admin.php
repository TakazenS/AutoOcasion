<!DOCTYPE html>
<html lang="fr-FR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="/public/images/favicon/favicon.png" type="image/png">
        <link rel="apple-touch-icon" href="/public/images/favicon/favicon.png" type="image/png">
        <link rel="stylesheet" href="/public/pages/admin/admin.css">
        <link rel="stylesheet" href="/includes.css">
        <title>AUT'OCCASION - Dashboard</title>
    </head>
    <body>
        <div class="page-wrapper">
            <?php include('../includes/header/header.php') ?>
            <main class="mainAdmin">
                <section id="pending-annonces">
                    <h2>Annonces en attente</h2>
                    <div id="annonces-list"></div>
                    <div id="overlay" class="overlay" style="display: none;">
                        <div class="full-annonce">
                            <button class="close-btn" id="close-btn">&times;</button>
                            <div id="carousel-container"></div>
                            <div id="full-annonce-content"></div>
                        </div>
                    </div>
                </section>
                <div id="total-annonces">
                    <div>Total des annonces listées</div>
                    <div class="total-text"><span id="total-annonces-value">&nbsp;0</span></div>
                </div>
                <div id="total-annonces-attente">
                    <div>Total des annonces en attente : </div>
                    <div class="total-text"><span id="total-annonces-attente-value">&nbsp;0</span></div>
                </div>
            </main>
        </div>
        <?php include('../includes/footer/footer.php') ?>
        <script src="/public/pages/admin/admin.js"></script>
    </body>
</html>
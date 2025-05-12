<!DOCTYPE html>
<html lang="fr-FR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" href="/public/images/logo.png" type="image/png">
        <link rel="apple-touch-icon" href="/public/images/logo.png" type="image/png">
        <link rel="stylesheet" href="/public/pages/FormulaireAnnonce/forms.css">
        <link rel="stylesheet" href="/includes.css">
        <title>AUT'OCCASION - Création d'Annonce</title>
    </head>
    <body class="bg-light">
        <?php include('../includes/header/header.php') ?>
        <div class="container">
            <h1 class="form-title">Ajouter une annonce</h1>
            <div class="form-card">
                <form id="annonceForm">
                    <div class="form-group">
                        <label for="marque_vehi">Marque</label>
                        <select id="marque_vehi" name="marque_vehi" class="form-input" placeholder="Marque" required>
                            <option value="Acura">Acura</option>
                            <option value="Alfa Romeo">Alfa Romeo</option>
                            <option value="Alpine">Alpine</option>
                            <option value="Aston Martin">Aston Martin</option>
                            <option value="Audi">Audi</option>
                            <option value="BMW">BMW</option>
                            <option value="Bentley">Bentley</option>
                            <option value="Bugatti">Bugatti</option>
                            <option value="Cadillac">Cadillac</option>
                            <option value="Chevrolet">Chevrolet</option>
                            <option value="Chrysler">Chrysler</option>
                            <option value="Citroën">Citroën</option>
                            <option value="Dacia">Dacia</option>
                            <option value="Dodge">Dodge</option>
                            <option value="DS Automobiles">DS Automobiles</option>
                            <option value="Ferrari">Ferrari</option>
                            <option value="Fiat">Fiat</option>
                            <option value="Ford">Ford</option>
                            <option value="Genesis">Genesis</option>
                            <option value="GMC">GMC</option>
                            <option value="Honda">Honda</option>
                            <option value="Hyundai">Hyundai</option>
                            <option value="Infiniti">Infiniti</option>
                            <option value="Jaguar">Jaguar</option>
                            <option value="Jeep">Jeep</option>
                            <option value="Kia">Kia</option>
                            <option value="Lamborghini">Lamborghini</option>
                            <option value="Land Rover">Land Rover</option>
                            <option value="Lexus">Lexus</option>
                            <option value="Lincoln">Lincoln</option>
                            <option value="Maserati">Maserati</option>
                            <option value="Mazda">Mazda</option>
                            <option value="McLaren">McLaren</option>
                            <option value="Mercedes-Benz">Mercedes-Benz</option>
                            <option value="Mini">Mini</option>
                            <option value="Mitsubishi">Mitsubishi</option>
                            <option value="Nissan">Nissan</option>
                            <option value="Opel">Opel</option>
                            <option value="Peugeot">Peugeot</option>
                            <option value="Porsche">Porsche</option>
                            <option value="Ram">Ram</option>
                            <option value="Renault">Renault</option>
                            <option value="Rolls-Royce">Rolls-Royce</option>
                            <option value="Saab">Saab</option>
                            <option value="Seat">Seat</option>
                            <option value="Subaru">Subaru</option>
                            <option value="Suzuki">Suzuki</option>
                            <option value="Tesla">Tesla</option>
                            <option value="Toyota">Toyota</option>
                            <option value="Volkswagen">Volkswagen</option>
                            <option value="Volvo">Volvo</option>
                            <option value="Autre">Autre</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="model_vehi">Modèle du véhicule</label>
                        <input type="text" id="model_vehi" name="model_vehi" class="form-input" placeholder="Modèle du véhicule" required>
                    </div>
                    <div class="form-group">
                        <label for="boite_vitesse_vehi">Boîte de vitesse</label>
                        <select id="boite_vitesse_vehi" name="boite_vitesse_vehi" class="form-input" placeholder="Boîte de vitesse" required>
                            <option value="Automatique">Automatique</option>
                            <option value="Automatique">Semi-automatique</option>
                            <option value="Manuelle">Manuelle</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="carburant_vehi">Carburant</label>
                        <select id="carburant_vehi" name="carburant_vehi" class="form-input" placeholder="Carburant" required>
                            <option value="Essence">Essence</option>
                            <option value="Diesel">Diesel</option>
                            <option value="Electrique">Electrique</option>
                            <option value="Hybride">Hybride</option>
                            <option value="Ethanol">Ethanol</option>
                            <option value="GPL">GPL</option>
                            <option value="Autre">Autre</option>
                        </select>  
                    </div>
                        <div class="form-group">
                        <label for="kilometrage_vehi">Kilometrage du véhicule</label>
                        <input type="number" id="kilometrage_vehi" name="kilometrage_vehi" class="form-input" placeholder="Kilometrage du véhicule" required>
                    </div>
                    <div class="form-group">
                        <label for="prix_vehi">Prix</label>
                        <input type="number" id="prix_vehi" name="prix_vehi" class="form-input" placeholder="Prix" step="1" required>
                    </div>
                    <div class="form-group">
                        <label for="annee_vehi">Année</label>
                        <input type="number" id="annee_vehi" name="annee_vehi" class="form-input" placeholder="Année" step="1" required>
                    </div>
                    <div class="form-group">
                        <label for="type_permis">Type de permis</label>
                        <select name="type_permis" placeholder="Type de permis" required>
                            <option value="B">B</option>
                            <option value="B1">B1</option>
                            <option value="AM">AM</option>
                            <option value="A1">A1</option>
                            <option value="A2">A2</option>
                            <option value="A">A</option>
                            <option value="BE">BE</option>
                            <option value="C1">C1</option>
                            <option value="C1E">C1E</option>
                            <option value="C">C</option>
                            <option value="CE">CE</option>
                            <option value="D1">D1</option>
                            <option value="D1E">D1E</option>
                            <option value="D">D</option>
                            <option value="DE">DE</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="places_vehi">Nombre de places</label>
                        <input type="number" id="places_vehi" name="places_vehi" class="form-input" placeholder="Places">
                    </div>
                    <div class="form-group">
                        <label for="portes_vehi">Nombre de portes</label>
                        <input type="number" id="portes_vehi" name="portes_vehi" class="form-input" placeholder="Portes">
                    </div>
                    <div class="form-group">
                        <label for="couleur_vehi">Couleur</label>
                        <select id="couleur_vehi" name="couleur_vehi" class="form-input" placeholder="Couleur">
                            <option value="Argent">Argent</option>
                            <option value="Beige">Beige</option>
                            <option value="Blanc">Blanc</option>
                            <option value="Bleu">Bleu</option>
                            <option value="Bordeaux">Bordeaux</option>
                            <option value="Doré">Doré</option>
                            <option value="Gris">Gris</option>
                            <option value="Ivoire">Ivoire</option>
                            <option value="Jaune">Jaune</option>
                            <option value="Marron">Marron</option>
                            <option value="Noir">Noir</option>
                            <option value="Orange">Orange</option>
                            <option value="Rose">Rose</option>
                            <option value="Rouge">Rouge</option>
                            <option value="Vert">Vert</option>
                            <option value="Violet">Violet</option>
                            <option value="Autre">Autre</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="critair_vehi">Crit'Air</label>
                        <div class="container-radio">
                            <p>
                                1
                            </p>
                            <input type="radio" id="critair_1" name="critair_vehi" value="1" class="form-input radio1">
                        </div>
                        <div class="container-radio">
                            <p>
                                2
                            </p>
                            <input type="radio" id="critair_2" name="critair_vehi" value="2" class="form-input radio">
                        </div>
                        <div class="container-radio">
                            <p>
                                3
                            </p>
                            <input type="radio" id="critair_3" name="critair_vehi" value="3" class="form-input radio">
                        </div>
                        <div class="container-radio">
                            <p>
                                4
                            </p>
                            <input type="radio" id="critair_4" name="critair_vehi" value="4" class="form-input radio">
                        </div>
                        <div class="container-radio">
                            <p>
                                5
                            </p>
                            <input type="radio" id="critair_5" name="critair_vehi" value="5" class="form-input radio">
                        </div>
                        <div class="container-radio">
                            <p>
                                Non classé
                            </p>
                            <input type="radio" id="critair_non_classe" name="critair_vehi" value="Non classé" class="form-input radio " radio>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="puissance_fiscale_vehi">Puissance fiscale</label>
                        <input type="number" id="puissance_fiscale_vehi" name="puissance_fiscale_vehi" class="form-input" placeholder="Puissance fiscale" required>
                    </div>
                    <div class="form-group">
                        <label for="puissance_din_vehi">Puissance DIN</label>
                        <input type="number" id="puissance_din_vehi" name="puissance_din_vehi" class="form-input" placeholder="Puissance DIN" required>
                    </div>
                    <div class="form-group">
                        <label for="options_vehi">Options</label>
                        <textarea id="options_vehi" name="options_vehi" class="form-textarea" placeholder="Options" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="description_vehi">Description</label>
                        <textarea id="description_vehi" name="description_vehi" class="form-textarea" placeholder="Description" rows="3" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="adresse_mail">Adresse e-mail</label>
                        <input type="email" id="adresse_mail" name="adresse_mail" class="form-input" placeholder="Ex : exemple@email.com" required>
                    </div>
                    <div class="form-group">
                        <label for="ville_vehi">Ville</label>
                        <input type="text" id="ville_vehi" name="ville_vehi" class="form-input" placeholder="Ville" required>
                    </div>
                    <div class="form-group">
                        <label for="codeP_vehi">Code postal</label>
                        <input type="text" id="codeP_vehi" name="codeP_vehi" class="form-input" placeholder="Code postal" required>
                    </div>
                    <div class="form-group">
                        <label for="photo">Images du véhicule</label>
                        <input type="file" id="photo" name="photo" class="form-input" accept="image/*" multiple required>
                    </div>
                    <button type="submit" class="submit-btn">Ajouter l'annonce</button>
                    <div id="message" class="form-message"></div>
                </form>
            </div>
        </div>
        <?php include('../includes/footer/footer.php') ?>
        <script src="/public/pages/FormulaireAnnonce/forms.js" defer></script>
    </body>
</html>
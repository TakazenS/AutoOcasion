CREATE TABLE UTILISATEUR(
   code_uti BIGINT AUTO_INCREMENT,
   nom_uti VARCHAR(30),
   prenom_uti VARCHAR(30),
   mail_uti VARCHAR(40) NOT NULL,
   mdp_uti VARCHAR(60) NOT NULL,
   role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
   CONSTRAINT PK_UTILISATEUR PRIMARY KEY(code_uti),
   CONSTRAINT UNIQUE_MAIL UNIQUE (mail_uti)
);

CREATE TABLE ANNONCE(
   code_annonce BIGINT AUTO_INCREMENT,
   model_vehi VARCHAR(30) NOT NULL,
   boite_vitesse_vehi VARCHAR(20) NOT NULL,
   carburant_vehi VARCHAR(20) NOT NULL,
   prix_vehi DECIMAL(20,2) NOT NULL,
   annee_vehi VARCHAR(4),
   type_permis VARCHAR(20),
   places_vehi BIGINT,
   portes_vehi BIGINT,
   couleur_vehi VARCHAR(20),
   critair_vehi VARCHAR(20),
   puissance_fiscale_vehi BIGINT NOT NULL,
   puissance_din_vehi BIGINT NOT NULL,
   options_vehi VARCHAR(512),
   description_vehi VARCHAR(1500) NOT NULL,
   marque_vehi VARCHAR(30) NOT NULL,
   ville_vehi VARCHAR(40) NOT NULL,
   codeP_vehi VARCHAR(5) NOT NULL,
   date_ajout TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
   kilometrage_vehi BIGINT,
   statut ENUM('en attente', 'validée', 'rejetée') DEFAULT 'en attente',
   adresse_mail VARCHAR (60) NOT NULL,
   CONSTRAINT PK_ANNONCE PRIMARY KEY(code_annonce)
);

CREATE TABLE PHOTO(
   code_photo BIGINT AUTO_INCREMENT,
   photos_vehi MEDIUMBLOB NOT NULL,
   code_annonce BIGINT NOT NULL,
   CONSTRAINT PK_PHOTO PRIMARY KEY(code_photo),
   CONSTRAINT FK_PHOTO_ANNONCE FOREIGN KEY(code_annonce) REFERENCES ANNONCE(code_annonce)
);

CREATE DATABASE nome_do_banco_de_dados;
USE nome_do_banco_de_dados;

CREATE TABLE `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `email` (`email`)
);

CREATE TABLE `ramos` (
  `id_ramo` int NOT NULL AUTO_INCREMENT,
  `nome_ramo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_ramo`),
  UNIQUE KEY `nome_ramo` (`nome_ramo`)
);

CREATE TABLE `planospersonalizados` (
  `id_plano_personalizado` int NOT NULL AUTO_INCREMENT,
  `id_plano` int DEFAULT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `facebook_ads` tinyint(1) DEFAULT NULL,
  `insta_ads` tinyint(1) DEFAULT NULL,
  `youtube_ads` tinyint(1) DEFAULT NULL,
  `google_ads` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_plano_personalizado`),
  KEY `id_plano` (`id_plano`),
  CONSTRAINT `planospersonalizados_ibfk_1` FOREIGN KEY (`id_plano`) REFERENCES `planos` (`id_plano`)
);

CREATE TABLE `planos` (
  `id_plano` int NOT NULL AUTO_INCREMENT,
  `id_ramo` int DEFAULT NULL,
  `nome_plano` varchar(100) DEFAULT NULL,
  `descricao` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id_plano`),
  KEY `id_ramo` (`id_ramo`),
  CONSTRAINT `planos_ibfk_1` FOREIGN KEY (`id_ramo`) REFERENCES `ramos` (`id_ramo`)
);

CREATE TABLE `mensagens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mensagem` text NOT NULL,
  `data_envio` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);


CREATE TABLE Payments (
  id_payment INT PRIMARY KEY AUTO_INCREMENT,
  id_user INT,
  dt_payment_date DATE,
  nm_card_number VARCHAR(16),
  nm_card_expiry VARCHAR(10),
  nm_card_security_code VARCHAR(4),
  nm_cardholder_name VARCHAR(255),
  nm_billing_address VARCHAR(255),
  FOREIGN KEY (id_user) REFERENCES Users(id_user)
);

CREATE TABLE ServicePreferences (
  id_preference INT PRIMARY KEY AUTO_INCREMENT,
  id_user INT,
  nm_traffic_type VARCHAR(50),
  nu_campaign_duration INT,
  nm_geographic_location VARCHAR(100),
  FOREIGN KEY (id_user) REFERENCES Users(id_user)
);

CREATE TABLE UserDemographics (
  id_demographic INT PRIMARY KEY AUTO_INCREMENT,
  id_user INT,
  nu_age INT,
  nm_gender VARCHAR(10),
  nm_location VARCHAR(100),
  FOREIGN KEY (id_user) REFERENCES Users(id_user)
);

CREATE TABLE UserHistory (
  id_history INT PRIMARY KEY AUTO_INCREMENT,
  id_user INT,
  nm_campaign_name VARCHAR(255),
  nm_campaign_results VARCHAR(255),
  nm_relevant_metrics VARCHAR(255),
  FOREIGN KEY (id_user) REFERENCES Users(id_user)
);
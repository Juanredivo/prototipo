CREATE DATABASE nome_do_banco_de_dados;
USE nome_do_banco_de_dados;

CREATE TABLE Users (
  id_user INT PRIMARY KEY AUTO_INCREMENT,
  nm_full_name VARCHAR(255),
  nm_email VARCHAR(255),
  nu_phone_number VARCHAR(20),
  nm_address VARCHAR(255)
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
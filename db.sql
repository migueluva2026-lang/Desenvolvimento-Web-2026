CREATE DATABASE IF NOT EXISTS MundoInfo;
USE MundoInfo;

CREATE TABLE client (
    id_client INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    number VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL
);

CREATE TABLE product (
    id_product INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    value DECIMAL(10, 2) NOT NULL,
    category VARCHAR(255) NOT NULL,
    stock INT
);

CREATE TABLE orders (
    id_order INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    location VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    id_client INT NOT NULL,
    FOREIGN KEY (id_client)
        REFERENCES client(id_client)
);

CREATE DATABASE IF NOT EXISTS mundoinfo
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE mundoinfo;

CREATE TABLE product (
    id_product     INT AUTO_INCREMENT PRIMARY KEY,
    sku            VARCHAR(50)     NOT NULL UNIQUE,
    name           VARCHAR(255)    NOT NULL,
    brand          VARCHAR(255)    NOT NULL,
    description    TEXT,
    price          DECIMAL(10, 2)  NOT NULL,
    original_price DECIMAL(10, 2)  DEFAULT NULL,
    category       VARCHAR(255)    NOT NULL,
    stock_quantity INT             NOT NULL DEFAULT 0,
    featured       TINYINT(1)      NOT NULL DEFAULT 0, -- Os que tem 1 aparece na home
    image_card     VARCHAR(500)    DEFAULT NULL,
    active         TINYINT(1)      NOT NULL DEFAULT 1  -- 0 é um produto oculto
);

CREATE TABLE product_images (
    id_image   INT AUTO_INCREMENT PRIMARY KEY,
    id_product INT          NOT NULL,
    image_path VARCHAR(500) NOT NULL,
    sort_order INT          NOT NULL DEFAULT 0, -- ordem de exibição
    FOREIGN KEY (id_product)
        REFERENCES product (id_product)
        ON DELETE CASCADE -- remove imagens ao deletar produto
);

CREATE TABLE client (
    id_client INT AUTO_INCREMENT PRIMARY KEY,
    name      VARCHAR(255) NOT NULL,
    email     VARCHAR(255) NOT NULL,
    password  VARCHAR(255) NOT NULL,
    number    VARCHAR(20)  NOT NULL,
    address   VARCHAR(255) NOT NULL
);

CREATE TABLE orders (
    id_order  INT AUTO_INCREMENT PRIMARY KEY,
    date      DATE           NOT NULL DEFAULT (CURDATE()),
    location  VARCHAR(255)   NOT NULL,
    amount    DECIMAL(10, 2) NOT NULL,
    status    VARCHAR(50)    NOT NULL DEFAULT 'pendente',
    id_client INT            NOT NULL,
    FOREIGN KEY (id_client)
        REFERENCES client (id_client)
);

CREATE TABLE order_items (
    id_item    INT AUTO_INCREMENT PRIMARY KEY,
    id_order   INT            NOT NULL,
    id_product INT            NOT NULL,
    quantity   INT            NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_order)
        REFERENCES orders (id_order),
    FOREIGN KEY (id_product)
        REFERENCES product (id_product)
);

CREATE TABLE admin (
    id_admin INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);
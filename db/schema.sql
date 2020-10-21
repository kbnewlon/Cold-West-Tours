DROP DATABASE IF EXISTS winter_activity_db;

CREATE DATABASE winter_activity_db;

USE winter_activity_db;

CREATE TABLE `resorts`
(
    id INTEGER AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    address VARCHAR (255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    url VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE `activities`
(
     id INTEGER AUTO_INCREMENT NOT NULL,
     name VARCHAR (255) NOT NULL, 
     slope TINYINT(1) DEFAULT false,
     PRIMARY KEY(id)
);

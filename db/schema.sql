DROP DATABASE IF EXISTS winter_activity_db;

CREATE DATABASE winter_activity_db;

USE winter_activity_db;

CREATE TABLE `resort`
(
    id int NOT NULL,
    name VARCHAR(255) NOT NULL,
    address VARCHAR (255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    address VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE `activity`
(
     id int NOT NULL,
     name VARCHAR (255) NOT NULL, 
     slope BOOLEAN DEFAULT FALSE,
);


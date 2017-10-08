CREATE DATABASE `charactersDB`;

USE `charactersDB`;

CREATE TABLE `characters` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(250) NOT NULL,
    PRIMARY KEY(`id`)
);

INSERT INTO `characters` (`name`)
VALUES ("Chiyo"), ("Hikari");

SELECT * FROM `characters`;
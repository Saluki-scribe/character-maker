CREATE DATABASE `charactersDB`;

USE `charactersDB`;

CREATE TABLE `characters` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(250) NOT NULL,
    `active` BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(`id`)
);

INSERT INTO `characters` (`name`, `active`)
VALUES ("Chiyo", `false`), ("Hikari", `true`);

SELECT * FROM `characters`;
DROP DATABASE IF EXISTS db_project;
CREATE DATABASE db_project;

USE db_project;

CREATE TABLE dataproject (
  id INT NOT NULL,
  Nombre VARCHAR(40) NOT NULL,
  LastName VARCHAR(40) NOT NULL,
  UserPassword VARCHAR(40) NOT NULL
);

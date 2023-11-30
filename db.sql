# Preparando la database (BBDD)
CREATE DATABASE IF NOT EXISTS DB_REGEXPRESSIONS;
USE DB_REGEXPRESSIONS;
# Creando las tablas
CREATE TABLE IF NOT EXISTS users(
	userId INT AUTO_INCREMENT,
    firstName VARCHAR(50),
    surname VARCHAR(50),
    username VARCHAR(20),
    email VARCHAR(50),
    password VARCHAR(200),
    isAdmin TINYINT,
    PRIMARY KEY (userId)
);
    
CREATE TABLE IF NOT EXISTS expressions(
    expressionId INT AUTO_INCREMENT,
    languageOfExpression VARCHAR(20),
    expression VARCHAR(250),
    rightAnswer VARCHAR(250),
    falseAnswerOne VARCHAR(250),
    falseAnswerTwo VARCHAR(250),
    creatorId INT,
    validated BOOLEAN,
    PRIMARY KEY (expressionId),
    FOREIGN KEY (creatorId) REFERENCES users(userId)
);

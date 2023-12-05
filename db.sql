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

/*INSERT INTO DB_REGEXPRESSIONS.users(firstName, surname, username, email, password, isAdmin) VALUES
    ('Adam', 'Honvedo', 'adam.honvedo', 'adam.honvedo@gmail.com', '1234', 1),
    ('Adrian', 'Montes', 'adrianceroca', 'adrianceroca@gmail.com', '1234', 1),
    ('Alvaro', 'Carceles', 'alvaro', 'albotarell@gmail.com', '1234', 1),
    ('User1', 'user1', 'user1', 'user1@gmail.com', '1234', 0); */
    
/* INSERT INTO DB_REGEXPRESSIONS.expressions(languageOfExpression, expression, rightAnswer, falseAnswerOne, falseAnswerTwo, creatorId,validated) VALUES
	('spanish', 'Meter la pata', 'To make a mistake', 'To have good luck', 'To be angry', 3,True),
    ('spanish', 'Estar en las nubes', 'Daydreaming or thinking about something unrelated to reality', 'Being very focused on a task', 'Feeling light and happy', 3,True),
    ('spanish', 'Dar en el clavo', 'To find the right solution', 'To accidentally hit something with a nail', 'To make a mistake while attempting something', 3,True),
    ('spanish', 'Salirse con la suya', 'To achieve your goal, against the wishes of others', 'To abandon a project before completing it', 'To face the consequences of an action', 3,True),
    ('spanish', 'Costar un ojo de la cara / Costar un riñón', 'To be very expensive', 'To experience great physical effort', 'To have a high sentimental value', 3,True),
	('spanish', 'Hablar por los codos', 'To talk a lot or non-stop', 'To speak through your elbows', 'To communicate using gestures', 3,True),
    ('spanish', 'Tomar el pelo', 'To tease or make fun of someone', 'To brush your hair', 'To help someone', 3,True),
    ('spanish', 'Eso es pan comido', 'That is an easy task', 'That is eaten bread', 'That is a difficult task', 3,True),
    ('spanish', 'Tener algo en la punta de la lengua', 'When we know something but it doesn\'t come to us right away', 'To be an eloquent speaker', 'To remember something suddenly', 3,True),
    ('spanish', 'De tal palo, tal astilla', 'To be similar to your parents', 'To be a family of carpenters', 'To have a good relation with your family', 3,True),
    ('english', 'Piece of cake', 'Algo fácil de hacer', 'Ser un trozo de tarta', 'Algo complicado de hacer', 3,True),
    ('english', 'Cut to the chase', 'Ir a lo importante', 'Hacer una pausa', 'Dejar de correr', 3,True),
    ('english', 'To cost an arm and a leg', 'Cuando algo es muy caro', 'Cuando algo te cuesta un brazo y una pierna', 'Cuando algo necesita un esfuerzo físico', 3,True),
    ('english', 'To miss the boat', 'Perder la oportunidad', 'Perder el barco', 'Perder el rumbo de la conversación', 3,True),
    ('english', 'Once in a blue moon', 'Muy raramente', 'Cada vez que la luna es azul', 'Con mucha frecuencia', 3,True),
	('english', 'To give someone the cold shoulder', 'Ignorar a alguien', 'Darle a alguien con el hombro frío', 'Darle especial importancia a alguien', 3,True),
    ('english', 'To feel blue', 'Estar triste', 'Ser azul', 'Estar eufórico', 3,True),
    ('english', 'Speak of the devil', 'Cuando hablas de alguien y aparece', 'Cuando hablas del diablo', 'Cuando te pasa algo malo', 3,True),
    ('english', 'To not be rocket science', 'Cuando una tarea no es difícil', 'Cuando algo no es científico', 'Cuando alguien no tiene un buen físico', 3,True),
    ('english', 'Break a leg!', 'Se utiliza para desear suerte', 'Cuando alguien se rompe una pierna', 'Cuando pasa algo malo', 3,True); */
    
SELECT * FROM DB_REGEXPRESSIONS.users;
SELECT * FROM DB_REGEXPRESSIONS.expressions;
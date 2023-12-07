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
/* sí*/
ALTER TABLE DB_REGEXPRESSIONS.users AUTO_INCREMENT = 0;
    
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

CREATE TABLE IF NOT EXISTS admin_hashes(
	hash VARCHAR(200),
    expiration LONG
);

INSERT INTO DB_REGEXPRESSIONS.users(firstName, surname, username, email, password, isAdmin) VALUES
    ('Adam', 'Honvedo', 'adam.honvedo', 'adam.honvedo@gmail.com', '$2a$10$5Q67JdBRwHqfbhBBiXU/ZOBtmvJ2A7xpAa41r7UqyATf2BIQtKv5S', 1),
    ('Adrian', 'Montes', 'adrianceroca', 'adrianceroca@gmail.com', '$2a$10$5Q67JdBRwHqfbhBBiXU/ZOBtmvJ2A7xpAa41r7UqyATf2BIQtKv5S', 1),
    ('Alvaro', 'Carceles', 'alvaro', 'albotarell@gmail.com', '$2a$10$5Q67JdBRwHqfbhBBiXU/ZOBtmvJ2A7xpAa41r7UqyATf2BIQtKv5S', 1);
    
 INSERT INTO DB_REGEXPRESSIONS.expressions(languageOfExpression, expression, rightAnswer, falseAnswerOne, falseAnswerTwo, creatorId,validated) VALUES
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
    ('english', 'Break a leg!', 'Se utiliza para desear suerte', 'Cuando alguien se rompe una pierna', 'Cuando pasa algo malo', 3,True); 
    
INSERT INTO DB_REGEXPRESSIONS.expressions(languageOfExpression, expression, rightAnswer, falseAnswerOne, falseAnswerTwo, creatorId,validated) VALUES
	('spanish', 'Estirar la pata', 'To die', 'To take a nap', 'To warm up', 3,True),
    ('spanish', 'Dar la vuelta a la tortilla', 'To change the situation in one\'s favor', 'To flip an omelette', 'To change your opinion about something', 3,True),
    ('spanish', 'Tener mucho morro / Tener mucha cara', 'To take advantage of people or situations', 'To pretend to be someone else', 'To have a serious expression', 3,True);
    
INSERT INTO DB_REGEXPRESSIONS.expressions(languageOfExpression, expression, rightAnswer, falseAnswerOne, falseAnswerTwo, creatorId,validated) VALUES
	('spanish', 'Estar metido en el ajo', 'To be aware of something that is very secretive', 'To be part of a cooking club', 'Not find out what is happening
', 3,False),
    ('spanish', 'Quedarse frito', 'To fall asleep', 'To become a crispy snack', 'To be very alert', 3,False),
    ('spanish', 'Comerse el coco', 'To overthink about something', 'To enjoy coconut-flavored treats', 'To harm oneself', 3,False);

    INSERT INTO DB_REGEXPRESSIONS.expressions(languageOfExpression, expression, rightAnswer, falseAnswerOne, falseAnswerTwo, creatorId,validated) VALUES
	('spanish', 'Irse por las ramas', 'To deviate from the main topic while speaking', 'To get lost in the woods', 'Go to the important topic
', 3,True),
    ('spanish', 'Perder la cabeza', 'To lose your composure', 'To lose your head literally', 'To become extremely forgetful
', 3,True),
    ('spanish', 'Darse con un canto en los dientes', 'To be satisfied when the final result of something is better than expected', 'To hit yourself with a rock in the teeth', 'To be sad when things turn out worse than expected', 3,True), 
    ('spanish', 'Estar como una regadera', 'To be crazy', 'To be very thirsty', 'To be like a watering can', 3,True),
    ('english', 'To spill the beans', 'Contar un secreto por error', 'Tirar habas', 'Cabrearse mucho ', 3,True),
    ('english', 'To show someone the ropes', 'Enseñar a alguien los conceptos básicos', 'Mostrar a alguien las cuerdas', 'Contar a alguien los secretos más profundos', 3,True),
    ('english', 'To ring a bell', 'Ser familiar', 'Tocar una campana', 'No recordar algo', 3,True),
    ('english', 'Hold your horses', 'No te apresures', 'Mantén a tus caballos', 'No te cabrees', 3,True),
    ('english', 'Off the top of my head', 'De memoria', 'Desde la parte superior de mi cabeza', 'Pensar demasiado', 3,True),
	('english', 'Put a sock in it', 'Guarda silencio', 'Ponte un calcetín', 'Abrígate', 3,False),
    ('english', 'To bark up the wrong tree ', 'Buscar soluciones en el lugar equivocado', 'Ladrarle a un árbol', 'Acusar a alguien inocente', 3,False),
    ('english', 'The lion’s share', 'La mejor parte', 'La parte del león', 'Ser el más importante de un grupo', 3,False),
    ('english', 'It’s not my cup of tea ', 'No me gusta', 'No es mi taza de té', 'No es asunto mío', 3,False),
    ('english', 'To pull your socks up', 'Esforzarse más', 'Subirse los calcetines', 'Estirarse antes de entrenar', 3,False); 
    
SELECT * FROM DB_REGEXPRESSIONS.users;
SELECT * FROM DB_REGEXPRESSIONS.expressions;
SELECT * FROM DB_REGEXPRESSIONS.admin_hashes;
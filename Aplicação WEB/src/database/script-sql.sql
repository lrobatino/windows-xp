CREATE DATABASE windowsXP;

USE windowsXP;

CREATE TABLE usuario (
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
usuario CHAR(20),
senha VARCHAR(20),
avatar VARCHAR(10))
AUTO_INCREMENT = 1000;

CREATE TABLE pontuacao (
idPontuacao INT PRIMARY KEY AUTO_INCREMENT,
usuario CHAR(20),
pontuacao INT,
tempo INT,
fkUsuario INT,
CONSTRAINT fkPontuacaoUsuario FOREIGN KEY (fkUsuario)
	REFERENCES usuario(idUsuario));

SELECT * FROM usuario;

SELECT * FROM pontuacao;

TRUNCATE pontuacao;

TRUNCATE usuario;
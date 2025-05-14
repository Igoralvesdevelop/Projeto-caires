DROP DATABASE IF EXISTS controle_de_acesso;
CREATE DATABASE controle_de_acesso;
USE controle_de_acesso;

create table nivelAcesso(
	id_nivel int primary key auto_increment,
    descricao varchar(30)
);
CREATE TABLE condominio (
    id_condominio BIGINT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    numero_bloco INT NOT NULL,
    numero_unidades INT NOT NULL,
    ramal VARCHAR(20),
    cep VARCHAR(10) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    cnpj VARCHAR(14) NOT NULL UNIQUE
);

CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    email VARCHAR(80) NOT NULL UNIQUE,
    cpf CHAR(14) NOT NULL UNIQUE,
    cnpj CHAR(18) DEFAULT NULL, 
    senha VARCHAR(60) NOT NULL,
    telefone VARCHAR(20) DEFAULT '(99) 9999-99999',
    data_nascimento DATE DEFAULT '1970-01-01',
    genero ENUM('Masculino', 'Feminino', 'Outro') NOT NULL,
    nivel_acesso ENUM('Sindico', 'Funcionario') NOT NULL,
    deletado BOOLEAN DEFAULT FALSE,
    fk_id_condominio BIGINT NOT NULL,
    CONSTRAINT fk_condominio FOREIGN KEY (fk_id_condominio) REFERENCES condominio(id_condominio) ON DELETE CASCADE
);



CREATE TABLE moradores (
    id_morador INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    cpf CHAR(14) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    genero ENUM('Masculino', 'Feminino', 'Outro') NOT NULL,
    data_nascimento DATE DEFAULT '1970-01-01',
    apartamento VARCHAR(5) NOT NULL,
    bloco CHAR(1) NOT NULL,
    senha VARCHAR(60) NOT NULL,
    email VARCHAR(80) NOT NULL UNIQUE,
    ramal VARCHAR(5),
    deletado BOOLEAN DEFAULT FALSE,
    fk_id_usuario INT,
    FOREIGN KEY (fk_id_usuario) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
);

CREATE TABLE prestadores_servicos_cadastrados (
    id_prestador_servico INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    genero ENUM('Masculino', 'Feminino', 'Outro') NOT NULL,
    cpf CHAR(14) NOT NULL UNIQUE,
    uf VARCHAR(2) NOT NULL,
    deletado BOOLEAN DEFAULT FALSE,
    fk_id_usuario INT,
    FOREIGN KEY (fk_id_usuario) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
);

CREATE TABLE controle_prestadores (
    id_controle_prestador INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    cpf CHAR(14) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    apartamento VARCHAR(5) NOT NULL,
    bloco CHAR(1) NOT NULL,
    data_entrada DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_saida DATETIME,
    fk_id_prestador_servico INT NOT NULL,
    fk_id_usuario INT,
    FOREIGN KEY (fk_id_prestador_servico) REFERENCES prestadores_servicos_cadastrados(id_prestador_servico) ON DELETE CASCADE,
    FOREIGN KEY (fk_id_usuario) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
);

CREATE TABLE visitantes_cadastrados (
    id_visitante INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    cpf CHAR(14) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    genero ENUM('Masculino', 'Feminino', 'Outro') NOT NULL,
    rg VARCHAR(14) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    nivel_acesso ENUM('Visitante Comum', 'Visitante Permanente'),
    deletado BOOLEAN DEFAULT FALSE,
    apartamento VARCHAR(5) NOT NULL,
    bloco CHAR(1) NOT NULL,
    data_entrada DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_saida DATETIME,
    fk_id_moradores INT NOT NULL,
    fk_id_usuario INT,
    FOREIGN KEY (fk_id_moradores) REFERENCES moradores(id_morador) ON DELETE CASCADE,
    FOREIGN KEY (fk_id_usuario) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
);

CREATE TABLE controle_visitantes (
    id_controle_visitantes INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    cpf CHAR(14) NOT NULL,
    telefone VARCHAR(20),
    genero ENUM('Masculino', 'Feminino', 'Outro') NOT NULL,
    rg VARCHAR(14) NOT NULL,
    uf VARCHAR(2) NOT NULL,
    nivel_acesso ENUM('Visitante Comum', 'Visitante Permanente'),
    data_entrada DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_saida DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_id_visitante INT NOT NULL,
    fk_id_usuario INT,
    FOREIGN KEY (fk_id_visitante) REFERENCES visitantes_cadastrados(id_visitante) ON DELETE CASCADE,
    FOREIGN KEY (fk_id_usuario) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
);

CREATE TABLE encomendas (
    id_encomenda INT PRIMARY KEY AUTO_INCREMENT,
    empresa VARCHAR(60) NOT NULL,
    data_entrega DATETIME DEFAULT CURRENT_TIMESTAMP,
    fk_id_morador INT NOT NULL,
    status_entrega VARCHAR(30) NOT NULL DEFAULT 'Processando',
    fk_id_usuario INT,
    FOREIGN KEY (fk_id_morador) REFERENCES moradores(id_morador) ON DELETE CASCADE,
    FOREIGN KEY (fk_id_usuario) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
);

CREATE TABLE eventos (
    id_evento INT PRIMARY KEY AUTO_INCREMENT,
    cpf CHAR(14) NOT NULL,
    titulo_evento VARCHAR(60) NOT NULL,
    inicio_evento DATETIME NOT NULL,
    fim_evento DATETIME NOT NULL,
    cor VARCHAR(10) NOT NULL,
    status_pagamento VARCHAR(20) NOT NULL DEFAULT 'Pendente',
    fk_id_morador INT NOT NULL,
    fk_id_usuario INT,
    FOREIGN KEY (fk_id_morador) REFERENCES moradores(id_morador) ON DELETE CASCADE,
    FOREIGN KEY (fk_id_usuario) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
);

CREATE TABLE veiculos (
    id_veiculo INT PRIMARY KEY AUTO_INCREMENT,
    modelo VARCHAR(50) NOT NULL,
    placa VARCHAR(7) NOT NULL UNIQUE,
    cor VARCHAR(20) NOT NULL,
    tipo_veiculo VARCHAR(30) NOT NULL,
    fk_id_morador INT NOT NULL,
    fk_id_usuario INT,
    FOREIGN KEY (fk_id_morador) REFERENCES moradores(id_morador) ON DELETE CASCADE,
    FOREIGN KEY (fk_id_usuario) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
);

CREATE TABLE relatorios (
    id_relatorio INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    tipo_relatorio ENUM('Visitantes', 'Moradores', 'Encomendas', 'Veículos', 'Eventos', 'Prestadores') NOT NULL,
    filtros_utilizados TEXT,
    fk_id_usuario INT,
    FOREIGN KEY (fk_id_usuario) REFERENCES usuarios(id_usuario) ON DELETE SET NULL
);

insert into nivelAcesso(descricao)values('Sindico'),
('Funcionario')
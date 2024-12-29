drop database if exists controle_de_acesso;
create database if not exists controle_de_acesso;
use controle_de_acesso;

create table usuarios(
	id_usuario int primary key AUTO_INCREMENT not null,
	nome varchar(60) not null,
	email varchar(80) not null unique,
	cpf char(14) not null unique,
    senha varchar(32) not null,
    telefone varchar(20) DEFAULT '(99) 9999-99999',
    data_nascimento date DEFAULT '1970-01-01',
    genero varchar(30) DEFAULT 'Indefinido',
	nivel_acesso varchar(13) not null,
     deletado boolean default false
);

create table moradores(
	id_morador int primary key AUTO_INCREMENT not null,
	nome varchar(60) not null,
	cpf char(14) not null unique,
	telefone varchar(20),
	genero varchar(30) DEFAULT 'Indefinido',
	data_nascimento date DEFAULT '1970-01-01',
	apartamento varchar(5) not null,
	bloco char(1) not null,
	senha varchar(32) not null,
	email varchar(80) not null unique,
    ramal varchar(5),
	deletado boolean default false
);

create table prestadores_servicos_cadastrados(
	id_prestador_servico int primary key AUTO_INCREMENT not null,
	nome varchar(60) not null,
	cpf char(11) unique not null,
	uf varchar(2) not null,
	 deletado boolean default false
);

create table controle_prestadores(
	id_prestador_servico int primary key AUTO_INCREMENT not null,
	nome varchar(60) not null,
	cpf char(11) not null,
	uf varchar(2) not null,
	apartamento varchar(5) not null,
	bloco char(1) not null,
	data_entrada datetime default CURRENT_TIMESTAMP,
	data_saida datetime,
	fk_id_prestador_servico int not null,
    foreign key(fk_id_prestador_servico) references prestadores_servicos_cadastrados(id_prestador_servico) on delete cascade
);

create table visitantes_cadastrados(
	id_visitante int primary key AUTO_INCREMENT not null,
	nome varchar(60) not null,
	cpf char(14) unique not null,
	rg varchar(14) not null,
	uf varchar(2) not null,
	 deletado boolean default false
);

create table visitantes(
	id_visitante int primary key AUTO_INCREMENT not null,
	nome varchar(60) not null,
	cpf_rg varchar(14) not null,
	uf varchar(2) not null,
	apartamento varchar(5) not null,
	bloco char(1) not null,
	data_entrada datetime default CURRENT_TIMESTAMP,
	data_saida datetime,
	fk_id_visitante int not null,
    foreign key(fk_id_visitante) references visitantes_cadastrados(id_visitante) on delete cascade
);

create table encomendas(
	id_encomenda int primary key AUTO_INCREMENT not null,
	empresa varchar(60) not null,
	data_entrega datetime default CURRENT_TIMESTAMP,
    fk_id_morador int not null,
    status_entrega varchar(30) not null default 'Processando',
	foreign key(fk_id_morador) references moradores(id_morador) on delete cascade
);

create table eventos (
    id_evento int primary key AUTO_INCREMENT not null,
	cpf char(14) not null,
    titulo_evento varchar(60) not null,
    inicio_evento datetime not null,
    fim_evento datetime not null,
	cor varchar(10) not null,
	status_pagamento varchar(20) not null default 'Pendente', 
	fk_id_morador int not null,
    foreign key(fk_id_morador) references moradores(id_morador) on delete cascade
);
create table veiculos (
    id_veiculo int primary key AUTO_INCREMENT not null,
    modelo varchar(50) not null,
    placa varchar(7) not null unique,
    cor varchar(20) not null,
    tipo varchar(30) not null, -- Exemplo: Carro, Moto, Caminhão
    fk_id_morador int not null, -- Relaciona com o morador
    foreign key(fk_id_morador) references moradores(id_morador) on delete cascade
);

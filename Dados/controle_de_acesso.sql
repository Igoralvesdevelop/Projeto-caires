DROP DATABASE IF EXISTS controle_de_acesso;
CREATE DATABASE controle_de_acesso;
USE controle_de_acesso;

CREATE TABLE nivel_acesso (
    id_nivel INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE estados (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sigla CHAR(2) NOT NULL,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE genero (
    id_genero INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE cores (
    id_cor INT PRIMARY KEY AUTO_INCREMENT,
    descricao VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE condominio (
    id_condominio BIGINT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    numero_bloco INT NOT NULL,
    numero_unidades INT NOT NULL,
    ramal VARCHAR(20),
    cep VARCHAR(10) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    cnpj VARCHAR(14) NOT NULL UNIQUE
);

CREATE TABLE unidades_residenciais (
    id_unidade VARCHAR(10) PRIMARY KEY,
    id_condominio BIGINT NOT NULL,
    bloco VARCHAR(3) NOT NULL,
    andar VARCHAR(3) NOT NULL,
    apartamento VARCHAR(5) NOT NULL,
    UNIQUE (id_condominio, bloco, andar, apartamento),
    FOREIGN KEY (id_condominio) REFERENCES condominio(id_condominio) ON DELETE CASCADE
);

CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    email VARCHAR(80) NOT NULL UNIQUE,
    cpf CHAR(14) NOT NULL UNIQUE,
    senha VARCHAR(60) NOT NULL,
    data_nascimento DATE,
    id_genero INT NOT NULL,
    deletado BOOLEAN DEFAULT FALSE,
    id_condominio BIGINT NOT NULL,
    id_nivel INT NOT NULL,
    FOREIGN KEY (id_genero) REFERENCES genero(id_genero),
    FOREIGN KEY (id_condominio) REFERENCES condominio(id_condominio) ON DELETE CASCADE,
    FOREIGN KEY (id_nivel) REFERENCES nivel_acesso(id_nivel)
);

CREATE TABLE proprietario (
    id_proprietario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    cpf CHAR(14) NOT NULL UNIQUE,
    senha VARCHAR(60) NOT NULL,
    data_nascimento DATE,
    id_genero INT NOT NULL,
    email VARCHAR(80) NOT NULL UNIQUE,
    deletado BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_genero) REFERENCES genero(id_genero)
);
CREATE TABLE proprietario_unidade_assoc (
    id_proprietario INT,
    id_unidade VARCHAR(10),
    status_ocupacao ENUM('proprietario','morador','alugado') NOT NULL,
    PRIMARY KEY (id_proprietario, id_unidade),
    FOREIGN KEY (id_proprietario) REFERENCES proprietario(id_proprietario) ON DELETE CASCADE,
    FOREIGN KEY (id_unidade) REFERENCES unidades_residenciais(id_unidade) ON DELETE CASCADE
);
CREATE TABLE morador (
    id_morador INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    cpf CHAR(14) NOT NULL UNIQUE,
    senha VARCHAR(60) NOT NULL,
    data_nascimento DATE,
    id_genero INT NOT NULL,
    email VARCHAR(80) NOT NULL UNIQUE,
    deletado BOOLEAN DEFAULT FALSE,
    id_unidade VARCHAR(10),
    FOREIGN KEY (id_unidade) REFERENCES unidades_residenciais(id_unidade) ON DELETE CASCADE,
    FOREIGN KEY (id_genero) REFERENCES genero(id_genero)
);

CREATE TABLE visitantes (
    id_visitante INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(60) NOT NULL,
    cpf CHAR(14) NOT NULL UNIQUE,
    rg VARCHAR(14),
    nivel_acesso ENUM('Visitante Comum','Visitante Permanente','Prestador de Serviço') NOT NULL,
    deletado BOOLEAN DEFAULT FALSE,
    permissao ENUM('permitido','negado') DEFAULT 'permitido',
    data_entrada DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_saida DATETIME,
    id_genero INT NOT NULL,
    id_estado INT,
    id_unidade VARCHAR(10),
    FOREIGN KEY (id_genero) REFERENCES genero(id_genero),
    FOREIGN KEY (id_estado) REFERENCES estados(id),
    FOREIGN KEY (id_unidade) REFERENCES unidades_residenciais(id_unidade) ON DELETE SET NULL
);

CREATE TABLE morador_visitante_assoc (
    id_visitante INT NOT NULL,
    id_unidade VARCHAR(10) NOT NULL,
    PRIMARY KEY ( id_visitante, id_unidade),
    FOREIGN KEY (id_visitante) REFERENCES visitantes(id_visitante) ON DELETE CASCADE,
    FOREIGN KEY (id_unidade) REFERENCES unidades_residenciais(id_unidade) ON DELETE CASCADE
);

CREATE TABLE contatos (
    id_contato INT PRIMARY KEY AUTO_INCREMENT,
    entidade_tipo ENUM('usuario','proprietario') NOT NULL,
    entidade_id INT NOT NULL,
    tipo ENUM('email','telefone') NOT NULL,
    valor VARCHAR(80) NOT NULL
);

CREATE TABLE veiculos (
    id_veiculo INT PRIMARY KEY AUTO_INCREMENT,
    modelo VARCHAR(50) NOT NULL,
    placa VARCHAR(7) NOT NULL UNIQUE,
    tipo_veiculo VARCHAR(30) NOT NULL,
    vaga VARCHAR(10) NOT NULL,
    id_cor INT NOT NULL,
    id_unidade VARCHAR(10),
    FOREIGN KEY (id_cor) REFERENCES cores(id_cor),
    FOREIGN KEY (id_unidade) REFERENCES unidades_residenciais(id_unidade) ON DELETE SET NULL
);

CREATE TABLE encomendas (
    id_encomenda INT PRIMARY KEY AUTO_INCREMENT,
    empresa VARCHAR(60) NOT NULL,
    data_entrega DATETIME DEFAULT CURRENT_TIMESTAMP,
    status_entrega VARCHAR(20) DEFAULT 'entregue',
    imagem VARCHAR(255),
    id_unidade VARCHAR(10) NOT NULL,
    FOREIGN KEY (id_unidade) REFERENCES unidades_residenciais(id_unidade) ON DELETE CASCADE
);

CREATE TABLE areas_comuns (
    id_area INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
);

CREATE TABLE eventos (
    id_evento INT PRIMARY KEY AUTO_INCREMENT,
    id_unidade VARCHAR(10) NOT NULL,
    id_area INT NOT NULL,
    data_solicitacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_reserva DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    status ENUM('confirmada','cancelada') DEFAULT 'confirmada',
    observacoes TEXT,
    FOREIGN KEY (id_unidade) REFERENCES unidades_residenciais(id_unidade),
    FOREIGN KEY (id_area) REFERENCES areas_comuns(id_area)
);

DELIMITER //
CREATE TRIGGER contatos_before_insert
  BEFORE INSERT ON contatos
  FOR EACH ROW
BEGIN
  IF NEW.entidade_tipo = 'usuario' THEN
    IF NOT EXISTS (SELECT 1 FROM usuarios WHERE id_usuario = NEW.entidade_id) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario nao existe';
    END IF;
  ELSEIF NEW.entidade_tipo = 'proprietario' THEN
    IF NOT EXISTS (SELECT 1 FROM proprietario WHERE id_proprietario = NEW.entidade_id) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Proprietario nao existe';
    END IF;
  END IF;
END;
//
CREATE TRIGGER contatos_before_update
  BEFORE UPDATE ON contatos
  FOR EACH ROW
BEGIN
  IF NEW.entidade_tipo = 'usuario' THEN
    IF NOT EXISTS (SELECT 1 FROM usuarios WHERE id_usuario = NEW.entidade_id) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario nao existe';
    END IF;
  ELSEIF NEW.entidade_tipo = 'proprietario' THEN
    IF NOT EXISTS (SELECT 1 FROM proprietario WHERE id_proprietario = NEW.entidade_id) THEN
      SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Proprietario nao existe';
    END IF;
  END IF;
END;
//
DELIMITER ;

INSERT INTO nivel_acesso (descricao) VALUES
  ('Porteiro'),('Aux. de Servicos gerais'),
  ('Segurança'),('Zelador'),('Administrador');

INSERT INTO estados (sigla, nome) VALUES
  ('AC','Acre'),('AL','Alagoas'),('AP','Amapá'),('AM','Amazonas'),
  ('BA','Bahia'),('CE','Ceará'),('DF','Distrito Federal'),
  ('ES','Espírito Santo'),('GO','Goiás'),('MA','Maranhão'),
  ('MT','Mato Grosso'),('MS','Mato Grosso do Sul'),
  ('MG','Minas Gerais'),('PA','Pará'),('PB','Paraíba'),
  ('PR','Paraná'),('PE','Pernambuco'),('PI','Piauí'),
  ('RJ','Rio de Janeiro'),('RN','Rio Grande do Norte'),
  ('RS','Rio Grande do Sul'),('RO','Rondônia'),
  ('RR','Roraima'),('SC','Santa Catarina'),
  ('SP','São Paulo'),('SE','Sergipe'),('TO','Tocantins');

INSERT INTO genero (descricao) VALUES ('Masculino'),('Feminino'),('Outro');

INSERT INTO cores (descricao) VALUES
  ('Preto'),('Branco'),('Prata'),('Vermelho'),
  ('Azul'),('Amarelo'),('Verde'),('Cinza'),
  ('Marrom'),('Bege'),('Laranja'),('Roxo'),
  ('Rosa'),('Dourado'),('Cobre');

INSERT INTO areas_comuns (nome, descricao) VALUES
  ('Churrasqueira','Espaço com churrasqueira, geladeira e pia.'),
  ('Salão de Festas','Salão coberto com mesas, cadeiras e som.');
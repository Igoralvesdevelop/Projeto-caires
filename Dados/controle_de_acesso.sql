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
    nivel_acesso varchar(30) not null,
    deletado BOOLEAN DEFAULT FALSE,
    id_condominio BIGINT NOT NULL,
    id_nivel INT NOT NULL,
    FOREIGN KEY (id_genero) REFERENCES genero(id_genero),
    FOREIGN KEY (id_condominio) REFERENCES condominio(id_condominio) ON DELETE CASCADE
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
    id_unidade VARCHAR(10)unique,
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
    motivo varchar(50)default"",
    id_genero INT NOT NULL,
    FOREIGN KEY (id_genero) REFERENCES genero(id_genero)
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
  -- Inserindo condomínios
INSERT INTO condominio (nome, numero_bloco, numero_unidades, ramal, cep, endereco, cnpj) VALUES
('Residencial São José', 3, 36, '101, 102', '08000-000', 'Rua das Flores, 123', '12345678000190'),
('Condomínio Primavera', 2, 24, '201', '08001-111', 'Av. Primavera, 456', '09876543000109');

-- Inserindo unidades residenciais
INSERT INTO unidades_residenciais (id_unidade, id_condominio, bloco, andar, apartamento) VALUES
('SJ-A-01', 1, 'A', '01', '01'),
('SJ-A-02', 1, 'A', '01', '02'),
('SJ-B-01', 1, 'B', '02', '01'),
('PR-1-101', 2, '1', '01', '01'),
('PR-1-102', 2, '1', '01', '02');

-- Inserindo usuários
INSERT INTO usuarios (nome, email, cpf, senha, data_nascimento, id_genero,nivel_acesso, id_condominio, id_nivel) VALUES
('Alice Silva', 'alice@exemplo.com', '111.111.111-11', 'senha123', '1990-05-15', 2,'Porteiro', 1, 5),
('Bruno Costa', 'bruno@exemplo.com', '222.222.222-22', 'senha123', '1985-07-20', 1,'Sindico' ,2, 3);

-- Inserindo proprietários
INSERT INTO proprietario (nome, cpf, senha, data_nascimento, id_genero, email) VALUES
('Carlos Pereira', '333.333.333-33', 'senha123', '1970-01-10', 1, 'carlos@exemplo.com'),
('Daniela Souza', '444.444.444-44', 'senha123', '1975-03-25', 2, 'daniela@exemplo.com');

-- Inserindo moradores
INSERT INTO morador (nome, cpf, senha, data_nascimento, id_genero, email, id_unidade) VALUES
('Eduardo Lima', '555.555.555-55', 'senha123', '1992-11-30', 1, 'eduardo@exemplo.com', 'SJ-A-01'),
('Fernanda Rocha', '666.666.666-66', 'senha123', '1994-08-05', 2, 'fernanda@exemplo.com', 'PR-1-101');

-- Inserindo visitantes
INSERT INTO visitantes (nome, cpf, rg, nivel_acesso, permissao, id_genero ) VALUES
('Gustavo Alves', '777.777.777-77', 'MG1234567', 'Visitante Comum', 'permitido', 1 ),
('Helena Ramos', '888.888.888-88', 'SP7654321', 'Prestador de Serviço', 'permitido', 2);

-- Inserindo contatos
INSERT INTO contatos (entidade_tipo, entidade_id, tipo, valor) VALUES
('usuario', 1, 'telefone', '(11)99999-0001'),
('usuario', 2, 'email', 'bruno.contato@exemplo.com'),
('proprietario', 1, 'telefone', '(11)88888-0001'),
('proprietario', 2, 'email', 'daniela.contato@exemplo.com');

-- Inserindo veículos
INSERT INTO veiculos (modelo, placa, tipo_veiculo, vaga, id_cor, id_unidade) VALUES
('Honda Civic', 'ABC1234', 'Carro', 'Vaga 01', 3, 'SJ-A-01'),
('Fiat Uno', 'XYZ5678', 'Carro', 'Vaga 02', 1, 'PR-1-101');

-- Inserindo encomendas
INSERT INTO encomendas (empresa, data_entrega, status_entrega, imagem, id_unidade) VALUES
('Correios', '2025-06-18 14:30:00', 'entregue', 'foto1.jpg', 'SJ-A-02'),
('FedEx', '2025-06-19 09:15:00', 'entregue', 'foto2.jpg', 'PR-1-102');

-- Inserindo eventos em áreas comuns
INSERT INTO eventos (id_unidade, id_area, data_reserva, hora_inicio, hora_fim, status, observacoes) VALUES
('SJ-A-01', 1, '2025-07-10', '18:00:00', '21:00:00', 'confirmada', 'Aniversário'),
('PR-1-101', 2, '2025-07-15', '10:00:00', '13:00:00', 'confirmada', 'Reunião condomínio');
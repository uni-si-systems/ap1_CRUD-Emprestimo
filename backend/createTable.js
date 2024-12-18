import { openDb } from './db.js';

export async function initializeDatabase() {
    const db = await openDb();

    await db.query(`
        CREATE TABLE IF NOT EXISTS clientes (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            senha VARCHAR(255) NOT NULL,
            endereco VARCHAR(255) NOT NULL,
            idade INT NOT NULL,
            cpf VARCHAR(11) NOT NULL UNIQUE,
            CHECK (CHAR_LENGTH(cpf) = 11 AND cpf REGEXP '^[0-9]+$')
        );
    `);

    // População inicial da tabela unificada
    await db.query(`
        INSERT INTO clientes (nome, email, senha, endereco, idade, cpf)
        VALUES 
        ('Admin', 'admin@admin', '$2b$10$UMeyOxTYIZSGMfUCntFqEeixZnrzbyp6EDAxdIMpIh27jGHleIj0C', 'Rua A', 44, '12345678987'),
        ('João Silva', 'joao@example.com', 'senha456', 'Rua A, 123', 30, '12345678901'),
        ('Maria Oliveira', 'maria@example.com', 'senha789', 'Avenida B, 456', 25, '23456789012')
        ON DUPLICATE KEY UPDATE email=email;
    `);
    

    // Criação da tabela de veículos
    await db.query(`
        CREATE TABLE IF NOT EXISTS veiculos (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            modelo VARCHAR(255) NOT NULL,
            marca VARCHAR(255) NOT NULL,
            ano_fabricacao INT NOT NULL,
            valor_diaria DECIMAL(10) NOT NULL,
            placa VARCHAR(7) NOT NULL UNIQUE,
            disponivel BOOLEAN DEFAULT true,
            CHECK (CHAR_LENGTH(placa) = 7 AND placa REGEXP '^[A-Z]{3}[0-9][A-Z][0-9]{2}$')
        );
    `);

    // População inicial da tabela de veículos
    await db.query(`
        INSERT INTO veiculos (modelo, marca, ano_fabricacao, valor_diaria, placa)
        VALUES 
        ('Fusca', 'Volkswagen', 1975, 5, 'ABC1D23'),
        ('Civic', 'Honda', 2015, 15, 'XYZ9E87'),
        ('Onix', 'Chevrolet', 2020, 12, 'JKL5G65')
        ON DUPLICATE KEY UPDATE placa=placa;
    `);

    // Criação da tabela de empréstimos
    await db.query(`
        CREATE TABLE IF NOT EXISTS emprestimos (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            cliente_id BIGINT,
            veiculo_id BIGINT,
            data_emprestimo DATE NOT NULL,
            data_devolucao DATE NOT NULL,
            valor_emprestimo DECIMAL(10, 2) NOT NULL,
            devolvido BOOLEAN default false,
            FOREIGN KEY (cliente_id) REFERENCES clientes(id),
            FOREIGN KEY (veiculo_id) REFERENCES veiculos(id)
        );
    `);

    // População inicial da tabela de empréstimos
    await db.query(`
        INSERT INTO emprestimos (cliente_id, veiculo_id, data_emprestimo, data_devolucao, valor_emprestimo)
        VALUES 
        (1, 1, '2023-09-01', '2023-09-10', (DATEDIFF('2023-09-10', '2023-09-01') * 5.00)),
        (2, 2, '2023-09-05', '2023-09-15', (DATEDIFF('2023-09-15', '2023-09-05') * 15.00)),
        (3, 3, '2023-09-07', '2023-09-17', (DATEDIFF('2023-09-17', '2023-09-07') * 12.00));
    `);

    console.log("Tabelas criadas e dados inseridos com sucesso!");
}

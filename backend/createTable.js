import { openDb } from './db.js';

export async function initializeDatabase() {
    const db = await openDb(); // Assuming openDb is a function that connects to your MySQL database

    // Criação da tabela de clientes
    await db.query(`
        CREATE TABLE IF NOT EXISTS clientes (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            nome VARCHAR(255) NOT NULL,
            endereco VARCHAR(255) NOT NULL,
            idade INT NOT NULL,
            cpf VARCHAR(11) NOT NULL UNIQUE,
            CHECK (CHAR_LENGTH(cpf) = 11 AND cpf REGEXP '^[0-9]+$')
        );
    `);

    // População inicial da tabela de clientes
    await db.query(`
        INSERT INTO clientes (nome, endereco, idade, cpf)
        VALUES 
        ('João Silva', 'Rua A, 123', 30, '12345678901'),
        ('Maria Oliveira', 'Avenida B, 456', 25, '23456789012'),
        ('Carlos Pereira', 'Travessa C, 789', 40, '34567890123')
        ON DUPLICATE KEY UPDATE cpf=cpf;
    `);

    // Criação da tabela de veículos
    await db.query(`
        CREATE TABLE IF NOT EXISTS veiculos (
            id BIGINT PRIMARY KEY AUTO_INCREMENT,
            modelo VARCHAR(255) NOT NULL,
            marca VARCHAR(255) NOT NULL,
            ano_fabricacao INT NOT NULL,
            valor_emprestimo DECIMAL(10, 2) NOT NULL,
            placa VARCHAR(7) NOT NULL UNIQUE,
            CHECK (CHAR_LENGTH(placa) = 7 AND placa REGEXP '^[A-Z]{3}[0-9][A-Z][0-9]{2}$')
        );
    `);

    // População inicial da tabela de veículos
    await db.query(`
        INSERT INTO veiculos (modelo, marca, ano_fabricacao, valor_emprestimo, placa)
        VALUES 
        ('Fusca', 'Volkswagen', 1974, 50.00, 'ABC1D23'),
        ('Civic', 'Honda', 2015, 150.00, 'XYZ9E87'),
        ('Onix', 'Chevrolet', 2020, 120.00, 'JKL5G65')
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
            FOREIGN KEY (cliente_id) REFERENCES clientes(id),
            FOREIGN KEY (veiculo_id) REFERENCES veiculos(id)
        );
    `);

    // População inicial da tabela de empréstimos
    await db.query(`
        INSERT INTO emprestimos (cliente_id, veiculo_id, data_emprestimo, data_devolucao, valor_emprestimo)
        VALUES 
        (1, 1, '2023-09-01', '2023-09-10', 50.00),
        (2, 2, '2023-09-05', '2023-09-15', 150.00),
        (3, 3, '2023-09-07', '2023-09-17', 120.00);
    `);

    console.log("Tabelas criadas e dados inseridos com sucesso!");
}
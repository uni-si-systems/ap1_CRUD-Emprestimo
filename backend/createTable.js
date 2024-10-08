import { openDb } from './db.js';

export async function initializeDatabase() {
    const db = await openDb();

    // Criação da tabela de clientes
    await db.exec(`
        CREATE TABLE IF NOT EXISTS clientes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            endereco TEXT NOT NULL,
            idade INTEGER NOT NULL,
            cpf TEXT NOT NULL UNIQUE,
            CHECK (LENGTH(cpf) = 11 AND cpf GLOB '[0-9]*')
        );
    `);

    // População inicial da tabela de clientes
    await db.run(`
        INSERT INTO clientes (nome, endereco, idade, cpf)
        VALUES 
        ('João Silva', 'Rua A, 123', 30, '12345678901'),
        ('Maria Oliveira', 'Avenida B, 456', 25, '23456789012'),
        ('Carlos Pereira', 'Travessa C, 789', 40, '34567890123')
        ON CONFLICT(cpf) DO NOTHING;
    `);

    // Criação da tabela de veículos
    await db.exec(`
        CREATE TABLE IF NOT EXISTS veiculos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            modelo TEXT NOT NULL,
            marca TEXT NOT NULL,
            ano_fabricacao INTEGER NOT NULL,
            valor_emprestimo REAL NOT NULL,
            placa TEXT NOT NULL UNIQUE,
            CHECK (LENGTH(placa) = 7 AND placa GLOB '[A-Z][A-Z][A-Z][0-9][A-Z][0-9][0-9]')
        );
    `);

    // População inicial da tabela de veículos
    await db.run(`
        INSERT INTO veiculos (modelo, marca, ano_fabricacao, valor_emprestimo, placa)
        VALUES 
        ('Fusca', 'Volkswagen', 1974, 50.00, 'ABC1D23'),
        ('Civic', 'Honda', 2015, 150.00, 'XYZ9E87'),
        ('Onix', 'Chevrolet', 2020, 120.00, 'JKL5G65')
        ON CONFLICT(placa) DO NOTHING;
    `);

    // Criação da tabela de empréstimos
    await db.exec(`
        CREATE TABLE IF NOT EXISTS emprestimos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cliente_id INTEGER,
            veiculo_id INTEGER,
            data_emprestimo TEXT NOT NULL,
            data_devolucao TEXT NOT NULL,
            valor_emprestimo REAL NOT NULL,
            FOREIGN KEY (cliente_id) REFERENCES clientes(id),
            FOREIGN KEY (veiculo_id) REFERENCES veiculos(id)
        );
    `);

    // População inicial da tabela de empréstimos
    await db.run(`
    INSERT INTO emprestimos (cliente_id, veiculo_id, data_emprestimo, data_devolucao, valor_emprestimo)
    VALUES 
    (1, 1, '2023-09-01', '2023-09-10', 50.00),
    (2, 2, '2023-09-05', '2023-09-15', 150.00),
    (3, 3, '2023-09-07', '2023-09-17', 120.00);
    `);


    console.log("Tabelas criadas e dados inseridos com sucesso!");
}

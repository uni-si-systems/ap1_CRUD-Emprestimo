import { openDb } from '../db.js';

// Listar os Clientes
export async function selectClientes(req, res) {
    try {
        const db = await openDb();
        const clientes = await db.query('SELECT * FROM clientes');
        res.json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar os clientes' });
    }
}



// Inserir novos Clientes
export async function insertClientes(req, res) {
    const { nome, endereco, idade, cpf, email, senha } = req.body;
    try {
        const db = await openDb();
        await db.execute(
            `INSERT INTO clientes (nome, email, senha, endereco, idade, cpf)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nome, email, senha, endereco, idade, cpf]
        );

        res.status(201).json({ message: 'Cliente inserido com sucesso!' });
    } catch (error) {
        if (error.code === 'SQLITE_CONSTRAINT') {
            res.status(409).json({ message: 'CPF ou email já cadastrados' });
        } else {
            console.error(error);
            res.status(500).json({ message: 'Erro ao inserir o cliente' });
        }
    }
}


import { openDb } from '../db.js';

// Listar os Clientes
export async function selectClientes(req, res) {
    try {
        const db = await openDb();
        const [clientes] = await db.query('SELECT * FROM clientes');
        res.json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar os clientes' });
    }
}

// Listar Cliente especifico pelo ID
export async function selectCliente(req, res) {
    const id = req.body.id; 
    try {
        const db = await openDb();
        const [rows] = await db.query('SELECT * FROM clientes WHERE id = ?', [id]);
        const cliente = rows[0]; // MySQL retorna resultados como array
        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).json({ message: 'Cliente não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar o cliente' });
    }
}

// Inserir novos Clientes
export async function insertClientes(req, res) {
    const { nome, endereco, idade, cpf } = req.body;
    try {
        const db = await openDb();
        await db.query(
            `INSERT INTO clientes (nome, endereco, idade, cpf) VALUES (?, ?, ?, ?)`,
            [nome, endereco, idade, cpf]
        );
        res.json({ statusCode: 200, message: 'Cliente inserido com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao inserir o cliente' });
    }
}

// Atualizar dados de um Cliente pelo ID
export async function updateClientes(req, res) {
    const { id, nome, endereco, idade, cpf } = req.body;
    try {
        const db = await openDb();
        const [result] = await db.query(
            `UPDATE clientes SET nome = ?, endereco = ?, idade = ?, cpf = ? WHERE id = ?`,
            [nome, endereco, idade, cpf, id]
        );
        if (result.affectedRows > 0) {
            res.json({ statusCode: 200, message: 'Cliente atualizado com sucesso' });
        } else {
            res.status(404).json({ message: 'Cliente não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar o cliente' });
    }
}

// Deletar Cliente
export async function deleteCliente(req, res) {
    const { id } = req.body;
    try {
        const db = await openDb();
        const [result] = await db.query('DELETE FROM clientes WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.json({ statusCode: 200, message: 'Cliente deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Cliente não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar o cliente' });
    }
}

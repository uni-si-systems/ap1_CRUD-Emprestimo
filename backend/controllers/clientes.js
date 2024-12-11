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

// Atualizar dados de um Cliente pelo ID
export async function updateClientes(req, res) {
    const { id, nome, endereco, idade, cpf } = req.body;

    try {
        const db = await openDb();
        const result = await db.run(
            `UPDATE clientes SET nome = ?, endereco = ?, idade = ?, cpf = ? WHERE id = ?`,
            [nome, endereco, idade, cpf, id]
        );

        if (result.changes > 0) {
            res.json({ message: 'Cliente atualizado com sucesso' });
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
        const result = await db.run('DELETE FROM clientes WHERE id = ?', [id]);

        if (result.changes > 0) {
            res.json({ message: 'Cliente deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Cliente não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar o cliente' });
    }
}

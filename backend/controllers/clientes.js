import { openDb } from '../db.js';
import bcrypt from 'bcrypt';

// Listar os Clientes
export async function selectClientes(req, res) {
    try {
        const db = await openDb();
        const [clientes] = await db.execute('SELECT * FROM clientes'); // Correção para MySQL
        res.json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar os clientes' });
    }
}

// Inserir novos Clientes com Criptografia da Senha
export async function insertClientes(req, res) {
    const { nome, endereco, idade, cpf, email, senha } = req.body;

    if (!nome || !email || !senha || !endereco || !idade || !cpf) {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios' });
    }

    try {
        // Criptografa a senha antes de salvar
        const hashedPassword = await bcrypt.hash(senha, 10);

        const db = await openDb();
        await db.execute(
            `INSERT INTO clientes (nome, email, senha, endereco, idade, cpf)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [nome, email, hashedPassword, endereco, idade, cpf]
        );

        res.status(201).json({ message: 'Cliente inserido com sucesso!' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') { // Tratamento para chaves duplicadas no MySQL
            res.status(409).json({ message: 'CPF ou email já cadastrados' });
        } else {
            console.error(error);
            res.status(500).json({ message: 'Erro ao inserir o cliente' });
        }
    }
}
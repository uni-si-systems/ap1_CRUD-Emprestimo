import { openDb } from '../db.js';

export async function createTable() {
    const db = await openDb();
    await db.exec(
        `CREATE TABLE IF NOT EXISTS clientes ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,   
        nome TEXT NOT NULL,  
        endereco TEXT NOT NULL,
        idade INTEGER NOT NULL,  
        cpf TEXT NOT NULL UNIQUE
    );`);
}

// Listar os Clientes
export function selectClientes(req, res) {
    openDb().then(db => {
        db.all('SELECT * FROM clientes')
            .then(clientes => {
                res.json(clientes);
            });
    });
}

// Listar Cliente especifico pelo ID
export function selectCliente(req, res) {
    const id = req.body.id; 
    openDb().then(db => {
        db.get('SELECT * FROM clientes WHERE id = ?', [id])
            .then(cliente => {
                if (cliente) {
                    res.json(cliente);
                } else {
                    res.status(404).json({ message: 'Cliente não encontrado' });
                }
            });
    });
}

// Inserir novos Clientes
export function insertClientes(req, res) {
    let clientes = req.body
    openDb().then(db => {
        db.run(
            `INSERT INTO clientes (nome, endereco, idade, cpf) VALUES (?, ?, ?, ?)`,
            [clientes.nome, clientes.endereco, clientes.idade, clientes.cpf]
        ).then(() => {
            res.json({
                "statusCode": 200
            })
            console.log('Cliente inserido com sucesso');
        });
    });
}

// Atualizar dados de um Cliente pelo ID
export function updateClientes(req, res) {
    let clientes = req.body
    openDb().then(db => {
        db.run(
            `UPDATE clientes SET nome = ?, endereco = ?, idade = ?, cpf = ? WHERE id = ?`,
            [clientes.nome, clientes.endereco, clientes.idade, clientes.cpf, clientes.id]
        ).then(() => {
            res.json({
                "statusCode": 200
            })
            console.log('Cliente atualizado com sucesso');
        });
    });
}

// Deletar Cliente
export function deleteCliente(req, res) {
    let id = req.body.id
    openDb().then(db => {
        db.run('DELETE FROM clientes WHERE id = ?', [id])
            .then(result => {
                if (result.changes > 0) {
                    res.json({ 
                        "statusCode": 200,
                        message: 'Cliente deletado com sucesso' 
                    });
                } else {
                    res.status(404).json({ message: 'Cliente não encontrado' });
                }
            });
    });
}
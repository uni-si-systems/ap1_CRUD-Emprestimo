import { openDb } from '../db.js';

export async function createTable() {
    const db = await openDb();
    await db.exec(
        `CREATE TABLE IF NOT EXISTS veiculos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            modelo TEXT NOT NULL,
            marca TEXT NOT NULL,
            ano_fabricacao INTEGER NOT NULL,
            valor_emprestimo REAL NOT NULL,
            placa TEXT NOT NULL CHECK (LENGTH(placa) = 7 AND placa GLOB '[A-Z][A-Z][A-Z][0-9][A-Z][0-9][0-9]'),
            )`
    );
}

// Listar todos os Veiculos
export function selectVeiculos(req, res) {
    openDb().then(db => {
        db.all('SELECT * FROM veiculos')
            .then(veiculos => {
                res.json(veiculos);
            });
    });
}

// Filtrar Veiculo especifico pelo ID
export function selectVeiculo(req, res) {
    const id = req.body.id; 
    openDb().then(db => {
        db.get('SELECT * FROM veiculos WHERE id = ?', [id])
            .then(veiculo => {
                if (veiculo) {
                    res.json(veiculo);
                } else {
                    res.status(404).json({ message: 'Veiculo não encontrado' });
                }
            });
    });
}

// Inserir veiculos
export function insertVeiculos(req, res) {
    let veiculo = req.body
    openDb().then(db => {
        db.run(
            `INSERT INTO veiculos (modelo, marca , ano_fabricacao , valor_emprestimo, placa ) VALUES (?, ?, ?, ?, ?)`,
            [veiculo.modelo, veiculo.marca, veiculo.ano_fabricacao, veiculo.valor_emprestimo, veiculo.placa]
        ).then(() => {
            res.json({
                "statusCode": 200
            })
            console.log('Veiculo inserido com sucesso');
        });
    });
}


// Atualizar dados veiculos
export function updateVeiculos(req, res) {
    let veiculo = req.body

    if (!veiculo.id) {
        return res.status(400).json({
            statusCode: 400,
            message: 'O ID do veículo é obrigatório para a atualização.'
        });
    }

    openDb().then(db => {
        db.run(
            `UPDATE veiculos SET modelo = ?, marca = ?, ano_fabricacao = ?, valor_emprestimo = ?, placa = ? WHERE id = ?`,
            [ veiculo.modelo, veiculo.marca, veiculo.ano_fabricacao, veiculo.valor_emprestimo, veiculo.placa, veiculo.id ]
        ).then(() => {
            res.json({
                "statusCode": 200
            })
            console.log('Veiculo atualizado com sucesso');
        });
    });
}

// Deletar Veiculo
export function deleteVeiculo(req, res) {
    let id = req.body.id
    openDb().then(db => {
        db.run('DELETE FROM veiculos WHERE id = ?', [id])
            .then(result => {
                if (result.changes > 0) {
                    res.json({ 
                        "statusCode": 200,
                        message: 'Veiculo deletado com sucesso' 
                    });
                } else {
                    res.status(404).json({ message: 'Veiculo não encontrado' });
                }
            });
    });
}
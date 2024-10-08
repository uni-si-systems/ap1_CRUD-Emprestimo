import { openDb } from '../db.js';

export async function createTable() {
    const db = await openDb();
    await db.exec(
            `CREATE TABLE IF NOT EXISTS emprestimos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cliente_id INTEGER,
            veiculo_id INTEGER,
            data_emprestimo DATE NOT NULL,
            data_devolucao DATE NOT NULL,
            valor_emprestimo REAL NOT NULL,
            FOREIGN KEY (cliente_id) REFERENCES clientes(id),
            FOREIGN KEY (veiculo_id) REFERENCES veiculos(id)
            );`
    );
}

// Listar todos os Emprestimos
export function selectEmprestimos(req, res) {
    openDb().then(db => {
        db.all('SELECT * FROM emprestimos')
            .then(emprestimos => {
                res.json(emprestimos);
            });
    });
}

// Filtrar Emprestimo especifico pelo ID
export function selectEmprestimo(req, res) {
    const id = req.body.id; 
    openDb().then(db => {
        db.get('SELECT * FROM emprestimos WHERE id = ?', [id])
            .then(emprestimo => {
                if (emprestimo) {
                    res.json(emprestimo);
                } else {
                    res.status(404).json({ message: 'Emprestimo não encontrado' });
                }
            });
    });
}

// Inserir Emprestimo
export function insertEmprestimo(req, res) {
    let emprestimo = req.body
    openDb().then(db => {
        db.run(
            `INSERT INTO emprestimos (cliente_id, veiculo_id, data_emprestimo, data_devolucao, valor_emprestimo  ) VALUES (?, ?, ?, ?, ?)`,
            [ emprestimo.cliente_id, emprestimo.veiculo_id, emprestimo.data_emprestimo, emprestimo.data_devolucao, emprestimo.valor_emprestimo ]
        ).then(() => {
            res.json({
                "statusCode": 200
            })
            console.log('Emprestimo inserido com sucesso');
        });
    });
}


// Atualizar dados Emprestimo
export function updateEmprestimo(req, res) {
    let emprestimo = req.body

    if (!emprestimo.id) {
        return res.status(400).json({
            statusCode: 400,
            message: 'O ID do emprestimo é obrigatório para a atualização.'
        });
    }

    openDb().then(db => {
        db.run(
            `UPDATE emprestimos SET cliente_id = ?, veiculo_id = ?, data_emprestimo = ?, data_devolucao = ?, valor_emprestimo = ? WHERE id = ?`,
            [ emprestimo.cliente_id, emprestimo.veiculo_id, emprestimo.data_emprestimo, emprestimo.data_devolucao, emprestimo.valor_emprestimo, emprestimo.id ]
        ).then(() => {
            res.json({
                "statusCode": 200
            })
            console.log('Emprestimo atualizado com sucesso');
        });
    });
}

// Deletar Emprestimo
export function deleteEmprestimos(req, res) {
    let id = req.body.id
    openDb().then(db => {
        db.run('DELETE FROM emprestimos WHERE id = ?', [id])
            .then(result => {
                if (result.changes > 0) {
                    res.json({ 
                        "statusCode": 200,
                        message: 'Emprestimo deletado com sucesso' 
                    });
                } else {
                    res.status(404).json({ message: 'Emprestimo não encontrado' });
                }
            });
    });
}
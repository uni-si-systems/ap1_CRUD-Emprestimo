import { openDb } from '../db.js';

// Listar todos os Emprestimos
export async function selectEmprestimos(req, res) {
    try {
        const db = await openDb();
        const [emprestimos] = await db.query('SELECT * FROM emprestimos');
        res.json(emprestimos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar os empréstimos' });
    }
}

export async function selectEmprestimoID(req, res) {
    const { cliente_id } = req.query;
    if (!cliente_id) {
        return res.status(400).json({ message: 'ID do cliente é necessário' });
    }
    try {
        const db = await openDb();
        const [rows] = await db.query(
            `SELECT 
                e.id, 
                e.data_emprestimo AS dataInicio, 
                e.data_devolucao AS dataFim, 
                e.valor_emprestimo AS valorTotal, 
                v.modelo, 
                v.marca, 
                v.ano_fabricacao AS anoFabricacao, 
                v.placa 
            FROM emprestimos e
            JOIN veiculos v ON e.veiculo_id = v.id
            WHERE e.cliente_id = ?`,
            [cliente_id]
        );

        res.json({ data: rows });
    } catch (error) {
        console.error('Erro ao buscar os empréstimos:', error);
        res.status(500).json({ message: 'Erro ao buscar os empréstimos' });
    }
}

// Inserir Emprestimo
export async function insertEmprestimo(req, res) {
    const { cliente_id, veiculo_id, data_emprestimo, data_devolucao, valor_emprestimo } = req.body;
    try {
        const db = await openDb();
        await db.query(
            `INSERT INTO emprestimos (cliente_id, veiculo_id, data_emprestimo, data_devolucao, valor_emprestimo) 
            VALUES (?, ?, ?, ?, ?)`,
            [cliente_id, veiculo_id, data_emprestimo, data_devolucao, valor_emprestimo]
        );
        res.json({ statusCode: 200, message: 'Empréstimo inserido com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao inserir o empréstimo' });
    }
}

// Atualizar dados do Emprestimo
export async function updateEmprestimo(req, res) {
    const { id, cliente_id, veiculo_id, data_emprestimo, data_devolucao, valor_emprestimo } = req.body;

    if (!id) {
        return res.status(400).json({
            statusCode: 400,
            message: 'O ID do empréstimo é obrigatório para a atualização.',
        });
    }

    try {
        const db = await openDb();
        const [result] = await db.query(
            `UPDATE emprestimos 
            SET cliente_id = ?, veiculo_id = ?, data_emprestimo = ?, data_devolucao = ?, valor_emprestimo = ? 
            WHERE id = ?`,
            [cliente_id, veiculo_id, data_emprestimo, data_devolucao, valor_emprestimo, id]
        );

        if (result.affectedRows > 0) {
            res.json({ statusCode: 200, message: 'Empréstimo atualizado com sucesso' });
        } else {
            res.status(404).json({ message: 'Empréstimo não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar o empréstimo' });
    }
}

// Deletar Emprestimo
export async function deleteEmprestimos(req, res) {
    const { id } = req.body;
    try {
        const db = await openDb();
        const [result] = await db.query('DELETE FROM emprestimos WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.json({ statusCode: 200, message: 'Empréstimo deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Empréstimo não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar o empréstimo' });
    }
}

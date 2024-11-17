import { openDb } from '../db.js';

// Listar todos os Veículos
export async function selectVeiculos(req, res) {
    try {
        const db = await openDb();
        const [veiculos] = await db.query('SELECT * FROM veiculos');
        res.json(veiculos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao listar os veículos' });
    }
}

// Filtrar Veículo específico pelo ID
export async function selectVeiculo(req, res) {
    const { id } = req.body;
    try {
        const db = await openDb();
        const [rows] = await db.query('SELECT * FROM veiculos WHERE id = ?', [id]);
        const veiculo = rows[0];
        if (veiculo) {
            res.json(veiculo);
        } else {
            res.status(404).json({ message: 'Veículo não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao buscar o veículo' });
    }
}

// Inserir Veículos
export async function insertVeiculos(req, res) {
    const { modelo, marca, ano_fabricacao, valor_emprestimo, placa } = req.body;
    try {
        const db = await openDb();
        await db.query(
            `INSERT INTO veiculos (modelo, marca, ano_fabricacao, valor_emprestimo, placa) 
            VALUES (?, ?, ?, ?, ?)`,
            [modelo, marca, ano_fabricacao, valor_emprestimo, placa]
        );
        res.json({ statusCode: 200, message: 'Veículo inserido com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao inserir o veículo' });
    }
}

// Atualizar dados de Veículos
export async function updateVeiculos(req, res) {
    const { id, modelo, marca, ano_fabricacao, valor_emprestimo, placa } = req.body;

    if (!id) {
        return res.status(400).json({
            statusCode: 400,
            message: 'O ID do veículo é obrigatório para a atualização.',
        });
    }

    try {
        const db = await openDb();
        const [result] = await db.query(
            `UPDATE veiculos 
            SET modelo = ?, marca = ?, ano_fabricacao = ?, valor_emprestimo = ?, placa = ? 
            WHERE id = ?`,
            [modelo, marca, ano_fabricacao, valor_emprestimo, placa, id]
        );

        if (result.affectedRows > 0) {
            res.json({ statusCode: 200, message: 'Veículo atualizado com sucesso' });
        } else {
            res.status(404).json({ message: 'Veículo não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar o veículo' });
    }
}

// Deletar Veículo
export async function deleteVeiculo(req, res) {
    const { id } = req.body;
    try {
        const db = await openDb();
        const [result] = await db.query('DELETE FROM veiculos WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.json({ statusCode: 200, message: 'Veículo deletado com sucesso' });
        } else {
            res.status(404).json({ message: 'Veículo não encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao deletar o veículo' });
    }
}

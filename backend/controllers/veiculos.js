import { openDb } from '../db.js';

// Listar todos os Veículos
export async function selectVeiculos(req, res) {
    try {
        const db = await openDb();
        const [veiculos] = await db.query(`
            SELECT 
                id, 
                modelo, 
                marca, 
                ano_fabricacao, 
                valor_diaria, 
                placa,
                disponivel
            FROM veiculos
        `);

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


// Alterar disponibilidade veiculo
export async function updateVeiculoDisponibilidade(req, res) {
    const { id } = req.params; // Captura o parâmetro id
    const { disponivel } = req.body; // Captura o valor de disponibilidade do corpo

    try {
        const db = await openDb();
        await db.query('UPDATE veiculos SET disponivel = ? WHERE id = ?', [disponivel, id]);
        res.json({ message: 'Disponibilidade atualizada com sucesso.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar disponibilidade do veículo.' });
    }
}
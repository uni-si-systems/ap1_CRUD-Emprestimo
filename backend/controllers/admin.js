import { openDb } from "../db.js";

// Função para listar os empréstimos de um cliente
export async function listarEmprestimosCliente(req, res) {
  const { clienteId } = req.params;

  if (!clienteId || isNaN(clienteId)) {
    return res.status(400).json({ message: "ID do cliente inválido" });
  }

  try {
    const db = await openDb();
    const emprestimos = await db.query(
      `SELECT e.id, v.modelo, v.marca, e.data_emprestimo, e.data_devolucao, e.valor_emprestimo, e.devolvido
       FROM emprestimos e
       JOIN veiculos v ON e.veiculo_id = v.id
       WHERE e.cliente_id = ?`,
      [clienteId]
    );

    if (emprestimos.length === 0) {
      return res.status(404).json({ message: "Nenhum empréstimo encontrado para este cliente" });
    }

    res.status(200).json({ emprestimos });
  } catch (error) {
    console.error("Erro ao listar empréstimos:", error);
    res.status(500).json({ message: "Erro ao listar empréstimos" });
  }
}

// Função para adicionar um veículo
export async function adicionarVeiculo(req, res) {
  const { modelo, marca, ano_fabricacao, valor_diaria, placa } = req.body;

  if (!modelo || !marca || !ano_fabricacao || !valor_diaria || !placa) {
    return res.status(400).json({ message: "Todos os campos são obrigatórios" });
  }

  const regexPlaca = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
  if (!regexPlaca.test(placa.toUpperCase())) {
    return res.status(400).json({ message: "Formato de placa inválido. Use o formato AAA0A00." });
  }

  try {
    const db = await openDb();
    const result = await db.query(
      "INSERT INTO veiculos (modelo, marca, ano_fabricacao, valor_diaria, placa) VALUES (?, ?, ?, ?, ?)",
      [modelo, marca, ano_fabricacao, valor_diaria, placa.toUpperCase()]
    );

    res.status(201).json({ message: "Veículo adicionado com sucesso!", veiculoId: result.insertId });
  } catch (error) {
    console.error("Erro ao adicionar veículo:", error);
    res.status(500).json({ message: "Erro ao adicionar veículo" });
  }
}

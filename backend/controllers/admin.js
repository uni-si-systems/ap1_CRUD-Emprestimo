import { openDb } from "../db.js";


// Função para listar todos os clientes
export async function listarClientes(req, res) {
    try {
      const db = await openDb();
      const clientes = await db.query('SELECT id, nome FROM clientes');
  
      if (clientes.length === 0) {
        return res.status(404).json({ message: "Nenhum cliente encontrado" });
      }
  
      res.status(200).json({ clientes });
    } catch (error) {
      console.error("Erro ao listar clientes:", error);
      res.status(500).json({ message: "Erro ao listar clientes" });
    }
  }
  

// Função para listar os empréstimos de um cliente
export async function listarEmprestimosCliente(req, res) {
    const { clienteId } = req.params;
  
    if (!clienteId || isNaN(clienteId)) {
      return res.status(400).json({ message: "ID do cliente inválido" });
    }
  
    try {
      const db = await openDb();
      
      // Consulta para pegar os empréstimos e o nome do cliente
      const emprestimos = await db.query(
        `SELECT e.id, v.modelo, v.marca, e.data_emprestimo, e.data_devolucao, e.valor_emprestimo, e.devolvido, c.nome AS nome_cliente
         FROM emprestimos e
         JOIN veiculos v ON e.veiculo_id = v.id
         JOIN clientes c ON e.cliente_id = c.id
         WHERE e.cliente_id = ?`,
        [clienteId]
      );
  
      if (emprestimos.length === 0) {
        return res.status(404).json({ message: "Nenhum empréstimo encontrado para este cliente" });
      }
  
      res.status(200).json({ nome_cliente: emprestimos[0].nome_cliente, emprestimos });
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

export async function updateVeiculos(req, res) {
  const { modelo, marca, ano_fabricacao, valor_diaria, placa } = req.body;
  const { id } = req.params; // O ID deve ser enviado como parâmetro de rota

  // Verifica se todos os campos obrigatórios foram enviados
  if (!id || !modelo || !marca || !ano_fabricacao || !valor_diaria || !placa) {
      return res.status(400).json({
          statusCode: 400,
          message: 'Todos os campos e o ID do veículo são obrigatórios para a atualização.',
      });
  }

  const regexPlaca = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
  if (!regexPlaca.test(placa.toUpperCase())) {
      return res.status(400).json({ 
          message: "Formato de placa inválido. Use o formato AAA0A00." 
      });
  }

  try {
      const db = await openDb();
      const [result] = await db.query(
          `UPDATE veiculos 
          SET modelo = ?, marca = ?, ano_fabricacao = ?, valor_diaria = ?, placa = ? 
          WHERE id = ?`,
          [modelo, marca, ano_fabricacao, valor_diaria, placa.toUpperCase(), id]
      );

      if (result.affectedRows > 0) {
          res.json({ statusCode: 200, message: 'Veículo atualizado com sucesso' });
      } else {
          res.status(404).json({ message: 'Veículo não encontrado' });
      }
  } catch (error) {
      console.error('Erro ao atualizar veículo:', error);
      res.status(500).json({ message: 'Erro ao atualizar o veículo' });
  }
}

// Filtrar Veículo específico pelo ID
export async function detalhesVeiculo(req, res) {
  const { id } = req.params; // Receber o ID da URL
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
      console.error('Erro ao buscar o veículo:', error);
      res.status(500).json({ message: 'Erro ao buscar o veículo' });
  }
}

export async function deleteVeiculo(req, res) {
  const { id } = req.params; // Mudança aqui, pegando o ID da URL
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

import { Router } from "express";
import { deleteCliente, insertClientes, selectCliente, selectClientes, updateClientes } from './controllers/clientes.js';
import { deleteEmprestimos, insertEmprestimo, selectEmprestimoID, selectEmprestimos, updateEmprestimo } from './controllers/emprestimos.js';
import { login } from "./controllers/login.js";
import { deleteVeiculo, insertVeiculos, selectVeiculos, updateVeiculoDisponibilidade, updateVeiculos } from './controllers/veiculos.js';

const router = Router();


    router.get('/', (req, res) => {
      res.json({
        "statusCode": 200,
        "msg": "Api Rodando"
      })
    })

    router.get('/listarClientes', selectClientes); // Seleciona todos os clientes
    router.get('/exibirCliente', selectCliente) // Seleciona o cliente pelo ID
    router.post('/inserirClientes', insertClientes); // Insere um novo cliente
    router.put('/atualizarClientes', updateClientes); // Atualiza um cliente
    router.delete('/deletarClientes', deleteCliente); // Deleta um cliente por ID (usando req.body.id)

    router.get('/listarVeiculos', selectVeiculos); // Seleciona todos os veiculo
    router.post('/inserirVeiculos', insertVeiculos); // Insere um novo veiculo
    router.put('/atualizarVeiculos', updateVeiculos); // Atualiza um veiculo
    router.delete('/deletarVeiculos', deleteVeiculo); // Deleta um veiculo por ID (usando req.body.id)
    router.put('/disponibilidadeVeiculo/:id', updateVeiculoDisponibilidade); // Atualiza a disponibilidade do Veiculo

    router.get('/listarEmprestimos', selectEmprestimos); // Seleciona todos os emprestimos
    router.get('/listarEmprestimoID', selectEmprestimoID); // Seleciona os emprestimos usando ID do cliente
    router.post('/inserirEmprestimos', insertEmprestimo); // Insere um novo emprestimos
    router.put('/atualizarEmprestimos', updateEmprestimo); // Atualiza um emprestimos
    router.delete('/deletarEmprestimos', deleteEmprestimos); // Deleta um emprestimos por ID (usando req.body.id)
    
    router.post('/login', login); // credenciais para login

export default router;


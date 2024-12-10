import { Router } from "express";
import { insertClientes, selectClientes } from './controllers/clientes.js';
import { devolverCarro, insertEmprestimo, selectEmprestimoID, selectEmprestimos } from './controllers/emprestimos.js';
import { login } from "./controllers/login.js";
import { adicionarVeiculo, deleteVeiculo, detalhesVeiculo, listarClientes, listarEmprestimosCliente, updateVeiculos } from "./controllers/admin.js";
import {  selectVeiculos, updateVeiculoDisponibilidade } from './controllers/veiculos.js';

const router = Router();


    router.get('/', (req, res) => {
      res.json({
        "statusCode": 200,
        "msg": "Api Rodando"
      })
    })
    router.get('/admin/listarClientes', listarClientes); // Lista os emprestimos dos clientes pelo Admin **
    router.get('/admin/listarEmprestimosCliente/:clienteId', listarEmprestimosCliente); // Lista os emprestimos dos clientes pelo Admin **
    router.get('/admin/detalhesVeiculo/:id', detalhesVeiculo); // Lista os valores do veiculo pelo ID **
    router.post('/admin/adicionarVeiculo', adicionarVeiculo); // Lista os emprestimos dos clientes pelo Admin **
    router.put('/admin/atualizarVeiculo/:id', updateVeiculos); // Edita os valores do veiculos **
    router.delete('/admin/deletarVeiculo/:id', deleteVeiculo); // Deleta um veiculo por ID (usando req.body.id) **

    
    router.get('/listarClientes', selectClientes); // Seleciona todos os clientes **
    router.post('/inserirClientes', insertClientes); // Insere um novo cliente **

    router.get('/listarVeiculos', selectVeiculos); // Seleciona todos os veiculo **
    router.put('/disponibilidadeVeiculo/:id', updateVeiculoDisponibilidade); // Atualiza a disponibilidade do Veiculo **
    router.put('/devolverCarro', devolverCarro); // Rota para devolver o carro **

    router.get('/listarEmprestimos', selectEmprestimos); // Seleciona todos os emprestimos **
    router.get('/listarEmprestimoID', selectEmprestimoID); // Seleciona os emprestimos usando ID do cliente **
    router.post('/inserirEmprestimos', insertEmprestimo); // Insere um novo emprestimos **

    
  
    router.post('/login', login); // credenciais para login **

export default router;


import { Router } from "express";
import { insertClientes, updateClientes, selectClientes, selectCliente, deleteCliente } from './controllers/clientes.js';
import { selectVeiculos, selectVeiculo, insertVeiculos, updateVeiculos, deleteVeiculo} from './controllers/veiculos.js';
import { selectEmprestimos, selectEmprestimo, insertEmprestimo, updateEmprestimo, deleteEmprestimos } from './controllers/emprestimos.js';

const router = Router();


    router.get('/', (req, res) => {
      res.json({
        "statusCode": 200,
        "msg": "Api Rodando"
      })
    })

    router.get('/listarClientes', selectClientes); // Seleciona todos os clientes
    router.post('/inserirClientes', insertClientes); // Insere um novo cliente
    router.put('/atualizarClientes', updateClientes); // Atualiza um cliente
    router.delete('/deletarClientes', deleteCliente); // Deleta um cliente por ID (usando req.body.id)

    router.get('/listarVeiculos', selectVeiculos); // Seleciona todos os veiculo
    router.post('/inserirVeiculos', insertVeiculos); // Insere um novo veiculo
    router.put('/atualizarVeiculos', updateVeiculos); // Atualiza um veiculo
    router.delete('/deletarVeiculos', deleteVeiculo); // Deleta um veiculo por ID (usando req.body.id)

    router.get('/listarEmprestimos', selectEmprestimos); // Seleciona todos os emprestimos
    router.post('/inserirEmprestimos', insertEmprestimo); // Insere um novo emprestimos
    router.put('/atualizarEmprestimos', updateEmprestimo); // Atualiza um emprestimos
    router.delete('/deletarEmprestimos', deleteEmprestimos); // Deleta um emprestimos por ID (usando req.body.id)
    
export default router;


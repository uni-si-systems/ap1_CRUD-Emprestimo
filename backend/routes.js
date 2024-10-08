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

    router.get('/clientes', selectClientes); // Seleciona todos os clientes
    router.post('/clientes', insertClientes); // Insere um novo cliente
    router.put('/cliente', updateClientes); // Atualiza um cliente
    router.delete('/cliente', deleteCliente); // Deleta um cliente por ID (usando req.body.id)

    router.get('/veiculos', selectVeiculos); // Seleciona todos os veiculo
    router.post('/veiculos', insertVeiculos); // Insere um novo veiculo
    router.put('/veiculo', updateVeiculos); // Atualiza um veiculo
    router.delete('/veiculos', deleteVeiculo); // Deleta um veiculo por ID (usando req.body.id)

    router.get('/emprestimos', selectEmprestimos); // Seleciona todos os emprestimos
    router.post('/emprestimos', insertEmprestimo); // Insere um novo emprestimos
    router.put('/emprestimos', updateEmprestimo); // Atualiza um emprestimos
    router.delete('/emprestimos', deleteEmprestimos); // Deleta um emprestimos por ID (usando req.body.id)
    
export default router;


#!/usr/bin/env node

import inquirer from 'inquirer';
import axios from 'axios';

// URL base do seu backend
const API_URL = 'http://localhost:3000';

// Função principal do menu
async function mainMenu() {
    const { option } = await inquirer.prompt([{
        type: 'list',
        name: 'option',
        message: 'O que você gostaria de fazer?',
        choices: [
            'Gerenciar Clientes',
            'Gerenciar Veículos',
            'Gerenciar Empréstimos',
            'Sair'
        ]
    }]);

    switch (option) {
        case 'Gerenciar Clientes':
            return manageClientes();
        case 'Gerenciar Veículos':
            return manageVeiculos();
        case 'Gerenciar Empréstimos':
            return manageEmprestimos();
        case 'Sair':
            console.log('Saindo...');
            process.exit(0);
    }
}

// Funções para Gerenciar Clientes
async function manageClientes() {
    const { action } = await inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'Ação em Clientes:',
        choices: ['Listar', 'Inserir', 'Atualizar', 'Deletar', 'Voltar']
    }]);

    switch (action) {
        case 'Listar':
            const { data: clientes } = await axios.get(`${API_URL}/listarClientes`);
            console.table(clientes);
            break;
        case 'Inserir':
            const newCliente = await inquirer.prompt([
                { name: 'nome', message: 'Nome do cliente:' },
                { name: 'endereco', message: 'Endereço:' },
                { name: 'idade', message: 'Idade:', type: 'number' },
                { name: 'cpf', message: 'CPF:' }
            ]);
            await axios.post(`${API_URL}/inserirClientes`, newCliente);
            console.log('Cliente inserido com sucesso!');
            break;
        case 'Atualizar':
            const updateCliente = await inquirer.prompt([
                { name: 'id', message: 'ID do cliente:', type: 'number' },
                { name: 'nome', message: 'Nome do cliente:' },
                { name: 'endereco', message: 'Endereço:' },
                { name: 'idade', message: 'Idade:', type: 'number' },
                { name: 'cpf', message: 'CPF:' }
            ]);
            await axios.put(`${API_URL}/atualizarClientes`, updateCliente);
            console.log('Cliente atualizado com sucesso!');
            break;
        case 'Deletar':
            const { id } = await inquirer.prompt([{ name: 'id', message: 'ID do cliente a deletar:', type: 'number' }]);
            await axios.delete(`${API_URL}/deletarClientes`, { data: { id } });
            console.log('Cliente deletado com sucesso!');
            break;
        case 'Voltar':
            return mainMenu();
    }
    manageClientes();
}

// Funções para Gerenciar Veículos
async function manageVeiculos() {
    const { action } = await inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'Ação em Veículos:',
        choices: ['Listar', 'Inserir', 'Atualizar', 'Deletar', 'Voltar']
    }]);

    switch (action) {
        case 'Listar':
            const { data: veiculos } = await axios.get(`${API_URL}/listarVeiculos`);
            console.table(veiculos);
            break;
        case 'Inserir':
            const newVeiculo = await inquirer.prompt([
                { name: 'modelo', message: 'Modelo do veículo:' },
                { name: 'marca', message: 'Marca do veículo:' },
                { name: 'ano_fabricacao', message: 'Ano de fabricação:', type: 'number' },
                { name: 'valor_emprestimo', message: 'Valor do empréstimo:', type: 'number' },
                { name: 'placa', message: 'Placa:' }
            ]);
            await axios.post(`${API_URL}/inserirVeiculos`, newVeiculo);
            console.log('Veículo inserido com sucesso!');
            break;
        case 'Atualizar':
            const updateVeiculo = await inquirer.prompt([
                { name: 'id', message: 'ID do veículo:', type: 'number' },
                { name: 'modelo', message: 'Modelo do veículo:' },
                { name: 'marca', message: 'Marca do veículo:' },
                { name: 'ano_fabricacao', message: 'Ano de fabricação:', type: 'number' },
                { name: 'valor_emprestimo', message: 'Valor do empréstimo:', type: 'number' },
                { name: 'placa', message: 'Placa:' }
            ]);
            await axios.put(`${API_URL}/atualizarVeiculos`, updateVeiculo);
            console.log('Veículo atualizado com sucesso!');
            break;
        case 'Deletar':
            const { id } = await inquirer.prompt([{ name: 'id', message: 'ID do veículo a deletar:', type: 'number' }]);
            await axios.delete(`${API_URL}/deletarVeiculos`, { data: { id } });
            console.log('Veículo deletado com sucesso!');
            break;
        case 'Voltar':
            return mainMenu();
    }
    manageVeiculos();
}

// Funções para Gerenciar Empréstimos
async function manageEmprestimos() {
    const { action } = await inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'Ação em Empréstimos:',
        choices: ['Listar', 'Inserir', 'Atualizar', 'Deletar', 'Voltar']
    }]);

    switch (action) {
        case 'Listar':
            const { data: emprestimos } = await axios.get(`${API_URL}/listarEmprestimos`);
            console.table(emprestimos);
            break;
        case 'Inserir':
            const newEmprestimo = await inquirer.prompt([
                { name: 'cliente_id', message: 'ID do cliente:', type: 'number' },
                { name: 'veiculo_id', message: 'ID do veículo:', type: 'number' },
                { name: 'data_emprestimo', message: 'Data de empréstimo:' },
                { name: 'data_devolucao', message: 'Data de devolução:' },
                { name: 'valor_emprestimo', message: 'Valor do empréstimo:', type: 'number' }
            ]);
            await axios.post(`${API_URL}/inserirEmprestimos`, newEmprestimo);
            console.log('Empréstimo inserido com sucesso!');
            break;
        case 'Atualizar':
            const updateEmprestimo = await inquirer.prompt([
                { name: 'id', message: 'ID do empréstimo:', type: 'number' },
                { name: 'cliente_id', message: 'ID do cliente:', type: 'number' },
                { name: 'veiculo_id', message: 'ID do veículo:', type: 'number' },
                { name: 'data_emprestimo', message: 'Data de empréstimo:' },
                { name: 'data_devolucao', message: 'Data de devolução:' },
                { name: 'valor_emprestimo', message: 'Valor do empréstimo:', type: 'number' }
            ]);
            await axios.put(`${API_URL}/atualizarEmprestimos`, updateEmprestimo);
            console.log('Empréstimo atualizado com sucesso!');
            break;
        case 'Deletar':
            const { id } = await inquirer.prompt([{ name: 'id', message: 'ID do empréstimo a deletar:', type: 'number' }]);
            await axios.delete(`${API_URL}/deletarEmprestimos`, { data: { id } });
            console.log('Empréstimo deletado com sucesso!');
            break;
        case 'Voltar':
            return mainMenu();
    }
    manageEmprestimos();
}

// Executa o CLI
mainMenu();

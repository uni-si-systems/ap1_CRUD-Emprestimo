// cli.js
import axios from 'axios';
import readline from 'readline';

// Configura a entrada no terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// URL base do seu servidor (ajuste conforme necessário)
const baseURL = 'http://localhost:3000';

// Função para fazer requisições ao servidor
async function makeRequest(method, url, data = {}) {
    try {
        const response = await axios({
            method,
            url: `${baseURL}${url}`,
            data
        });
        console.log('Resposta:', response.data);
    } catch (error) {
        console.error('Erro:', error.response ? error.response.data : error.message);
    }
}

// Função para exibir o menu
function showMenu() {
    console.log(`
--- CLI Sistema de Gerenciamento ---
1. Listar clientes
2. Inserir cliente
3. Atualizar cliente
4. Deletar cliente
5. Listar veículos
6. Inserir veículo
7. Atualizar veículo
8. Deletar veículo
9. Listar empréstimos
10. Inserir empréstimo
11. Atualizar empréstimo
12. Deletar empréstimo
13. Sair
`);
}

// Função para selecionar uma opção do menu
function handleMenuOption() {
    rl.question('Escolha uma opção: ', (option) => {
        switch (option) {
            case '1':
                makeRequest('get', '/clientes').then(showMenu).then(handleMenuOption);
                break;
            case '2':
                rl.question('Nome do cliente: ', (nome) => {
                    rl.question('Endereço do cliente: ', (endereco) => {
                        rl.question('Idade do cliente: ', (idade) => {
                            rl.question('CPF do cliente: ', (cpf) => {
                                makeRequest('post', '/clientes', { nome, endereco, idade, cpf })
                                    .then(showMenu)
                                    .then(handleMenuOption);
                            });
                        });
                    });
                });
                break;
            case '3':
                rl.question('ID do cliente a atualizar: ', (id) => {
                    rl.question('Novo nome do cliente: ', (nome) => {
                        rl.question('Novo endereço do cliente: ', (endereco) => {
                            rl.question('Nova idade do cliente: ', (idade) => {
                                rl.question('Novo CPF do cliente: ', (cpf) => {
                                    makeRequest('put', `/clientes/${id}`, { nome, endereco, idade, cpf })
                                        .then(showMenu)
                                        .then(handleMenuOption);
                                });
                            });
                        });
                    });
                });
                break;
            case '4':
                rl.question('ID do cliente a deletar: ', (id) => {
                    makeRequest('delete', `/clientes/${id}`)
                        .then(showMenu)
                        .then(handleMenuOption);
                });
                break;
            case '5':
                makeRequest('get', '/veiculos').then(showMenu).then(handleMenuOption);
                break;
            case '6':
                rl.question('Modelo do veículo: ', (modelo) => {
                    rl.question('Marca do veículo: ', (marca) => {
                        rl.question('Ano de fabricação do veículo: ', (ano_fabricacao) => {
                            rl.question('Valor do empréstimo: ', (valor_emprestimo) => {
                                rl.question('Placa do veículo (L-L-L-N-L-N-N):', (placa) => {
                                    makeRequest('post', '/veiculos', { modelo, marca, ano_fabricacao, valor_emprestimo, placa })
                                        .then(showMenu)
                                        .then(handleMenuOption);
                                });
                            });
                        });
                    });
                });
                break;
            case '7':
                rl.question('ID do veículo a atualizar: ', (id) => {
                    rl.question('Novo modelo do veículo: ', (modelo) => {
                        rl.question('Nova marca do veículo: ', (marca) => {
                            rl.question('Novo ano de fabricação do veículo: ', (ano_fabricacao) => {
                                rl.question('Novo valor do empréstimo: ', (valor_emprestimo) => {
                                    rl.question('Nova placa do veículo (L-L-L-N-L-N-N): ', (placa) => {
                                        makeRequest('put', `/veiculos/${id}`, { modelo, marca, ano_fabricacao, valor_emprestimo, placa })
                                            .then(showMenu)
                                            .then(handleMenuOption);
                                    });
                                });
                            });
                        });
                    });
                });
                break;
            case '8':
                rl.question('ID do veículo a deletar: ', (id) => {
                    makeRequest('delete', `/veiculos/${id}`)
                        .then(showMenu)
                        .then(handleMenuOption);
                });
                break;
            case '9':
                makeRequest('get', '/emprestimos').then(showMenu).then(handleMenuOption);
                break;
            case '10':
                rl.question('ID do cliente: ', (cliente_id) => {
                    rl.question('ID do veículo: ', (veiculo_id) => {
                        rl.question('Data do empréstimo (YYYY-MM-DD): ', (data_emprestimo) => {
                            rl.question('Data da devolução (YYYY-MM-DD): ', (data_devolucao) => {
                                rl.question('Valor do empréstimo: ', (valor_emprestimo) => {
                                    makeRequest('post', '/emprestimos', { cliente_id, veiculo_id, data_emprestimo, data_devolucao, valor_emprestimo })
                                        .then(showMenu)
                                        .then(handleMenuOption);
                                });
                            });
                        });
                    });
                });
                break;
            case '11':
                rl.question('ID do empréstimo a atualizar: ', (id) => {
                    rl.question('Novo ID do cliente: ', (cliente_id) => {
                        rl.question('Novo ID do veículo: ', (veiculo_id) => {
                            rl.question('Nova data do empréstimo (YYYY-MM-DD): ', (data_emprestimo) => {
                                rl.question('Nova data da devolução (YYYY-MM-DD): ', (data_devolucao) => {
                                    rl.question('Novo valor do empréstimo: ', (valor_emprestimo) => {
                                        makeRequest('put', `/emprestimos/${id}`, { cliente_id, veiculo_id, data_emprestimo, data_devolucao, valor_emprestimo })
                                            .then(showMenu)
                                            .then(handleMenuOption);
                                    });
                                });
                            });
                        });
                    });
                });
                break;
            case '12':
                rl.question('ID do empréstimo a deletar: ', (id) => {
                    makeRequest('delete', `/emprestimos/${id}`)
                        .then(showMenu)
                        .then(handleMenuOption);
                });
                break;
            case '13':
                console.log('Saindo...');
                rl.close();
                return;
            default:
                console.log('Opção inválida. Tente novamente.');
                showMenu();
                handleMenuOption();
        }
    });
}

// Inicializa o CLI
function initCLI() {
    showMenu();
    handleMenuOption();
}

// Executa o CLI
initCLI();

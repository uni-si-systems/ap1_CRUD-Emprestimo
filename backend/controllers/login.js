import { openDb } from '../db.js';

export async function login(req, res) {
    const { email, password } = req.body;

    try {
        const db = await openDb();
        
        // Use prepared statement with proper database method
        const [users] = await db.execute(
            'SELECT * FROM clientes WHERE email = ? LIMIT 1',
            [email]
        );

        console.log('Usuários encontrados:', users);

        // Verifique se o usuário foi encontrado
        if (users && users.length > 0) {
            const user = users[0];

            console.log('Senha do usuário:', user.senha);
            console.log('Senha fornecida:', password);

            // Comparação de senha
            if (user.senha === password) {
                return res.status(200).json({
                    success: true,
                    message: 'Login realizado com sucesso',
                    user: {
                        id: user.id,
                        nome: user.nome,
                        email: user.email,
                        endereco: user.endereco,
                        idade: user.idade,
                        cpf: user.cpf
                    },
                });
            } else {
                return res.status(401).json({
                    error: 'Senha incorreta',
                });
            }
        } else {
            return res.status(404).json({
                error: 'Usuário não encontrado',
            });
        }
    } catch (err) {
        console.error('Erro ao consultar banco de dados:', err);
        return res.status(500).json({
            error: 'Erro no servidor, tente novamente mais tarde',
        });
    }
}
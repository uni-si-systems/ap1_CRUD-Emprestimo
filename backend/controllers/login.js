import { openDb } from '../db.js';
import bcrypt from 'bcrypt';

export async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Por favor, preencha todos os campos obrigatórios' });
    }

    try {
        const db = await openDb();

        // Consulta o cliente pelo email
        const [rows] = await db.execute('SELECT * FROM clientes WHERE email = ?', [email]);
        const cliente = rows[0]; // Obtém o primeiro cliente

        // Verifique se o cliente foi encontrado
        if (!cliente) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        console.log('Cliente encontrado:', cliente);
        console.log('Senha armazenada:', cliente.senha);

        // Verifique a senha usando bcrypt
        const isPasswordValid = await bcrypt.compare(password, cliente.senha);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        // Retorna os dados do cliente no login
        return res.status(200).json({
            success: true,
            message: 'Login realizado com sucesso',
            user: {
                id: cliente.id,
                nome: cliente.nome,
                email: cliente.email,
                endereco: cliente.endereco,
                idade: cliente.idade,
                cpf: cliente.cpf,
            },
        });
    } catch (err) {
        console.error('Erro ao consultar banco de dados:', err);
        return res.status(500).json({
            error: 'Erro no servidor, tente novamente mais tarde',
        });
    }
}

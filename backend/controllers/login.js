import { openDb } from '../db.js';
import bcrypt from 'bcrypt';

// Login de Clientes - Comparar Senha com o Hash Armazenado
export async function login(req, res) {
    const { email, password } = req.body;
    console.log(req.body)
    if (!email || !password) {
        return res.status(400).json({ error: 'Por favor, preencha todos os campos obrigatórios' });
    }

    try {
        const db = await openDb();

        // Consulta o cliente pelo email
        const [cliente] = await db.execute('SELECT * FROM clientes WHERE email = ?', [email]);

        if (!cliente || cliente.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        console.log('cliente', cliente[0]);
        console.log('Senha armazenada:', cliente[0].senha);

        // Verifique a senha usando bcrypt
        const isPasswordValid = await bcrypt.compare(password, cliente[0].senha);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        // Retorna os dados do cliente no login
        return res.status(200).json({
            success: true,
            message: 'Login realizado com sucesso',
            user: {
                id: cliente[0].id,
                nome: cliente[0].nome,
                email: cliente[0].email,
                endereco: cliente[0].endereco,
                idade: cliente[0].idade,
                cpf: cliente[0].cpf,
            },
        });
    } catch (err) {
        console.error('Erro ao consultar banco de dados:', err);
        return res.status(500).json({
            error: 'Erro no servidor, tente novamente mais tarde',
        });
    }
}

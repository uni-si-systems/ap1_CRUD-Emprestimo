import { openDb } from '../db.js';

export async function login(req, res) {
    
    const { email, password } = req.body;
    
    try {
        const db = await openDb();
        const user = await db.query(
            'SELECT * FROM clientes WHERE email = ? AND senha = ?',
            [email, password]
        );
    
        if (user) {
                return res.status(200).json({ success: true, message: 'Login realizado com sucesso', user });
        } else {
                return res.status(401).json({ error: 'Email ou senha incorretos' });
        }
    } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Erro no servidor, tente novamente mais tarde' });
    }
    };

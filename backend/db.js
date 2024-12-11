import mysql from 'mysql2/promise';

export async function openDb() {
  const connection = await mysql.createConnection({
    host: 'localhost', // Endereço do servidor MySQL
    user: 'root', // Usuário do banco de dados
    password: '12345678', // Senha do banco de dados
    database: 'carnow', // Nome do banco de dados
  });

  console.log('Connected to MySQL database');
  return connection;
}

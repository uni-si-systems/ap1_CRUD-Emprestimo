import { initializeDatabase } from './createTable.js';

import express from 'express';
import fs from 'fs';
import https from 'https';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

initializeDatabase()
  .then(() => console.log('Banco de dados inicializado com sucesso'))
  .catch(err => console.error('Erro ao inicializar o banco de dados:', err));

import router from './routes.js';

app.use(router);

  
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });

  // configurando as keys de https
  https.createServer({
    cert: fs.readFileSync('backend/SSL/code.crt'),
    key: fs.readFileSync('backend/SSL/code.key')
  }, app).listen(3001, () => console.log("Rodando em HTTPS") )
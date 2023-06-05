const http = require('http');
const cors = require('cors');
const express = require('express');
const database = require('./database');
const app = express();
app.use(cors());
app.use(express.json());

const connection = database.createConnection();


app.get('/', (req, res) => {
  res.json('teste mysql');
});

app.post('/login', (request, response) => {

  const {email, senha } = request.body;

  connection.query(`SELECT * FROM Users WHERE email = '${email}'`, (err, rows, fields) => {
    if (! rows || ! email || ! senha) {
      return response.status(400).send('Conta ou senha inválida');
    }

    if (senha == rows[0].passowrd && rows[0].email == email) {
      response.status(200).send("Efetuado co sucesso");
    } else {
      return response.status(400).send('Conta ou senha inválida');
    }

  });
});

// Manipulador de erros global
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

http.createServer({}, app).listen(3000, () => {
  console.log(`Rodou`);
});
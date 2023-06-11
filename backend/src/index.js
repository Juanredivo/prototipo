const http = require('http');
const cors = require('cors');
const express = require('express');
const database = require('./database');
const app = express();
const bcrypt = require('bcryptjs');
app.use(cors());
app.use(express.json());

const connection = database.createConnection();


app.get('/', (req, res) => {
  res.json('teste mysql');
});

app.post('/login', (request, response) => {


  const { email, senha } = request.body;

  connection.query(`SELECT * FROM Users WHERE email = '${email}'`, (err, rows, fields) => {
    if (!rows || rows.length === 0 || !email || !senha) {
      return response.status(400).send('Conta ou senha inválida');
    }

    const thePasswordIsValid = bcrypt.compareSync(senha, rows[0].password);
    if (thePasswordIsValid && rows[0].email == email) {
      response.status(200).send("Efetuado co sucesso");
    } else {
      return response.status(400).send('Conta ou senha inválida');
    }

  });
});

app.post('/register', (request, response) => {
  try {

    const { fullName, email, phoneNumber, password, confirmPassword } = request.body;
    console.log(fullName, email, phoneNumber, password, confirmPassword)
    if (password !== confirmPassword) {
      return response.status(400).send('A senha e a confirmação de senha não correspondem');
    }

    const hash = bcrypt.hashSync(password, 10);

    connection.query(`INSERT INTO users (full_name, email, phone_number,  password) VALUES('${fullName}', '${email}', '${phoneNumber}', '${hash}');`, (err, rows, fields) => {

    });

    return response.status(200).send('Registro concluído com sucesso');
  } catch (error) {
    console.error(error);
    return response.status(500).send('Ocorreu um erro no registro');
  }
});


app.post('/contato', (request, response) => {
  try {
    const { nome, email, mensagem } = request.body;

    connection.query(`INSERT INTO mensagens (nome, email, mensagem, data_envio) VALUES ('${nome}', '${email}', '${mensagem}', NOW());`, (err, rows, fields) => {
      if (err) {
        console.error(err);
        return response.status(500).send('Ocorreu um erro ao enviar a mensagem');
      }
      
      return response.status(200).send('Mensagem enviada com sucesso');
    });
  } catch (error) {
    console.error(error);
    return response.status(500).send('Ocorreu um erro ao enviar');
  }
});

// Manipulador de erros global
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

http.createServer({}, app).listen(3000, () => {
  console.log(`Rodou`);
});
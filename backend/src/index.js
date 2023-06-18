const http = require('http');
const cors = require('cors');
const express = require('express');
const database = require('./database');
const app = express();
const mysql = require('mysql2');
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

app.get('/opcoes-ramo-regiao', (req, res) => {
  const connection = mysql.createConnection(dbConfig);

  const sql = `SELECT DISTINCT sp.nm_traffic_type AS ramo, ud.nm_location AS regiao 
               FROM ServicePreferences sp
               INNER JOIN UserDemographics ud ON sp.id_user = ud.id_user`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Erro na consulta:', error);
      res.status(500).json({ error: 'Erro ao obter as opções de ramo e região' });
    } else {
      const opcoesRamo = results.map(row => row.ramo);
      const opcoesRegiao = results.map(row => row.regiao);
      res.json({ ramo: opcoesRamo, regiao: opcoesRegiao });
    }

    connection.end();
  });
});

app.get('/ramos', (req, res) => {
  connection.query('SELECT * FROM Ramos', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erro ao obter os ramos do banco de dados');
    } else {
      res.json(results);
    }
  });
});

app.get('/planos', (req, res) => {
  const { idRamo } = req.query;
  if (!idRamo) {
    res.status(400).send('ID do ramo não fornecido');
    return;
  }

  connection.query('SELECT * FROM Planos WHERE id_ramo = ?', [idRamo], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send('Erro ao obter os planos do banco de dados');
    } else {
      res.json(results);
    }
  });
});

app.post('/personalizar-plano', (req, res) => {

  const { planId, value, facebookAds, instaAds, youtubeAds, googleAds } = req.body;

  connection.query(
    'INSERT INTO PlanosPersonalizados (id_plano, valor, facebook_ads, insta_ads, youtube_ads, google_ads) VALUES (?, ?, ?, ?, ?, ?)',
    [planId, value, facebookAds, instaAds, youtubeAds, googleAds],
    (error, results) => {
      if (error) {
        console.error('Erro ao salvar o plano personalizado:', error);
        res.status(500).json({ error: 'Erro ao salvar o plano personalizado' });
      } else {
        res.json({ message: 'Plano personalizado salvo com sucesso!' });
      }
    }
  );
});


app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

http.createServer({}, app).listen(3000, () => {
  console.log(`Rodou`);
});
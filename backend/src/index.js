const http = require('http');
const cors = require('cors');
const express = require('express');
const app = express();
app.use(cors());
app.use(express.json());


http.createServer({}, app).listen(3000, () => {
  console.log(`Serviço iniciado`);
});
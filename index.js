require('dotenv-safe').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const dbConnection = process.env.DB_CONNECTION;
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

mongoose.connect(dbConnection)
  .then(() => console.log('Conexão com o banco de dados estabelecida'))
  .catch((e) => console.error(`Ocorreu um erro durante a conexão com o banco de dados. ${e}`))

app.get('/', (req, res, next) => {
  res.render('create');
});

app.listen(port, () => {
  try {
    console.log(`Servidor rodando em: http://localhost:${port}`);
  } catch (e) {
    console.error(`Um erro ocorreu durante o processo. ${e}`);
  }
});

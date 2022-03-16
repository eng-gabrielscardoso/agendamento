require('dotenv-safe').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const dbConnection = process.env.DB_CONNECTION;
const port = process.env.PORT || 3000;

const AppointmentService = require('./services/AppointmentService');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');

mongoose.connect(dbConnection)
  .then(() => console.log('Conexão com o banco de dados estabelecida'))
  .catch((e) => console.error(`Ocorreu um erro durante a conexão com o banco de dados. ${e}`))

app.get('/', async (req, res, next) => {
  res.render('create');
});

app.post('/create', async (req, res, next) => {
  try {
    const status = await AppointmentService.create(
      req.body.pacientName,
      req.body.pacientEmail,
      req.body.pacientCPF,
      req.body.pacientDescription,
      req.body.pacientAppointmentDate,
      req.body.pacientAppointmentTime,
    );
    
    if (status) {
      console.log('Registro efetuado com sucesso');
      res.redirect('/');
    } else {
      console.log(`Um erro ocorreu durante a requisição`);
    res.redirect('/');
    }
  } catch (e) {
    console.log(`Um erro ocorreu durante a requisição de salvamento. Log: ${e}`);
    res.redirect('/');
  }
})

app.listen(port, () => {
  try {
    console.log(`Servidor rodando em: http://localhost:${port}`);
  } catch (e) {
    console.error(`Um erro ocorreu durante o processo. ${e}`);
  }
});

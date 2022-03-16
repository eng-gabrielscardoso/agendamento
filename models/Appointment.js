const mongoose = require('mongoose');

const appointment = new mongoose.Schema({
  name: String,
  email: String,
  cpf: String,
  description: String,
  date: Date,
  time: String,
})

module.exports = appointment;

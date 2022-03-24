const mongoose = require('mongoose');

const appointment = require('../models/Appointment');

const Appointment = mongoose.model('Appointment', appointment);

class AppointmentService {
  async create (name, email, cpf, description, date, time) {
    const newAppointment = new Appointment({
      name,
      email,
      cpf,
      description,
      date,
      time,
      finished: false,
    });

    try {
      await newAppointment.save();
      console.log('Um novo registro foi guardado no banco de dados');
      return true;
    } catch (e) {
      console.error(`Ocorreu um erro durante o registro. Log: ${e}`);
      return false;
    }
  }

  async getAll (showFinished) {
    if (showFinished) {
      return await Appointment.find();
    } else {
      return await Appointment.find({ 'finished': false });
    }
  }
}

module.exports = new AppointmentService();

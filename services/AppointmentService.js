const mongoose = require('mongoose');

const appointment = require('../models/Appointment');

const AppointmentFactory = require('../factories/AppointmentFactory');

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
      let appos = await Appointment.find({ 'finished': false });

      let appointments = [];

      appos.forEach(appointment => {
        if (appointment.date != undefined) {
          appointments.push(AppointmentFactory.build(appointment));
        }
      });

      return appointments;
    }
  }
}

module.exports = new AppointmentService();

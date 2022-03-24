class AppointmentFactory {
  build (query) {
    let day = query.date.getDate() + 1;
    let month = query.date.getMonth();
    let year = query.date.getFullYear();

    let hour = Number.parseInt(query.time.split(':')[0]);
    let minutes = Number.parseInt(query.time.split(':')[1]);

    let startDate = new Date(year, month, day, hour, minutes, 0, 0);
    startDate.setHours( startDate.getHours() - 3 );

    let appo = {
      id: query._id,
      title: `${query.name} - ${query.description}`,
      start: startDate,
      end: startDate,
    }

    return appo;
  }
}

module.exports = new AppointmentFactory();

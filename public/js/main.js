const calendarTarget = document.querySelector('div#fullCalendar');

const calendar = new FullCalendar.Calendar(calendarTarget, {
  initialView: 'dayGridMonth',
  locale: 'pt-br',
});

calendar.render();

$(function () {
  $('#pacientCPF').mask('000.000.000.-00', { reverse: true, });
});

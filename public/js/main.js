const calendarTarget = document.querySelector('div#fullCalendar');


const calendar = new FullCalendar.Calendar(calendarTarget, {
  initialView: 'dayGridMonth',
  locale: 'pt-br',
  events: 'getcalendar',
  eventClick: calendarEvent,
});

function calendarEvent (info) {
  window.location.href = '/event/' + info.event.id;
}

calendar.render();

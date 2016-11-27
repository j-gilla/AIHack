const moment = require('moment');

function getGreeting () {
  var currentTime = new Date().getTime();
  var formatted = moment(currentTime).format('HH:MM, DD/MM/YYYY');
  var hours = formatted.slice(0, 2);

  if (hours >= 0 && hours <= 12) { return 'Good morning from James'; }
  if (hours >= 12 && hours <= 18) { return 'Good afternoon from James'; }
  if (hours <= 18 && hours >= 24) { return 'Good evening from James'; }
}

console.log(getGreeting());

module.exports = getGreeting;

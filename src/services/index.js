const {services} = require('gyps-server');
// const events = require('./events/events.service.js');
// const fans = require('./fans/fans.service.js');
// const gigs = require('./gigs/gigs.service.js');
// const messages = require('./messages/messages.service.js');
// const tickets = require('./tickets/tickets.service.js');
// const venues = require('./venues/venues.service.js');

module.exports = function (app) { // eslint-disable-line no-unused-vars
	services(app);
};

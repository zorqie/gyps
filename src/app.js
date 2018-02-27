const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('winston');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const cookieParser = require('cookie-parser');
const { authenticate } = require('@feathersjs/authentication').express;

const middleware = require('./middleware');
const {services, authentication} = require('gyps-server');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const ssr = require('./ssr.jsx').default;

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

// Host the public folder
app.get('*', cookieParser(), /*authenticate('jwt', {failureRedirect: '/nah'}),*/ ssr(app));
app.use('/images', express.static(app.get('public') + '/assets', {fallthrough: true}))
app.use('/images/*', function(req, res) {
  res.sendFile(path.join(app.get('public'), '/assets/default.jpg'))
});

app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
// app.use(express.notFound());
app.use(function (req, res, next) {
  console.log("NOT FOUND: ", req.url);
  res.status(404).send("Sorry can't find that!" + req);
})

	app.on('logout', (result, meta) => {
		console.log("OUTING...", meta && meta.provider)
		// app.set('user', null)
	})

	app.on('login', what => {
		console.log("INNING...") 
		
	})



app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;

import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

// FIXME this should be in configuration somewhere.
// Establish a Socket.io connection
const socket = io('http://localhost:2018');
// const socket = io('https://gyps.herokuapp.com/') 

// Initialize our Feathers client application through Socket.io
// with hooks and authentication.
const app = feathers()
	.configure(socketio(socket))
	// .configure(hooks())
	// Use localStorage to store our login token
	

const defaultErrorHandler = error => {
	console.error("Error handlered: ", error)
	app.emit("error", error)
}

const authListener = 
	(userHandler = ()=>{}, errorHandler = defaultErrorHandler) => 
		auth => app.passport.verifyJWT(auth.accessToken)
			.then(jwt => app.service('users').get(jwt.userId))
			.then(userHandler)
			.catch(errorHandler)  // TODO: 

// app.on('authenticated', authListener(u => app.set('user', u)))

app.on('logout', (u) => (console.log("OUT."), app.set('user', null)))

export default app
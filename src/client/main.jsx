import React from 'react'
import { hydrate } from 'react-dom'

import feathers from '@feathersjs/feathers'
import auth from '@feathersjs/authentication-client'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

import { BrowserRouter, Route } from 'react-router-dom'

import '../../semantic/dist/semantic.min.css'
import App from './App.jsx'

 
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
	.configure(auth({ storage: window.localStorage }))

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

app.authenticate()
.then(auth => app.passport.verifyJWT(auth.accessToken))
.then(jwt => app.service('users').get(jwt.userId))
.then(user => {
	console.log("USER Hydrating: ", user)
	app.set('user', user) // how many places we do this?
	hydrate(
		<BrowserRouter onUpdate={() => window.scrollTo(0, 0)} >
			<Route render={props => <App {...props} feathers={app} user={user}/>} />
		</BrowserRouter>, document.getElementById('app'))
})
.catch(error => {
	hydrate(
		<BrowserRouter>
			<Route render={props => <App {...props} feathers={app} />} />
		</BrowserRouter>, document.getElementById('app'))

})

// FIXME remove this
window.gyps = app
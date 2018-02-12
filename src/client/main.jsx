import React from 'react'
import { hydrate } from 'react-dom'

import auth from '@feathersjs/authentication-client'

import { BrowserRouter, Route } from 'react-router-dom'

import '../../semantic/dist/semantic.min.css'
import App from './App.jsx'

import app from './feathers' 

// we do this here because window is only defined on client
app.configure(auth({ storage: window.localStorage }))

app.authenticate()
.then(auth => app.passport.verifyJWT(auth.accessToken))
.then(jwt => app.service('users').get(jwt.userId))
.then(user => {
	// console.log("USER Hydrating: ", user)
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

export default app;

// FIXME remove this
window.gyps = app
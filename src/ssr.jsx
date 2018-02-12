import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import App from './client/App.jsx'

export default function ssr(app) {
	// TODO this doesn't belong here. Anywhere?
	app.on('logout', () => {
		console.log("OUTING...")
		app.set('user', null)
	})
/*
	app.on('login', what => {
		console.log("INNING...") 
		
	})
*/
	return (req, res, next) => {
		if (req.originalUrl && req.originalUrl.indexOf('.') > 0) {
			return next();
		}

		const user = app.get('user')
		if (user) {
			delete user.password
			// console.log("app.user ==================== ", user.email)
		}

		const context = {} // not sure how this is useful
		console.log("SSR.url=", req.originalUrl)

		const html = ReactDOMServer.renderToString(
			<StaticRouter
				location={req.originalUrl}
				context={context}
			>
					<App feathers={app} user={user}/>
			</StaticRouter>
		)

		if (context.url) {
			console.log("HOW would this ever happen??");
			res.writeHead(301, {
				Location: context.url
			})
			res.end();
		} else {
			res.setHeader('Content-Type', 'text/html');
			res.write('<!doctype html>\n\t');
			res.write('<html lang="en">\n\t\t');
			res.write('<head>\n\t\t\t');
			res.write('<meta charset="utf-8">\n\t\t\t');
			res.write("<title>Balkanic'18</title>\n\t\t\t")
			res.write('<link rel="stylesheet" href="/bundle/style.css">\n\t\t');
			res.write('<link rel="stylesheet" href="/schedule.css">\n\t\t');
			res.write('<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;subset=cyrillic" rel="stylesheet">');
			res.write('<style>html body *, button, input {font-family:"Roboto";border-radius:0 !important}</style>\n\t\t')			
			res.write('</head>\n\t\t');
			res.write('<body>\n\t\t\t');
			res.write('<div id="app">' + html + '</div>\n\t\t');
			res.write('</body>\n\t\t');
			res.write('<script src="/bundle/main.js"></script>\n\t');
			res.write('</html>');
			res.end();
		}
	}
}
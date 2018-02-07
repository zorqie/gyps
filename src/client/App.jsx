import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Message, Segment, Sidebar } from 'semantic-ui-react'
import AppMenu from '../ui/AppMenu.jsx'
import EventsListPage from '../ui/pages/EventsListPage.jsx'
import EventPage from '../ui/pages/EventPage.jsx'
import ActDetailsPage from '../ui/pages/ActDetailsPage.jsx'
import GigDetailsPage from '../ui/pages/GigDetailsPage.jsx'
import LoginForm from '../ui/LoginForm.jsx'
import SignupForm from '../ui/SignupForm.jsx'
import ProfilePage from '../ui/pages/ProfilePage.jsx'

const Home = () => (
	<div  >
		<Header as='h1' style={{fontWeight:300}}>Inter-Balkanic</Header>

		<p>This is a basic fixed menu template using fixed size containers.</p>
		<p>A text container is used for the main container, which is useful for single column layouts.</p>
	</div>
)

const NotFound = () => (
	<div>
		<Header style={{color: 'red'}}>She's not here.</Header>
		<p>Our princess is in another castle.</p>
	</div>
)

const pages = [
	{
		path: '/event/:eventId/:type?',
		component: EventPage,
	},
	{
		path: '/act/:actId',
		component: ActDetailsPage,
	},
	{
		path: '/gig/:gigId',
		component: GigDetailsPage,
	},
	{
		path: '/events',
		exact: true,
		component: EventsListPage,
	},
]

export default class App extends React.Component {
	state = {
		user: this.props.user,
		event: this.props.event,
		sidebar: {
			visible: false,
			message: '',
			error: false,
		}
	}
	showMessage = message => {
		this.setState({sidebar: {visible: true, message}})
		setTimeout(() => this.setState({sidebar: {visible: false}}), 4000)
		console.log("SHOW MESSAGE:", message)
	}
	showError = error => {
		this.setState({sidebar: {visible: true, error: true, message: error.message}})
		setTimeout(() => this.setState({sidebar: {visible: false, error: false}}), 4000)
		console.log("SHOW error:", error)
	}
	componentWillMount() {
		const { feathers } = this.props
		feathers.on('user.login', user => this.setState({user}))
		feathers.on('user.event', event => this.setState({event}))
		feathers.on('logout', () => this.setState({ user: null }))
		feathers.on('error', this.showError)
		feathers.on('message', this.showMessage)
	}
	render() {
		const { feathers, history } = this.props
		const { user, sidebar, event } = this.state
		return (
			<div style={{ marginTop: '7em' }}>
				<Route path="/:section?/:id?/:mode?" render={p => <AppMenu {...this.props} {...p} user={user} event={event}/>} />

				<Container>
					<Switch>
						<Route path="/" exact component={Home} />

						{pages.map(({path, component: Component, ...others}) => 
							<Route key={path} {...others} path={path} render={props => <Component {...this.props} {...props} user={user} />} />
						)}
						
						<Route path="/my-profile" exact render={p => <ProfilePage {...this.props} {...p}/>} />
						<Route path="/login" render={p => <LoginForm {...this.props} {...p}/>} />
						<Route path="/signup" render={p => <SignupForm {...this.props} {...p}/>} />
						<Route path="/logout" render={p => (feathers.logout(), feathers.emit('logout'), p.history.push('/')), null} />
						<Route component={NotFound} />
					</Switch>
				</Container>
				<Sidebar as={Message}
					visible={sidebar.visible} 
					content={sidebar.message}
					negative={sidebar.error}
					direction='bottom' 
					animation='overlay' 
					width='thin' 
					inverted='true'
				 />
				<footer style={{position: 'fixed', bottom: 0, right: '8px', fontSize: 'x-small'}}>
					© 2018 Intergalactic Balkan Festivals Unlimited
				</footer>
		  	</div>
		)
	}
}
/*
						<Route path="/events" exact render={p => <EventsListPage {...this.props} user={user} />} />
						<Route path="/event/:eventId" render={p => <EventPage {...this.props} {...p} user={user} />} />
						<Route path="/gig/:gigId" render={p => <GigDetailsPage {...this.props} {...p} user={user} />} />
						<Route path="/act/:actId" render={p => <ActDetailsPage {...this.props} {...p} user={user} />} />
*/
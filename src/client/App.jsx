import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Container, Divider, Dropdown, Grid, Header, Image, List, Menu, Segment } from 'semantic-ui-react'
import AppMenu from '../ui/AppMenu.jsx'
import EventsListPage from '../ui/EventsListPage.jsx'
import EventPage from '../ui/event/EventPage.jsx'
import GigDetailsPage from '../ui/gig/GigDetailsPage.jsx'
import LoginForm from '../ui/LoginForm.jsx'

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

// const EventListPage = props => <div>List of events</div> 

export default class App extends React.Component {
	state = {
		user: this.props.user,
	}
	componentWillMount() {
		const { feathers } = this.props
		feathers.on('user.login', user => this.setState({user}))
		feathers.on('logout', () => this.setState({ user: null }))
	}
	render() {
		const { feathers, history } = this.props
		const { user } = this.state
		return (
			<div style={{ marginTop: '7em' }}>
				<Route path="/:section?/:id?/:mode?" render={p => <AppMenu {...this.props} {...p} user={user} />} />

				<Container text >
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/events" exact render={p => <EventsListPage {...this.props} />} />
						<Route path="/event/:eventId" render={p => <EventPage {...this.props} {...p} user={user} />} />
						<Route path="/gig/:gigId" render={p => <GigDetailsPage {...this.props} {...p} user={user} />} />
						<Route path="/login" render={p => <LoginForm {...this.props} {...p}/>} />
						<Route path="/logout" render={p => (feathers.logout(), feathers.emit('logout'), p.history.push('/')), null} />
						<Route component={NotFound} />
					</Switch>
					<p>{this.props.user && this.props.user.email}</p>
				</Container>

				<footer style={{position: 'fixed', bottom: 0, right: '8px', fontSize: 'x-small'}}>
					© 2018 Intergalactic Balkan Festivals Unlimited
				</footer>
		  	</div>
		)
	}
}
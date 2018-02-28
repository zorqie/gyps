import React from 'react'

import { Link, Route, Redirect, Switch } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'

import EventCards from '../event/EventCards.jsx'
import EventDetails from '../event/EventDetails.jsx'
import EventHeader from '../event/EventHeader.jsx'
import EventProfilePage from './EventProfilePage.jsx'
import GigDetailsPage from './GigDetailsPage.jsx'
import VenueDetailsPage from './VenueDetailsPage.jsx'
import LineupPage from './LineupPage.jsx'
import Schedule from '../Schedule.jsx'
import ScrollToTopOnMount from '../ScrollTop.jsx'

// import VenuePage from './VenuePage.jsx'
// import ActDetailsPage from './ActDetailsPage.jsx'
import { ticketsByGig } from '../utils.jsx'

// Event types the user can choose to join or not
const optional = ['Performance', 'Workshop'] 

export default class EventPage extends React.Component {
	state = {
		event: null,
		tickets: [],
		gigs: [],
		loading: true,
	}

	async componentWillMount() {
		const { eventId } = this.props.match.params
		const { feathers, user } = this.props
		feathers.on('logout', () => this.setState({ tickets: [] }))
		feathers.service('tickets').on('created', this.ticketCreated)
		feathers.service('tickets').on('removed', this.ticketRemoved)
		feathers.service('tickets').on('patched', this.ticketPatched)
		try {
			const event = await feathers.service('events').get(eventId)
			this.setState({ event })
			if(user) {
				feathers.set('event', event)
				feathers.emit('user.event', event)
				this.fetchMore(user)
			}
		} catch (error) {
			console.error('Event ERROR. ', error)
			feathers.emit('error', error)
		}
	}

	componentWillUnmount() {
		const { feathers } = this.props
		feathers.service('tickets').removeListener('created', this.ticketCreated)
		feathers.service('tickets').removeListener('removed', this.ticketRemoved)
		feathers.service('tickets').removeListener('patched', this.ticketPatched)
	}

	async componentWillReceiveProps(nextProps) {
		if (nextProps.user && nextProps.user !== this.props.user) {
			console.log("EventPage got user:", nextProps)
			this.fetchMore(nextProps.user)
		}
	}

	async fetchMore(user) {
		if (user) {
			try {
				const { feathers, match } = this.props
				const { eventId } = match.params
				const gigs = await feathers.service('gigs').find({
					query: {
						parent: eventId,
					//	type: { $in: optional }, // TODO we should filter later
						$sort: { start: 1 }
					}
				})
				this.setState({ event: {...this.state.event, gigs: gigs.data || gigs } })
				const tickets = await feathers.service('tickets').find()
				this.setState({ tickets: tickets.data || tickets })
			} catch (e) {
				console.error("Feching More ERROR: ", e)
			}
		}
	}

	ticketCreated = ticket => {
		if(typeof window !== 'undefined') console.log("Ticketed: ", ticket)
		this.setState({tickets: this.state.tickets.concat(ticket)})
	}

	ticketRemoved = ticket => {
		if(typeof window !== 'undefined') console.log("Ticket removed: ", ticket)
		this.setState({tickets: this.state.tickets.filter(t=>t._id!==ticket._id)})
	}

	ticketPatched = ticket => {
		// TODO consider removing, we never patch tickets
		console.log("Ticket updated: ", ticket) // this is likely before hooks ?
		const tickets = this.state.tickets.filter(t=>t._id!==ticket._id).concat(ticket)	
		this.setState({tickets})
	}

	render() {
		const { event, gigs, tickets } = this.state
		const { user, feathers, match } = this.props
		// console.log("EventPage.event", event)
		return (
			event && <div>
				<ScrollToTopOnMount />
			    <EventHeader event={event} />
				<Switch>
				
				<Route 
					path={`/event/:eventId/venue/:venueId`}
					render={props => <VenueDetailsPage {...this.props} {...props}  tickets={tickets} />}
				/>
				<Route 
					path={`/event/:eventId/:type?/gig/:gigId`}
					render={props => <GigDetailsPage {...this.props} {...props} event={event} tickets={tickets} />}
				/>
				<Route 
					path={`/event/:eventId/cards`}
					render={() => <EventCards {...this.props} event={event} tickets={tickets} />}
				/>
				<Route 
					path={`/event/:eventId/lineup`}
					render={() => <LineupPage {...this.props} event={event} tickets={tickets} />}
				/>
				<Route 
					path={`/event/:eventId/schedule`}
					render={() => <Schedule {...this.props} event={event} />}
				/>
				<Route 
					path={`/event/:eventId/profile`}
					render={() => <EventProfilePage {...this.props} event={event} />}
				/>
				<Route 
					path={`/my-schedule`}
					render={() => <Schedule {...this.props} event={event} tickets={tickets} />}
				/>
				<Route 
					path={`/event/:eventId/:type?`}
					exact
					render={props => <EventDetails 
 							{...this.props}
 							{...props} 
 							event={event} 
 							gigs={event.gigs} 
 							tickets={tickets} 
 						/>}
				/>
				</Switch>
			</div> 
 			|| <Loader active>Loading...</Loader>
		)
	}
}
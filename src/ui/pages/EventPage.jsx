import React from 'react'

import { Link, Route, Redirect, Switch } from 'react-router-dom'

import EventDetails from '../event/EventDetails.jsx'
import EventCards from '../event/EventCards.jsx'
import GigDetailsPage from './GigDetailsPage.jsx'
import VenueDetailsPage from './VenueDetailsPage.jsx'
import LineupPage from './LineupPage.jsx'
import Schedule from '../Schedule.jsx'
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
		error: null,
	}

	async componentWillMount() {
		const { eventId } = this.props.match.params
		const { feathers, user } = this.props
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
			this.setState({error})
		}
	}

	async componentWillReceiveProps(nextProps) {
		console.log("EventPage will receive PROPS", nextProps)
		if (nextProps.user !== null) {
			this.fetchMore(nextProps.user)
		}
	}

	async fetchMore(user) {
		const { eventId } = this.props.match.params
		const { feathers } = this.props
		// console.log("Fetching more...", user)
		if (user) {
			try {
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
		const { error, event, gigs, tickets } = this.state
		const { user, feathers, match } = this.props
		console.log("EventPage.event", event)
		return (
			<div>
				<Switch>
				{/*<Route 
					path={`${match.url}/lineup`}
					render={() => <LineupPage tickets={tickets} />}
				/>
				<Route 
					path={`${match.url}/schedule`}
					render={() => <Schedule {...this.props} tickets={tickets} />}
				/>
				<Route 
					path={`${match.url}/act/:actId`}
					render={props => <ActDetailsPage {...this.props} {...props}  tickets={tickets} />}
				/>
				*/}
				
				<Route 
					path={`/event/:eventId/venue/:venueId`}
					render={props => <VenueDetailsPage {...this.props} {...props}  tickets={tickets} />}
				/>
				<Route 
					path={`/event/:eventId/gig/:gigId`}
					render={props => <GigDetailsPage {...this.props} {...props} event={event} tickets={tickets} />}
				/>
				<Route 
					path={`/event/:eventId/cards`}
					render={() => <EventCards {...this.props} event={event} tickets={tickets} />}
				/>
				<Route 
					path={`/event/:eventId/lineup`}
					render={() => <LineupPage {...this.props} event={event} />}
				/>
				<Route 
					path={`/event/:eventId/schedule`}
					render={() => <Schedule {...this.props} event={event} />}
				/>
				<Route 
					path={`/my-schedule`}
					render={() => <Schedule {...this.props} event={event} tickets={tickets} />}
				/>
				<Route 
					path={`/event/:eventId/:type?`}
					exact
					render={props => 
						(event && <EventDetails 
 							{...this.props}
 							{...props} 
 							event={event} 
 							gigs={event.gigs} 
 							tickets={tickets} 
 						/>) 
 						|| (error && 'An error occurified.')
 						|| 'Loading...'}
				/>
				</Switch>
			</div> 
		)
	}
}
import React from 'react'

import { Link, Route, Redirect, Switch } from 'react-router-dom'

import EventDetails from './EventDetails.jsx'
// import GigDetailsPage from './GigDetailsPage.jsx'
// import LineupPage from './lineup.jsx'
// import Schedule from './my-schedule.jsx'
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
		console.log("Fetching more...", user)
		try {
			if (user) {
				const gigs = await feathers.service('gigs').find({
					query: {
						parent: eventId,
						type: { $in: optional }, // TODO we should filter later
						$sort: { start: 1 }
					}
				})
				console.log("GOT GIGGLES", gigs)
				this.setState({ event: {...this.state.event, gigs: gigs.data || gigs } })
				const tickets = await feathers.service('tickets').find()
				this.setState({ tickets: tickets.data || tickets })
			}
		} catch (e) {
			console.error("Feching More ERROR: ", e)
		}
	}

	ticketCreated = ticket => {
		// ticket doesn't have the hooks applied so we need to get it from service
		this.props.feathers.service('tickets').get(ticket._id)
		.then(t => {
			console.log("Ticketed: ", t)
			this.setState({tickets: this.state.tickets.concat(t)})
		})
		.catch(console.error)
	}

	ticketRemoved = ticket => {
		console.log("Ticket removed: ", ticket)
		this.setState({tickets: this.state.tickets.filter(t=>t._id!==ticket._id)})
	}

	ticketPatched = ticket => {
		console.log("Ticket updated: ", ticket) // this is likely before hooks ?
		const tickets = this.state.tickets.filter(t=>t._id!==ticket._id).concat(ticket)	
		this.setState({tickets})
	}

	render() {
		const { error, event, gigs, tickets } = this.state
		const { user, feathers, match } = this.props
		// console.log("GIGGLES: ", user)
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
					path={`${match.url}/site/:venueId`}
					render={props => <VenuePage {...this.props} {...props}  tickets={tickets} />}
				/>
				<Route 
					path={`${match.url}/act/:actId`}
					render={props => <ActDetailsPage {...this.props} {...props}  tickets={tickets} />}
				/>
				<Route 
					path={`${match.url}/gig/:gigId`}
					render={props => 
						<GigDetailsPage 
							{...this.props}
							{...props} 
							ticketsByGig={ticketsByGig(tickets)}
						/>}
				/>*/}
				<Route 
					path={match.url}
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
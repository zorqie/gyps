import React from 'react'
import PropTypes from 'prop-types'

import { Loader } from 'semantic-ui-react'

import errorHandler from '../errorHandler'
import { viewItem, gigJoin, gigLeave } from '../utils.jsx'

import GigCard from '../gig/GigCard.jsx'

const isAttending = (gig, tickets, status) => {
	// console.log("GTS: ", gig, tickets, status)
	return tickets && tickets.find(t => 
		t.status === status
		&& (t.gig_id === gig._id || t.gig.parent===gig._id)
	)
}


export default class GigDetailsPage extends React.Component {
	state = {
		gig: {},
		loaded: false,
	}

	componentDidMount() {
		const { feathers } = this.props
		this.fetchData()
		feathers.service('gigs').on('patched', this.fetchData)
	}

	componentWillUnmount() {
		const { feathers } = this.props
		// remove listners
		feathers.service('gigs').removeListener('patched', this.fetchData)
	}

	componentWillReceiveProps(next) {
		// console.log("this.state", this.state)
		// console.log("next.params", next.match.params)
		const { params } = this.props.match
		// console.log("this.params", this.props.match.params)
		if (params.gigId !== next.match.params.gigId) {
			this.setState({loaded: false})
			this.fetchData(next.match.params)
		}
	}

	fetchData = (params) => {
		const { feathers } = this.props
		const gigId = (params && params.gigId) || this.props.match.params.gigId
		if (gigId) {
			feathers.service('gigs').get(gigId)
			.then(gig => this.setState({gig, loaded: true}))
			.catch(errorHandler(this.props))
		}
	} 


	render() {
		const { gig, loaded } =  this.state
		const { tickets, feathers, history } = this.props
		// console.log("GigDetails.tickets", tickets)
		const status = gig.type==='Volunteer' ? 'Volunteering' : 'Attending'
		const attending = gig.shifts && gig.shifts.length===0 && isAttending(gig, tickets, status)
		// console.log("GigDetails.attending? ", attending)
		const gigProps = {
			gig, 
			tickets,
			attending,
			history,
			handleJoin: gigJoin(feathers), 
			handleLeave: gigLeave(feathers), 
			viewActDetails: viewItem(history, '../act/'),
			viewGig: viewItem(history, './gig/'),
		}
		// console.log("GigDetails.gig", gig)
		return loaded 
			&& <GigCard {...gigProps} /> 
			|| <Loader active>Loading...</Loader>
	}
}

GigDetailsPage.propTypes = {
	tickets: PropTypes.array, // map gig._id = status
	onJoin: PropTypes.func, 
	onLeave: PropTypes.func, 
}
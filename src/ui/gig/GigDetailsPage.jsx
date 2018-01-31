import React from 'react'
import PropTypes from 'prop-types'

import errorHandler from '../errorHandler'
import { viewAct, gigJoin, gigLeave } from '../utils.jsx'

import GigCard from './GigCard.jsx'

export default class GigDetailsPage extends React.Component {
	state = {
		gig: {},
		shifts: [],
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
		// console.log("next.params", next.params)
		// console.log("this.params", this.props.params)
		if (next.params !==this.props.params) {
			this.setState({loaded: false})
			this.fetchData(next.params)
		}
	}

	fetchData = (params) => {
		const { feathers } = this.props
		const gigId = (params && params.gigId) || this.props.match.params.gigId
		if(gigId) {
			feathers.service('gigs').get(gigId)
			.then(gig => {
				feathers.service('gigs').find({
					query: {
						parent: gig._id
					}
				})
				.then(result => this.setState({gig, shifts: result.data || result, loaded: true}))
			})
			.catch(errorHandler(this.props))
		}
	} 


	render() {
		const { gig, shifts, loaded } =  this.state
		const { onJoin, onLeave, ticketsByGig, feathers, match } = this.props

		const handleJoin = onJoin || gigJoin(feathers)
		const handleLeave = onLeave || gigLeave(feathers)
				
		const gigProps = {
			gig, 
			shifts, 
			handleJoin, 
			handleLeave, 
			ticketsByGig, 
			viewActDetails: viewAct(feathers, '../act/'),
		}
		console.log("Hooked gig", gig)
		return loaded 
			&& <GigCard {...gigProps} /> 
			|| 'Loading...'
	}
}

GigDetailsPage.propTypes = {
	ticketsByGig: PropTypes.object, // map gig._id = status
	onJoin: PropTypes.func, 
	onLeave: PropTypes.func, 
}
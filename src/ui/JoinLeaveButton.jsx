import React from 'react'

import { Button, Icon } from 'semantic-ui-react'

import { gigJoin, gigLeave, viewItem } from './utils.jsx'
import { plusOutline, minusBox } from './icons.jsx'



const handleGigJoin = ({feathers, history}) => (gig, status) => {
	feathers.service('gigs').find({query: {parent: gig._id}})
	.then(result => {
		if(result.total) {
			// has children
			viewItem(history, '/gig/')(gig)
		} else {
			// console.log("Go join the gig")
			gigJoin(feathers)(gig, status)
		}
	})
}

const handleGigLeave = ({feathers, history}) => (gig, status) => {
	feathers.service('gigs').find({query: {parent: gig._id}})
	.then(result => {
		if(result.total) {
			// has children
			viewItem(history, '/gig/')(gig)
		} else {
			// console.log("Go join the gig")
			gigLeave(feathers)(gig, status)
		}
	})
}

export default class JoinLeaveButton extends React.Component {
	handleLeave = handleGigLeave(this.props)
	handleJoin = handleGigJoin(this.props)
	render() {
		const {gig, attending, status='Attending', floated, ...others} = this.props
		console.log("________________EVENT JOIN LEAVE BUTTON _________", others)
		return (
			// isAttending(gig, tickets, status) 
			attending
			? <Button 
				icon
				floated={floated}
				secondary
				onClick={this.handleLeave.bind(null, gig, status)}
			><Icon fitted name="minus"/></Button>
			: <Button
				icon 
				floated={floated}
				basic
				onClick={this.handleJoin.bind(null, gig, status)}
			>	
				<Icon name='plus'/>
			</Button>
		)
	}
}
import React from 'react'

import { Button, Icon } from 'semantic-ui-react'

import { gigJoin, gigLeave, viewItem } from './utils.jsx'

const handleGigJoin = ({feathers, history}) => (gig, status, e) => {
	e.preventDefault()
	e.stopPropagation()
	const { shifts } = gig
	if (shifts && shifts.length) {
		// has children
		viewItem(history, '/gig/')(gig)
	} else {
		// console.log("Go join the gig")
		gigJoin(feathers)(gig, status)
	}
	return false
}

const handleGigLeave = ({feathers, history}) => (gig, status, e) => {
	e.preventDefault()
	e.stopPropagation()
	const { shifts } = gig
	if (shifts && shifts.length) {
		// has children
		viewItem(history, '/gig/')(gig)
	} else {
		// console.log("Go join the gig")
		gigLeave(feathers)(gig, status)
	}
	return false
}

export default class JoinLeaveButton extends React.Component {
	handleLeave = handleGigLeave(this.props)
	handleJoin = handleGigJoin(this.props)
	viewGig = viewItem(this.props.history, '/gig/')
	render() {
		const {gig, attending, status='Attending', floated, ...others} = this.props
		// console.log("________________EVENT JOIN LEAVE BUTTON _________", others)
		return (
			// isAttending(gig, tickets, status) 
			attending
			? <Button 
				icon
				floated={floated}
				secondary
				onClick={this.handleLeave.bind(null, gig, status)}
			><Icon name="minus"/></Button>
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
import React from 'react'

import { Button, Icon } from 'semantic-ui-react'

import { gigJoin, gigLeave, viewItem } from './utils.jsx'

const handleGigJoin = ({feathers, history, status='Attending'}) => (gig, e) => {
	e.preventDefault()
	e.stopPropagation()
	const { shifts } = gig
	if (shifts && shifts.length) {
		// has children
		viewItem(history, '/gig/')(gig)
	} else {
		gigJoin(feathers, status)(gig)
	}
}

const handleGigLeave = ({feathers, history, status='Attending'}) => (gig, e) => {
	e.preventDefault()
	e.stopPropagation()
	const { shifts } = gig
	if (shifts && shifts.length) {
		// has children
		viewItem(history, '/gig/')(gig)
	} else {
		gigLeave(feathers, status)(gig)
	}
}

export default class JoinLeaveButton extends React.Component {
	handleLeave = handleGigLeave(this.props)
	handleJoin = handleGigJoin(this.props)
	viewGig = viewItem(this.props.history, '/gig/')
	render() {
		const {gig, attending, ...others} = this.props
		// console.log("________________EVENT JOIN LEAVE BUTTON _________", others)
		return (
			// isAttending(gig, tickets, status) 
			gig.mandatory 
			? <Icon name="calendar check" size="big" title="No skipping that one"/> 
			:
			attending
			? <Icon 
				name="calendar minus" 
				size="big" 
				color="red"
				link
				onClick={this.handleLeave.bind(null, gig)}
			/>
			: <Icon 
				name='calendar plus' 
				size="big"
				link
				title='Join'
				onClick={this.handleJoin.bind(null, gig)}
			/>
		)
	}
}
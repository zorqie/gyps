import React from 'react'

import { Icon } from 'semantic-ui-react'

import app from '../../client/feathers'
import { gigJoin, gigLeave } from '../utils.jsx'

export default function GigJoinButton({gig, attending, status='Attending', size='big', handleJoin = ()=>{}, handleLeave = ()=>{}}) {
	return (
		// isAttending(gig, tickets, status) 
		gig.mandatory 
		? <Icon name="calendar check" size={size} title="No skipping that one"/> 
		:
			attending
			? <Icon 
				name="calendar minus" 
				size={size} 
				color="red"
				link
				title="Leave"
				onClick={gigLeave(app, status).bind(null, gig)}
			/>
			: <Icon 
				name='calendar plus' 
				size={size}
				link
				title='Join'
				onClick={gigJoin(app, status).bind(null, gig)}
			/>
	)
}
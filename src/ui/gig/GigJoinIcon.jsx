import React from 'react'

import { Icon } from 'semantic-ui-react'

export default function GigJoinButton({gig, attending, size='big', handleJoin = ()=>{}, handleLeave = ()=>{}}) {
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
				onClick={handleLeave.bind(null, gig)}
			/>
			: <Icon 
				name='calendar plus' 
				size={size}
				link
				title='Join'
				onClick={handleJoin.bind(null, gig)}
			/>
	)
}
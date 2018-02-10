import React from 'react'

import { Button, Icon } from 'semantic-ui-react'

export default function GigJoinButton({gig, attending, status='Attending', handleJoin, handleLeave, hideLabel=true}) {
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
				title="Leave"
				onClick={handleLeave.bind(null, gig, status)}
			/>
			: <Icon 
				name='calendar plus' 
				size="big"
				link
				title='Join'
				onClick={handleJoin.bind(null, gig, status)}
			/>
	)
}
import React from 'react'
import { Button, Icon, Image, Item } from 'semantic-ui-react'

import GigTimespan from '../GigTimespan.jsx'
import JoinLeaveButton from '../JoinLeaveButton.jsx'

const isAttending = (gig, tickets, status) => {
	// console.log("GTS: ", gig, tickets, status)
	return tickets && tickets.find(t => 
		t.status === status
		&& (t.gig_id === gig._id || t.gig.parent===gig._id)
	)
}


export default function GigItem({ gig, tickets, status='Attending', ...others }) {
	return (
		<Item>
			<Item.Image 
				wrapped
				size='small' 
				src={`/images/${gig._id}_tile.jpg`}
			/>
			<Item.Content verticalAlign='middle'>
				<Item.Header as="h2" >{gig.name}</Item.Header>
				<Item.Extra style={{marginTop:0}}>
					<GigTimespan gig={gig} />
					<JoinLeaveButton 
						gig={gig} 
						{...others} 
						floated='right'
						attending={isAttending(gig, tickets, status)}
					/>
				</Item.Extra>
				<Item.Description>{gig.description}</Item.Description>
			</Item.Content>
		</Item>
	)
}
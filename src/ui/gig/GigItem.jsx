import React from 'react'

import { Link } from 'react-router-dom'

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
	const { shifts } = gig
	return (
		<Item as={Link} to={`/gig/${gig._id}`}>
			<Item.Image 
				wrapped
				size='small' 
				src={`/images/${gig._id}_tile.jpg`}
			/>
			<Item.Content verticalAlign='middle'>
				<Item.Header as="h2" >{gig.name}</Item.Header>
				<Item.Extra style={{marginTop:0}}>
					<GigTimespan gig={gig} />
					{shifts && shifts.length 
						&& <Button floated='right'>Shifted</Button>
						|| <JoinLeaveButton 
						gig={gig} 
						{...others} 
						floated='right'
						attending={isAttending(gig, tickets, status)}
					/>}
				</Item.Extra>
				<Item.Description>{gig.description}</Item.Description>
			</Item.Content>
		</Item>
	)
}
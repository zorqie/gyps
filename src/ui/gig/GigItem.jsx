import React from 'react'

import { Link } from 'react-router-dom'

import { Button, Icon, Image, Item, List } from 'semantic-ui-react'

import GigTimespan from '../GigTimespan.jsx'
import JoinLeaveButton from '../JoinLeaveButton.jsx'

const isAttending = (gig, tickets, status) => {
	// console.log("GTS: ", gig, tickets, status)
	return tickets && tickets.find(t => 
		t.status === status
		&& (t.gig_id === gig._id || t.gig.parent===gig._id)
	)
}


export default function GigItem({ gig, tickets, status='Attending', onSelect, ...others }) {
	const { shifts } = gig
	return (
		<List.Item onClick={onSelect.bind(null, gig)}>
			<Image 
				wrapped
				floated='left'
				size='small' 
				src={`/images/${gig._id}_tile.jpg`}
			/>
			<List.Content  floated='left'>
				<List.Header as="h2" >{gig.name}</List.Header>
				<Item.Extra style={{marginTop:0}}>
					<GigTimespan gig={gig} />
					
				</Item.Extra>
				<Item.Description>{gig.description}</Item.Description>
			</List.Content>
			<List.Content floated='right'>
				{shifts && shifts.length 
						&& <Button >Shifted</Button>
						|| <JoinLeaveButton 
						gig={gig} 
						{...others} 
						floated='right'
						attending={isAttending(gig, tickets, status)}
					/>}
			</List.Content>
		</List.Item>
	)
}
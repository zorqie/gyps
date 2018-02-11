import React from 'react'

import { Link } from 'react-router-dom'

import { Button, Icon, Image, Item, List } from 'semantic-ui-react'

import GigTimespan from '../GigTimespan.jsx'
import JoinLeaveButton from '../JoinLeaveButton.jsx'

// TODO this shoud be somewhere else, both files and logic
const isAttending = (gig, tickets, status) => {
	// console.log("GTS: ", gig, tickets, status)
	return tickets && tickets.find(t => 
		t.status === status
		&& (t.gig_id === gig._id || t.gig.parent===gig._id)
	)
}


export default function GigItem({ gig, tickets, status='Attending', onSelect, ...others }) {
	const { shifts } = gig
	const meta = (gig.acts && gig.acts.length && 'With ' + gig.acts.map(a=>a.name).join(', ')) 
		|| '\u00A0'
	return (
		<List.Item onClick={onSelect.bind(null, gig)}>
			<Image 
				wrapped
				floated='left'
				size='small' 
				src={`/images/${gig._id}_tile.jpg`}
			/>
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
			<List.Content  floated='left'>
				<Item.Extra>
					<GigTimespan gig={gig} />
				</Item.Extra>
				<List.Header as="h2" >{gig.name}</List.Header>
				<List.Description>{gig.description}</List.Description>
				<Item.Extra>{meta}</Item.Extra>
			</List.Content>
		</List.Item>
	)
}
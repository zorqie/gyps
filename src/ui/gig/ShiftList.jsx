import React from 'react'

import { List } from 'semantic-ui-react'

import GigJoinButton from './GigJoinButton.jsx'
import GigTimespan from '../GigTimespan.jsx'

function ShiftItem({shift, actionButton, ...others}) {
	const primary = shift.type==='Volunteer' 
		? <GigTimespan gig={shift} /> 
		: <div>{shift.name} - {shift.description}</div> 
	
	const secondary = shift.type==='Volunteer' 
		? '' 
		: <GigTimespan gig={shift} />

	// console.log("SHIFT", shift)
	// console.log("Action button: ", actionButton)
	return <List.Item {...others}>
			<List.Header as="h3">{primary}</List.Header>
			{secondary}
			<List.Content floated="right">{actionButton}</List.Content>
		</List.Item>
}

export default function ShiftList({shifts, status='Attending', viewGig, ticketsByGig, ...others}) {
	return (
		<List selection relaxed divided>
			{shifts.map(shift => 
				<ShiftItem 
					key={shift._id} 
					shift={shift}
					onClick={viewGig && viewGig.bind(null, shift)}
				/>
			)}
		</List>
	)	
}
import React from 'react'

import { List } from 'semantic-ui-react'

import GigJoinIcon from './GigJoinIcon.jsx'
import GigTimespan from '../GigTimespan.jsx'
import { isAttending } from '../utils.jsx'


function ShiftItem({shift, onClick, ...others}) {
	const primary = shift.type==='Volunteer' 
		? <GigTimespan gig={shift} /> 
		: <div>{shift.name} - {shift.description}</div> 
	
	const secondary = shift.type==='Volunteer' 
		? '' 
		: <GigTimespan gig={shift} />

	// console.log("SHIFT", shift)
	// console.log("Action button: ", actionButton)
	return <List.Item onClick={onClick}>
			<List.Header as="h3">{primary}</List.Header>
			{secondary}
			<List.Content floated="right">
				<GigJoinIcon gig={shift} {...others} />
			</List.Content>
		</List.Item>
}

export default function ShiftList({shifts, status='Attending', viewGig, tickets, ...others}) {
	return (
		<List selection relaxed divided>
			{shifts.map(shift => 
				<ShiftItem 
					key={shift._id} 
					{...others}
					shift={shift}
					attending={isAttending(shift, tickets, status)}
					onClick={viewGig && viewGig.bind(null, shift)}
				/>
			)}
		</List>
	)	
}
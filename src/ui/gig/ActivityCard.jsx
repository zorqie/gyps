import React from 'react'

import { Button, Divider, Header, Item } from 'semantic-ui-react'

import GigTimespan from '../GigTimespan.jsx'
import ActsList from '../ActsList.jsx'
import { isAttending, viewGig, viewAct } from '../utils.jsx'

function ActionButton({gig, tickets, status='Attending', onJoin, onLeave, floated}) { 

	return isAttending(gig, tickets, status) 
			? <Button 
				icon="minus" 
				label="Leave" 
				negative 
				floated="right"
				onClick={onLeave.bind(null, gig, status)} 
				/> 
			: <Button 
				icon="plus" 
				label="Join" 
				positive 
				floated="right"
				onClick={onJoin.bind(null, gig, status)}
				/> 
}

function ShiftItem({shift, onSelect, actionButton}) {
	const primary = shift.type==='Volunteer' 
		? <GigTimespan gig={shift} /> 
		: <div>{shift.name}-{shift.description}</div> 
	
	const secondary = shift.type==='Volunteer' 
		? '' 
		: <GigTimespan gig={shift} />

	// console.log("SHIFT", shift)
	// console.log("Action button: ", actionButton)
	return <Item 
			onClick={onSelect}
			
		>
			<Header as="h2">{primary}</Header>
			{secondary}
			<span floated="right">{actionButton}</span>
		</Item>
}

function Attendance({gig}) {
	return gig.attending 
		&& <span style={{float:'right', fontSize:'smaller'}}>
			Attending: {gig.attending.length}
		</span>
		|| null
}

export default class ActivityCard extends React.Component {

	render() {
		const { gig, shifts, ticketsByGig, onActSelect, viewGig, ...others /*onJoin, onLeave*/ } = this.props 
		console.log("CARD props", this.props)
		const status = gig.type==='Volunteer' ? 'Volunteering' : 'Attending'
		const actsTitle = gig.type==='Workshop' ? 'Led by:' : gig.type==='Performance' ? 'Featuring: ' : ''
		return gig._id && <div>
			<h2>{gig.name}</h2>
			<p>{gig.description}</p>
			{!shifts.length && <Attendance gig={gig} /> || ''}
			{!shifts.length && gig.type!=='Volunteer'
				&& <ActsList acts={gig.acts} onSelect={onActSelect} title={actsTitle} />
				|| ''
			}
			{shifts.map(shift => 
				<ShiftItem 
					key={shift._id} 
					shift={shift}
					onSelect={viewGig && viewGig.bind(this, shift)}
					actionButton={<ActionButton gig={shift} status={status} tickets={ticketsByGig} {...others}/>}
				/>
			)}
			{shifts.length === 0
				&& <div style={{marginTop:'1.5em'}}>
						{gig.type && ticketsByGig && <ActionButton gig={gig} status={status} tickets={ticketsByGig} {...others}/>}
					</div>
			}
		</div>
		|| null
	}
}

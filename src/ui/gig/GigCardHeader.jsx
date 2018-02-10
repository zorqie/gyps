import React from 'react'

import { Card } from 'semantic-ui-react'
import AttendanceLabel from './AttendanceLabel.jsx'
import ActsList from '../ActsList.jsx'

export default function GigCardHeader({gig, onActSelect}) {
	const { shifts } = gig
	return (<Card.Header>
		
		<h2>{gig.name}</h2>
		<p>{gig.description}</p>
		{shifts && !shifts.length 
			&& <AttendanceLabel gig={gig} /> 
			|| ''
		}
		{shifts && !shifts.length && gig.type!=='Volunteer'
			&& <ActsList acts={gig.acts} onSelect={onActSelect} title="With:" compact />
			|| ''
		}
	</Card.Header>
	)
}
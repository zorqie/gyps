import React from 'react'

import { Header } from 'semantic-ui-react'

import GigTimespan from '../GigTimespan.jsx'

export default function EventHeader({event}) {
	return (
		<Header style={{fontWeight: '300'}}> 
			<b style={{fontSize: 'x-large'}}>{event.name}</b>
			{event.acts.length 
				&& <span> (with {event.acts.map(act => act.name).join(', ')})</span>
				|| ''
			}
			<div>
				<GigTimespan gig={event} showRelative={true} style={{fontSize: 'smaller'}} />
			</div>
			<div style={{fontWeight: '300'}}>at <b>{event.venue.name}</b></div>
	    </Header>
	)
}
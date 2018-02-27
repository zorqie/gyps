import React from 'react'

import { Header, Label } from 'semantic-ui-react'

import GigTimespan from '../GigTimespan.jsx'
import styles from '../styles'

export default function EventHeader({event, showVenue = true}) {
	return (
		<Header dividing> 
			<b style={{fontWeight: '300',fontSize: 'x-large'}}>{event.name}</b>
			{event.acts.length 
				&& <span> (with {event.acts.map(act => act.name).join(', ')})</span>
				|| ''
			}
			{showVenue 
				&& <Header floated='right'>
					<Label style={styles.venue} basic>
						<span style={{fontSize:'x-small'}}>at</span>
						<Label.Detail>{event.venue.name}</Label.Detail>
					</Label>
				</Header>
				|| ''
			}
			<Header.Subheader floated='left'>
				<GigTimespan gig={event} showRelative={true} style={{fontSize: 'smaller'}} />
			</Header.Subheader>
	    </Header>
	)
}
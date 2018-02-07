import React from 'react'

import { Link } from 'react-router-dom'

import { Avatar, Card, Image, Item } from 'semantic-ui-react'

import ActsList from '../ActsList.jsx'
import GigTime from '../GigTime.jsx'
import GigTitle from './GigTitle.jsx'

const styles = {
	site: {
		textTransform: 'uppercase', 
		fontSize: 'smaller', 
		fontWeight: 300, 
		letterSpacing: '3px', 
		padding: '1em',
		float: 'right'
	},
	type: {
		float: 'right'
	}
}

export default function GigCardSmall({gig, ticketsByGig, handleJoin, handleLeave, viewActDetails}) {
	return gig 
			&& <Card link={true} href={`/gig/${gig._id}`} raised>
				<Image fluid as='div'  verticalAlign='middle'  style={{height:'150px', overflow: 'hidden'}} src={`/images/${gig._id}_tile.jpg`} />
				<Card.Header>
					<GigTime gig={gig} showDuration={false} showEnd={false} hideYears={true} style={{float:'left'}}/>
					<Link to={`/site/${gig.venue._id}`}>
						<span style={styles.site}>{gig.venue && gig.venue.name || ''}</span>
					</Link>
				</Card.Header>
				<Card.Content>
					<b>{gig.name}</b>
					<span style={styles.type}>{gig.type}</span> 
					<Card.Meta>{gig.description}</Card.Meta>
				</Card.Content>
			</Card>
			|| null
}
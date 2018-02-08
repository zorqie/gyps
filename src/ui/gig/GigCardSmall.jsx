import React from 'react'

import { Link } from 'react-router-dom'

import { Avatar, Card, Image, Item, Label } from 'semantic-ui-react'

import ActsList from '../ActsList.jsx'
import GigTime from '../GigTime.jsx'
import GigTitle from './GigTitle.jsx'

const styles = {
	site: {
		textTransform: 'uppercase', 
		letterSpacing: '3px', 
		float: 'right'
	},
	type: {
		float: 'right'
	}
}

export default function GigCardSmall({gig, ticketsByGig, handleJoin, handleLeave, viewActDetails}) {
	const label = gig.type==='Workshop' ? {content: gig.type, color: 'orange', attached:'bottom left'} : null

	return gig 
			&& <Card link={true} href={`/gig/${gig._id}`} raised>
					<Label attached="top left" basic style={{height: 'auto', padding: '0', border: 'none'}} >
						<GigTime gig={gig} showDuration={false} showEnd={false} hideYears={true} style={{float:'left'}}/>
					</Label>
				<Card.Header>
					<Label attached="top right">
						<Link to={`/venue/${gig.venue._id}`}>
							<span style={styles.site}>{gig.venue && gig.venue.name || ''}</span>
						</Link>
					</Label>
					<b>{'\u00A0'}</b>
				</Card.Header>
				<Image 
					fluid
					as='div' 
					verticalAlign='middle'
					label={label}
					src={`/images/${gig._id}_tile.jpg`} 
					style={{height: '160px', overflow: 'hidden'}}
				/>
				<Card.Content>
					{/*gig.type==='Workshop' && <Label ribbon color="orange">{gig.type}</Label>*/}
					<Card.Header>{gig.name}</Card.Header>
					<Card.Meta>{gig.description}</Card.Meta>
				</Card.Content>
			</Card>
			|| null
}
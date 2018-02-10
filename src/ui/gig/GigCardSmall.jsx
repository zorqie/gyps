import React from 'react'

import { Link } from 'react-router-dom'

import { Avatar, Button, Card, Image, Item, Label } from 'semantic-ui-react'

import ActsList from '../ActsList.jsx'
import GigTime from '../GigTime.jsx'
import GigTitle from './GigTitle.jsx'
import { viewItem } from '../utils.jsx'

const styles = {
	site: {
		textTransform: 'uppercase', 
		letterSpacing: '3px', 
	},
	type: {
		float: 'right'
	}
}

export default function GigCardSmall({gig, ticketsByGig, handleJoin, handleLeave, viewActDetails, history}) {
	const label = gig.type==='Workshop' ? {content: gig.type, color: 'orange', attached:'bottom left'} : null
	const meta = gig.description 
		|| (gig.acts.length && 'With ' + gig.acts.map(a=>a.name).join(', ')) 
		|| '\u00A0'
	return gig 
			&& <Card link={true} href={`/gig/${gig._id}`} raised>
					<Label attached="top left" basic style={{height: 'auto', padding: '0', border: 'none'}} >
						<GigTime gig={gig} showDuration={false} showEnd={false} hideYears={true} style={{float:'left'}}/>
					</Label>
				<Card.Header>
					{gig.venue && <Label attached="top right" style={{padding:0, margin:0}}>
						{/*<Link to={`/venue/${gig.venue._id}`}>*/}
						<Button 
							compact 
							size='mini' 
							onClick={viewItem(history, '/venue/').bind(null, gig.venue)} 
							style={styles.site}
						>
							{gig.venue.name || ''}
						</Button>
						{/*</Link>*/}
					</Label>}
					<b>{'\u00A0'}</b>
				</Card.Header>
				<Image 
					fluid
					as='div' 
					verticalAlign='middle'
					label={label}
					src={`/images/${gig._id}_tile.jpg`} 
					style={{height: '160px', overflow: 'hidden', verticalAlign:'middle'}}
				/>
				<Card.Content>
					{/*gig.type==='Workshop' && <Label ribbon color="orange">{gig.type}</Label>*/}
					<Card.Header>{gig.name}</Card.Header>
					<Card.Meta>{meta}</Card.Meta>
				</Card.Content>
			</Card>
			|| null
}
import React from 'react'

import { Link } from 'react-router-dom'

import { Avatar, Button, Card, Image, Label } from 'semantic-ui-react'

import ActivityCard from './ActivityCard.jsx'
import ActsList from '../ActsList.jsx'
import GigCardHeader from './GigCardHeader.jsx'
import GigTimespan from '../GigTimespan.jsx'
import GigTitle from './GigTitle.jsx'
import ScrollToTopOnMount from '../ScrollTop.jsx'
import ShiftList from './ShiftList.jsx'
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

export default function GigCard({gig, shifts, ticketsByGig, handleJoin, handleLeave, viewActDetails, history}) {
	const label = gig.type==='Workshop' 
		? {content: gig.type, color: 'orange', attached:'bottom left', size:'big'} 
		: null	

	return gig && gig._id 
			&& <Card fluid>
				<Card.Header>
					{/*
					<Avatar>{(gig.type && gig.type.charAt(0)) || ' '}</Avatar>
					*/}
					<ScrollToTopOnMount />
					{gig.venue && <Label attached="top right" style={{padding:0}}>
						{/*<Link to={`/venue/${gig.venue._id}`}>*/}
						<Button onClick={viewItem(history, '/venue/').bind(null, gig.venue)} >
							<span style={styles.site}>{gig.venue.name || ''}</span>
						</Button>
						{/*</Link>*/}
					</Label>}
					<Label basic style={{fontSize:'large', border:0}}>
						<GigTimespan gig={gig} showDuration={true} />
					</Label>
				</Card.Header>
				<Image 
					fluid
					label={label}
					src={`/images/${gig._id}_tile.jpg`} 
				/>
				<Card.Content>
					{/*<ActivityCard 
						gig={gig} 
						ticketsByGig={ticketsByGig} 
						onJoin={handleJoin} 
						onLeave={handleLeave} 
						onActSelect={viewActDetails} 
					/>*/}
					<GigCardHeader gig={gig} onActSelect={viewItem(history, '/act/')} />
				</Card.Content>
				<Card.Content extra>
					{gig.shifts && <ShiftList shifts={gig.shifts} viewGig={viewItem(history, '/gig/')} />}
				</Card.Content>
			</Card>
			|| null
}
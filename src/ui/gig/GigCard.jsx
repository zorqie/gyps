import React from 'react'

import { Link } from 'react-router-dom'

import { Avatar, Card, Image, Label } from 'semantic-ui-react'

import ActivityCard from './ActivityCard.jsx'
import ActsList from '../ActsList.jsx'
import GigTimespan from '../GigTimespan.jsx'
import GigTitle from './GigTitle.jsx'
import ScrollToTopOnMount from '../ScrollTop.jsx'

const styles = {
	site: {
		textTransform: 'uppercase', 
		fontSize: 'smaller', 
		fontWeight: 300, 
		letterSpacing: '3px', 
		padding: '1em'
	},
	type: {
		float: 'right'
	}
}

export default function GigCard({gig, shifts, ticketsByGig, handleJoin, handleLeave, viewActDetails}) {
	return gig && gig._id 
			&& <Card fluid>
				<Card.Header>
					{/*<Avatar>{(gig.type && gig.type.charAt(0)) || ' '}</Avatar>
					<GigTitle gig={gig} />*/}
					<ScrollToTopOnMount />

					<Link to={`/site/${gig.venue._id}`}>
						<span style={styles.site}>{gig.venue && gig.venue.name || ''}</span>
					</Link>
				</Card.Header>
				<Image src={`/images/${gig._id}_tile.jpg`} />
				<Card.Content>
					<Label ribbon>{gig.type}</Label> 
					<GigTimespan gig={gig} showDuration={true} />
					<ActivityCard 
						gig={gig} 
						shifts={shifts}
						ticketsByGig={ticketsByGig} 
						onJoin={handleJoin} 
						onLeave={handleLeave} 
						onActSelect={viewActDetails} 
					/>
				</Card.Content>
			</Card>
			|| null
}
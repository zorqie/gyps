import React from 'react'

import { Avatar, Card } from 'semantic-ui-react'

import ActivityCard from './ActivityCard.jsx'
import ActsList from '../ActsList.jsx'
import GigTimespan from '../GigTimespan.jsx'
import GigTitle from './GigTitle.jsx'

export default function GigCard({gig, shifts, ticketsByGig, handleJoin, handleLeave, viewActDetails}) {
	return gig && gig._id 
			&& <Card fluid>
				<Card.Header>
					{/*<Avatar>{(gig.type && gig.type.charAt(0)) || ' '}</Avatar>
					<GigTitle gig={gig} />*/}
					<span>{gig.type}</span> 
				</Card.Header>
				<Card.Content>
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
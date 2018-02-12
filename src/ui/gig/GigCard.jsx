import React from 'react'

import { Link } from 'react-router-dom'

import { Avatar, Button, Card, Image, Label } from 'semantic-ui-react'

import ActsList from '../ActsList.jsx'
import GigCardHeader from './GigCardHeader.jsx'
import GigJoinButton from './GigJoinButton.jsx'
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
}

export default function GigCard({gig, tickets, attending, handleJoin, handleLeave, viewActDetails, history}) {
	const label = gig.type==='Workshop' 
		? {content: gig.type, color: 'orange', attached:'bottom left', size:'big'} 
		: null	

	return <Card fluid>
				<Card.Header>
					<ScrollToTopOnMount />
					{gig.venue && <Label attached="top right" style={{padding:0}}>
						<Button onClick={viewItem(history, '/venue/').bind(null, gig.venue)} >
							<span style={styles.site}>{gig.venue.name || ''}</span>
						</Button>
					</Label>}
					<Label basic style={{fontSize:'large', border:0}}>
						<GigTimespan gig={gig} showDuration={true} />
					</Label>
				</Card.Header>
				<Image 
					fluid
					label={label}
					style={{height:'30rem', overflow:'hidden'}}
					verticalAlign='middle'
					src={`/images/${gig._id}_tile.jpg`} 
				/>
				<Card.Content>
					<GigCardHeader gig={gig} onActSelect={viewItem(history, '/act/')} />
				</Card.Content>
				<Card.Content extra>
					{gig.shifts && gig.shifts.length
						&& <ShiftList 
							shifts={gig.shifts} 
							tickets={tickets}
							viewGig={viewItem(history, '/gig/')} 
							handleJoin={handleJoin}
							handleLeave={handleLeave}
							/>
						|| <GigJoinButton 
							gig={gig} 
							attending={attending}
							handleJoin={handleJoin}
							handleLeave={handleLeave}
							showLabels={true}
							/>
					}
				</Card.Content>
			</Card>
}
import React from 'react'

import { Link } from 'react-router-dom'

import { Card, Image } from 'semantic-ui-react'

import GigTimespan from './GigTimespan.jsx'

export default class EventPoster extends React.Component {
	render() {
		const { event } = this.props
		return (
			<div>
				<Card fluid>
					<Card.Content>
						<Card.Header style={{fontWeight: 300}}>
							{event.name} 
						</Card.Header>
						<Card.Meta style={{fontSize: 'smaller'}}>
							<GigTimespan gig={event} showRelative={true}/>
						</Card.Meta>
					</Card.Content>
					<Image src={`/images/${event._id}_poster.jpg`} />
					<Card.Content>
						<Card.Description>
							<p>{event.description}</p>
							<Link to={`/event/${event._id}`}>More Info</Link>
						</Card.Description>
					</Card.Content>
				</Card>
			</div>
		)
	}
}
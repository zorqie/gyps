import React from 'react'

import { Link } from 'react-router-dom'

import { Card, Image } from 'semantic-ui-react'

import GigTimespan from './GigTimespan.jsx'

const styles = {
	card: {
		margin: '2em'
	},
	titleRight: {
		float: 'right'
	}
}

export default class EventPoster extends React.Component {
	render() {
		const { event } = this.props
		return (
			<div>
				<Card fluid>
					<Card.Content>
						<Card.Header as="h2" style={{fontWeight: 300}}>
							{event.name} 
						</Card.Header>
						<Card.Meta style={{fontSize: 'smaller'}}>
							<GigTimespan gig={event} showRelative={true}/>
						</Card.Meta>
					</Card.Content>
					<Image src={`/assets/${event._id}_poster.jpg`} />
					<Card.Content>
						<Card.Description>
							<p>{event.description}</p>
							<Link to={`/events/${event._id}`}>More Info</Link>
						</Card.Description>
					</Card.Content>
				</Card>
			</div>
		)
	}
}
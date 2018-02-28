import React from 'react'

import { Container, Icon, List, Segment, Step } from 'semantic-ui-react'

import GigItem from '../gig/GigItem.jsx'

import { viewItem } from '../utils.jsx'

export default class EventDetails extends React.Component {
	render() {
		const { event, tickets, feathers, history, match } = this.props
		const { type } = match.params

		const gigs = type ? event.gigs.filter(g => type.includes(g.type)) : event.gigs
		const selectGig = viewItem(history, `${match.url}/gig/`)

		return event && <Container text>
				<Segment basic>
					Here's some interesting info about this event
					<Step.Group size='mini'>
						<Step completed>
							<Step.Content>
								<Step.Title>Profile</Step.Title>
								<Step.Description>Tell us about yourself</Step.Description>
							</Step.Content>
						</Step>
						<Step active>
							<Step.Content>
								<Step.Title>Volunteer</Step.Title>
								<Step.Description>Choose your contribution</Step.Description>
							</Step.Content>
						</Step>

						<Step disabled>
							<Step.Content>
								<Step.Title>Pay</Step.Title>
								<Step.Description>Purchase tickets</Step.Description>
								</Step.Content>
						</Step>
					</Step.Group>	
				</Segment>
				<Segment basic>
				{gigs.length 
					&& <List relaxed divided selection  verticalAlign='middle'>
						{gigs.map(gig => 
							<GigItem 
								key={gig._id} 
								{...this.props}
								gig={gig}
								onSelect={selectGig}
							/>
						)}
					</List>
				}
				</Segment>
			</Container>
			|| null
	}
}
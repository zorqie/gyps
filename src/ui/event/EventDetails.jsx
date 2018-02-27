import React from 'react'

import { Container, List } from 'semantic-ui-react'

import GigItem from '../gig/GigItem.jsx'

import { viewItem } from '../utils.jsx'
// import JoinLeaveButton from './JoinLeaveButton.jsx'

export default class EventDetails extends React.Component {
	render() {
		const { event, tickets, feathers, history, match } = this.props
		const { type } = match.params

		const gigs = type ? event.gigs.filter(g => type.includes(g.type)) : event.gigs

		return event && <Container text>
				
				{gigs.length 
					&& <List relaxed divided selection  verticalAlign='middle'>
						{gigs.map(gig => 
							<GigItem 
								key={gig._id} 
								{...this.props}
								gig={gig}
								onSelect={viewItem(history, `${match.url}/gig/`)}
							/>
						)}
					</List>
				|| 'Loadifying...'}
			</Container>
			|| null
	}
}
								// rightIconButton={<Kspan><JoinLeaveButton gig={gig} {...this.props} /></Kspan>}
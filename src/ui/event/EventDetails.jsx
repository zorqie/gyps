import React from 'react'

import { Container, Header, List } from 'semantic-ui-react'

import EventHeader from './EventHeader.jsx'
import GigItem from '../gig/GigItem.jsx'
import GigTimespan from '../GigTimespan.jsx'
import ScrollToTopOnMount from '../ScrollTop.jsx'

import { viewItem } from '../utils.jsx'
// import JoinLeaveButton from './JoinLeaveButton.jsx'

export default class EventDetails extends React.Component {
	render() {
		const { event, tickets, feathers, history, match } = this.props
		// const status = this.props.match.params.type === 'Volunteer' ? 'Volunteering' : 'Attending' // TODO this is meaningless
		const { type } = match.params
		console.log("TYPED: ", match)
		const gigs = type ? event.gigs.filter(g => g.type===type) : event.gigs
		// console.log("GIGGGINGING: ", gigs);

		return event && <Container text>
				<ScrollToTopOnMount />
			    <EventHeader event={event} />
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
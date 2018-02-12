import React from 'react'

import { Header, Card, Loader } from 'semantic-ui-react'

import EventHeader from './EventHeader.jsx'
import GigCardSmall from '../gig/GigCardSmall.jsx'
import GigTimespan from '../GigTimespan.jsx'
import ScrollToTopOnMount from '../ScrollTop.jsx'

import { viewGig } from '../utils.jsx'
// import JoinLeaveButton from './JoinLeaveButton.jsx'

const excluded = ['Meal', 'Volunteer']
const gigFilter = gig => !(gig.mandatory || excluded.includes(gig.type)) 

export default class EventCards extends React.Component {
	render() {
		const { event, tickets, feathers, match } = this.props
		// const status = this.props.match.params.type === 'Volunteer' ? 'Volunteering' : 'Attending' // TODO this is meaningless
		if (!event) {
			return null
		}

		const { gigs } = event
		// console.log("GIGGGINGING: ", gigs);

		return event && <div>
				<ScrollToTopOnMount />
			    <EventHeader event={event} />
				{gigs.length 
					&& <Card.Group centered doubling stackable className="centered">
						{gigs.filter(gigFilter).map(gig => 
							<GigCardSmall 
								key={gig._id} 
								{...this.props}
								gig={gig}
								onSelect={viewGig(feathers, `${match.url}/gig/`)}
							/>
						)}
					</Card.Group>
				|| <Loader active>Loadificating...</Loader>}
			</div>
			|| null
	}
}
								// rightIconButton={<Kspan><JoinLeaveButton gig={gig} {...this.props} /></Kspan>}
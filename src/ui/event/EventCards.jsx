import React from 'react'

import { Header, Card } from 'semantic-ui-react'

import GigCardSmall from '../gig/GigCardSmall.jsx'
import GigTimespan from '../GigTimespan.jsx'
import ScrollToTopOnMount from '../ScrollTop.jsx'

import { viewGig } from '../utils.jsx'
// import JoinLeaveButton from './JoinLeaveButton.jsx'

export default class EventCards extends React.Component {
	render() {
		const { event, tickets, feathers, match } = this.props
		// const status = this.props.match.params.type === 'Volunteer' ? 'Volunteering' : 'Attending' // TODO this is meaningless
		if (!event) {
			return null
		}

		const { gigs } = event
		// console.log("GIGGGINGING: ", gigs);
		const title = <span>
			<Header>{event.name}</Header>
			{event.acts.length 
				&& <span style={{fontWeight: '300'}}> (with {event.acts.map(act => act.name).join(', ')})</span>
				|| ''
			}
		</span>

		return event && <div>
				<ScrollToTopOnMount />
			    <Header> 
			    	{title} 
			    </Header>
			    <GigTimespan gig={event} showRelative={true}/>;
				{gigs.length 
					&& <Card.Group relaxed doubling stackable>
						{gigs.map(gig => 
							<GigCardSmall 
								key={gig._id} 
								{...this.props}
								gig={gig}
								onSelect={viewGig(feathers, `${match.url}/gig/`)}
							/>
						)}
					</Card.Group>
				|| 'Loadificating...'}
			</div>
			|| null
	}
}
								// rightIconButton={<Kspan><JoinLeaveButton gig={gig} {...this.props} /></Kspan>}
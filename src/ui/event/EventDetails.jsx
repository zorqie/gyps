import React from 'react'

import { Header, Item } from 'semantic-ui-react'

import GigItem from '../gig/GigItem.jsx'
import GigTimespan from '../GigTimespan.jsx'
import ScrollToTopOnMount from '../ScrollTop.jsx'

import { viewGig } from '../utils.jsx'
// import JoinLeaveButton from './JoinLeaveButton.jsx'

export default class EventDetails extends React.Component {
	render() {
		const { event, tickets, feathers, match } = this.props
		// const status = this.props.match.params.type === 'Volunteer' ? 'Volunteering' : 'Attending' // TODO this is meaningless
		const { type } = match.params
		console.log("TYPED: ", match)
		const gigs = type ? event.gigs.filter(g => g.type===type) : event.gigs
		// console.log("GIGGGINGING: ", gigs);

		return event && <div>
				<ScrollToTopOnMount />
			    <Header  style={{fontWeight: '300'}}> 
					<b style={{fontSize: 'x-large'}}>{event.name}</b>
					{event.acts.length 
						&& <span> (with {event.acts.map(act => act.name).join(', ')})</span>
						|| ''
					}
				    <div>
				    	<GigTimespan gig={event} showRelative={true} style={{fontSize: 'smaller'}} />
				    </div>
					<div style={{fontWeight: '300'}}>at <b>{event.venue.name}</b></div>
			    </Header>
				{gigs.length 
					&& <Item.Group relaxed divided>
						{gigs.map(gig => 
							<GigItem 
								key={gig._id} 
								{...this.props}
								gig={gig}
								onSelect={viewGig(feathers, `${match.url}/gig/`)}
							/>
						)}
					</Item.Group>
				|| 'Loadifying...'}
			</div>
			|| null
	}
}
								// rightIconButton={<Kspan><JoinLeaveButton gig={gig} {...this.props} /></Kspan>}
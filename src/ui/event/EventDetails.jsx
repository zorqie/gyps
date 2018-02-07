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
		const title = <span>
			<b>{event.name}</b>
			{event.acts.length 
				&& <span style={{fontWeight: '300'}}> (with {event.acts.map(act => act.name).join(', ')})</span>
				|| ''
			}
			<span style={{fontWeight: '300', float:'right'}}>at <b>{event.venue.name}</b></span>
		</span>;

		return event && <div>
				<ScrollToTopOnMount />
			    <Header> 
			    	{title} 
			    </Header>
			    <GigTimespan gig={event} showRelative={true}/>;
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
import React from 'react'

import { Header, Item } from 'semantic-ui-react'

import GigItem from '../gig/GigItem.jsx'
import GigTimespan from '../GigTimespan.jsx'

import { viewGig } from '../utils.jsx'
// import JoinLeaveButton from './JoinLeaveButton.jsx'

export default class EventDetails extends React.Component {
	render() {
		const { event, gigs, tickets, feathers, match } = this.props
		// const status = this.props.match.params.type === 'Volunteer' ? 'Volunteering' : 'Attending' // TODO this is meaningless

		// console.log("GIGGGINGING: ", gigs);
		const title = <span>
			<b>{event.name}</b>
			{event.acts.length 
				&& <span style={{fontWeight: '300'}}> (with {event.acts.map(a => a.name).join(', ')})</span>
				|| ''
			}
		</span>;

		return event && <div>
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
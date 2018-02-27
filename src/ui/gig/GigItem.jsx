import React from 'react'

import { Link } from 'react-router-dom'

import { Button, Icon, Image, Item, List } from 'semantic-ui-react'

import GigTimespan from '../GigTimespan.jsx'
import GigJoinIcon from './GigJoinIcon.jsx'
import { isAttending } from '../utils.jsx'

export default function GigItem({ gig, tickets, status='Attending', onSelect, ...others }) {
	const { shifts } = gig
	const meta = (gig.acts && gig.acts.length && 'With ' + gig.acts.map(a=>a.name).join(', ')) 
		|| '\u00A0'
	const attending = isAttending(gig, tickets, status)
	return (
		<List.Item onClick={onSelect.bind(null, gig)}>
			<Image 
				wrapped
				floated='left'
				size='small' 
				src={`/images/${gig._id}_tile.jpg`}
			/>
			{tickets 
				&& <List.Content floated='right'>
				{shifts && shifts.length 
					&& <Icon 
						name={attending ? 'calendar minus' : 'calendar plus'} 
						color={attending ? 'red' : null}
						size="big" 
					/>
					|| <GigJoinIcon 
						gig={gig} 
						{...others} 
						floated='right'
						attending={attending}
					/>
				}
				</List.Content>
				|| null
			}
			<List.Content  floated='left'>
				<Item.Extra>
					<GigTimespan gig={gig} />
				</Item.Extra>
				<List.Header as="h2" >{gig.name}</List.Header>
				<List.Description>{gig.description}</List.Description>
				<Item.Extra>{meta}</Item.Extra>
			</List.Content>
		</List.Item>
	)
}
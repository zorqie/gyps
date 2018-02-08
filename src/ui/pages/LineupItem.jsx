import React from 'react'

import { Link } from 'react-router-dom'

import { List } from 'semantic-ui-react'

import GigTimespan from '../GigTimespan.jsx'
import styles from '../styles'

export default function LineupItem({gig, onSelect = ()=>{}, onActSelect, onVenueSelect = ()=>{}, hideDates, ...others}) {
	const { lineup } = styles
	const acts = gig.acts && gig.acts.map(a=>a.name).join(', ')
	return <List.Item
				onClick={onSelect.bind(null, gig)}
				{...others}
				style={lineup.item}
			>
			<div style={lineup.time}>
				<GigTimespan gig={gig} hideDates={hideDates} />
			</div>
			<div style={lineup.gig}>
				<div style={lineup.name}>{gig.name}</div>
				<div style={lineup.acts}>{acts ? 'With ' + acts : ''}</div>
			</div>
			<div style={lineup.venue} >
				<Link to={`./site/${gig.venue._id}`} onClick={onVenueSelect.bind(null, gig.venue)}>{gig.venue && gig.venue.name}</Link>
			</div>
	</List.Item>
}
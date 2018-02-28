import React from 'react'

import {Card, Header, Icon, Image, Item, List, } from 'semantic-ui-react'

import GigItem from '../gig/GigItem.jsx'
import JoinLeaveButton from '../JoinLeaveButton.jsx'
import ScrollToTopOnMount from '../ScrollTop.jsx'

const style = {
	venue: {
		fontWeight: 300,
		textTransform: 'uppercase', 
		letterSpacing: '3px', 
	}
}

export default class VenueDetailsPage extends React.Component {
	state = {
		venue: {},
		gigs:[], 
	}

	componentWillMount() {
		this.fetchData()
		const { feathers } = this.props
		feathers.service('gigs').on('created', this.fetchData)
		feathers.service('gigs').on('patched', this.fetchData)
		feathers.service('gigs').on('removed', this.fetchData)
		console.log("VENUE MOUNTED.")
	}
	
	componentWillUnmount() {
		const { feathers } = this.props
		feathers.service('gigs').removeListener('created', this.fetchData)
		feathers.service('gigs').removeListener('patched', this.fetchData)
		feathers.service('gigs').removeListener('removed', this.fetchData)
		console.log("VENUE UNMOUNTED.")
	}

	async fetchData() {
		const { feathers } = this.props
		// console.log("Looking for parent: " + parentId)
		try {
			const { venueId } = this.props.match.params
			const venue = await feathers.service('venues').get(venueId)
			
			this.setState({...this.state, venue})
			if (typeof document !== 'undefined') {
				document.title = venue.name
			}
		} catch (error) {
			feathers.emit("error", error)
		} 
	}

	selectGig = gig => this.props.history.push('../gig/'+gig._id)

	render() {
		// console.log("VENUEING\n....\n...\n..\n.\n")
		const { venue } = this.state
		if(!venue) return null
		const { gigs } = venue
		if(!gigs) return null
		const ids = gigs.map(g=>g._id)
		const filtered = gigs.filter(gig => gig.type !== 'Volunteer' && !ids.includes(gig.parent))

		return (
			<Card fluid raised>
			    {venue.poster_uri && 
					<Image src={venue.poster_uri} />
				}
			    <Card.Header style={{padding: '1em'}}>
					<ScrollToTopOnMount />
					<h2 style={style.venue} >{venue.name}</h2>
					<Card.Meta>{venue.description} </Card.Meta>
				</Card.Header>
				<Card.Content>
					<List relaxed divided selection>
					{filtered.map(gig =>
						<GigItem 
							key={gig._id} 
							{...this.props}
							gig={gig} 
							onSelect={this.selectGig.bind(this, gig)}
						/>
					)}
					</List>
				</Card.Content>
			</Card>
		)
	}
}


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

export default class ActDetailsPage extends React.Component {
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
	}
	
	componentWillUnmount() {
		const { feathers } = this.props
		feathers.service('gigs').removeListener('created', this.fetchData)
		feathers.service('gigs').removeListener('patched', this.fetchData)
		feathers.service('gigs').removeListener('removed', this.fetchData)
	}

	async fetchData() {
		const { venueId } = this.props.match.params
		const { feathers } = this.props
		// console.log("Looking for parent: " + parentId)
		try {
			const venue = await feathers.service('venues').get(venueId)
			// const result = await feathers.service('gigs').find({
			// 	query: {
			// 		venue_id: venue._id, 
			// 		parent: {$exists: true}, // should be "this" event but we don't have such
			// 		$sort: { start: 1 },
			// 	}
			// })
			// const data = result.data || result
			// // console.log("DATA", data)
			// const ids = data.map(g => g._id)
			// const gigs = data.filter(g => !ids.includes(g.parent))
			// console.log("GIGS", gigs)
			this.setState({...this.state, venue})
			document.title = venue.name
		} catch (error) {
			feathers.emit("error", error)
		} 
	}

	selectGig = gig => this.props.history.push('../gig/'+gig._id)

	render() {
		const { venue } = this.state
		const { gigs } = venue
		const { history } = this.props

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
					{gigs && gigs.map(gig =>

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


import React from 'react'

import {Card, Header, Icon, Image, Item, List, } from 'semantic-ui-react'

import GigItem from '../gig/GigItem.jsx'
import JoinLeaveButton from '../JoinLeaveButton.jsx'

export default class ActDetailsPage extends React.Component {
	state = {
		act: {},
		gigs:[], 
	}

	componentWillMount() {
		this.fetchData()
		const { feathers } = this.props
		feathers.service('gigs').on('created', this.createdListener)
		feathers.service('gigs').on('patched', this.fetchData)
		feathers.service('gigs').on('removed', this.removedListener)
	}
	
	componentWillUnmount() {
		const { feathers } = this.props
		feathers.service('gigs').removeListener('created', this.createdListener)
		feathers.service('gigs').removeListener('patched', this.fetchData)
		feathers.service('gigs').removeListener('removed', this.removedListener)
	}
	createdListener = gig => {
		console.log("Added: ", gig)
		// TODO this will add any gigs, even if not by this act
		this.setState({gigs: this.state.gigs.concat(gig)})
	}

	removedListener = gig => {
		console.log("Removed: ", gig)
		this.setState({gigs: this.state.gigs.filter(v => v._id !== gig._id)})
	}


	async fetchData() {
		const { actId } = this.props.match.params
		const { feathers } = this.props
		// console.log("Looking for parent: " + parentId)
		try {
			const act = await feathers.service('acts').get(actId)
			document.title = act.name
			const result = await feathers.service('gigs').find({
				query: {
					act_id: act._id, 
					parent: {$exists: true}, // should be "this" event but we don't have such
					$sort: { start: 1 },
				}
			})
			const data = result.data || result
			// console.log("DATA", data)
			const ids = data.map(g => g._id)
			const gigs = data.filter(g => !ids.includes(g.parent))
			// console.log("GIGS", gigs)
			this.setState({...this.state, act, gigs})
		} catch (error) {
			feathers.emit("error", error)
		} 
	}

	selectGig = feathers => gig => feathers.history.push('../gig/'+gig._id)

	render() {
		// console.log("Act props: ", this.props)
		const { act, gigs } = this.state
		const { feathers } = this.props

		return (
			<Card fluid raised>
			    {act.poster_uri && 
					<Image src={act.poster_uri} />
				}
				<Card.Content>
				    <Card.Header>
						<Header>{act.name}</Header>
						<Card.Meta>{act.description} </Card.Meta>
					</Card.Header>
					<Item.Group relaxed divided>
					{gigs.map(gig =>

						<GigItem 
							key={gig._id} 
							{...this.props}
							gig={gig} 
							onSelect={this.selectGig(feathers).bind(this, gig)}
						/>
					)}
					</Item.Group>
				</Card.Content>
			</Card>
		)
	}
}


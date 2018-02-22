import React from 'react'

import { Button, Form, Loader } from 'semantic-ui-react'

import EventProfileForm from '../event/EventProfileForm.jsx'

const focus = el => el && el.focus()

export default class ProfilePage extends React.Component {
	state = {
		profile: null,
		profiles: [],
		events: [],
		// {
		// 	displayName: 'Unknown', 
		// 	last_event_id: '1234',
		// }
	}

	handleChange = e => {
		const { name, value } = e.target
		const { profile } = this.state
		this.setState({profile: {...profile, [name]:value}})
	}
	// These two can be combined
	handleProfile = i => (e, data) => {
		const { name, value } = e.target
		console.log("Profile.target", e.target)
		console.log("Profile.data", e.data)
		

		const { profiles } = this.state
		const updated = {...profiles[i], [name]: value}
		this.setState({profiles: profiles.filter(p => p._id!==updated._id).concat(updated)})
	}

	async componentWillMount() {
		const { feathers } = this.props
		const user = feathers.get('user')
		if (!user) {
			feathers.emit('error', {code:401, message: 'Not authorificated.'})
			return
		}
		try {
			const profiles = await feathers.service('profiles').find({
				query: {
					user_id: user._id,
				}
			})
			if (profiles.length > 0) {
				// we don't need timestamps. TODO remove them in service/hooks
				const { createdAt, updatedAt, ...profile } = profiles[0]
				this.setState({ profiles, profile })
			} else {
				// new profile
				const empty = {
					displayName: user.name || ''
				} 
				this.setState({ 
					profile: empty, 
					profiles: [empty],
				})
			}
			const tickets = await feathers.service('tickets').find()
			if (tickets.length) {
				const gigs = tickets.filter(t => t.gig).map(t => t.gig)
				const gids = gigs.map(e => e._id).filter((e, i, a) => a.indexOf(e)===i)
				const events = await feathers.service('events').find({
					query: {
						type: 'Event',
						_id: {$in: gids},
						$sort: { start: 1}
					}
				})
				this.setState({events})
			}
		} catch(error) {
			feathers.emit('error', error)
		}

	}

	saveProfile = e => {
		e.preventDefault()
		const { feathers } = this.props
		const user = feathers.get('user')
		const { profile } = this.state
		if (profile._id) {
			feathers.service('profiles').patch(profile._id, {...profile})
		} else {
			feathers.service('profiles').create({...profile, user_id: user._id})
		}
		feathers.emit('message', "Profile updated.")
		console.log("SUBMAT profile: ", profile)
	}

	render () {
		const { profile, profiles, events } = this.state
		console.log("Profile.state: ", this.state)
		return profiles.length &&
			<div style={{margin: '2em'}}>
				
			<Form onSubmit={this.saveProfile}>
				<Form.Field>
					<label htmlFor='displayName'>Display Name</label>
					<input 
						name='displayName' 
						value={profile.displayName || ''}
						id='displayName' 
						onChange={this.handleChange} 
						ref={focus} 
					/>
				</Form.Field>
				
				<div style={{textAlign:'right', borderTop:'1em'}}>
					<Button primary type='submit'>Save</Button>
				</div>

			</Form>
			{events && events.map(event => <EventProfileForm key={event._id} event={event} />)}
			</div> 
		|| <Loader>Loading...</Loader>
	}
}
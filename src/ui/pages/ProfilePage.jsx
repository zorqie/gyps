import React from 'react'

import { Button, Form } from 'semantic-ui-react'

const focus = el => el && el.focus()

export default class ProfilePage extends React.Component {
	state = {
		profile: null,
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

	async componentWillMount() {
		const { feathers } = this.props
		const user = feathers.get('user')
		const profiles = await feathers.service('profiles').find({
			query: {
				user_id: user._id,
			}
		})
		if (profiles.length === 1) {
			console.log("GOT PROFILES", profiles)
			// we don't need timestamps. TODO remove them in service/hooks
			const { createdAt, updatedAt, ...profile } = profiles[0]
			this.setState({ profile })
		} else {
			// new profile
			this.setState({ 
				profile: {
					displayName: user.name || ''
				} 
			})
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
		const { profile } = this.state
		return profile && <Form style={{margin: '2em'}} onSubmit={this.saveProfile}>
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
				<Form.Field>
					<label htmlFor='last_event_id'>Last Event</label>
					<input 
						name='last_event_id' 
						value={profile.last_event_id || ''}
						id='last_event_id' 
						onChange={this.handleChange} 
					/>
				</Form.Field>
				<div style={{textAlign:'right', borderTop:'1em'}}>
					<Button primary type='submit'>Save</Button>
				</div>

		</Form>
		|| null
	}
}
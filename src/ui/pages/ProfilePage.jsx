import React from 'react'

import { Form } from 'semantic-ui-react'
import ReactiveForm from '../Form.jsx'


export default class ProfilePage extends React.Component {
	state = {
		profile: null,
		// {
		// 	displayName: 'Unknown', 
		// 	last_event_id: '1234',
		// }
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

	saveProfile = profile => {
		const { feathers } = this.props
		const user = feathers.get('user')
		if (this.state.profile._id) {
			feathers.service('profiles').patch(this.state.profile._id, {...profile, user_id: user._id})
		} else {
			feathers.service('profiles').create({...profile, user_id: user._id})
		}
		feathers.emit('message', "Profile updated.")
		console.log("SUBMAT profile: ", profile)
	}

	render () {
		const { profile } = this.state
		const buttons = { 
			submit: { 
				label: 'Save', 
				handler: this.saveProfile 
			} 
		}
		console.log("PROFILE.state", this.state)
		return <div style={{margin: '2em'}}>
			{profile && <ReactiveForm data={profile} {...buttons}> 
				<Form.Field>
					<label>Display Name</label>
					<input name='displayName' focused />
				</Form.Field>
				<Form.Input 
					type="text"
					name='last_event_id'
					label="Last Event"
				/>
			</ReactiveForm>}
		</div>
	}
}
import React from 'react'

import { Button, Form, Loader } from 'semantic-ui-react'

import EventProfileForm from '../event/EventProfileForm.jsx'

const focus = el => el && el.focus()

export default class EventProfilePage extends React.Component {
	state = {
		profile: null,
		event: this.props.event,
	}

	async componentWillMount() {
		const { event, feathers, match } = this.props
		const user = feathers.get('user')
		if (!user) {
			feathers.emit('error', { code: 401, message: 'Not authorificated.' })
			return
		}
		if ( !event && !match.params.eventId) {
			feathers.emit('error', { message: "No event and no eventId. Can't work like that." })
			return
		}
		try {
			const eid = event && event._id || match.params.eventId
			const profiles = await feathers.service('profiles').find({
				query: {
					user_id: user._id,
					event_id: eid,
				}
			})
			if (profiles.length > 0) {
				console.log("FOUND profiles", profiles)
				this.setState({profile: profiles[0]})
			} else {
				this.setState({profile: { event_profile: {}}})
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
		const { profile, event } = this.state
		console.log("EventProfilePage.state: ", this.state)
		return profile 
			&& <div style={{margin: '2em'}}>
				<EventProfileForm  event={event} profile={profile} showHeader={false} />
			</div> 
			|| null
	}
}
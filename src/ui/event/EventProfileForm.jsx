import React from 'react'

import { Button, Form } from 'semantic-ui-react'
import app from '../../client/feathers'

function ProfileField({field, value, onChange}) {
	// console.log("Field. ", field, value)
	const label = <label htmlFor={field.name} style={{textTransform: 'capitalize'}}>{field.label || field.name}</label>
	const opts = field.enum || ['Yes', 'No']
	const options = field.type==='enum' || (field.type && field.type.code) ? opts.map(x => ({text: x, value: x})) : []
	// const control = field.type==='enum' 
	// 	? <input /> //<Form.Dropdown fluid selection options={field.enum} />
	// 	: <input name={field.name} id={field.name} value={state && state[field.name] || ''} onChange={onChange} />
	const control = field.type==='enum' || (field.type && field.type.code) ? Form.Select : Form.Input
	return <Form.Field 
		label={label}
		name={field.name}
		control={control}
		value={value || ''}
		onChange={onChange}
		options={options}
	/>
}

export default class EventProfileForm extends React.Component {
	state = {
		profile: this.props.profile || {},
	}
	handleChange = (e, { name, value }) => {
		const { profile } = this.state
		this.setState({profile: {...profile, event_profile:{...profile.event_profile, [name]: value}} })
	}
	handleSubmit = e => {
		e.preventDefault()
		const { profile } = this.state
		console.log("Submitting profilie: ", profile)
		try {
			if (profile._id) {
				app.service('profiles').patch(profile._id, {event_profile: profile.event_profile})
				.then(what => app.emit('message', 'Profile updatified.'))
			} else {
				const user = app.get('user')
				const { event } = this.props
				app.service('profiles').create({...profile, user_id: user._id, event_id: event._id})
				.then(what => app.emit('message', 'Profile created.') && console.log(what))
			}
		} catch (error) {
			app.emit('error', error)
		}
	}
	render() {
		const { event, showHeader } = this.props
		// console.log("EventProfileForm.props", this.props)
		const { profile } = this.state
		if (!event) {
			return null
		}
		console.log("EventProfile FORM.profile", profile)
		const { event_profile } = profile
		const { name, start, config } = event

		return <Form onSubmit={this.handleSubmit}>
				{showHeader && <h2 style={{fontWeight: 300}}>{name}</h2> || ''}
				{config.user_profile.map( (field, i) => 
					<ProfileField 
						key={i} 
						field={field} 
						value={event_profile[field.name]} 
						onChange={this.handleChange} 
					/>) 
				}
				<Button primary floated='right' type='submit'>Save</Button>
			</Form>
	}
}
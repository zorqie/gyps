import React from 'react'

import import { Divider, Header, Image, Button } from 'semantic-ui-react'

import { Link } from 'react-router-dom'

const focus = input => input && input.focus()

export default class Form extends React.Component {
	state = {
		data: {...this.props.data},
		errors: {},
	}

 	componentWillReceiveProps(next) {
 		this.setState({data: next.data})
 	}

	handleChange = e => {
		const { name, value } = e.target
		this.setState({ data: {...this.state.data, [name] : value} })
	}

	handleCancel = e => {
		e.preventDefault()
		if (this.props.cancel) {
			const { handler } = this.props.cancel
			handler && handler()
		}
		console.log("FORM Canceled.")
	}

	handleSubmit = e => {
		e.preventDefault()
		if (this.props.submit) {
			const { handler } = this.props.submit
			handler && handler(this.state.data)
		} else {
			console.log("FORM Submet. ", this.state.data)
		}
	}

	render() {
		const { children, submit, cancel } = this.props

		return <form onSubmit={this.handleSubmit}>
			{children.map(({props, type: Type}, i) => 
				<Type 
					key={i} 
					{...props} 
					value={this.state.data[props.name]} 
					onChange={this.handleChange} 
					ref={i===0 && focus}
				/>
			)}
			<div style={{marginTop: '1em', textAlign: 'right'}}>
				{cancel && <Button 
					label={cancel && cancel.label || 'Cancel'} 
					onClick={this.handleCancel} 
				/>}
				<Button 
					type='submit' 
					label={submit && submit.label || 'Submit'} 
					primary
				/>
			</div>
		</form>
	}
}
import React from 'react'

import { Link } from 'react-router-dom'

import { Divider, Form, Header, Image, Button } from 'semantic-ui-react'

const focus = input => input && input.focus()

export default class ReactiveForm extends React.Component {
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

		return <Form onSubmit={this.handleSubmit}>
			{children.map && renderChildren(children, this)}
			
			<div style={{marginTop: '1em', textAlign: 'right'}}>
				{cancel && <Button onClick={this.handleCancel} >
					{cancel && cancel.label || 'Cancel'} 
					</Button>
				}
				<Button 
					primary
					type='submit'
				>
					{submit && submit.label || 'Submit'} 
				</Button>
			</div>
		</Form>
	}
}

const renderChildren = (children, component, focused) => {
	console.log("CHILDREN", children, component)
	return children.map 
		? children.map(({props, type: Type}, i) => (
		 	props.children && props.children.map
			&& renderChildren(props.children, component)
			|| <Type 
				key={i} 
				{...props} 
				value={component.state.data[props.name]} 
				onChange={component.handleChange} 
				ref={props.focused && focus || null}
			/>
		))
		: children 
}
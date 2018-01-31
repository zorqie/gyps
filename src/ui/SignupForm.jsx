import React from 'react'

import { Button, Form, Input, Label } from 'semantic-ui-react'

import { Link } from 'react-router-dom'

const focus = input => input && input.focus()

class LoginForm extends React.Component {
	state = {
		email: '', 
		password: '', 
		password2: '', 
		errors: {},
	}

	handleChange = e => {
		const { name, value } = e.target
		this.setState({...this.state, [name] : value})
	}

	// componentDidMount() {

	// }

	doSubmit = e => {
		const { feathers, history } = this.props
		e.preventDefault()
		// TODO check matching passwords
		const { email, password } = this.state
		feathers.service('users').create({email, password, online: true})
		.then(u => {
			feathers.set('user', u)
			const user = feathers.get('user')
			feathers.emit('user.login', user)
			history.push('/')
			console.log("Signup complete")
		})
		.catch(error => {
			console.error('Errorated: ', error)
			this.setState({...this.state, errors: error})
			feathers.emit('error', error)
		})
		
	}

	doCancel = () => {
		const { history } = this.props
		history.goBack()
	}

	render() {
		const { email, password, password2, errors } = this.state
		return (
			<div style={{ margin: '1em 3em', padding: '16px 48px'}}>
				<h2 style={{fontWeight:300, marginBottom: '1em'}}>Login</h2>
				<p>No account? Perhaps you can <Link to='/signup'>Sign up</Link></p>
				<form onSubmit={this.doSubmit}>
					<div style={{visibility: errors.message ? 'visible' : 'hidden'}}>
						{errors.message}
					</div>
					<Form.Field>
						<label htmlFor='email'>Email: </label>
						<Input
							type='email'
							name='email'
							id='email'
							fluid
							placeholder="Email"
							value={email} 
							onChange={this.handleChange}
							ref={focus} />
					</Form.Field>
					<Form.Field> 
						<label htmlFor="password">Password</label>
						<Input
							type='password'
							name='password'
							id='password'
							fluid
							placeholder="Password"
							value={password} 
							onChange={this.handleChange} 
						/>
					</Form.Field>
					<Form.Field> 
						<label htmlFor="password2">Comfirm password</label>
						<Input
							type='password'
							name='password2'
							id='password2'
							fluid
							placeholder="Confirm password"
							value={password2} 
							onChange={this.handleChange} 
						/>
					</Form.Field>
					<div style={{marginTop:'1em', textAlign:'right'}}>
						<Button  onClick={this.doCancel}>Cancel</Button>
						<Button type='submit'primary>Login</Button>
					</div>
					<div style={{marginTop: '1em'}} >
					<a href='/auth/facebook'>Login with Facebook</a>
						<p style={{marginTop:'1em', fontSize:'smaller', color:'grey'}}>No personal info will be stored except your name as it appears on your profile.</p>
					</div>
				</form>
				
			</div>
		)
	}
}

export default LoginForm
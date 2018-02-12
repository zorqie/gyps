import React from 'react'

import { Button, Form, Input, Label } from 'semantic-ui-react'

import { Link } from 'react-router-dom'

const focus = input => input && input.focus()

class LoginForm extends React.Component {
	state = {
		email: '', 
		password: '', 
		errors: {},
	}

	handleChange = e => {
		const { name, value } = e.target
		this.setState({...this.state, [name] : value})
	}

	// componentDidMount() {

	// }

	doLogin = e => {
		const { feathers, history } = this.props
		e.preventDefault()
		// console.log("Attemptifying to login with state: ", this.state)
		const { email, password } = this.state
		feathers.authenticate({
			strategy: 'local',
			email,
			password,
		})
		.then(({ accessToken }) => 
			feathers.passport.verifyJWT(accessToken)
			// console.log('Authenticated!', response);
		)
		.then(({ userId }) => 
			// console.log('JWT Payload', payload);
			feathers.service('users').get(userId)
		)
		.then(u => {
			feathers.set('user', u)
			const user = feathers.get('user')
			// console.log("Authenticated.then", user)
			feathers.service('users').patch(user._id, {online: true})
			.then(u => {
				feathers.emit('user.login', user)
				history.goBack();
				console.log("Login complete")
			})
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
		const { email, password, errors } = this.state
		return (
			<div style={{ margin: '1em 3em', padding: '16px 48px'}}>
				<h2 style={{fontWeight:300, marginBottom: '1em'}}>Login</h2>
				<p>No account? Perhaps you can <Link to='/signup'>Sign up</Link></p>
				<form onSubmit={this.doLogin}>
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
import React from 'react'

import { Route, Link } from 'react-router-dom'
import { Button, Container, Divider, Dropdown, Header, Icon, Image, List, Menu } from 'semantic-ui-react'

const EventDropdown = ({match}) => (
	<Dropdown item simple text='Dropdown'> 
		<Dropdown.Menu>
			<Dropdown.Item>List Item</Dropdown.Item>
			<Dropdown.Divider />
			<Dropdown.Header>Header Item</Dropdown.Header>
			<Dropdown.Item>
				<i className='dropdown icon' />
				<span className='text'>Submenu</span>
				<Dropdown.Menu>
					<Dropdown.Item>List Item</Dropdown.Item>
					<Dropdown.Item>List Item</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown.Item>
			<Dropdown.Item>List Item</Dropdown.Item>
		</Dropdown.Menu>
	</Dropdown>
)

const UserDropdown = ({user, match, feathers}) => (
	<div>
		<Icon name="user" />
		<Dropdown simple inline >
			<Dropdown.Menu>
				<Dropdown.Item as={Link} to="/profile">{user.email}</Dropdown.Item>
				<Dropdown.Item as={Link} to="/my-lineup">My Lineup</Dropdown.Item>
				<Dropdown.Item as={Link} to="/my-schedule">My Schedule</Dropdown.Item>
				<Dropdown.Divider />
				<Dropdown.Item onClick={feathers.logout}>Logout?</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	</div>
)

export default function AppMenu(props) {
	const { feathers, user } = props
	console.log("AppMenu.props", props.match)
	return <Menu fixed='top' inverted>
			<Container>
				<Menu.Item header as={Link} to="/">
					<Image
						size='mini'
						src='/assets/Kuker-333.jpg'
						style={{ marginRight: '1.5em' }}
					/>
					Roots
				</Menu.Item>
				<Menu.Item as={Link} to='/events'>Events</Menu.Item>
				<Route 
					path='/event'
					render={p => <EventDropdown {...p}/>}
				/>
				<Menu.Menu position='right'>
					{!user && <Menu.Item >
							<Button as={Link} to='/login'>Login</Button>
						</Menu.Item>}
					{user && <Menu.Item >
							<UserDropdown {...props}/>
							{/*<Button onClick={feathers.logout}>Logout</Button>*/}
						</Menu.Item>}
				</Menu.Menu>
			</Container>
		</Menu>
}
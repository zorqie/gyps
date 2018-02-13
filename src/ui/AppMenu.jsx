import React from 'react'

import { Route, Link } from 'react-router-dom'
import { Button, Container, Divider, Dropdown, Header, Icon, Image, List, Menu } from 'semantic-ui-react'

const EventDropdown = ({match}) => (
	<Dropdown item closeOnChange text='View'> 
		<Dropdown.Menu>
			<Dropdown.Item as={Link} to={`${match.url}/schedule`}>Schedule</Dropdown.Item>
			<Dropdown.Item as={Link} to={`${match.url}/lineup`}>Lineup</Dropdown.Item>
			<Dropdown.Item as={Link} to={`${match.url}/cards`}>Cards</Dropdown.Item>
			<Dropdown.Divider />
			<Dropdown.Item as={Link} to={`${match.url}/Workshop`}>Workshops</Dropdown.Item>
			<Dropdown.Item as={Link} to={`${match.url}/Performance`}>Performances</Dropdown.Item>
			<Dropdown.Divider />
			<Dropdown.Item>
				<i className='dropdown icon' />
				<span className='text'>Submenu</span>
				<Dropdown.Menu>
					<Dropdown.Item>List Item 1</Dropdown.Item>
					<Dropdown.Item>List Item 2</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown.Item>
			<Dropdown.Item>List Item</Dropdown.Item>
		</Dropdown.Menu>
	</Dropdown>
)

const UserDropdown = ({user, match, feathers}) => (
	<Menu.Item>
		<Icon name="user" />
		<Dropdown  closeOnChange inline >
			<Dropdown.Menu>
				<Dropdown.Item as={Link} to="/my-profile">{user.email}</Dropdown.Item>
				<Dropdown.Item as={Link} to="/my-lineup">My Lineup</Dropdown.Item>
				<Dropdown.Item as={Link} to="/my-schedule">My Schedule</Dropdown.Item>
				<Dropdown.Divider />
				<Dropdown.Item onClick={() => (feathers.logout(), feathers.emit('logout'))}>Logout</Dropdown.Item>
			</Dropdown.Menu>
		</Dropdown>
	</Menu.Item>
)

export default function AppMenu(props) {
	const { feathers, user, event } = props
	// console.log("AppMenu.props", props.match)
	return <Menu fixed='top' inverted>
			<Container>
				<Menu.Item header as={Link} to={event ? `/event/${event._id}` : '/'}>
					<Image
						size='mini'
						src={event ? `/images/${event._id}_icon.jpg` : '/assets/Kuker-333.jpg'}
						style={{ marginRight: '1.5em'}}
					/>
					{event && event.name || 'Roots'}
				</Menu.Item>
				<Menu.Item as={Link} to='/events'>Events</Menu.Item>
				<Route 
					path='/event/:eventId'
					render={p => <EventDropdown {...props} {...p} />}
				/>
				<Menu.Menu position='right'>
					{!user && <Menu.Item >
							<Button as={Link} to='/login'>Login</Button>
						</Menu.Item>}
					{user && <UserDropdown {...props}/>}
				</Menu.Menu>
			</Container>
		</Menu>
}
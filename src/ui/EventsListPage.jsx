import React from 'react'

import EventPoster from './EventPoster.jsx'

export default class EventsListPage extends React.Component {
	state = {
		events: []
	}
	async componentWillMount() {
		const { feathers } = this.props
		try {
			const result = await feathers.service('events')
				.find({
					query: {
						public: true,
						parent : { $exists: false },
					}
				})
			this.setState({ events: result.data || result})
		} catch(error) {
			console.error("ERRORRIFIED.", error)
		} 
	}
	render() {
		const { events } = this.state
		// console.log("EVENTIFIED: ", events)
		return events.map(e => 
			<EventPoster key={e._id} event={e} />
		)
		
	}
}
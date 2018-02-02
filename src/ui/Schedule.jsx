import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

import styles from './styles'
import {jobsByDate, sequence, hours24, sitesByDate } from './hacks.jsx'

const startTimeSort = (a, b) => +(a.start > b.start) || +(a.start === b.start) - 1
const ticketStartTimeSort = (a, b) => +(a.gig.start > b.gig.start) || +(a.gig.start === b.gig.start) - 1

const tspan = (job, {_id, name, type}) => 
	<span >
		<Link to={'gig/'+_id}>
			{name}
		</Link>
	</span>

const JobHeader = ({job, span}) => 
	<th colSpan={span} >
		<Link to={'/sites/'+job._id}>{job.name}</Link>
	</th>

function SlotCell({slot, job}) {
	const starts = slot && slot.show && slot.show.starts
	const c = `j-shift sch-${slot.shift.type} ` 
		+ (slot && slot.show && (slot.show.starts ? 'j-start ' : '') 
		+ (slot.show.ends ? 'j-end' : ''))
	return slot 
		&& <td className={c}>{starts && tspan(job, slot.shift)}</td> 
		|| <td key={hour+i}> </td>
}

const HourRow = ({hour, jobs}) => 
	<tr>
		<td>{hour % 24}:00</td>
		{jobs.map(({hours, job, span}) => {
			return hours[hour] && 
				sequence(span).map(i => {
					const slot = hours[hour][i]
					return <SlotCell key={hour+i} slot={slot} job={job} />
				})
				|| <td key={job._id+hour} colSpan={span}> </td>
		})}
	</tr>

const DayTable = ({date, jobs}) => 
	<table className='gig-schedule'>
		<thead>
			<tr>
				<th colSpan={jobs.length+1} style={styles.scheduleDate}>{date.format('MMM D, dddd')}</th>
			</tr>
			<tr>
				<th></th>
				{jobs.map(({job, span}) => job && <JobHeader key={job._id} job={job} span={span} />)}
			</tr>
		</thead>
		<tbody>
			{hours24.map(hour => hour>7 && <HourRow key={date+hour} hour={hour} jobs={jobs} /> )}
		</tbody>
	</table>


export default class Schedule extends React.Component {
	state = {
		stints: [],
	}

	componentDidMount() {
		const { user, feathers } = this.props
		if (user) {
			const {_id, roles} = user
			if(roles && roles.indexOf('master')) {
				feathers.service('acts').find({query: {user_id: _id}})
				.then(acts => {
					const data = acts.data || acts
					return feathers.service('gigs').find({
						query: {
							act_id: {$in: data.map(a => a._id)},
							$sort: {start: 1}
						}
					})

				})
				.then(result => {
					console.log("Got my own gigs", result)
					data = result.data || result
					const stints = data.map(gig => {
						return {
							status: 'Acting', 
							gig: {...gig, type: 'My-'+gig.type}
						}
					})
					this.setState({stints})
				})
				.catch(err => console.error)
			}
		}
	}
/*	componentWillMount() {
		const {eventId} = this.props.params
		if(eventId) {
			feathers.service('tickets').find({
				query: {
					// only can get my tickets, exclude ones for event
					gig_id: {$ne: eventId}
				}
			}) 
			.then(tickets => this.setState({tickets: tickets.data.sort(ticketStartTimeSort)}))
		} else {
			feathers.service('gigs').find({
				query: {
					public: true,
					parent: {$exists: false}
				}
			})
			.then(events =>
				feathers.service('tickets').find({
					query: {
						gig_id: {$nin: events.data.map(e=>e._id)}
					}
				})
				.then(tickets => this.setState({events: events.data, tickets: tickets.data.sort(ticketStartTimeSort)}))
			)
	}
}*/

	shouldComponentUpdate(nextProps, nextState) {
		console.log("THIS", this.props.tickets.length)
		console.log("NEXT --- ", nextProps.tickets)
		return true;
		// return this.props.tickets.length !== nextProps.tickets.length 
		// 	|| this.state.stints.length !== nextState.stints.length
	}

	render() {
		// TODO rename jobs => sites (to refelct reality...)
		const { tickets, event } = this.props
		if (!tickets || !tickets.length && (!event || !event.gigs)) {
			return null
		}
		console.log("MY SCHED.tickets", tickets)
		console.log("MY SCHED.event", event)
		const attending = (tickets && tickets.length) 
			? tickets
			: event.gigs.map(gig => ({gig}))

		const { stints } = this.state
		const all = stints && stints.length 
			? attending.concat(stints) 
			: attending

		return <div>
			{all.length 
			&& sitesByDate(all.filter(t=>t.gig && t.gig.parent).sort(ticketStartTimeSort))
				.map( ({date, jobs}) => <DayTable key={date} date={date} jobs={jobs} /> )				
			||  <p>Nothing to see here.</p>
			}
		</div>
	}
}
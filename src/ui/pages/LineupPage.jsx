import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Divider, Header, List,  } from 'semantic-ui-react'

import LineupItem from './LineupItem.jsx'
import { viewItem } from '../utils.jsx'
import styles from '../styles'

const ticketStartSort = (a, b) => (+(a.gig.start > b.gig.start) || +(a.gig.start === b.gig.start) - 1)

function days(tickets) {
	// console.log("Teekets:", result)
	// const start = window.performance.now()
	const formated = tickets.map(t => moment(t.gig.start).format('YYYY-MM-DD'))
	// console.log("Formated", formated)
	const unique = formated.filter((e, i, a) => a.indexOf(e)===i)
	// console.log("Unique", unique)
	const sorted = unique.sort()
	const dates = sorted.map(s => moment(s, 'YYYY-MM-DD'))
	// console.log("DAYS:: ", window.performance.now() - start)
	return dates
}

const DateHeader = ({moment}) => <div className="cal-sheet">
	<div className="cal-month">{moment.format('MMM')}</div>
	<div className="cal-date">{moment.format('D')}</div>
	<div className="cal-dow">{moment.format('ddd')}</div>
</div>
	

export default class LineupPage extends React.Component {
	viewVenue = (venue, e) => {
		e.preventDefault()
		e.stopPropagation()
		const { history } = this.props
		history.push('./venue/'+venue._id)
	}
	render() {
		const { event, tickets, status, user, history } = this.props
		if (!event && !tickets) {
			return null
		}

		const filtered = tickets && tickets.filter(t => !t.gig.parent && t.status===(status || 'Attending')) 
		const tix = filtered || event.gigs.map(gig => ({gig, status: 'Attending'})) || []
		
		// console.log("TIXING: ", tix)
		
		// console.log("LINEUP filtered", filtered) 
		// console.log(dates)
		return <div style={styles.lineup.container}>
			{ tix.length==0 ?
				<Header>No events found. <Link to='/events'>Choose some</Link></Header> 
				: ''
			}
			{ tix.length && days(tix).map(d =>
				<List key={d} relaxed='very' selection>
					<Header style={styles.lineup.date}>{d.format('MMM D, dddd')}</Header>
					<Divider/>
					{tix.filter(t => moment(t.gig.start).isSame(d, 'day'))
						.sort(ticketStartSort)
						.map(({gig}) => 
							/*<Link  to={`gig/${gig._id}`}>*/
							<LineupItem
								key={gig._id}
								gig={gig}
								hideDates={true}
								onSelect={viewItem(history, './gig/')}
								onVenueSelect={this.viewVenue}
							/>
							/*</Link>*/
					)}
				</List>

				)
				|| ''
			}
		</div>
	}
}
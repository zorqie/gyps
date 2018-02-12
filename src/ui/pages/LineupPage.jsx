import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Divider, Header, List,  } from 'semantic-ui-react'

import LineupTable from '../event/LineupTable.jsx'
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
	// TODO all these view**** sprinkled throughout should be in one place
	render() {
		const { event, ...others } = this.props
		if (!event) {
			return null
		}

		const { gigs } = event
		return <LineupTable gigs={gigs} {...others} />
	}
}
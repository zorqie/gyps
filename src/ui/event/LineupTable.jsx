import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

import { Button, Divider, Header, List, Table } from 'semantic-ui-react'

import GigTimespan from '../GigTimespan.jsx'
import GigJoinIcon from '../gig/GigJoinIcon.jsx'
import { viewItem, gigStartSort, isAttending } from '../utils.jsx'
import styles from '../styles'


function days(gigs) {
	// console.log("Teekets:", result)
	// const start = window.performance.now()
	const formated = gigs.map(gig => moment(gig.start).format('YYYY-MM-DD'))
	// console.log("Formated", formated)
	const unique = formated.filter((e, i, a) => a.indexOf(e)===i)
	// console.log("Unique", unique)
	const sorted = unique.sort()
	// console.log("Sorted", sorted)
	const dates = sorted.map(s => moment(s, 'YYYY-MM-DD'))
	// console.log("DAYS:: ", window.performance.now() - start)
	return dates
}

const DateHeader = ({moment}) => <div className="cal-sheet">
	<div className="cal-month">{moment.format('MMM')}</div>
	<div className="cal-date">{moment.format('D')}</div>
	<div className="cal-dow">{moment.format('ddd')}</div>
</div>
	

function LineupRow({gig, attending, onSelect, viewVenue, viewAct}) {
	const acts = gig.acts && gig.acts.map(a=>a.name).join(', ') 
	const { lineup } = styles
	return <Table.Row onClick={onSelect.bind(null, gig)} >
		
			<Table.Cell width={7} style={lineup.time}>
				<GigTimespan gig={gig} hideDates={true} />
				<span style={{float:'right'}}>
					<GigJoinIcon gig={gig} attending={attending} size='large'/>
				</span>
			</Table.Cell>
			<Table.Cell width={5} style={lineup.gig}>
				<div style={lineup.name}>{gig.name}</div>
				<div style={lineup.acts}>{acts ? 'With ' + acts : '\u00A0'}</div>
			</Table.Cell>
			<Table.Cell width={4}>
				<Button basic style={lineup.venue} onClick={viewVenue.bind(null, gig.venue)} >{gig.venue && gig.venue.name}</Button>
			</Table.Cell>
	</Table.Row>
}

export default function LineupTable ({ gigs, tickets, status, history }) {

	if (!gigs || !gigs.length) {
		return null
	}

	// console.log("LINEUP filtered", filtered) 
	// console.log(dates)
	return <div>
		{ days(gigs).map(d =>
			<Table key={d} relaxed='very' selectable style={styles.lineup.table}>
				<Table.Header >
					<Table.Row>
						<Table.HeaderCell style={styles.lineup.date} colSpan={3}>
							{d.format('MMM D, dddd')}
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					
				{gigs.filter(gig => moment(gig.start).isSame(d, 'day'))
					.sort(gigStartSort)
					.map(gig => 
						/*<Link  to={`gig/${gig._id}`}>*/
						<LineupRow
							key={gig._id}
							gig={gig}
							attending={isAttending(gig, tickets, status)}
							onSelect={viewItem(history, './gig/')}
							viewVenue={viewItem(history, './venue/')}
						/>
						/*</Link>*/
				)}
				</Table.Body>
			</Table>

			)
			|| ''
		}
	</div>
}
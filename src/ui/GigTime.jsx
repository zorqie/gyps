import React from 'react'
import moment from 'moment'

const GigDate = ({date, hideYears}) => (
	<div className='gig-date' style={{float:'left'}}>
		<div className='gig-month'>{date.format('MMM')}</div>
		<div className='gig-day'>{date.get('date')}</div>
		{!hideYears && <div className='gig-year'>{date.get('year')}</div> || ''}
	</div>
)

const GigTime = ({gig, showStart=true, showEnd=true, showRelative, showDuration, hideDates, hideYears, ...others}) => {
	const mNow = moment();
	const mStart = moment(gig.start);
	const dateFormat = mNow.year() == mStart.year() ? 'ddd M/D' : 'ddd M/D/YY';
	const timeFormat = 'h:mm\u00A0a'
	const startDate = mStart.format(dateFormat);
	const endDate = gig.end && moment(gig.end).format(dateFormat);
	
	const endFormat = endDate===startDate 
		? timeFormat
		: `${timeFormat} on\u00A0${dateFormat}`

	const relative = showRelative 
		? <span className='gig-relative'>{'(' + moment().to(mStart) + ')'}</span> 
		: ''

	const duration = (showDuration && gig.end) 
		? <span className='gig-duration'>{moment.duration(moment(gig.end).diff(mStart)).humanize()}</span> 
		: ''
	// {...others} passes the styling on
	return <span className='gig-time' {...others}>
			<span className='gig-start'>
				{!hideDates && <GigDate date={mStart} hideYears={hideYears}/>}
				{mStart.format(timeFormat)}
			</span>
			{showEnd && (<span>
				{endDate && <span className='gig-dash'>{' \u2013 '}</span>}
				{endDate && (<span className='gig-end'>{moment(gig.end).format(endFormat)}</span>)}
				</span>)
			}
			{' '}
			{duration}
			{' '}
			{relative}
		</span>
}
				// : endDate + ' at\u00A0'}{moment(gig.end).format(timeFormat)}</span>)}

export default GigTime
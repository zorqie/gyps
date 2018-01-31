import React from 'react'
import { Link } from 'react-router-dom'

export default function GigTitle({gig}) {
	const { acts, venue } = gig
	return <span>
		{acts && <span className='gig-acts'>
			{acts.map((act, i, a) => 
				<span key={act._id}>
					<Link to={'../act/'+act._id}>{act.name}</Link>
					{i==a.length-1 ? '':', '}
				</span>
			)}
		</span>}
		{venue 
			&& <span>
				at the 
				<Link to={`../site/${venue._id}`} className='gig-venue' >
					{venue.name}
				</Link>
			</span>}
	</span>
}
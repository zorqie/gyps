import React from 'react'
import { Label } from 'semantic-ui-react'

export default function Attendance({gig}) {
	return gig.attending 
		&& <Label style={{float:'right'}}>
			Attending: <Label.Detail>{gig.attending.length}</Label.Detail>
		</Label>
		|| null
}

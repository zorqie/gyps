import React from 'react'

import { Button, Icon } from 'semantic-ui-react'

const styles = {
	button: {
		textTransform: 'uppercase',
		fontWeight: 400,
		letterSpacing: '3px',
	}, 
	icon: {
		marginTop: '-0.34em'
	}
}

export default function GigJoinButton({gig, attending, handleJoin, handleLeave, hideLabels}) {
	return (
		gig.mandatory 
		? <Icon name="calendar check" size="big" title="No skipping that one"/>
		: attending
			? <Button 
				size="large" 
				color="black"
				onClick={handleLeave.bind(null, gig)}
				style={styles.button}
			><Icon name="calendar minus" size="large" style={styles.icon}/>Leave
			</Button>
			: <Button 
				basic
				size="large" 
				onClick={handleJoin.bind(null, gig)}
				style={styles.button}
				>
				<Icon name='calendar plus' size="large" style={styles.icon}/>
				Join
			</Button>
	)
}
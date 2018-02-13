const styles = {
	gigType: {
		fontSize: '12dp',
		fontWeight: '300',
		float: 'right'
	},
	duration: {
		fontSize: 'smaller',
		color: 'grey'
	},
	venue: {
		textTransform: 'uppercase', 
		letterSpacing: '3px', 
	},
	footer: {
		position: 'fixed', 
		bottom: 0, 
		right: '1em', 
		fontSize: 'smaller', 
		
	},

	scheduleDate: {
		fontFamily: 'Roboto, sans-serif',
		fontWeight: 300,
		fontSize: '24px',
		padding: '24px',
		textAlign: 'left',
		whiteSpace: 'nowrap',
	},
	
	lineup: {
		table: {
			margin: '1em',
			border: 'none',
		},
		date: {
			fontFamily: 'Roboto, sans-serif',
			fontWeight: 300,
			fontSize: '24px',
			marginTop: '1em',
			background: 'none'
		},
		time: {
			verticalAlign: 'top',
			fontWeight: 300,
		},
		gig: {
			display: 'inline-block',
		},
		name: {
			fontWeight: 500,
		},
		venue: {
			verticalAlign: 'top',
			fontSize: 'small',
			letterSpacing: '2px',
			textTransform: 'uppercase',
			whiteSpace: 'nowrap',
		},
		acts: {
			fontSize: 'small',
			fontWeight: 300,
			color: 'rgba(0, 0, 0, 0.870588)',
		}
	}
}

export default styles
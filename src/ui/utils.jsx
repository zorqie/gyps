export const viewItem = (history, base='/item') => (item, e) => (e && e.preventDefault() && e.stopPropagation(), history.push(base + item._id))
export const viewGig = (history, base='/gig/') => gig => history.push(base + gig._id)
export const viewAct = (history, base='/act/') => act => history.push(base + act._id)
export const viewSite = (history, base='/venue/') => site => history.push(base + site._id)



export function isAttending(gig, tickets, status='Attending') {
	return tickets && tickets[gig._id] === status
}

export const ticketsByGig = 
	tickets => tickets.reduce((o, t) => Object.assign(o, {[t.gig_id]:t.status}), {})

export const gigJoin = app => (gig, status='Attending') => {
	// const start = performance.now()
	const ticket = {gig_id: gig._id, status}
	app.service('tickets').create(ticket)
	// .then(t => console.log(t, "Created in ", performance.now() - start))
	.catch(err => {
		app.emit('error', err)
		console.error("What could be wrong", err)
		console.error("This", JSON.stringify(err))
	})
}

export const gigLeave = app => (gig, status='Attending') => {
	// TODO ensure status is string
	app.service('tickets')
	.remove(null, {
		query: {
			gig_id: gig._id, 
			owner_id: app.get('user')._id,
			status
		}
	})
	.catch(err => {
		app.emit('error', err)
		console.error("What could be wrong", err)
		console.error("This", JSON.stringify(err))
	})
}
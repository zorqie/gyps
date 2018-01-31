import { browserHistory } from 'react-router-dom';

const errorHandler = ({feathers, history}) => err => {
	feathers.emit('error', err)
	if(err.code === 401) {
		console.error("ACCESS DENIED. Moving to login");
		history.push('/login');
	} else if(err.code === 404) {
		console.error("Looking in the wrong place for the wrong thing?", err);
		history.push('/nonesuch');
	} else {
		console.error("Errified: ", err);
		console.error("Errorized: " + JSON.stringify(err));
	}
}

export default errorHandler
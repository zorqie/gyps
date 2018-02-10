import React from 'react';

import { Button, List} from 'semantic-ui-react';


export default function ActsList ({ acts, compact, horizontal, title, onSelect, onEdit, onDelete }) {
	return <div>
		{acts.length && <span style={{fontWeight:300,paddingRight:'0.5em'}}>{title}</span> || ''}
		<List horizontal={horizontal} selection relaxed>
		{acts.map(act => 
			<List.Item 
				key={act._id} 
				onClick={onSelect ? onSelect.bind(null, act) : ()=>null}
			>
				<List.Header>{act.name}</List.Header>
				<List.Content>
					{compact ? '' : (act.description || ' ')}
					{onEdit && <Button label="Edit" onClick={onEdit.bind(null, act)}/>}
					{onDelete && <Button label="Delete" onClick={onDelete.bind(null, act)}/>}
				</List.Content>
			</List.Item>
		)}
		</List>
	</div>
}

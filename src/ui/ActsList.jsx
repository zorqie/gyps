import React from 'react';

import { Button, List} from 'semantic-ui-react';


export default function ActsList ({ acts, compact, title, onSelect, onEdit, onDelete }) {
	return <List selection divided relaxed>
		{acts.length && title || ''}
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
}

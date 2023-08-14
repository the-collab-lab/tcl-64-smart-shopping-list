import { ListItem } from '../components';

export function List({ data }) {
	const listItemsToDisplay = data.map((item) => {
		return <ListItem key={item.id} name={item.name} />;
	});

	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<ul>{listItemsToDisplay}</ul>
		</>
	);
}

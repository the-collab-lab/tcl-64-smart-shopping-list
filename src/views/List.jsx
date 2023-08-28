import { ListItem } from '../components';
import { useState } from 'react';

export function List({ data }) {
	const [searchInput, setSearchInput] = useState('');
	const [displayList, setDisplayList] = useState(data);
	const filterDisplay = (currentInput) => {
		const filteredList = displayList.filter((listItem) => {
			return listItem.name.toLowerCase().includes(currentInput.toLowerCase());
		});
		console.log(filteredList);
	};

	const listItemsToDisplay = displayList.map((item) => {
		return <ListItem key={item.id} name={item.name} />;
	});
	console.log(searchInput);
	return (
		<>
			<p>
				Hello from the <code>/list</code> page!
			</p>
			<form>
				<label htmlFor="filter">Filter by item name</label>
				<br />
				<input
					type="text"
					name="filter"
					id="filter"
					value={searchInput}
					onChange={(e) => {
						setSearchInput(e.target.value);
						filterDisplay(searchInput);
					}}
				></input>
			</form>
			<ul>{listItemsToDisplay}</ul>
		</>
	);
}

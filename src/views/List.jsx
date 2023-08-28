import { ListItem } from '../components';
import { useState, useEffect } from 'react';

export function List({ data }) {
	const [searchInput, setSearchInput] = useState('');
	const [displayList, setDisplayList] = useState([]);

	useEffect(() => {
		setDisplayList(data);
	}, [data]);

	const listItemsToDisplay = displayList.map((item) => {
		return <ListItem key={item.id} name={item.name} />;
	});

	const resetDisplayList = (e) => {
		e.preventDefault();
		setDisplayList(data);
		setSearchInput('');
	};

	const filterDisplay = (currentInput) => {
		const filteredList = data.filter((listItem) => {
			return listItem.name.toLowerCase().includes(currentInput.toLowerCase());
		});
		setDisplayList(filteredList);
	};

	return (
		<>
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
						filterDisplay(e.target.value);
					}}
				></input>
				<button
					onClick={(e) => {
						resetDisplayList(e);
					}}
				>
					X
				</button>
			</form>
			<ul>{listItemsToDisplay}</ul>
		</>
	);
}

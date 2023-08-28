import { ListItem } from '../components';
import { useState } from 'react';

export function List({ data }) {
	const [searchInput, setSearchInput] = useState('');

	const listItemsToDisplay = data.map((item) => {
		return item.name.toLowerCase().includes(searchInput.toLowerCase()) ? (
			<ListItem key={item.id} name={item.name} />
		) : null;
	});

	const resetDisplayList = (e) => {
		e.preventDefault();
		setSearchInput('');
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
					}}
				></input>
				<button
					name="clearInput"
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

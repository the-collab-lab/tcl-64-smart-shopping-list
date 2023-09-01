import { ListItem } from '../components';
import { useState } from 'react';

export function List({ data }) {
	const [searchInput, setSearchInput] = useState('');

	const listItemsToDisplay = data.map((item) => {
		const isItemInSearchCriteria = item.name
			?.toLowerCase()
			.includes(searchInput.toLowerCase());

		return isItemInSearchCriteria ? (
			<ListItem key={item.id} name={item.name} />
		) : null;
	});

	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			e.preventDefault();
		}
	};

	const resetDisplayList = (e) => {
		e.preventDefault();
		setSearchInput('');
	};

	return (
		<>
			<form>
				<label htmlFor="filter">Filter List</label>
				<br />
				<input
					type="text"
					name="filter"
					id="filter"
					value={searchInput}
					placeholder="Item name"
					onChange={(e) => {
						setSearchInput(e.target.value);
					}}
					onKeyDown={(e) => {
						handleKeyDown(e);
					}}
				></input>
				<button
					type="button"
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

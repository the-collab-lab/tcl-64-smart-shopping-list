import { ListItem } from '../components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function List({ data }) {
	const [searchInput, setSearchInput] = useState('');
	const navigate = useNavigate();

	const WelcomePrompt = () => {
		return (
			<>
				<h3>Shopping list is currently empty...</h3>
				<button
					type="button"
					onClick={() => {
						navigate('/add-item');
					}}
				>
					Add your first item
				</button>
			</>
		);
	};

	const FormandList = () => {
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
	};

	const listItemsToDisplay = data.map((item) => {
		const isItemInSearch = item.name
			?.toLowerCase()
			.includes(searchInput.toLowerCase());

		return isItemInSearch ? <ListItem key={item.id} name={item.name} /> : null;
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

	return <>{data.length > 1 ? <FormandList /> : <WelcomePrompt />}</>;
}

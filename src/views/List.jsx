import { ListItem } from '../components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDaysBetweenDates } from '../utils';

export function List({ data, listId }) {
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
					Add Item
				</button>
			</>
		);
	};

	const FormAndList = () => {
		const [searchInput, setSearchInput] = useState('');
		// const [urgency, setUrgency] = useState('');

		const handleKeyDown = (e) => {
			if (e.keyCode === 13) {
				e.preventDefault();
			}
		};
		const resetDisplayList = (e) => {
			e.preventDefault();
			setSearchInput('');
		};

		const determineUrgency = (item) => {
			const daysUntilPurchase = getDaysBetweenDates(
				new Date(),
				item.dateNextPurchased.toDate(),
			);
			console.log(item.name, daysUntilPurchase);
			if (daysUntilPurchase <= 7) {
				return 'soon';
			} else if (daysUntilPurchase <= 30) {
				return 'kind of soon';
			} else if (daysUntilPurchase < 60) {
				return 'not soon';
			} else {
				return 'inactive';
			}
		};

		const soonItemsToDisplay = [];
		const kindOfSoonItemsToDisplay = [];
		const notSoonItemsToDisplay = [];
		const inactiveItemsToDisplay = [];

		const listItemsToDisplay = data.map((item) => {
			const isItemInSearch = item.name
				?.toLowerCase()
				.includes(searchInput.toLowerCase());

			const itemUrgency = determineUrgency(item);

			switch (itemUrgency) {
				case 'soon':
					soonItemsToDisplay.push(item.name);
					break;
				case 'kind of soon':
					kindOfSoonItemsToDisplay.push(item.name);
					break;
				case 'not soon':
					notSoonItemsToDisplay.push(item.name);
					break;
				case 'inactive':
					inactiveItemsToDisplay.push(item.name);
					break;
				default:
					break;
			}

			return isItemInSearch ? (
				<ListItem
					key={item.id}
					name={item.name}
					itemId={item.id}
					dateLastPurchased={item.dateLastPurchased}
					totalPurchases={item.totalPurchases}
					listId={listId}
					dateNextPurchased={item.dateNextPurchased}
					dateCreated={item.dateCreated}
					urgency={itemUrgency}
				/>
			) : null;
		});

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

	return <>{data.length > 1 ? <FormAndList /> : <WelcomePrompt />}</>;
}

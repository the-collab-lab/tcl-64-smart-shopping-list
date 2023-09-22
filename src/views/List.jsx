import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListItem } from '../components';
import { comparePurchaseUrgency } from '../api/firebase';

function WelcomePrompt() {
	const navigate = useNavigate();

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
}

function FormAndList({ listId }) {
	const [searchInput, setSearchInput] = useState('');
	const [sortedData, setSortedData] = useState([]);

	useEffect(() => {
		const fetchItemData = async () => {
			const sortedItems = await comparePurchaseUrgency(listId);
			setSortedData(sortedItems);
		};

		fetchItemData();
	}, [listId, sortedData]);

	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			e.preventDefault();
		}
	};

	const resetDisplayList = () => {
		setSearchInput('');
	};

	const determineUrgency = (item) => {
		if (item.daysUntilPurchase < 0) {
			return 'overdue';
		} else if (item.daysUntilPurchase <= 7) {
			return 'soon';
		} else if (item.daysUntilPurchase < 30) {
			return 'kind of soon';
		} else if (item.daysUntilPurchase < 60) {
			return 'not soon';
		} else {
			return 'inactive';
		}
	};

	const listItemsToDisplay = sortedData.map((item) => {
		const isItemInSearch = item.name
			?.toLowerCase()
			.includes(searchInput.toLowerCase());
		const itemUrgency = determineUrgency(item);

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
					onKeyDown={handleKeyDown}
				></input>
				<button type="button" name="clearInput" onClick={resetDisplayList}>
					X
				</button>
			</form>
			<ul>{listItemsToDisplay}</ul>
		</>
	);
}

export function List({ data, listId }) {
	return (
		<>{data.length > 1 ? <FormAndList listId={listId} /> : <WelcomePrompt />}</>
	);
}

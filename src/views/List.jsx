import { ListItem } from '../components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { comparePurchaseUrgency } from '../api/firebase';

import copy from 'clipboard-copy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard as clipboard } from '@fortawesome/free-regular-svg-icons';

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

	const CopyToken = () => {
		const [copied, setCopied] = useState(false);

		const handleCopyToClipboard = async () => {
			try {
				await copy(listId);
				setCopied(true);

				setTimeout(() => {
					setCopied(false);
				}, 3000);
			} catch (err) {
				console.error('Copy failed:', err);
			}
		};

		return (
			<div>
				<span>
					List token: <em>{listId}</em>{' '}
					<button onClick={handleCopyToClipboard}>
						<FontAwesomeIcon icon={clipboard} />
					</button>
				</span>
				{copied ? <p>Copied!</p> : null}
			</div>
		);
	};

	const FormAndList = () => {
		const [searchInput, setSearchInput] = useState('');
		const [sortedData, setSortedData] = useState([]);

		useEffect(() => {
			const fetchItemData = async () => {
				const sortedItems = await comparePurchaseUrgency(listId);
				setSortedData(sortedItems);
			};

			fetchItemData();
		}, []);

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

	return (
		<>
			<CopyToken />
			{data.length > 1 ? <FormAndList /> : <WelcomePrompt />}
		</>
	);
}

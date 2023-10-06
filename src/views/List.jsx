import { ListItem } from '../components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { comparePurchaseUrgency } from '../api/firebase';
import Button from '../components/Button';
import copy from 'clipboard-copy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard as clipboard } from '@fortawesome/free-regular-svg-icons';
import { faFilter as filter } from '@fortawesome/free-solid-svg-icons';

export function List({ data, listId }) {
	const navigate = useNavigate();

	const WelcomePrompt = () => {
		return (
			<>
				<h3>Shopping list is currently empty...</h3>
				<Button
					type="button"
					onClick={() => {
						navigate('/add-item');
					}}
					withIcon={true}
					text="ADD ITEM"
				/>
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
			<div className="flex justify-center items-center">
				<span className="block p-5">
					List token: <em>{listId}</em>{' '}
					<button onClick={handleCopyToClipboard}>
						<FontAwesomeIcon icon={clipboard} title="Copy to clipboard" />
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
				<form className="pb-5">
					<div className="flex flex-col md:flex-row justify-center items-center md:text-left">
						<div>
							<label htmlFor="filter" className="px-3 mt-2">
								Filter List:
							</label>
						</div>
						<div className="w-full sm:w-1/2 flex items-center border-2 rounded-lg py-2 px-3 sm:px-5">
							<FontAwesomeIcon
								icon={filter}
								title="Enter item name"
								className="text-gray-500 mr-2 sm:mr-4"
							/>
							<input
								className="flex-grow border-none bg-transparent placeholder-light dark:placeholder-dark"
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
								className="px-3 mt-2 sm:mt-0 md:text-right"
								type="button"
								name="clearInput"
								onClick={(e) => {
									resetDisplayList(e);
								}}
							>
								X
							</button>
						</div>
					</div>
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

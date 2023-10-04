import { ListItem } from '../components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { comparePurchaseUrgency, deleteItem } from '../api/firebase';
import { Modal } from '../components/Modal';
import Button from '../components/Button';
import copy from 'clipboard-copy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard as clipboard } from '@fortawesome/free-regular-svg-icons';
import { faFilter as filter } from '@fortawesome/free-solid-svg-icons';

export function List({ data, listId }) {
	const navigate = useNavigate();
	const [itemToDelete, setItemToDelete] = useState({ itemId: '', name: '' });
	const [showModal, setShowModal] = useState(false);

	const modalBody = (
		<div className="flex flex-col justify-center">
			<p className="flex justify-center text-center text-white pb-6">
				Are you sure you want to delete this item?
			</p>
			{/* <!--TODO: Restyle name display using standardized inputs ? --> */}
			<p className="flex justify-center text-center text-white">
				{itemToDelete.name}
			</p>
		</div>
	);

	const handleDelete = async (e) => {
		await deleteItem(listId, itemToDelete.itemId);
		setShowModal(false);
	};

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
					setShowModal={setShowModal}
					setItemToDelete={setItemToDelete}
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
								className="flex-grow border-none outline-none bg-transparent placeholder-light dark:placeholder-dark"
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
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				modalBody={modalBody}
				confirmationAction={handleDelete}
			/>
		</>
	);
}

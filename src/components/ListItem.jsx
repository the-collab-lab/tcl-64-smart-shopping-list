import './ListItem.css';
import { useState, useEffect } from 'react';
import { updateItem, deleteItem } from '../api/firebase';

export function ListItem({
	name,
	itemId,
	dateLastPurchased,
	totalPurchases,
	listId,
	dateNextPurchased,
	dateCreated,
	urgency,
}) {
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		const validateCheckboxState = () => {
			if (!dateLastPurchased) {
				return;
			}

			const currentTime = Date.now();
			const dayInMilliSec = 24 * 60 * 60 * 1000;
			const timeSinceLastPurchase = currentTime - dateLastPurchased.toMillis();

			setIsChecked(timeSinceLastPurchase < dayInMilliSec);
		};

		validateCheckboxState();
	}, [dateLastPurchased]);

	const handleCheck = async () => {
		if (!isChecked) {
			await updateItem(
				listId,
				itemId,
				dateLastPurchased,
				dateNextPurchased,
				dateCreated,
				{
					dateLastPurchased: new Date(),
					totalPurchases: totalPurchases + 1,
				},
			);
		}

		setIsChecked(true);
	};

	const handleDelete = async () => {
		if (window.confirm('Are you sure you want to delete this item?')) {
			await deleteItem(listId, itemId);
		}
	};

	return (
		<li className={isChecked ? 'ListItemChecked' : 'ListItem'}>
			<label className="ListItem-label">
				<input
					className="ListItem-checkbox"
					type="checkbox"
					name="checkbox"
					checked={isChecked}
					onChange={handleCheck}
				/>
				<span className="ListItem-name">{name}</span>
				<code className="ListItem-urgency">{urgency}</code>
			</label>
			&nbsp;
			<button onClick={handleDelete}>Delete</button>
		</li>
	);
}

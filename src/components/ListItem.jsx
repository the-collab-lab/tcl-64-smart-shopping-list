import './ListItem.css';
import { useState, useEffect } from 'react';
import { updateItem } from '../api/firebase';

export function ListItem({
	name,
	itemId,
	dateLastPurchased,
	totalPurchases,
	listId,
	dateNextPurchased,
	dateCreated,
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
			// window.open("exit.html", "Thanks for Visiting!");
			console.log('this item was deleted');
		}
	};

	return (
		<li className="ListItem">
			<label>
				<input
					type="checkbox"
					name="checkbox"
					checked={isChecked}
					onChange={handleCheck}
				/>
				{name}
			</label>
			&nbsp;
			<button onClick={handleDelete}>Delete</button>
		</li>
	);
}

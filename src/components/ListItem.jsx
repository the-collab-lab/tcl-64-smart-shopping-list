import './ListItem.css';
import { useState, useEffect } from 'react';
import { updateItem } from '../api/firebase';

export function ListItem({
	name,
	itemId,
	dateLastPurchased,
	totalPurchases,
	listId,
}) {
	const [isChecked, setIsChecked] = useState(false);

	const newTotalPurchases = totalPurchases + 1;

	useEffect(() => {
		const currentTime = Date.now();

		if (dateLastPurchased === null) {
			return;
		}
		const timeSinceLastPurchase = currentTime - dateLastPurchased.toMillis();

		if (timeSinceLastPurchase < 24 * 60 * 60 * 1000) {
			setIsChecked(true);
		} else {
			setIsChecked(false);
		}
	}, [dateLastPurchased]);

	const handleCheck = async () => {
		setIsChecked(!isChecked);

		if (!isChecked) {
			console.log('is checked is true');
			await updateItem(listId, itemId, {
				dateLastPurchased: new Date(),
				totalPurchases: newTotalPurchases,
			});
		}
	};

	return (
		<li className="ListItem">
			<label>
				<input type="checkbox" checked={isChecked} onChange={handleCheck} />
				{name}
			</label>
		</li>
	);
}

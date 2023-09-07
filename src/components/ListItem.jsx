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

	useEffect(() => {
		const validateCheckboxState = () => {
			if (!dateLastPurchased) {
				return;
			}

			const currentTime = Date.now();
			const timeSinceLastPurchase = currentTime - dateLastPurchased.toMillis();
			setIsChecked(timeSinceLastPurchase < 24 * 60 * 60 * 1000);
		};

		validateCheckboxState();
	}, [dateLastPurchased]);

	const handleCheck = async () => {
		if (!isChecked) {
			await updateItem(listId, itemId, {
				dateLastPurchased: new Date(),
				totalPurchases: totalPurchases + 1,
			});
		}

		setIsChecked(true);
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

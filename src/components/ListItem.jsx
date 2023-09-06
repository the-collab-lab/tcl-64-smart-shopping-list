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

	const increasePurchases = totalPurchases + 1;
	const decreasePurchases = totalPurchases - 1;

	useEffect(() => {
		const validateCheckboxState = () => {
			if (dateLastPurchased === null) {
				//update to a falsey?
				return;
			}

			const currentTime = Date.now();
			const timeSinceLastPurchase = currentTime - dateLastPurchased.toMillis();

			setIsChecked(timeSinceLastPurchase < 24 * 60 * 60 * 1000);
		};

		validateCheckboxState();
	}, [dateLastPurchased]);

	const handleCheck = async () => {
		setIsChecked(!isChecked);

		if (!isChecked) {
			await updateItem(listId, itemId, {
				dateLastPurchased: new Date(),
				totalPurchases: increasePurchases,
			});
		} else {
			setIsChecked(false);

			await updateItem(listId, itemId, {
				dateLastPurchased: null,
				totalPurchases: decreasePurchases,
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

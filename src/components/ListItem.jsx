import './ListItem.css';
import { useState } from 'react';
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
				<input type="checkbox" onChange={handleCheck} />
				{name}
			</label>
		</li>
	);
}

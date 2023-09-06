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
		setIsChecked(!isChecked);

		const updatedDate = !isChecked ? new Date() : null;
		const updatedTotal = !isChecked ? totalPurchases + 1 : totalPurchases - 1;

		await updateItem(listId, itemId, {
			dateLastPurchased: updatedDate,
			totalPurchases: updatedTotal,
		});
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

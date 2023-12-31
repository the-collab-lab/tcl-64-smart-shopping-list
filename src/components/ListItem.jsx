import './ListItem.css';
import { useState, useEffect } from 'react';
import { updateItem } from '../api/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan as trash } from '@fortawesome/free-regular-svg-icons';

export function ListItem({
	name,
	itemId,
	dateLastPurchased,
	totalPurchases,
	listId,
	dateNextPurchased,
	dateCreated,
	urgency,
	setShowModal,
	setItemToDelete,
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

	return (
		<li className={isChecked ? 'ListItemChecked' : 'ListItem'}>
			<label
				className={isChecked ? 'ListItem-label-checked' : 'ListItem-label'}
			>
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
			<button
				onClick={() => {
					setItemToDelete({ itemId: itemId, name: name });
					setShowModal(true);
				}}
			>
				<FontAwesomeIcon icon={trash} title="Delete item" />
			</button>
		</li>
	);
}

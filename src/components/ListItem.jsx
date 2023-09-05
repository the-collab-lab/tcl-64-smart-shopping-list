import './ListItem.css';
import { useState } from 'react';
import { updateItem } from '../api/firebase';

export function ListItem({ name, itemId }) {
	const [isChecked, setIsChecked] = useState(false);

	const handleCheck = async () => {
		setIsChecked(true);

		if (!isChecked) {
			await updateItem(itemId, {});
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

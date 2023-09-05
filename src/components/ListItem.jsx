import './ListItem.css';
import { useState } from 'react';

export function ListItem({ name }) {
	const [isChecked, setIsChecked] = useState(false);

	const handleCheck = async () => {
		setIsChecked(true);
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

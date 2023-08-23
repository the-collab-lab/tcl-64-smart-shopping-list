import { useState, useEffect } from 'react';
import { addItem } from '../api/firebase';

const dayConverter = (text) => {
	if (text === 'soon') {
		return 7;
	} else if (text === 'kind-of-soon') {
		return 14;
	} else {
		return 30;
	}
};
export function AddItem() {
	const [itemName, setItemName] = useState('');
	const [frequency, setFrequency] = useState('soon');
	const [message, setMessage] = useState('');
	const listId = 'my test list';
	const handleSubmit = async (e) => {
		e.preventDefault();
		const daysUntilNextPurchase = dayConverter(frequency);
		try {
			await addItem(listId, { itemName, daysUntilNextPurchase });
			setMessage(`${itemName} was added to the list`);
			setItemName('');
			setFrequency('soon');
		} catch (err) {
			console.error(err);
			setMessage(`Failed to Add: ${itemName}`);
		}
	};
	const handleChange = (e) => {
		setFrequency(e.target.value);
	};
	useEffect(() => {
		const handleKeyPress = async (e) => {
			if (e.key === 'Enter' && e.keyCode === 13) {
				e.preventDefault();
				const daysUntilNextPurchase = dayConverter(frequency);
				try {
					await addItem(listId, {
						itemName,
						daysUntilNextPurchase,
					});
					setMessage(`${itemName} was added to the list`);
					setItemName('');
					setFrequency('soon');
				} catch (err) {
					console.error(err);
					setMessage(`Failed Add: ${itemName}`);
				}
			}
		};
		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [itemName, frequency]);
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="item">Item:</label>
				<input
					type="text"
					id="item"
					name="item"
					placeholder="Enter Item"
					value={itemName}
					onChange={(e) => {
						setItemName(e.target.value);
					}}
				/>
				<br />
				<input
					id="soon"
					type="radio"
					name="frequency"
					value="soon"
					checked={frequency === 'soon'}
					onChange={handleChange}
				/>
				<label htmlFor="soon">Soon</label>
				<br />
				<input
					id="kind-of-soon"
					type="radio"
					name="frequency"
					value="kind-of-soon"
					checked={frequency === 'kind-of-soon'}
					onChange={handleChange}
				/>
				<label htmlFor="kind-of-soon">Kind of Soon</label>
				<br />
				<input
					id="not-soon"
					type="radio"
					name="frequency"
					value="not-soon"
					checked={frequency === 'not-soon'}
					onChange={handleChange}
				/>
				<label htmlFor="not-soon">Not Soon</label>
				<br />
				<button type="submit">Add Item</button>
			</form>
			<div>{message && <p>{message}</p>}</div>
		</div>
	);
}

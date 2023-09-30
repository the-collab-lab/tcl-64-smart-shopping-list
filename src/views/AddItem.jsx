import { useState } from 'react';
import { addItem } from '../api/firebase';
import { RoughNotation } from 'react-rough-notation';

const messageResetTimeout = 3000;

const dayConverter = (text) => {
	switch (text) {
		case 'soon':
			return 7;
		case 'kind-of-soon':
			return 14;
		default:
			return 30;
	}
};

export function AddItem({ listId, data }) {
	const [itemName, setItemName] = useState('');
	const [frequency, setFrequency] = useState('soon');
	const [itemMessage, setItemMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [showRoughNotation, setShowRoughNotation] = useState(false);
	const [color, setColor] = useState('');

	const clearErrorMessage = () => {
		setTimeout(() => {
			setErrorMessage('');
			setShowRoughNotation(false);
		}, messageResetTimeout);
	};

	const clearItemMessage = () => {
		setTimeout(() => {
			setItemMessage('');
			setShowRoughNotation(false);
		}, messageResetTimeout);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!itemName.trim()) {
			setErrorMessage('Please enter item name.');
			setColor('FF0000'); // red
			setShowRoughNotation(true);
			clearErrorMessage();
			return;
		}

		const existingItem = data.find((item) => {
			return (
				itemName.localeCompare(item.name, 'en', {
					sensitivity: 'base',
					ignorePunctuation: true,
				}) === 0
			);
		});

		if (existingItem !== undefined) {
			setErrorMessage(`${existingItem.name} is already in your shopping list.`);
			setColor('FF0000');
			setShowRoughNotation(true);
			clearErrorMessage();
			return;
		}

		const daysUntilNextPurchase = dayConverter(frequency);
		try {
			await addItem(listId, { itemName, daysUntilNextPurchase });
			setItemMessage(`${itemName} was added to the list`);
			setColor('7AB179'); // green
			setShowRoughNotation(true);
			setItemName('');
			setFrequency('soon');
			clearItemMessage();
		} catch (err) {
			console.error(err);
			setItemMessage(`Failed to Add: ${itemName}`);
			setColor('FF0000');
			clearItemMessage();
		}
	};

	const handleFrequencyChange = (e) => {
		setFrequency(e.target.value);
	};

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
					onChange={handleFrequencyChange}
				/>
				<label htmlFor="soon">Soon</label>
				<br />
				<input
					id="kind-of-soon"
					type="radio"
					name="frequency"
					value="kind-of-soon"
					checked={frequency === 'kind-of-soon'}
					onChange={handleFrequencyChange}
				/>
				<label htmlFor="kind-of-soon">Kind of Soon</label>
				<br />
				<input
					id="not-soon"
					type="radio"
					name="frequency"
					value="not-soon"
					checked={frequency === 'not-soon'}
					onChange={handleFrequencyChange}
				/>
				<label htmlFor="not-soon">Not Soon</label>
				<br />
				<button type="submit">Add Item</button>
			</form>
			<div>
				{errorMessage && (
					<RoughNotation
						type="underline"
						strokeWidth={2}
						color={`#${color}`}
						show={showRoughNotation}
					>
						{errorMessage}
					</RoughNotation>
				)}
			</div>
			<div>
				{itemMessage && (
					<RoughNotation
						type="underline"
						strokeWidth={2}
						color={`#${color}`}
						show={showRoughNotation}
					>
						{itemMessage}
					</RoughNotation>
				)}
			</div>
		</div>
	);
}

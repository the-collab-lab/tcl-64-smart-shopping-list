import { useState } from 'react';
import { addItem } from '../api/firebase';
import { UrgencyTag } from '../components/UrgencyTag';

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

	const clearErrorMessage = () => {
		setTimeout(() => {
			setErrorMessage('');
		}, messageResetTimeout);
	};

	const clearItemMessage = () => {
		setTimeout(() => {
			setItemMessage('');
		}, messageResetTimeout);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!itemName.trim()) {
			setErrorMessage('Please enter item name.');
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
			clearErrorMessage();
			return;
		}

		const daysUntilNextPurchase = dayConverter(frequency);
		try {
			await addItem(listId, { itemName, daysUntilNextPurchase });
			setItemMessage(`${itemName} was added to the list`);
			setItemName('');
			setFrequency('soon');
			clearItemMessage();
		} catch (err) {
			console.error(err);
			setItemMessage(`Failed to Add: ${itemName}`);
			clearItemMessage();
		}
	};

	const handleFrequencyChange = (e) => {
		setFrequency(e.target.value);
	};

	return (
		<div className="text-center">
			<div className="flex items-center justify-center h-32">
				<div>{errorMessage && <p>{errorMessage}</p>}</div>
				<div>{itemMessage && <p>{itemMessage}</p>}</div>
			</div>
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
				<div className="flex flex-col sm:flex-row sm:gap-6 justify-center mb-10 sm:py-44">
					<UrgencyTag
						color={'bg-light-blue'}
						value={'soon'}
						frequency={frequency}
						setFrequency={setFrequency}
						handleFrequencyChange={handleFrequencyChange}
						tagName={'Soon'}
						order={'1'}
					/>
					<UrgencyTag
						color={'bg-yellow'}
						value={'kind-of-soon'}
						frequency={frequency}
						setFrequency={setFrequency}
						handleFrequencyChange={handleFrequencyChange}
						tagName={'Kind of Soon'}
						order={'2'}
					/>
					<UrgencyTag
						color={'bg-red'}
						value={'not-soon'}
						frequency={frequency}
						setFrequency={setFrequency}
						handleFrequencyChange={handleFrequencyChange}
						tagName={'Not Soon'}
						order={'3'}
					/>
				</div>
				<p className="m-3">How soon do you need to buy this item?</p>
				<button type="submit" className="bg-green">
					Add Item
				</button>
			</form>
		</div>
	);
}

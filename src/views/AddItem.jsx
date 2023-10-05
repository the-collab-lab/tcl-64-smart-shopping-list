import { useState } from 'react';
import { addItem } from '../api/firebase';
import { RoughNotation } from 'react-rough-notation';
import { UrgencyTag } from '../components/UrgencyTag';
import Button from '../components/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus as plus } from '@fortawesome/free-solid-svg-icons';

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
		<div className="text-center">
			<div className="flex items-center justify-center h-16">
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
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col justify-center items-center">
					<label htmlFor="item" className="px-3 mt-2 font-semibold">
						Item:
					</label>
					<div className="w-full sm:w-1/2 flex items-center border-2 rounded-lg py-2 px-3">
						<FontAwesomeIcon
							icon={plus}
							title="Enter item name"
							className="text-gray-500 mr-2 sm:mr-4"
						/>
						<input
							className="pl-2 flex-grow border-none outline-none bg-transparent"
							type="text"
							id="item"
							name="item"
							placeholder="Enter Item"
							value={itemName}
							onChange={(e) => {
								setItemName(e.target.value);
							}}
						/>
					</div>
				</div>
				<p className="mt-3 pt-10">How soon do you need to buy this item?</p>
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
				<Button
					text="ADD ITEM"
					withIcon={true}
					onClick={handleSubmit}
					className="mb-5"
				/>
			</form>
		</div>
	);
}

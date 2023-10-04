import './Home.css';
import { useNavigate } from 'react-router-dom';
import { createNewList } from '../api/firebase';
import { useState } from 'react';
import { checkIfListExists } from '../api/firebase';
import { RoughNotation } from 'react-rough-notation';
import Button from '../components/Button';

const messageResetTimeout = 3000;

export function Home({ createToken, setListToken }) {
	const navigate = useNavigate();
	const [createListMessage, setCreateListMessage] = useState('');
	const [existingListMessage, setExistingListMessage] = useState('');
	const [tokenInput, setTokenInput] = useState('');
	const [showRoughNotation, setShowRoughNotation] = useState(false);
	const messageColor = 'FF0000';

	async function handleCreateClick(e) {
		e.preventDefault();
		let listId = createToken();

		const firestoreResult = await createNewList(listId);
		if (firestoreResult !== 'error') {
			setListToken(listId);
			navigate('/list');
		} else {
			listId = null;
			setListToken(listId);
			setCreateListMessage(
				'Your shopping list was not created. Please try again. ',
			);
			setShowRoughNotation(true);
			clearErrorMessage();
		}
	}

	async function handleTokenInputFormSubmit(e) {
		e.preventDefault();

		if (!tokenInput) {
			setExistingListMessage('Please enter a token.');
			setShowRoughNotation(true);
			clearErrorMessage();
			return;
		}
		const listExists = await checkIfListExists(tokenInput);
		if (listExists) {
			setListToken(tokenInput);
			navigate('/list');
		} else {
			setExistingListMessage(' Enter a valid token or create a new list.');
			setShowRoughNotation(true);
			clearErrorMessage();
			setTokenInput('');
		}
	}
	function handleTokenInputChange(e) {
		setTokenInput(e.target.value);
	}

	const clearErrorMessage = () => {
		setTimeout(() => {
			setExistingListMessage('');
			setCreateListMessage('');
			setShowRoughNotation(false);
		}, messageResetTimeout);
	};

	return (
		<div className="Home">
			<h2>Welcome to your Smart Shopping List</h2>
			<div className="h-20 p-5 text-center">
				{existingListMessage && (
					<RoughNotation
						type="underline"
						strokeWidth={2}
						color={`#${messageColor}`}
						show={showRoughNotation}
					>
						{existingListMessage}
					</RoughNotation>
				)}
			</div>
			<div>
				{createListMessage && (
					<RoughNotation
						type="underline"
						strokeWidth={2}
						color={`#${messageColor}`}
						show={showRoughNotation}
					>
						{createListMessage}
					</RoughNotation>
				)}
			</div>
			<form
				onSubmit={handleTokenInputFormSubmit}
				className="flex flex-col items-center"
			>
				<label htmlFor="tokenInput">Enter existing list token:</label>
				<br />
				<input
					type="text"
					id="tokenInput"
					value={tokenInput}
					onChange={handleTokenInputChange}
					placeholder="Enter token"
				/>
				<br />
				<div className="flex flex-col items-center gap-10">
					<Button
						onClick={(e) => handleCreateClick(e)}
						text="CREATE LIST"
						className="max-w-4xl"
					/>
					<button
						type="submit"
						className="underline underline-offset-8 font-semibold text-green dark:text-light-green"
					>
						Join existing list
					</button>
				</div>
			</form>
		</div>
	);
}

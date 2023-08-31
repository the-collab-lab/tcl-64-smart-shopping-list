import './Home.css';
import { useNavigate } from 'react-router-dom';
import { createNewList } from '../api/firebase';
import { useState } from 'react';
import { checkIfListExists } from '../api/firebase';

export function Home({ createToken, setListToken }) {
	const navigate = useNavigate();
	const [createListMessage, setCreateListMessage] = useState('');
	const [existingListMessage, setExistingListMessage] = useState('');
	const [tokenInput, setTokenInput] = useState('');

	async function handleCreateClick() {
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
		}
	}

	async function handleJoinClick(e) {
		e.preventDefault();

		let message = '';

		if (!tokenInput) {
			message = 'Please enter a token.';
		} else {
			const listExists = await checkIfListExists(tokenInput);
			message = listExists
				? '/list'
				: ' Enter a valid token or create a new list.';
		}

		setExistingListMessage(message);
		if (message === '/list') {
			setListToken(tokenInput);
			navigate('/list');
		}
	}
	function handleTokenInputChange(e) {
		setTokenInput(e.target.value);
	}

	return (
		<div className="Home">
			<h2>Welcome to your Smart Shopping List</h2>
			<form onSubmit={handleJoinClick}>
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
				<button type="submit">Join existing list</button>
				<br />
			</form>
			<p>{existingListMessage}</p>
			<br />
			<button onClick={handleCreateClick}>Create a new list</button>
			<p>{createListMessage}</p>
		</div>
	);
}

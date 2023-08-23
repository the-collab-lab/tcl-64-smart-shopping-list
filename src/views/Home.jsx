import './Home.css';
import { useNavigate } from 'react-router-dom';
import { createNewList } from '../api/firebase';
import { useState } from 'react';

export function Home({ createToken, setListToken }) {
	const navigate = useNavigate();
	const [message, setMessage] = useState('');

	async function handleClick() {
		let listId = createToken();

		const firestoreResult = await createNewList(listId);
		if (firestoreResult !== 'error') {
			setListToken(listId);
			navigate('/list');
		} else {
			listId = null;
			setListToken(listId);
			setMessage('Your shopping list was not created. Please try again. ');
		}
	}

	return (
		<div className="Home">
			<h2>Welcome to your Smart Shopping List</h2>
			<button onClick={handleClick}>Create a new list</button>
			<p>{message}</p>
		</div>
	);
}

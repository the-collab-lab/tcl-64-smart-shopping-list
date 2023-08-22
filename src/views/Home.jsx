import './Home.css';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../api/config';

export function Home({ createToken }) {
	const navigate = useNavigate();

	async function createNewList() {
		const listId = createToken();
		try {
			await addDoc(collection(db, listId), {});
			console.log('Grocery list created for token: ', listId);
			navigate('/list');
		} catch (error) {
			console.error('Error creating grocery list: ', error);
		}
	}

	return (
		<div className="Home">
			<h2>Welcome to your Smart Shopping List</h2>
			<button onClick={createNewList}>Create a new list</button>
		</div>
	);
}

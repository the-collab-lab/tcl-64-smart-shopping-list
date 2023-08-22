import './Home.css';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../api/config';

export function Home({ createToken }) {
	const navigate = useNavigate();

	// function createNewList() {
	// 	if (createToken()) {
	// 		navigate('/list');
	// 	}
	// }

	async function createNewList() {
		const token = createToken();
		const groceryData = {
			itemName: null,
			buyTime: null,
		};
		try {
			await addDoc(collection(db, 'tokens', token, 'groceryList'), groceryData);
			console.log('Grocery list created for token: ', token);
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

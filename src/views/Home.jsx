import './Home.css';
import { useNavigate } from 'react-router-dom';
import { createNewList } from '../api/firebase';

export function Home({ createToken, setListToken }) {
	const navigate = useNavigate();

	async function handleClick() {
		let listId = createToken();

		const result = await createNewList(listId);
		if (result !== 'error') {
			setListToken(listId);
			navigate('/list');
		} else {
			listId = null;
			setListToken(listId);
		}
	}

	return (
		<div className="Home">
			<h2>Welcome to your Smart Shopping List</h2>
			<button onClick={handleClick}>Create a new list</button>
		</div>
	);
}

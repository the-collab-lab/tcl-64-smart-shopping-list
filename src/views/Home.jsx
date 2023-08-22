import './Home.css';
import { useNavigate } from 'react-router-dom';
import { createNewList } from '../api/firebase';

export function Home({ createToken, setListToken, listToken }) {
	const navigate = useNavigate();

	if (listToken) {
		navigate('/list');
	}

	function handleClick() {
		let listId = createToken();
		if (createNewList(listId) !== 'error') {
			setListToken(listId);
			navigate('/list');
		} else {
			listId = null;
			console.log(listId);
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

import './Home.css';
import { useNavigate } from 'react-router-dom';

export function Home({ createToken }) {
	const navigate = useNavigate();

	function createNewList() {
		if (createToken()) {
			navigate('/list');
		}
	}

	return (
		<div className="Home">
			<h2>Welcome to your Smart Shopping List</h2>
			<button onClick={createNewList}>Create a new list</button>
		</div>
	);
}

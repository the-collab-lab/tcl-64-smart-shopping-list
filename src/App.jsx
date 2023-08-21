import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from 'react-router-dom';

import { AddItem, Home, Layout, List } from './views';

import { useShoppingListData } from './api';

import { useStateWithStorage } from './utils';

import { generateToken } from '@the-collab-lab/shopping-list-utils';

export function App() {
	/**
	 * This custom hook takes a token pointing to a shopping list
	 * in our database and syncs it with localStorage for later use.
	 * Check ./utils/hooks.js for its implementation.
	 *
	 * We use `my test list` by default so we can see the list
	 * of items that was prepopulated for this project.
	 * We'll later set this to `null` by default (since new users do not
	 * have tokens), and use `setListToken` when we allow a user
	 * to create and join a new list.
	 */
	const [listToken, setListToken] = useStateWithStorage(
		'tcl-shopping-list-token',
		null,
	);

	/**
	 * This custom hook takes our token and fetches the data for our list.
	 * Check ./api/firestore.js for its implementation.
	 */
	const data = useShoppingListData(listToken);
	const navigate = useNavigate();

	function createNewList() {
		try {
			const newToken = generateToken();
			setListToken(newToken);
			navigate('/list');
		} catch {
			console.log('Error: An error occurred while setting the new token');
		}
	}

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home createNewList={createNewList} />} />
					<Route path="/list" element={<List data={data} />} />
					<Route path="/add-item" element={<AddItem />} />
				</Route>
			</Routes>
		</Router>
	);
}

import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
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

	function createToken() {
		try {
			const newToken = generateToken();
			return newToken;
		} catch (error) {
			console.error('Error creating token: ', error);
		}
	}

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={<Layout setListToken={setListToken} listId={listToken} />}
				>
					<Route
						index
						element={
							listToken ? (
								<Navigate to="/list" />
							) : (
								<Home createToken={createToken} setListToken={setListToken} />
							)
						}
					/>
					<Route
						path="/list"
						element={
							listToken ? (
								<List data={data} listId={listToken} />
							) : (
								<Navigate to="/" />
							)
						}
					/>
					<Route
						path="/add-item"
						element={
							listToken ? (
								<AddItem data={data} listId={listToken} />
							) : (
								<Navigate to="/" />
							)
						}
					/>
				</Route>
			</Routes>
		</Router>
	);
}

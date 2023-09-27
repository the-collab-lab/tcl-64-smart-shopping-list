import { Outlet, NavLink } from 'react-router-dom';

import './Layout.css';

/**
 * TODO: The links defined in this file don't work!
 *
 * Instead of anchor element, they should use a component
 * from `react-router-dom` to navigate to the routes
 * defined in `App.jsx`.
 */

export function Layout() {
	const listToken = localStorage.getItem('tcl-shopping-list-token');

	return (
		<>
			<div className="Layout">
				<header className="Layout-header">
					<h1>Smart shopping list</h1>
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">
					<div className="Nav-container">
						{!listToken ? (
							<NavLink to="/" className="Nav-link">
								Home
							</NavLink>
						) : null}
						{listToken ? (
							<NavLink to="/list" className="Nav-link">
								List
							</NavLink>
						) : null}
						{listToken ? (
							<NavLink to="/add-item" className="Nav-link">
								Add Item
							</NavLink>
						) : null}
					</div>
				</nav>
			</div>
		</>
	);
}

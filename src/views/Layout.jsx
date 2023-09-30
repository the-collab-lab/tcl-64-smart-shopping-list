import { Outlet, NavLink } from 'react-router-dom';
import './Layout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faRightFromBracket,
	faList,
	faPlus,
} from '@fortawesome/free-solid-svg-icons';

// import { faLeaf } from '@fortawesome/free-brands-svg-icons';

/**
 * TODO: The links defined in this file don't work!
 *
 * Instead of anchor element, they should use a component
 * from `react-router-dom` to navigate to the routes
 * defined in `App.jsx`.
 */

export function Layout() {
	return (
		<>
			<div className="Layout">
				<header className="Layout-header flex justify-end">
					<FontAwesomeIcon
						icon={faRightFromBracket}
						title="Leave list"
						className="text-black"
					/>
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">
					<div className="Nav-container">
						<NavLink to="/list" className="Nav-link">
							<FontAwesomeIcon
								icon={faList}
								title="Navigate to list page"
								className="text-black"
							/>
							<br />
							<p
								className="text-lg
							 text-black"
							>
								List
							</p>
						</NavLink>
						<NavLink to="/add-item" className="Nav-link">
							<FontAwesomeIcon
								icon={faPlus}
								title="Navigate to the add item page"
								className="text-black"
							/>
							<br />
							<p className="text-lg">Add Item</p>
						</NavLink>
					</div>
				</nav>
			</div>
		</>
	);
}

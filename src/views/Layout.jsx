import { Outlet, NavLink, useLocation } from 'react-router-dom';
import './Layout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faRightFromBracket,
	faList,
	faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export function Layout({ setListToken }) {
	const location = useLocation();

	const removeListToken = () => {
		localStorage.removeItem('tcl-shopping-list-token');
		setListToken(null);
	};

	const listToken = localStorage.getItem('tcl-shopping-list-token');

	const renderNavBar = () => {
		if (!listToken) {
			return (
				<div className="Nav-container flex">
					<a href="https://the-collab-lab.codes/" className="Nav-link">
						<img
							src="https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/collabLabLogo.svg"
							alt="CollabLab logo, click here to learn more"
							className="text-black h-12 -mt-1 md:h-16 "
						/>
					</a>
					<a
						href="https://github.com/the-collab-lab/tcl-64-smart-shopping-list"
						className="Nav-link"
					>
						<FontAwesomeIcon
							icon={faGithub}
							title="Navigate to project repository"
							className="text-black md:text-6xl -mt-2"
						/>
					</a>
					<p className="text-xl text-black mt-2 pl-4 md:mt-6 md:text-2xl">
						Created by Tiala, Ismarji, Satoshi, and Christina
					</p>
				</div>
			);
		} else {
			if (listToken) {
				return (
					<div className="Nav-container">
						<NavLink
							to="/list"
							className={`Nav-link ${
								location.pathname === '/list' ? 'underline text-black' : ''
							}`}
						>
							<FontAwesomeIcon
								icon={faList}
								title="Navigate to list page"
								className="text-black"
							/>
							<br />
							<p className="text-lg text-black">LIST</p>
						</NavLink>
						<NavLink
							to="/add-item"
							className={`Nav-link ${
								location.pathname === '/add-item' ? 'underline text-black' : ''
							}`}
						>
							<FontAwesomeIcon
								icon={faPlus}
								title="Navigate to the add item page"
								className="text-black"
							/>
							<br />
							<p className="text-lg text-black">ADD ITEM</p>
						</NavLink>
					</div>
				);
			}
		}
	};
	const showLogOut = () => {
		if (!listToken) {
			return <div className="p-10"></div>;
		} else {
			if (listToken) {
				return (
					<div className="p-2">
						<FontAwesomeIcon
							icon={faRightFromBracket}
							title="Leave list"
							className="text-black"
							type="button"
							onClick={removeListToken}
						/>
						<p className="text-lg text-black">LEAVE LIST</p>
					</div>
				);
			}
		}
	};
	return (
		<>
			<div className="Layout">
				<header className="Layout-header flex justify-end">
					{showLogOut()}
				</header>
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">{renderNavBar()}</nav>
			</div>
		</>
	);
}

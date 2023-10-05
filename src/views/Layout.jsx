import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Modal } from '../components/Modal';
import Title from '../components/Title';
import './Layout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faRightFromBracket,
	faList,
	faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export function Layout({ listToken, setListToken }) {
	const location = useLocation();
	const [showModal, setShowModal] = useState(false);

	const removeListToken = () => {
		localStorage.removeItem('tcl-shopping-list-token');
		setListToken(null);
		setShowModal(false);
	};

	const modalBody = (
		<>
			<div className="flex flex-col items-center">
				<p className="flex text-center dark:text-black pb-8 px-3 mt-4">
					Are you sure you want to leave this list?
				</p>
				{/* <!--TODO: Restyle listToken display using standardized inputs ? --> */}
				<p className="flex text-center text-4xl font-extrabold text-green dark:text-black">
					{listToken}
				</p>
				<p className="text-green dark:text-black text-center italic pt-2 pb-4">
					Save your list token for next time!
				</p>
			</div>
		</>
	);

	const renderNavBar = () => {
		if (!listToken) {
			return (
				<div className="Nav-container flex">
					<a href="https://the-collab-lab.codes/" className="Nav-link">
						<img
							src="https://myawsbucketmundoimages.s3.us-east-2.amazonaws.com/collabLabLogo.svg"
							alt="CollabLab logo, click here to learn more"
							className="text-black h-12 md:mt-1 md:h-14 "
						/>
					</a>
					<a
						href="https://github.com/the-collab-lab/tcl-64-smart-shopping-list"
						className="Nav-link"
					>
						<FontAwesomeIcon
							icon={faGithub}
							title="Navigate to project repository"
							className="text-black md:text-6xl md:-mt-0  "
						/>
					</a>
					<p className="text-xl text-black mt-2 pl-4 md:mt-6 md:text-2xl">
						Created by Tiala, Ismarji, Satoshi, and Christina
					</p>
				</div>
			);
		} else if (listToken) {
			return (
				<>
					<div className="Nav-container -mt-4">
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
							<p className="text-lg text-black">VIEW LIST</p>
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
						<NavLink className="Nav-link" onClick={() => setShowModal(true)}>
							<FontAwesomeIcon
								icon={faRightFromBracket}
								title="Leave list"
								className="text-black"
							/>
							<p className="text-lg text-black">LEAVE LIST</p>
							<br />
						</NavLink>
					</div>
					<Modal
						showModal={showModal}
						setShowModal={setShowModal}
						modalBody={modalBody}
						confirmationAction={removeListToken}
					/>
				</>
			);
		}
	};

	return (
		<>
			<div className="Layout">
				<Title />
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">{renderNavBar()}</nav>
			</div>
		</>
	);
}

import { Outlet, NavLink, useLocation } from 'react-router-dom';
import './Layout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faRightFromBracket,
	faList,
	faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Modal } from '../components/Modal';
import { useState } from 'react';
import {
	TERipple,
	TEModal,
	TEModalDialog,
	TEModalContent,
	TEModalHeader,
	TEModalBody,
	TEModalFooter,
} from 'tw-elements-react';

export function Layout({ setListToken }) {
	const [showModal, setShowModal] = useState(false);
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
		} else {
			if (listToken) {
				return (
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
						<NavLink className="Nav-link">
							<FontAwesomeIcon
								icon={faRightFromBracket}
								title="Leave list"
								className="text-black"
								type="button"
								// onClick={removeListToken}
								onClick={() => setShowModal(true)}
							/>
							<p className="text-lg text-black">LEAVE LIST</p>
							<br />
						</NavLink>

						{/* <TEModal show={showModal} setShow={setShowModal}>
				<TEModalDialog>
					<TEModalContent>
						<TEModalHeader>
							
							<h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
								Modal title
							</h5>
							
							<button
								type="button"
								className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
								onClick={() => setShowModal(false)}
								aria-label="Close"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									className="h-6 w-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</TEModalHeader>
						
						<TEModalBody>Modal body text goes here.</TEModalBody>
						<TEModalFooter>
							<TERipple rippleColor="light">
								<button
									type="button"
									className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
									onClick={() => setShowModal(false)}
								>
									Close
								</button>
							</TERipple>
							<TERipple rippleColor="light">
								<button
									type="button"
									className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
								>
									Save changes
								</button>
							</TERipple>
						</TEModalFooter>
					</TEModalContent>
				</TEModalDialog>
			</TEModal> */}
					</div>
				);
			}
		}
	};

	return (
		<>
			<div className="Layout">
				<main className="Layout-main">
					<Outlet />
				</main>
				<nav className="Nav">{renderNavBar()}</nav>
			</div>
		</>
	);
}

import './Home.css';
import { useNavigate } from 'react-router-dom';
import { createNewList } from '../api/firebase';
import { useState } from 'react';
import { Modal } from '../components/Modal';
import { checkIfListExists } from '../api/firebase';
import { RoughNotation } from 'react-rough-notation';
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey as key } from '@fortawesome/free-solid-svg-icons';

const messageResetTimeout = 3000;

export function Home({ createToken, setListToken }) {
	const navigate = useNavigate();
	const [createListMessage, setCreateListMessage] = useState('');
	const [existingListMessage, setExistingListMessage] = useState('');
	const [tokenInput, setTokenInput] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [showRoughNotation, setShowRoughNotation] = useState(false);
	const messageColor = 'FF0000';

	const modalBody = (
		<>
			<form className="flex flex-col items-center">
				<label
					htmlFor="tokenInput"
					className="flex text-center dark:text-black pb-6 px-3 mt-4"
				>
					ENTER LIST TOKEN
				</label>
				<div className="w-full sm:w-4/5 flex items-center border-2 rounded-lg py-2 px-3 sm:px-5 dark:bg-white">
					<FontAwesomeIcon
						icon={key}
						title="Enter item name"
						className="text-gray-500 mr-2 sm:mr-4"
					/>
					<input
						type="text"
						id="tokenInput"
						className="flex-grow border-none outline-none bg-transparent dark:text-black text-center text-2xl mr-14 dark:placeholder:text-green"
						value={tokenInput}
						onChange={handleTokenInputChange}
						placeholder="my list token"
					/>
				</div>
			</form>
		</>
	);

	async function handleCreateClick(e) {
		e.preventDefault();

		let listId = createToken();

		const firestoreResult = await createNewList(listId);
		if (firestoreResult !== 'error') {
			setListToken(listId);
			navigate('/list');
		} else {
			listId = null;
			setListToken(listId);
			setCreateListMessage(
				'Your shopping list was not created. Please try again. ',
			);
			setShowRoughNotation(true);
			clearErrorMessage();
		}
	}

	async function handleTokenInputFormSubmit(e) {
		e.preventDefault();
		setShowModal(false);

		if (!tokenInput) {
			setExistingListMessage('Please enter a token.');
			setShowRoughNotation(true);
			clearErrorMessage();
			return;
		}
		const listExists = await checkIfListExists(tokenInput);
		if (listExists) {
			setListToken(tokenInput);
			navigate('/list');
		} else {
			setExistingListMessage(' Enter a valid token or create a new list.');
			setShowRoughNotation(true);
			clearErrorMessage();
			setTokenInput('');
		}
	}

	function handleTokenInputChange(e) {
		setTokenInput(e.target.value);
	}

	const clearErrorMessage = () => {
		setTimeout(() => {
			setExistingListMessage('');
			setCreateListMessage('');
			setShowRoughNotation(false);
		}, messageResetTimeout);
	};

	return (
		<div className="Home">
			<div>
				{existingListMessage && (
					<RoughNotation
						type="underline"
						strokeWidth={2}
						color={`#${messageColor}`}
						show={showRoughNotation}
					>
						{existingListMessage}
					</RoughNotation>
				)}
			</div>
			<div>
				{createListMessage && (
					<RoughNotation
						type="underline"
						strokeWidth={2}
						color={`#${messageColor}`}
						show={showRoughNotation}
					>
						{createListMessage}
					</RoughNotation>
				)}
			</div>
			<div className="h-[55rem] md:h-[40rem] flex items-center justify-center">
				<div className="flex flex-col items-center gap-10">
					<Button
						onClick={(e) => handleCreateClick(e)}
						text="CREATE LIST"
						className="max-w-4xl border-2 focus:border-mx-auto focus:-rotate-90 focus:sm:rotate-0 focus:border-blue-600"
					/>
					<button
						onClick={() => setShowModal(true)}
						className="underline underline-offset-8 font-semibold text-green dark:text-light-green"
					>
						Join existing list
					</button>
				</div>
			</div>
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				modalBody={modalBody}
				confirmationAction={handleTokenInputFormSubmit}
			/>
		</div>
	);
}

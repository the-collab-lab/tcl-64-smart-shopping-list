import './Home.css';
import { useNavigate } from 'react-router-dom';
import { createNewList } from '../api/firebase';
import { useState } from 'react';
import { Modal } from '../components/Modal';
import { checkIfListExists } from '../api/firebase';
import { RoughNotation } from 'react-rough-notation';
import Button from '../components/Button';

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
			{/* <!--TODO: Finish styling after merging input PR --> */}
			<form className="flex flex-col justify-center">
				<label
					htmlFor="tokenInput"
					className="flex justify-center text-center text-white pb-6"
				>
					ENTER LIST TOKEN
				</label>
				<input
					type="text"
					id="tokenInput"
					className="flex justify-center text-center"
					value={tokenInput}
					onChange={handleTokenInputChange}
					placeholder="my list token"
				/>
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
      <div className="flex flex-col items-center gap-10">
					<Button
						onClick={(e) => handleCreateClick(e)}
						text="CREATE LIST"
						className="max-w-4xl"
					/>
					<button
						onClick={() => setShowModal(true)}
						className="underline underline-offset-8 font-semibold text-green dark:text-light-green"
					>
						Join existing list
					</button>
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

import React from 'react';
import {
	TEModal,
	TEModalDialog,
	TEModalContent,
	TEModalBody,
} from 'tw-elements-react';
import Button from '../components/Button';

export function Modal({
	showModal,
	setShowModal,
	modalBody,
	confirmationAction,
}) {
	return (
		<div>
			<TEModal show={showModal} setShow={setShowModal}>
				<TEModalDialog className="pt-96 px-10">
					<TEModalContent className="rounded-2xl">
						<TEModalBody className="flex flex-col justify-center p-10 dark:bg-light-blue dark:rounded-2xl">
							{modalBody}
							<div className="flex justify-center pt-8 px-8">
								<Button
									text="CANCEL"
									variant="secondaryCancel"
									type="button"
									onClick={() => setShowModal(false)}
									className="text-2xl mb-3 mr-2 sm:mr-3"
								/>
								<Button
									text="CONFIRM"
									variant="secondaryConfirm"
									type="button"
									onClick={confirmationAction}
									className="text-2xl mb-3 ml-2 sm:ml-3"
								/>
							</div>
							{/* <div className="flex justify-center bg-green pt-8 px-8">
								<button
									type="button"
									className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
									onClick={() => setShowModal(false)}
								>
									Cancel
								</button>
								<button
									type="button"
									className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
									onClick={confirmationAction}
								>
									Confirm
								</button>
							</div> */}
						</TEModalBody>
					</TEModalContent>
				</TEModalDialog>
			</TEModal>
		</div>
	);
}

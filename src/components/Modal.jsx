import React from 'react';
import {
	TEModal,
	TEModalDialog,
	TEModalContent,
	TEModalBody,
	TEModalFooter,
} from 'tw-elements-react';

export function Modal({
	showModal,
	setShowModal,
	modalBody,
	confirmationAction,
}) {
	return (
		<div>
			<TEModal show={showModal} setShow={setShowModal}>
				<TEModalDialog>
					<TEModalContent>
						<TEModalBody className="flex justify-center">
							{/* <!--TODO: Finish styling after merging button & input components --> */}
							{modalBody}
						</TEModalBody>
						<TEModalFooter className="justify-center">
							{/* <!--TODO: Finish styling after merging button & input components --> */}
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
						</TEModalFooter>
					</TEModalContent>
				</TEModalDialog>
			</TEModal>
		</div>
	);
}

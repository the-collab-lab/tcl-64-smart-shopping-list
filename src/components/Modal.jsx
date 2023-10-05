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
						</TEModalBody>
					</TEModalContent>
				</TEModalDialog>
			</TEModal>
		</div>
	);
}

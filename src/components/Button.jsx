import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus as plus } from '@fortawesome/free-solid-svg-icons';

const Button = ({ text, variant, type, onClick, withIcon, className }) => {
	const variantClasses = {
		primary:
			'bg-green dark:bg-light-blue text-white hover:bg-green-dark active:scale-105 dark:text-black',
		secondary:
			'bg-gray-300 text-gray-600 hover:bg-gray-400 dark:text-white dark:bg-gray-700 active:scale-105',
	};
	const classes = classnames(
		'px-32 py-4 rounded-full transition duration-300 focus:outline-none',
		variantClasses[variant] || variantClasses.primary,
		className,
	);
	const buttonType = type ? type : 'submit';
	return (
		<button type={buttonType} className={classes} onClick={onClick}>
			{withIcon ? (
				<>
					{text}
					&nbsp; &nbsp;
					{
						<FontAwesomeIcon
							icon={plus}
							className="text-white dark:text-black"
						/>
					}
				</>
			) : (
				text
			)}
		</button>
	);
};

export default Button;

import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus as plus } from '@fortawesome/free-solid-svg-icons';

const Button = ({ text, variant, type, onClick, withIcon, className }) => {
	const variantClasses = {
		primary:
			'bg-green dark:bg-light-blue text-white hover:bg-green-dark active:scale-105 dark:text-black px-32 py-4 border-2 focus:border-mx-auto focus:border-blue-600',
		primarySmall:
			'bg-green dark:bg-black text-white dark:text-light-blue hover:dark:text-black hover:bg-green-dark active:scale-105 dark:text-black px-16 py-4 border-2 focus:border-mx-auto focus:border-blue-600',
		secondary:
			'bg-white dark:bg-white text-black hover:bg-gray-200 border active:scale-105 px-16 py-4 border-2 focus:border-mx-auto focus:border-blue-600',
	};
	const classes = classnames(
		'rounded-full transition duration-300 focus:outline-none',
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

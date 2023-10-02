import React from 'react';
import classnames from 'classnames';

const Button = ({ text, variant, onClick, withIcon, className }) => {
	const variantClasses = {
		primary: 'bg-green text-white hover:bg-green-dark active:scale-105',
		secondary: 'bg-gray-300 text-gray-700 hover:bg-gray-400',
	};
	const classes = classnames(
		'px-32 py-4 rounded-full transition duration-300 focus:outline-none',
		variantClasses[variant] || variantClasses.primary,
		className,
	);
	const iconSpan = <span className="text-5xl">+</span>;

	return (
		<button type="submit" className={classes} onClick={onClick}>
			{withIcon ? (
				<div className="flex items-center gap-4">
					{text} {iconSpan}
				</div>
			) : (
				text
			)}
		</button>
	);
};

export default Button;

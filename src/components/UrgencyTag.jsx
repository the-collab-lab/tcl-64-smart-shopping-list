export const UrgencyTag = ({
	color,
	value,
	frequency,
	handleFrequencyChange,
	tagName,
}) => {
	return (
		<div className="h-[120px]">
			<div
				className={
					frequency === value
						? `${color} w-32 h-72  rounded-t-full relative hover:scale-105 active:border-4 active:border- mx-auto -rotate-90 sm:rotate-0 border-4 border-blue-600`
						: `${color} w-32 h-72  rounded-t-full relative hover:scale-105 active:border-4 active:border- mx-auto -rotate-90 sm:rotate-0 border-2 border-gray-400`
				}
			>
				<input
					id={value}
					type="radio"
					name="frequency"
					value={value}
					className="top-4 left-[42%] sm:left-[40%]  absolute cursor-pointer"
					checked={frequency === value}
					onChange={handleFrequencyChange}
				/>
				<label
					htmlFor={value}
					className="absolute w-52 sm:w-full bg-white dark:text-black top-[50%] -right-10 sm:right-0 sm:h-20 text-center border rotate-90 sm:rotate-0 sm:flex sm:items-center sm:justify-center   cursor-pointer"
				>
					<span>{tagName}</span>
				</label>
			</div>
		</div>
	);
};

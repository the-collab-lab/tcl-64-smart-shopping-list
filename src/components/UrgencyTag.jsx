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
					color +
					' w-32 h-72  rounded-t-full relative hover:scale-105 mx-auto -rotate-90 sm:rotate-0 border-2 border-gray-400'
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
					className="absolute w-52 sm:w-full bg-white top-[50%] -right-10 sm:right-0 text-center border rotate-90 sm:rotate-0 cursor-pointer"
				>
					{tagName}
				</label>
			</div>
		</div>
	);
};

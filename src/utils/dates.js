const ONE_DAY_IN_MILLISECONDS = 86400000;

/**
 * Get a new JavaScript Date that is `offset` days in the future.
 * @example
 * // Returns a Date 3 days in the future
 * getFutureDate(3)
 * @param {number} offset
 */
export function getFutureDate(offset) {
	return new Date(Date.now() + offset * ONE_DAY_IN_MILLISECONDS);
}

export function getDaysBetweenDates(startDate, endDate) {
	console.log(endDate.getTime() - startDate.getTime());
	return Math.round(
		(endDate.getTime() - startDate.getTime()) / ONE_DAY_IN_MILLISECONDS,
	);
}
// console.log(getDaysBetweenDates(new Date(2023,8,8), new Date(2023,8,12)))

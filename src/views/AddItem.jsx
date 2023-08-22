import { useState, useEffect } from 'react';
export function AddItem() {
	const [item, setItem] = useState('');
	const [frequency, setFrequency] = useState('soon');
	const handleSubmit = (e) => {
		e.preventDefault();
		// submit data
		console.log(item, frequency);
	};
	const handleChange = (e) => {
		setFrequency(e.target.value);
	};
	useEffect(() => {
		const handleKeyPress = (e) => {
			if (e.key === 'Enter' && e.keyCode === 13) {
				e.preventDefault();
				// submit data
				console.log(item, frequency);
			}
		};
		window.addEventListener('keydown', handleKeyPress);
		return () => {
			window.removeEventListener('keydown', handleKeyPress);
		};
	}, [item, frequency]);
	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="item">Item:</label>
			<input
				type="text"
				id="item"
				name="item"
				placeholder="Enter Item"
				value={item}
				onChange={(e) => {
					setItem(e.target.value);
				}}
			/>
			<br />
			<input
				id="soon"
				type="radio"
				name="frequency"
				value="soon"
				checked={frequency === 'soon'}
				onChange={handleChange}
			/>
			<label htmlFor="soon">Soon</label>
			<br />
			<input
				id="kind-of-soon"
				type="radio"
				name="frequency"
				value="kind-of-soon"
				checked={frequency === 'kind-of-soon'}
				onChange={handleChange}
			/>
			<label htmlFor="kind-of-soon">Kind of Soon</label>
			<br />
			<input
				id="not-soon"
				type="radio"
				name="frequency"
				value="not-soon"
				checked={frequency === 'not-soon'}
				onChange={handleChange}
			/>
			<label htmlFor="not-soon">Not Soon</label>
			<br />
			<button type="submit">Add Item</button>
		</form>
	);
}

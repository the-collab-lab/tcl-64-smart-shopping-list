/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		'./node_modules/tw-elements-react/dist/js/**/*.js',
	],
	theme: {
		extend: {
			colors: {
				yellow: '#FFDE30',
				'light-blue': '#8AD0C3',
				red: '#E36849',
				green: {
					DEFAULT: '#137C78',
					dark: '#1fa39e',
				},
			},
		},
	},
	plugins: [require('tw-elements-react/dist/plugin.cjs')],
};

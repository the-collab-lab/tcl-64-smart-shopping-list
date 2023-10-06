import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import 'tw-elements-react/dist/css/tw-elements-react.min.css';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);

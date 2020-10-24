import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import 'normalize.css';

import App from './components/App';

render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById('root')
);

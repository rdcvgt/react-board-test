import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeProvider } from 'styled-components'
import App from './components/App'

const theme = {
	color: {
		red_300: '#fa4848',
		red_400: '#440000',
		red_500: '#660000',
	}
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<ThemeProvider theme={theme}>
		<App />
	</ThemeProvider>
);


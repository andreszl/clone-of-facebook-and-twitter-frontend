import React from 'react';
import { render } from 'react-dom';
import { } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ThemeProvider } from '@mui/material/styles';

import App from './App';
import reportWebVitals from './reportWebVitals';
import reducers from './reducers';
import theme from './styles/react/theme';

import './styles/css/index.css';

export const store = createStore(reducers, {}, applyMiddleware(thunk));

render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

reportWebVitals();

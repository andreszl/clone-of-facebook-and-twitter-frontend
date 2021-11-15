import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#4071B8',
		},
		secondary: {
			main: '#FFFFFF',
		},
		warning: {
			main: '#db7878',
		},
	},
	typography: {
		fontFamily: [
			'Montserrat',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
		].join(','),
	},
});

export default responsiveFontSizes(theme);

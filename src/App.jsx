// /src/App.js

import './App.css';
import LightweightCandlestickChart from './Components/LightweightCandlestickChart';
import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material'; // Import MUI components

// Define a dark theme for consistency with the chart's dark background
const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#90CAF9',
		},
		secondary: {
			main: '#FFF',
		},
		background: {
			default: '#212121',
			paper: '#323232',
		},
		text: {
			primary: '#DDDDDD',
			secondary: '#AAAAAA',
		},
	},
});

function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline /> {/* Apply global CSS baseline for MUI */}
			<Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100vw', bgcolor: 'background.default' }}>
				{/* The main chart component handles the internal grid layout */}
				<LightweightCandlestickChart />
			</Box>
		</ThemeProvider>
	);
}

export default App;
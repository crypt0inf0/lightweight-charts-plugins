// File: /src/Components/FibRetracementToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolFibRetracement } from '../Hooks/useLineToolFibRetracement';

const FibRetracementToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	const { handleAddFibA, handleAddFibB, handleCreateFibX, handleUpdateFibX, handleRemoveFibX, handleRemoveFibsRegex, handleGenerateAllTests } = useLineToolFibRetracement(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Fib Retracement</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleAddFibA} disabled={!chartReady}>Add Fib A</Button>
					<Button variant="outlined" size="small" onClick={handleAddFibB} disabled={!chartReady}>Add Fib B</Button>
					<Divider />
					<Button variant="outlined" size="small" onClick={handleCreateFibX} disabled={!chartReady}>Create FIB_X</Button>
					<Button variant="outlined" size="small" onClick={handleUpdateFibX} disabled={!chartReady}>Update FIB_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveFibX} disabled={!chartReady}>Remove FIB_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveFibsRegex} disabled={!chartReady}>Remove by Regex</Button>
					<Button variant="outlined" size="small" color="warning" onClick={handleGenerateAllTests} disabled={!chartReady}>Generate All Tests</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default FibRetracementToolProgrammatic;
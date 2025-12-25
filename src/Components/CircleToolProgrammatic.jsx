// File: /src/Components/CircleToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolCircle } from '../Hooks/useLineToolCircle';

const CircleToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	const { handleAddCircleA, handleAddCircleB, handleAddCircleC, handleCreateCircleX, handleUpdateCircleX, handleRemoveCircleX, handleRemoveCirclesRegex, handleGenerateAllTests } = useLineToolCircle(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Circle Tool</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleAddCircleA} disabled={!chartReady}>Add Circle A</Button>
					<Button variant="outlined" size="small" onClick={handleAddCircleB} disabled={!chartReady}>Add Circle B</Button>
					<Button variant="outlined" size="small" onClick={handleAddCircleC} disabled={!chartReady}>Add Circle C</Button>
					<Divider />
					<Button variant="outlined" size="small" onClick={handleCreateCircleX} disabled={!chartReady}>Create CIRCLE_X</Button>
					<Button variant="outlined" size="small" onClick={handleUpdateCircleX} disabled={!chartReady}>Update CIRCLE_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveCircleX} disabled={!chartReady}>Remove CIRCLE_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveCirclesRegex} disabled={!chartReady}>Remove by Regex</Button>
					<Button variant="outlined" size="small" color="warning" onClick={handleGenerateAllTests} disabled={!chartReady}>Generate All Tests</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default CircleToolProgrammatic;
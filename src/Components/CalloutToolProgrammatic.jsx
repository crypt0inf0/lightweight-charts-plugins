// File: /src/Components/CalloutToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolCallout } from '../Hooks/useLineToolCallout';

const CalloutToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	const { handleAddCalloutA, handleAddCalloutB, handleCreateCalloutX, handleUpdateCalloutX, handleRemoveCalloutX, handleRemoveCalloutsRegex, handleGenerateAllTests } = useLineToolCallout(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Callout Tool</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleAddCalloutA} disabled={!chartReady}>Add Callout A</Button>
					<Button variant="outlined" size="small" onClick={handleAddCalloutB} disabled={!chartReady}>Add Callout B</Button>
					<Divider />
					<Button variant="outlined" size="small" onClick={handleCreateCalloutX} disabled={!chartReady}>Create CALLOUT_X</Button>
					<Button variant="outlined" size="small" onClick={handleUpdateCalloutX} disabled={!chartReady}>Update CALLOUT_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveCalloutX} disabled={!chartReady}>Remove CALLOUT_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveCalloutsRegex} disabled={!chartReady}>Remove by Regex</Button>
					<Button variant="outlined" size="small" color="warning" onClick={handleGenerateAllTests} disabled={!chartReady}>Generate All Tests</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default CalloutToolProgrammatic;
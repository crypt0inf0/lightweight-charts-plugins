// File: /src/Components/HorizontalLineToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolHorizontalLine } from '../Hooks/useLineToolHorizontalLine';

const HorizontalLineToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	const { handleAddHLineA, handleAddHLineB, handleCreateHLineX, handleUpdateHLineX, handleRemoveHLineX, handleRemoveHLinesRegex, handleGenerateAllTests } = useLineToolHorizontalLine(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Horizontal Line</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleAddHLineA} disabled={!chartReady}>Add HLine A</Button>
					<Button variant="outlined" size="small" onClick={handleAddHLineB} disabled={!chartReady}>Add HLine B</Button>
					<Divider />
					<Button variant="outlined" size="small" onClick={handleCreateHLineX} disabled={!chartReady}>Create HLINE_X</Button>
					<Button variant="outlined" size="small" onClick={handleUpdateHLineX} disabled={!chartReady}>Update HLINE_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveHLineX} disabled={!chartReady}>Remove HLINE_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveHLinesRegex} disabled={!chartReady}>Remove by Regex</Button>
					<Button variant="outlined" size="small" color="warning" onClick={handleGenerateAllTests} disabled={!chartReady}>Generate All Tests</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default HorizontalLineToolProgrammatic;
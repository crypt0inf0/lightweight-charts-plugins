// File: /src/Components/VerticalLineToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolVerticalLine } from '../Hooks/useLineToolVerticalLine';

const VerticalLineToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	const { handleAddVLineA, handleAddVLineB, handleCreateVLineX, handleUpdateVLineX, handleRemoveVLineX, handleRemoveVLinesRegex, handleGenerateAllTests } = useLineToolVerticalLine(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Vertical Line</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleAddVLineA} disabled={!chartReady}>Add VLine A</Button>
					<Button variant="outlined" size="small" onClick={handleAddVLineB} disabled={!chartReady}>Add VLine B</Button>
					<Divider />
					<Button variant="outlined" size="small" onClick={handleCreateVLineX} disabled={!chartReady}>Create VLINE_X</Button>
					<Button variant="outlined" size="small" onClick={handleUpdateVLineX} disabled={!chartReady}>Update VLINE_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveVLineX} disabled={!chartReady}>Remove VLINE_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveVLinesRegex} disabled={!chartReady}>Remove by Regex</Button>
					<Button variant="outlined" size="small" color="warning" onClick={handleGenerateAllTests} disabled={!chartReady}>Generate All Tests</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default VerticalLineToolProgrammatic;
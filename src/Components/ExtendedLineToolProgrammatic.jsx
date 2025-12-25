// File: /src/Components/ExtendedLineToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolExtendedLine } from '../Hooks/useLineToolExtendedLine';

const ExtendedLineToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	const { handleAddExtLineA, handleAddExtLineB, handleCreateExtLineX, handleUpdateExtLineX, handleRemoveExtLineX, handleRemoveExtLinesRegex, handleGenerateAllTests } = useLineToolExtendedLine(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Extended Line Tool</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleAddExtLineA} disabled={!chartReady}>Add ExtLine A</Button>
					<Button variant="outlined" size="small" onClick={handleAddExtLineB} disabled={!chartReady}>Add ExtLine B</Button>
					<Divider />
					<Button variant="outlined" size="small" onClick={handleCreateExtLineX} disabled={!chartReady}>Create EXTLINE_X</Button>
					<Button variant="outlined" size="small" onClick={handleUpdateExtLineX} disabled={!chartReady}>Update EXTLINE_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveExtLineX} disabled={!chartReady}>Remove EXTLINE_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveExtLinesRegex} disabled={!chartReady}>Remove by Regex</Button>
					<Button variant="outlined" size="small" color="warning" onClick={handleGenerateAllTests} disabled={!chartReady}>Generate All Tests</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default ExtendedLineToolProgrammatic;
// File: /src/Components/CrossLineToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolCrossLine } from '../Hooks/useLineToolCrossLine';

const CrossLineToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	const { handleAddCrossA, handleAddCrossB, handleCreateCrossX, handleUpdateCrossX, handleRemoveCrossX, handleRemoveCrossesRegex, handleGenerateAllTests } = useLineToolCrossLine(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Cross Line</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleAddCrossA} disabled={!chartReady}>Add Cross A</Button>
					<Button variant="outlined" size="small" onClick={handleAddCrossB} disabled={!chartReady}>Add Cross B</Button>
					<Divider />
					<Button variant="outlined" size="small" onClick={handleCreateCrossX} disabled={!chartReady}>Create CROSS_X</Button>
					<Button variant="outlined" size="small" onClick={handleUpdateCrossX} disabled={!chartReady}>Update CROSS_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveCrossX} disabled={!chartReady}>Remove CROSS_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveCrossesRegex} disabled={!chartReady}>Remove by Regex</Button>
					<Button variant="outlined" size="small" color="warning" onClick={handleGenerateAllTests} disabled={!chartReady}>Generate All Tests</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default CrossLineToolProgrammatic;
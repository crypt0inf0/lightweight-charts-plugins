// File: /src/Components/PathToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolPath } from '../Hooks/useLineToolPath';

const PathToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	const { handleAddPathA, handleAddPathB, handleCreatePathX, handleUpdatePathX, handleRemovePathX, handleRemovePathsRegex, handleGenerateAllTests } = useLineToolPath(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Path Tool</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleAddPathA} disabled={!chartReady}>Add Path A</Button>
					<Button variant="outlined" size="small" onClick={handleAddPathB} disabled={!chartReady}>Add Path B</Button>
					<Divider />
					<Button variant="outlined" size="small" onClick={handleCreatePathX} disabled={!chartReady}>Create PATH_X</Button>
					<Button variant="outlined" size="small" onClick={handleUpdatePathX} disabled={!chartReady}>Update PATH_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemovePathX} disabled={!chartReady}>Remove PATH_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemovePathsRegex} disabled={!chartReady}>Remove by Regex</Button>
					<Button variant="outlined" size="small" color="warning" onClick={handleGenerateAllTests} disabled={!chartReady}>Generate All Tests</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default PathToolProgrammatic;
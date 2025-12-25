// File: /src/Components/HighlighterToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolHighlighter } from '../Hooks/useLineToolHighlighter';

const HighlighterToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	const { handleAddHighlighterA, handleAddHighlighterB, handleCreateHighlighterX, handleUpdateHighlighterX, handleRemoveHighlighterX, handleRemoveHighlightersRegex, handleGenerateAllTests } = useLineToolHighlighter(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Highlighter Tool</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleAddHighlighterA} disabled={!chartReady}>Add Highlighter A</Button>
					<Button variant="outlined" size="small" onClick={handleAddHighlighterB} disabled={!chartReady}>Add Highlighter B</Button>
					<Divider />
					<Button variant="outlined" size="small" onClick={handleCreateHighlighterX} disabled={!chartReady}>Create HIGHLIGHTER_X</Button>
					<Button variant="outlined" size="small" onClick={handleUpdateHighlighterX} disabled={!chartReady}>Update HIGHLIGHTER_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveHighlighterX} disabled={!chartReady}>Remove HIGHLIGHTER_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveHighlightersRegex} disabled={!chartReady}>Remove by Regex</Button>
					<Button variant="outlined" size="small" color="warning" onClick={handleGenerateAllTests} disabled={!chartReady}>Generate All Tests</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default HighlighterToolProgrammatic;
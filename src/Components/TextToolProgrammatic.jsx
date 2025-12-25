// File: /src/Components/TextToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolText } from '../Hooks/useLineToolText';

const TextToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	const { handleAddTextA, handleAddTextB, handleCreateTextX, handleUpdateTextX, handleRemoveTextX, handleRemoveTextsRegex, handleGenerateAllTests } = useLineToolText(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Text Tool</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleAddTextA} disabled={!chartReady}>Add Text A</Button>
					<Button variant="outlined" size="small" onClick={handleAddTextB} disabled={!chartReady}>Add Text B</Button>
					<Divider />
					<Button variant="outlined" size="small" onClick={handleCreateTextX} disabled={!chartReady}>Create TEXT_X</Button>
					<Button variant="outlined" size="small" onClick={handleUpdateTextX} disabled={!chartReady}>Update TEXT_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveTextX} disabled={!chartReady}>Remove TEXT_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveTextsRegex} disabled={!chartReady}>Remove by Regex</Button>
					<Button variant="outlined" size="small" color="warning" onClick={handleGenerateAllTests} disabled={!chartReady}>Generate All Tests</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default TextToolProgrammatic;
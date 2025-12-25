// File: /src/Components/ArrowToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolArrow } from '../Hooks/useLineToolArrow';

const ArrowToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	const { handleAddArrowA, handleAddArrowB, handleCreateArrowX, handleUpdateArrowX, handleRemoveArrowX, handleRemoveArrowsRegex, handleGenerateAllTests } = useLineToolArrow(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Arrow Tool</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleAddArrowA} disabled={!chartReady}>Add Arrow A</Button>
					<Button variant="outlined" size="small" onClick={handleAddArrowB} disabled={!chartReady}>Add Arrow B</Button>
					<Divider />
					<Button variant="outlined" size="small" onClick={handleCreateArrowX} disabled={!chartReady}>Create ARROW_X</Button>
					<Button variant="outlined" size="small" onClick={handleUpdateArrowX} disabled={!chartReady}>Update ARROW_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveArrowX} disabled={!chartReady}>Remove ARROW_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveArrowsRegex} disabled={!chartReady}>Remove by Regex</Button>
					<Button variant="outlined" size="small" color="warning" onClick={handleGenerateAllTests} disabled={!chartReady}>Generate All Tests</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default ArrowToolProgrammatic;
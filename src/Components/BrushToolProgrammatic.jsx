// File: /src/Components/BrushToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolBrush } from '../Hooks/useLineToolBrush';

const BrushToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	const { handleAddBrushA, handleAddBrushB, handleCreateBrushX, handleUpdateBrushX, handleRemoveBrushX, handleRemoveBrushesRegex, handleGenerateAllTests } = useLineToolBrush(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Brush Tool</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleAddBrushA} disabled={!chartReady}>Add Brush A</Button>
					<Button variant="outlined" size="small" onClick={handleAddBrushB} disabled={!chartReady}>Add Brush B</Button>
					<Divider />
					<Button variant="outlined" size="small" onClick={handleCreateBrushX} disabled={!chartReady}>Create BRUSH_X</Button>
					<Button variant="outlined" size="small" onClick={handleUpdateBrushX} disabled={!chartReady}>Update BRUSH_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveBrushX} disabled={!chartReady}>Remove BRUSH_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveBrushesRegex} disabled={!chartReady}>Remove by Regex</Button>
					<Button variant="outlined" size="small" color="warning" onClick={handleGenerateAllTests} disabled={!chartReady}>Generate All Tests</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default BrushToolProgrammatic;
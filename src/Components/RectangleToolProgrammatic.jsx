// File: /src/Components/RectangleToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolRectangle } from '../Hooks/useLineToolRectangle';

const RectangleToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	const {
		handleAddRectA, handleAddRectB, handleAddRectC, handleAddRectD_Outside, handleAddRectE_FarOutside,
		handleCreateRectX, handleUpdateRectX, handleCreateRectY, handleRemoveRectX, handleRemoveRectsRegex,
		handleApplyOptionsRectX, handleGenerateAllTests,
	} = useLineToolRectangle(lineToolsApi);

	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="body2" fontWeight="medium">Rectangle Tool</Typography>
			</AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleAddRectA} disabled={!chartReady}>Add Rect A</Button>
					<Button variant="outlined" size="small" onClick={handleAddRectB} disabled={!chartReady}>Add Rect B (Text)</Button>
					<Button variant="outlined" size="small" onClick={handleAddRectC} disabled={!chartReady}>Add Rect C (Wrap)</Button>
					<Button variant="outlined" size="small" onClick={handleAddRectD_Outside} disabled={!chartReady}>Add Rect D (Partial)</Button>
					<Button variant="outlined" size="small" onClick={handleAddRectE_FarOutside} disabled={!chartReady}>Add Rect E (Outside)</Button>
					<Divider />
					<Typography variant="caption" color="text.secondary">Creation/Update/Modification Tests</Typography>
					<Button variant="outlined" size="small" onClick={handleCreateRectX} disabled={!chartReady}>Create RECT_X</Button>
					<Button variant="outlined" size="small" onClick={handleUpdateRectX} disabled={!chartReady}>Update RECT_X</Button>
					<Button variant="outlined" size="small" onClick={handleApplyOptionsRectX} disabled={!chartReady}>Apply Options RECT_X</Button>
					<Button variant="outlined" size="small" onClick={handleCreateRectY} disabled={!chartReady}>Create RECT_Y</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveRectX} disabled={!chartReady}>Remove RECT_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveRectsRegex} disabled={!chartReady}>Remove Prog Rects</Button>
					<Button variant="outlined" size="small" color="warning" onClick={handleGenerateAllTests} disabled={!chartReady}>Generate All Tests</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};

export default RectangleToolProgrammatic;
// File: /src/Components/HorizontalRayToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolHorizontalRay } from '../Hooks/useLineToolHorizontalRay';

const HorizontalRayToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	const { handleAddHRayA, handleAddHRayB, handleCreateHRayX, handleUpdateHRayX, handleRemoveHRayX, handleRemoveHRaysRegex, handleGenerateAllTests } = useLineToolHorizontalRay(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Horizontal Ray</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleAddHRayA} disabled={!chartReady}>Add HRay A</Button>
					<Button variant="outlined" size="small" onClick={handleAddHRayB} disabled={!chartReady}>Add HRay B</Button>
					<Divider />
					<Button variant="outlined" size="small" onClick={handleCreateHRayX} disabled={!chartReady}>Create HRAY_X</Button>
					<Button variant="outlined" size="small" onClick={handleUpdateHRayX} disabled={!chartReady}>Update HRAY_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveHRayX} disabled={!chartReady}>Remove HRAY_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveHRaysRegex} disabled={!chartReady}>Remove by Regex</Button>
					<Button variant="outlined" size="small" color="warning" onClick={handleGenerateAllTests} disabled={!chartReady}>Generate All Tests</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default HorizontalRayToolProgrammatic;
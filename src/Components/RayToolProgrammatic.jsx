// File: /src/Components/RayToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolRay } from '../Hooks/useLineToolRay';

const RayToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	const { handleAddRayA, handleAddRayB, handleCreateRayX, handleUpdateRayX, handleRemoveRayX, handleRemoveRaysRegex, handleGenerateAllTests } = useLineToolRay(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Ray Tool</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleAddRayA} disabled={!chartReady}>Add Ray A</Button>
					<Button variant="outlined" size="small" onClick={handleAddRayB} disabled={!chartReady}>Add Ray B</Button>
					<Divider />
					<Button variant="outlined" size="small" onClick={handleCreateRayX} disabled={!chartReady}>Create RAY_X</Button>
					<Button variant="outlined" size="small" onClick={handleUpdateRayX} disabled={!chartReady}>Update RAY_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveRayX} disabled={!chartReady}>Remove RAY_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveRaysRegex} disabled={!chartReady}>Remove by Regex</Button>
					<Button variant="outlined" size="small" color="warning" onClick={handleGenerateAllTests} disabled={!chartReady}>Generate All Tests</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default RayToolProgrammatic;
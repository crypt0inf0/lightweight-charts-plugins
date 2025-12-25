// File: /src/Components/LongShortPositionToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolLongShortPosition } from '../Hooks/useLineToolLongShortPosition';

const LongShortPositionToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	const { handleAddPositionA, handleAddPositionB, handleCreatePositionX, handleUpdatePositionX, handleRemovePositionX, handleRemovePositionsRegex, handleGenerateAllTests } = useLineToolLongShortPosition(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Long/Short Position</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleAddPositionA} disabled={!chartReady}>Add Position A</Button>
					<Button variant="outlined" size="small" onClick={handleAddPositionB} disabled={!chartReady}>Add Position B</Button>
					<Divider />
					<Button variant="outlined" size="small" onClick={handleCreatePositionX} disabled={!chartReady}>Create POSITION_X</Button>
					<Button variant="outlined" size="small" onClick={handleUpdatePositionX} disabled={!chartReady}>Update POSITION_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemovePositionX} disabled={!chartReady}>Remove POSITION_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemovePositionsRegex} disabled={!chartReady}>Remove by Regex</Button>
					<Button variant="outlined" size="small" color="warning" onClick={handleGenerateAllTests} disabled={!chartReady}>Generate All Tests</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default LongShortPositionToolProgrammatic;
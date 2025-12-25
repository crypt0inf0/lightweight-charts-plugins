// File: /src/Components/CircleToolInteractive.jsx

import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolCircle } from '../Hooks/useLineToolCircle';

const CircleToolInteractive = ({ lineToolsApi, chartReady }) => {
	const { handleSetActiveDefault, handleSetActiveBlue, handleAddInteractiveDefault, handleAddInteractiveCustom } = useLineToolCircle(lineToolsApi);

	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="body2" fontWeight="medium">Circle Tool</Typography>
			</AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleSetActiveDefault} disabled={!chartReady}>Activate Default</Button>
					<Button variant="outlined" size="small" onClick={handleSetActiveBlue} disabled={!chartReady}>Activate Blue</Button>
					<Button variant="outlined" size="small" onClick={handleAddInteractiveDefault} disabled={!chartReady}>Add Interactive</Button>
					<Button variant="outlined" size="small" onClick={handleAddInteractiveCustom} disabled={!chartReady}>Add Custom</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};

export default CircleToolInteractive;
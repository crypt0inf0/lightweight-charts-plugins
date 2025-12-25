// File: /src/Components/CalloutToolInteractive.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolCallout } from '../Hooks/useLineToolCallout';

const CalloutToolInteractive = ({ lineToolsApi, chartReady }) => {
	const { handleSetActiveDefault, handleAddInteractiveDefault } = useLineToolCallout(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Callout Tool</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleSetActiveDefault} disabled={!chartReady}>Activate</Button>
					<Button variant="outlined" size="small" onClick={handleAddInteractiveDefault} disabled={!chartReady}>Add Interactive</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default CalloutToolInteractive;
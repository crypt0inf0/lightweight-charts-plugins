// File: /src/Components/VerticalLineToolInteractive.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolVerticalLine } from '../Hooks/useLineToolVerticalLine';

const VerticalLineToolInteractive = ({ lineToolsApi, chartReady }) => {
	const { handleSetActiveDefault, handleAddInteractiveDefault } = useLineToolVerticalLine(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Vertical Line</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleSetActiveDefault} disabled={!chartReady}>Activate</Button>
					<Button variant="outlined" size="small" onClick={handleAddInteractiveDefault} disabled={!chartReady}>Add Interactive</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default VerticalLineToolInteractive;
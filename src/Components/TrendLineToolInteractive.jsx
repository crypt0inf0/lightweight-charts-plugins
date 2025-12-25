// File: /src/Components/TrendLineToolInteractive.jsx

import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolTrendLine } from '../Hooks/useLineToolTrendLine';

const TrendLineToolInteractive = ({ lineToolsApi, chartReady }) => {
	const { handleSetActiveDefault, handleSetActiveExotic, handleAddInteractiveDefault, handleAddInteractiveExtended } = useLineToolTrendLine(lineToolsApi);

	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="body2" fontWeight="medium">Trend Line Tool</Typography>
			</AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleSetActiveDefault} disabled={!chartReady}>Activate Default</Button>
					<Button variant="outlined" size="small" onClick={handleSetActiveExotic} disabled={!chartReady}>Activate Exotic</Button>
					<Button variant="outlined" size="small" onClick={handleAddInteractiveDefault} disabled={!chartReady}>Add Interactive</Button>
					<Button variant="outlined" size="small" onClick={handleAddInteractiveExtended} disabled={!chartReady}>Add Extended</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};

export default TrendLineToolInteractive;
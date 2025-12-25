// File: /src/Components/MarketDepthToolInteractive.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolMarketDepth } from '../Hooks/useLineToolMarketDepth';

const MarketDepthToolInteractive = ({ lineToolsApi, chartReady }) => {
	const { handleSetActiveDefault, handleAddInteractiveDefault, handleAddInteractiveCustom } = useLineToolMarketDepth(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Market Depth</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleSetActiveDefault} disabled={!chartReady}>Activate</Button>
					<Button variant="outlined" size="small" onClick={handleAddInteractiveDefault} disabled={!chartReady}>Add Interactive</Button>
					<Button variant="outlined" size="small" onClick={handleAddInteractiveCustom} disabled={!chartReady}>Add Custom</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default MarketDepthToolInteractive;
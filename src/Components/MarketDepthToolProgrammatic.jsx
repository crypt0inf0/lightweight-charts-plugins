// File: /src/Components/MarketDepthToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolMarketDepth } from '../Hooks/useLineToolMarketDepth';

const MarketDepthToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	const { handleAddDepthA, handleAddDepthB, handleCreateDepthX, handleUpdateDepthX, handleRemoveDepthX, handleRemoveDepthsRegex, handleGenerateAllTests } = useLineToolMarketDepth(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Market Depth</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleAddDepthA} disabled={!chartReady}>Add Depth A</Button>
					<Button variant="outlined" size="small" onClick={handleAddDepthB} disabled={!chartReady}>Add Depth B</Button>
					<Divider />
					<Button variant="outlined" size="small" onClick={handleCreateDepthX} disabled={!chartReady}>Create DEPTH_X</Button>
					<Button variant="outlined" size="small" onClick={handleUpdateDepthX} disabled={!chartReady}>Update DEPTH_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveDepthX} disabled={!chartReady}>Remove DEPTH_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveDepthsRegex} disabled={!chartReady}>Remove by Regex</Button>
					<Button variant="outlined" size="small" color="warning" onClick={handleGenerateAllTests} disabled={!chartReady}>Generate All Tests</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default MarketDepthToolProgrammatic;
// File: /src/Components/ParallelChannelToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolParallelChannel } from '../Hooks/useLineToolParallelChannel';

const ParallelChannelToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	const { handleAddChannelA, handleAddChannelB, handleCreateChannelX, handleUpdateChannelX, handleRemoveChannelX, handleRemoveChannelsRegex, handleGenerateAllTests } = useLineToolParallelChannel(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Parallel Channel</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleAddChannelA} disabled={!chartReady}>Add Channel A</Button>
					<Button variant="outlined" size="small" onClick={handleAddChannelB} disabled={!chartReady}>Add Channel B</Button>
					<Divider />
					<Button variant="outlined" size="small" onClick={handleCreateChannelX} disabled={!chartReady}>Create CHANNEL_X</Button>
					<Button variant="outlined" size="small" onClick={handleUpdateChannelX} disabled={!chartReady}>Update CHANNEL_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveChannelX} disabled={!chartReady}>Remove CHANNEL_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveChannelsRegex} disabled={!chartReady}>Remove by Regex</Button>
					<Button variant="outlined" size="small" color="warning" onClick={handleGenerateAllTests} disabled={!chartReady}>Generate All Tests</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default ParallelChannelToolProgrammatic;
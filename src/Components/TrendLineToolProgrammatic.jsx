// File: /src/Components/TrendLineToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolTrendLine } from '../Hooks/useLineToolTrendLine';

const TrendLineToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	const { handleAddTrendA, handleAddTrendB, handleAddTrendC_OffScreen, handleCreateTrendX, handleUpdateTrendX, handleRemoveTrendX, handleRemoveTrendsRegex, handleGenerateAllTests } = useLineToolTrendLine(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Trend Line Tool</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleAddTrendA} disabled={!chartReady}>Add Trend A</Button>
					<Button variant="outlined" size="small" onClick={handleAddTrendB} disabled={!chartReady}>Add Trend B (Text)</Button>
					<Button variant="outlined" size="small" onClick={handleAddTrendC_OffScreen} disabled={!chartReady}>Add Trend C (Outside)</Button>
					<Divider />
					<Button variant="outlined" size="small" onClick={handleCreateTrendX} disabled={!chartReady}>Create TREND_X</Button>
					<Button variant="outlined" size="small" onClick={handleUpdateTrendX} disabled={!chartReady}>Update TREND_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveTrendX} disabled={!chartReady}>Remove TREND_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveTrendsRegex} disabled={!chartReady}>Remove by Regex</Button>
					<Button variant="outlined" size="small" color="warning" onClick={handleGenerateAllTests} disabled={!chartReady}>Generate All Tests</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default TrendLineToolProgrammatic;
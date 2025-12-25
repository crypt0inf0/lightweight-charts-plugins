// File: /src/Components/CoreApiTestPanel.jsx

import React, { useState } from 'react';
import {
	Button,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	FormControlLabel,
	Switch,
	Box,
	Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Import the hook that contains the logic for all core API tests
import { useCoreApiTest } from '../Hooks/useCoreApiTest';


const CoreApiTestPanel = ({ lineToolsApi, chartInstanceRef, candlestickSeriesRef, chartReady }) => {
	// Use the hook to get all the handlers and state
	const {
		subscribedAfterEdit,
		subscribedDoubleClick,
		exportedJson,

		toggleSubscribeAfterEdit,
		toggleSubscribeDoubleClick,
		handleExportAll,
		handleImportAll,
		handleGetSelected,
		handleRemoveSelected,
		handleRemoveAll,
		handleSetCrosshairPixel,
		handleSetCrosshairCenter,
		handleSetCrosshairLogical,
		handleClearCrosshair,

		// Get core handlers that the sub-panels will need
		handleRemoveToolsById,
		handleRemoveToolsRegex,
		handleApplyOptions,
	} = useCoreApiTest(lineToolsApi, chartInstanceRef, candlestickSeriesRef, chartReady);

	// Internal expanded state for the Core Test Panel itself
	const [expanded, setExpanded] = useState('events');

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	// --- Render Function ---

	return (
		<Box sx={{ width: '100%', mb: 2 }}>

			{/* Panel: Event Subscriptions */}
			<Accordion expanded={expanded === 'events'} onChange={handleChange('events')} sx={{ mb: 1 }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant="subtitle1" fontWeight="medium">1. Event Subscriptions</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Stack spacing={1}>
						<FormControlLabel
							control={<Switch checked={subscribedAfterEdit} onChange={toggleSubscribeAfterEdit} size="small" />}
							label={<Typography variant="body2">{subscribedAfterEdit ? "AfterEdit: ON" : "AfterEdit: OFF"}</Typography>}
						/>
						<FormControlLabel
							control={<Switch checked={subscribedDoubleClick} onChange={toggleSubscribeDoubleClick} size="small" />}
							label={<Typography variant="body2">{subscribedDoubleClick ? "DoubleClick: ON" : "DoubleClick: OFF"}</Typography>}
						/>
					</Stack>
				</AccordionDetails>
			</Accordion>

			{/* Panel: Tool Retrieval & Persistence */}
			<Accordion expanded={expanded === 'persistence'} onChange={handleChange('persistence')} sx={{ mb: 1 }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant="subtitle1" fontWeight="medium">2. Tool Retrieval & Persistence</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Stack spacing={1}>
						<Button variant="outlined" size="small" onClick={handleGetSelected} disabled={!chartReady}>
							Get Selected
						</Button>
						<Button variant="outlined" size="small" onClick={handleExportAll} disabled={!chartReady}>
							Export All
						</Button>
						<Button variant="outlined" size="small" onClick={handleImportAll} disabled={!chartReady || !exportedJson}>
							Import All
						</Button>
						<Button variant="outlined" size="small" color="warning" onClick={handleRemoveSelected} disabled={!chartReady}>
							Remove Selected
						</Button>
						<Button variant="outlined" size="small" color="error" onClick={handleRemoveAll} disabled={!chartReady}>
							Remove All
						</Button>
					</Stack>
				</AccordionDetails>
			</Accordion>

			{/* Panel: Crosshair Control */}
			<Accordion expanded={expanded === 'crosshair'} onChange={handleChange('crosshair')} sx={{ mb: 1 }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant="subtitle1" fontWeight="medium">3. Crosshair Control</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Stack spacing={1}>
						<Button variant="outlined" size="small" onClick={handleSetCrosshairPixel} disabled={!chartReady}>
							Set Pixel (300, 200)
						</Button>
						<Button variant="outlined" size="small" onClick={handleSetCrosshairCenter} disabled={!chartReady}>
							Set Center
						</Button>
						<Button variant="outlined" size="small" onClick={handleSetCrosshairLogical} disabled={!chartReady}>
							Set Logical
						</Button>
						<Button variant="outlined" size="small" color="warning" onClick={handleClearCrosshair} disabled={!chartReady}>
							Clear
						</Button>
					</Stack>
				</AccordionDetails>
			</Accordion>

		</Box>
	);
};

export default CoreApiTestPanel;
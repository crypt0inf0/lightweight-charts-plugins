// File: /src/Components/RectangleToolInteractive.jsx

import React from 'react';
import {
	Button,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolRectangle } from '../Hooks/useLineToolRectangle';


const RectangleToolInteractive = ({ lineToolsApi, chartReady }) => {
	const {
		handleSetActiveDefault,
		handleSetActiveRedRounded,
		handleAddInteractiveNoPointsNoOptions,
		handleAddInteractiveEmptyPointsCustomOptions,
	} = useLineToolRectangle(lineToolsApi);

	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography variant="body2" fontWeight="medium">Rectangle Tool</Typography>
			</AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleSetActiveDefault} disabled={!chartReady}>
						Activate Default
					</Button>
					<Button variant="outlined" size="small" onClick={handleSetActiveRedRounded} disabled={!chartReady}>
						Activate Red Rounded
					</Button>
					<Button variant="outlined" size="small" onClick={handleAddInteractiveNoPointsNoOptions} disabled={!chartReady}>
						Add Interactive
					</Button>
					<Button variant="outlined" size="small" onClick={handleAddInteractiveEmptyPointsCustomOptions} disabled={!chartReady}>
						Add Custom Options
					</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};

export default RectangleToolInteractive;
// File: /src/Components/PriceRangeToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolPriceRange } from '../Hooks/useLineToolPriceRange';

const PriceRangeToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	const { handleAddPriceRangeA, handleAddPriceRangeB, handleCreatePriceRangeX, handleUpdatePriceRangeX, handleRemovePriceRangeX, handleRemovePriceRangesRegex, handleGenerateAllTests } = useLineToolPriceRange(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Price Range</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleAddPriceRangeA} disabled={!chartReady}>Add Range A</Button>
					<Button variant="outlined" size="small" onClick={handleAddPriceRangeB} disabled={!chartReady}>Add Range B</Button>
					<Divider />
					<Button variant="outlined" size="small" onClick={handleCreatePriceRangeX} disabled={!chartReady}>Create RANGE_X</Button>
					<Button variant="outlined" size="small" onClick={handleUpdatePriceRangeX} disabled={!chartReady}>Update RANGE_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemovePriceRangeX} disabled={!chartReady}>Remove RANGE_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemovePriceRangesRegex} disabled={!chartReady}>Remove by Regex</Button>
					<Button variant="outlined" size="small" color="warning" onClick={handleGenerateAllTests} disabled={!chartReady}>Generate All Tests</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default PriceRangeToolProgrammatic;
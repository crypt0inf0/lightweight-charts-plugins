// File: /src/Components/TriangleToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolTriangle } from '../Hooks/useLineToolTriangle';

const TriangleToolProgrammatic = ({ lineToolsApi, chartReady }) => {
	const { handleAddTriangleA, handleAddTriangleB, handleCreateTriangleX, handleUpdateTriangleX, handleRemoveTriangleX, handleRemoveTrianglesRegex, handleGenerateAllTests } = useLineToolTriangle(lineToolsApi);
	return (
		<Accordion sx={{ bgcolor: 'background.paper' }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Triangle Tool</Typography></AccordionSummary>
			<AccordionDetails sx={{ pt: 0 }}>
				<Stack spacing={1}>
					<Button variant="outlined" size="small" onClick={handleAddTriangleA} disabled={!chartReady}>Add Triangle A</Button>
					<Button variant="outlined" size="small" onClick={handleAddTriangleB} disabled={!chartReady}>Add Triangle B</Button>
					<Divider />
					<Button variant="outlined" size="small" onClick={handleCreateTriangleX} disabled={!chartReady}>Create TRIANGLE_X</Button>
					<Button variant="outlined" size="small" onClick={handleUpdateTriangleX} disabled={!chartReady}>Update TRIANGLE_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveTriangleX} disabled={!chartReady}>Remove TRIANGLE_X</Button>
					<Button variant="outlined" size="small" color="error" onClick={handleRemoveTrianglesRegex} disabled={!chartReady}>Remove by Regex</Button>
					<Button variant="outlined" size="small" color="warning" onClick={handleGenerateAllTests} disabled={!chartReady}>Generate All Tests</Button>
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
};
export default TriangleToolProgrammatic;
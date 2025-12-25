// File: /src/Components/TrendBasedFibExtensionToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolTrendBasedFibExtension } from '../Hooks/useLineToolTrendBasedFibExtension';

const TrendBasedFibExtensionToolProgrammatic = ({ lineToolsApi, chartReady }) => {
    const { handleAddExtA, handleAddExtB, handleRemoveExtA, handleRemoveExtB, handleRemoveAllExt } = useLineToolTrendBasedFibExtension(lineToolsApi);
    return (
        <Accordion sx={{ bgcolor: 'background.paper' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Trend-Based Fib Extension</Typography></AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
                <Stack spacing={1}>
                    <Button variant="outlined" size="small" onClick={handleAddExtA} disabled={!chartReady}>Add Extension A (Uptrend)</Button>
                    <Button variant="outlined" size="small" onClick={handleAddExtB} disabled={!chartReady}>Add Extension B (Downtrend)</Button>
                    <Divider />
                    <Button variant="outlined" size="small" color="error" onClick={handleRemoveExtA} disabled={!chartReady}>Remove Extension A</Button>
                    <Button variant="outlined" size="small" color="error" onClick={handleRemoveExtB} disabled={!chartReady}>Remove Extension B</Button>
                    <Button variant="outlined" size="small" color="error" onClick={handleRemoveAllExt} disabled={!chartReady}>Remove All Extensions</Button>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};
export default TrendBasedFibExtensionToolProgrammatic;

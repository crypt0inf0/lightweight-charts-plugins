// File: /src/Components/ElliottImpulseToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Sept 2025 timestamps (chart shows Sept 1-30, 2025)
// 1756771200 = Sun Sep 01 2025 00:00:00 GMT+0000
const day = 86400; // seconds in a day
const baseTimestamp = 1756771200; // Sept 1, 2025 00:00 UTC (CORRECTED)

const ElliottImpulseToolProgrammatic = ({ lineToolsApi, chartReady }) => {
    const handleAddImpulseA = () => {
        console.log('[Elliott] Adding Impulse A...');
        if (lineToolsApi?.createOrUpdateLineTool) {
            // 6-point impulse: (0), (1), (2), (3), (4), (5)
            lineToolsApi.createOrUpdateLineTool('ElliottImpulse', [
                { timestamp: baseTimestamp + 1 * day, price: 150 },   // (0) Start
                { timestamp: baseTimestamp + 3 * day, price: 175 },   // (1)
                { timestamp: baseTimestamp + 5 * day, price: 160 },   // (2)
                { timestamp: baseTimestamp + 7 * day, price: 195 },   // (3)
                { timestamp: baseTimestamp + 9 * day, price: 175 },   // (4)
                { timestamp: baseTimestamp + 11 * day, price: 200 },  // (5)
            ], { line: { color: '#2962ff', width: 2 } }, 'IMPULSE_A');
        }
    };

    const handleAddImpulseB = () => {
        console.log('[Elliott] Adding Impulse B...');
        if (lineToolsApi?.createOrUpdateLineTool) {
            // 6-point impulse wave
            lineToolsApi.createOrUpdateLineTool('ElliottImpulse', [
                { timestamp: baseTimestamp + 12 * day, price: 190 },  // (0) Start
                { timestamp: baseTimestamp + 14 * day, price: 165 },  // (1)
                { timestamp: baseTimestamp + 16 * day, price: 180 },  // (2)
                { timestamp: baseTimestamp + 18 * day, price: 155 },  // (3)
                { timestamp: baseTimestamp + 20 * day, price: 170 },  // (4)
                { timestamp: baseTimestamp + 22 * day, price: 145 },  // (5)
            ], { line: { color: '#26A69A', width: 2 } }, 'IMPULSE_B');
        }
    };

    const handleAddImpulseC = () => {
        console.log('[Elliott] Adding Impulse C...');
        if (lineToolsApi?.createOrUpdateLineTool) {
            // 6-point impulse wave
            lineToolsApi.createOrUpdateLineTool('ElliottImpulse', [
                { timestamp: baseTimestamp + 20 * day, price: 145 },  // (0) Start
                { timestamp: baseTimestamp + 22 * day, price: 170 },  // (1)
                { timestamp: baseTimestamp + 24 * day, price: 155 },  // (2)
                { timestamp: baseTimestamp + 26 * day, price: 195 },  // (3)
                { timestamp: baseTimestamp + 28 * day, price: 180 },  // (4)
                { timestamp: baseTimestamp + 30 * day, price: 210 },  // (5)
            ], { line: { color: '#EF5350', width: 3 } }, 'IMPULSE_C');
        }
    };

    const handleUpdateImpulseA = () => {
        console.log('[Elliott] Updating Impulse A...');
        if (lineToolsApi?.createOrUpdateLineTool) {
            // Updated 6-point impulse
            lineToolsApi.createOrUpdateLineTool('ElliottImpulse', [
                { timestamp: baseTimestamp + 1 * day, price: 155 },   // (0)
                { timestamp: baseTimestamp + 3 * day, price: 180 },   // (1)
                { timestamp: baseTimestamp + 5 * day, price: 165 },   // (2)
                { timestamp: baseTimestamp + 7 * day, price: 200 },   // (3)
                { timestamp: baseTimestamp + 9 * day, price: 180 },   // (4)
                { timestamp: baseTimestamp + 11 * day, price: 210 },  // (5)
            ], { line: { color: '#9C27B0', width: 3 } }, 'IMPULSE_A');
        }
    };

    const handleRemoveImpulseA = () => {
        if (lineToolsApi?.removeLineToolsById) {
            lineToolsApi.removeLineToolsById(['IMPULSE_A']);
        }
    };

    const handleRemoveAll = () => {
        if (lineToolsApi?.removeLineToolsByIdRegex) {
            lineToolsApi.removeLineToolsByIdRegex(/^IMPULSE_/);
        }
    };

    return (
        <Accordion sx={{ bgcolor: 'background.paper' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Elliott Impulse</Typography></AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
                <Stack spacing={1}>
                    <Button variant="outlined" size="small" onClick={handleAddImpulseA} disabled={!chartReady}>Add Impulse A (Blue)</Button>
                    <Button variant="outlined" size="small" onClick={handleAddImpulseB} disabled={!chartReady}>Add Impulse B (Green)</Button>
                    <Button variant="outlined" size="small" onClick={handleAddImpulseC} disabled={!chartReady}>Add Impulse C (Red)</Button>
                    <Divider />
                    <Button variant="outlined" size="small" onClick={handleUpdateImpulseA} disabled={!chartReady}>Update Impulse A</Button>
                    <Divider />
                    <Button variant="outlined" size="small" color="error" onClick={handleRemoveImpulseA} disabled={!chartReady}>Remove Impulse A</Button>
                    <Button variant="outlined" size="small" color="error" onClick={handleRemoveAll} disabled={!chartReady}>Remove All Impulses</Button>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};
export default ElliottImpulseToolProgrammatic;

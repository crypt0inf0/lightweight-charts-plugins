// File: /src/Components/ElliottCorrectionToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Sept 2025 timestamps (chart shows Sept 1-30, 2025)
// 1756771200 = Sun Sep 01 2025 00:00:00 GMT+0000
const day = 86400; // seconds in a day
const baseTimestamp = 1756771200; // Sept 1, 2025 00:00 UTC (CORRECTED)

const ElliottCorrectionToolProgrammatic = ({ lineToolsApi, chartReady }) => {
    const handleAddCorrectionA = () => {
        console.log('[Elliott] Adding Correction A...');
        if (lineToolsApi?.createOrUpdateLineTool) {
            lineToolsApi.createOrUpdateLineTool('ElliottCorrection', [
                { timestamp: baseTimestamp + 1 * day, price: 180 },  // (0) Start
                { timestamp: baseTimestamp + 3 * day, price: 200 },  // (A)
                { timestamp: baseTimestamp + 5 * day, price: 170 },  // (B)
                { timestamp: baseTimestamp + 7 * day, price: 190 },  // (C)
            ], { line: { color: '#ff6d00', width: 2 } }, 'CORRECTION_A');
        }
    };

    const handleAddCorrectionB = () => {
        console.log('[Elliott] Adding Correction B...');
        if (lineToolsApi?.createOrUpdateLineTool) {
            lineToolsApi.createOrUpdateLineTool('ElliottCorrection', [
                { timestamp: baseTimestamp + 10 * day, price: 160 },  // (0) Start
                { timestamp: baseTimestamp + 12 * day, price: 195 },  // (A)
                { timestamp: baseTimestamp + 14 * day, price: 175 },  // (B)
                { timestamp: baseTimestamp + 16 * day, price: 200 },  // (C)
            ], { line: { color: '#FFC107', width: 2 } }, 'CORRECTION_B');
        }
    };

    const handleAddCorrectionC = () => {
        console.log('[Elliott] Adding Correction C...');
        if (lineToolsApi?.createOrUpdateLineTool) {
            lineToolsApi.createOrUpdateLineTool('ElliottCorrection', [
                { timestamp: baseTimestamp + 19 * day, price: 170 },  // (0) Start
                { timestamp: baseTimestamp + 21 * day, price: 190 },  // (A)
                { timestamp: baseTimestamp + 23 * day, price: 160 },  // (B)
                { timestamp: baseTimestamp + 25 * day, price: 185 },  // (C)
            ], { line: { color: '#E91E63', width: 2, style: 1 } }, 'CORRECTION_C');
        }
    };

    const handleUpdateCorrectionA = () => {
        console.log('[Elliott] Updating Correction A...');
        if (lineToolsApi?.createOrUpdateLineTool) {
            lineToolsApi.createOrUpdateLineTool('ElliottCorrection', [
                { timestamp: baseTimestamp + 1 * day, price: 175 },  // (0) Start
                { timestamp: baseTimestamp + 3 * day, price: 205 },  // (A)
                { timestamp: baseTimestamp + 5 * day, price: 165 },  // (B)
                { timestamp: baseTimestamp + 7 * day, price: 195 },  // (C)
            ], { line: { color: '#00BCD4', width: 3 } }, 'CORRECTION_A');
        }
    };

    const handleRemoveCorrectionA = () => {
        if (lineToolsApi?.removeLineToolsById) {
            lineToolsApi.removeLineToolsById(['CORRECTION_A']);
        }
    };

    const handleRemoveAll = () => {
        if (lineToolsApi?.removeLineToolsByIdRegex) {
            lineToolsApi.removeLineToolsByIdRegex(/^CORRECTION_/);
        }
    };

    return (
        <Accordion sx={{ bgcolor: 'background.paper' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Elliott Correction</Typography></AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
                <Stack spacing={1}>
                    <Button variant="outlined" size="small" onClick={handleAddCorrectionA} disabled={!chartReady}>Add Correction A (Orange)</Button>
                    <Button variant="outlined" size="small" onClick={handleAddCorrectionB} disabled={!chartReady}>Add Correction B (Yellow)</Button>
                    <Button variant="outlined" size="small" onClick={handleAddCorrectionC} disabled={!chartReady}>Add Correction C (Dashed)</Button>
                    <Divider />
                    <Button variant="outlined" size="small" onClick={handleUpdateCorrectionA} disabled={!chartReady}>Update Correction A</Button>
                    <Divider />
                    <Button variant="outlined" size="small" color="error" onClick={handleRemoveCorrectionA} disabled={!chartReady}>Remove Correction A</Button>
                    <Button variant="outlined" size="small" color="error" onClick={handleRemoveAll} disabled={!chartReady}>Remove All Corrections</Button>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};
export default ElliottCorrectionToolProgrammatic;

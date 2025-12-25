// File: /src/Components/ElliottCorrectionToolInteractive.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ElliottCorrectionToolInteractive = ({ lineToolsApi, chartReady }) => {
    // Default orange correction wave
    const handleActivateDefault = () => {
        if (lineToolsApi?.addLineTool) {
            lineToolsApi.addLineTool('ElliottCorrection', [], {});
        }
    };

    // Yellow correction wave
    const handleActivateYellow = () => {
        if (lineToolsApi?.addLineTool) {
            lineToolsApi.addLineTool('ElliottCorrection', [], {
                line: { color: '#FFC107', width: 2 },
                label: { color: '#FFC107' }
            });
        }
    };

    // Red bearish correction wave
    const handleActivateRed = () => {
        if (lineToolsApi?.addLineTool) {
            lineToolsApi.addLineTool('ElliottCorrection', [], {
                line: { color: '#EF5350', width: 2 },
                label: { color: '#EF5350' }
            });
        }
    };

    // Dashed pink correction
    const handleActivateDashed = () => {
        if (lineToolsApi?.addLineTool) {
            lineToolsApi.addLineTool('ElliottCorrection', [], {
                line: { color: '#E91E63', width: 2, style: 1 }, // style: 1 = dashed
                label: { color: '#E91E63' }
            });
        }
    };

    return (
        <Accordion sx={{ bgcolor: 'background.paper' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Elliott Correction (ABC)</Typography></AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
                <Stack spacing={1}>
                    <Button variant="outlined" size="small" onClick={handleActivateDefault} disabled={!chartReady}>Activate Default (Orange)</Button>
                    <Button variant="outlined" size="small" onClick={handleActivateYellow} disabled={!chartReady}>Activate Yellow</Button>
                    <Button variant="outlined" size="small" onClick={handleActivateRed} disabled={!chartReady}>Activate Red (Bearish)</Button>
                    <Button variant="outlined" size="small" onClick={handleActivateDashed} disabled={!chartReady}>Activate Dashed (Pink)</Button>
                    <Divider />
                    <Typography variant="caption" color="text.secondary">Click 3 points on chart for A-B-C pattern</Typography>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};
export default ElliottCorrectionToolInteractive;

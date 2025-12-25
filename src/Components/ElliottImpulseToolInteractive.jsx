// File: /src/Components/ElliottImpulseToolInteractive.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ElliottImpulseToolInteractive = ({ lineToolsApi, chartReady }) => {
    // Default blue impulse wave
    const handleActivateDefault = () => {
        if (lineToolsApi?.addLineTool) {
            lineToolsApi.addLineTool('ElliottImpulse', [], {});
        }
    };

    // Green bullish impulse wave
    const handleActivateGreen = () => {
        if (lineToolsApi?.addLineTool) {
            lineToolsApi.addLineTool('ElliottImpulse', [], {
                line: { color: '#26A69A', width: 2 },
                label: { color: '#26A69A' }
            });
        }
    };

    // Red bearish impulse wave
    const handleActivateRed = () => {
        if (lineToolsApi?.addLineTool) {
            lineToolsApi.addLineTool('ElliottImpulse', [], {
                line: { color: '#EF5350', width: 2 },
                label: { color: '#EF5350' }
            });
        }
    };

    // Thick purple impulse wave
    const handleActivateThick = () => {
        if (lineToolsApi?.addLineTool) {
            lineToolsApi.addLineTool('ElliottImpulse', [], {
                line: { color: '#9C27B0', width: 3 },
                label: { color: '#9C27B0', font: 'bold 16px Arial' }
            });
        }
    };

    return (
        <Accordion sx={{ bgcolor: 'background.paper' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Elliott Impulse (12345)</Typography></AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
                <Stack spacing={1}>
                    <Button variant="outlined" size="small" onClick={handleActivateDefault} disabled={!chartReady}>Activate Default (Blue)</Button>
                    <Button variant="outlined" size="small" onClick={handleActivateGreen} disabled={!chartReady}>Activate Green (Bullish)</Button>
                    <Button variant="outlined" size="small" onClick={handleActivateRed} disabled={!chartReady}>Activate Red (Bearish)</Button>
                    <Button variant="outlined" size="small" onClick={handleActivateThick} disabled={!chartReady}>Activate Thick (Purple)</Button>
                    <Divider />
                    <Typography variant="caption" color="text.secondary">Click 5 points on chart for 1-2-3-4-5 pattern</Typography>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};
export default ElliottImpulseToolInteractive;

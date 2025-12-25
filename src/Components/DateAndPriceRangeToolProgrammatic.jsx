// File: /src/Components/DateAndPriceRangeToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolDateAndPriceRange } from '../Hooks/useLineToolDateAndPriceRange';

const DateAndPriceRangeToolProgrammatic = ({ lineToolsApi, chartReady }) => {
    const { handleAddRangeA, handleAddRangeB, handleRemoveRangeA, handleRemoveRangeB, handleRemoveAllRanges } = useLineToolDateAndPriceRange(lineToolsApi);
    return (
        <Accordion sx={{ bgcolor: 'background.paper' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body2" fontWeight="medium">Date & Price Range</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
                <Stack spacing={1}>
                    <Button variant="outlined" size="small" onClick={handleAddRangeA} disabled={!chartReady}>Add Range A (Bullish)</Button>
                    <Button variant="outlined" size="small" onClick={handleAddRangeB} disabled={!chartReady}>Add Range B (Bearish)</Button>
                    <Divider />
                    <Button variant="outlined" size="small" color="error" onClick={handleRemoveRangeA} disabled={!chartReady}>Remove Range A</Button>
                    <Button variant="outlined" size="small" color="error" onClick={handleRemoveRangeB} disabled={!chartReady}>Remove Range B</Button>
                    <Button variant="outlined" size="small" color="error" onClick={handleRemoveAllRanges} disabled={!chartReady}>Remove All</Button>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};
export default DateAndPriceRangeToolProgrammatic;

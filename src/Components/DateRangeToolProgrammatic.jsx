// File: /src/Components/DateRangeToolProgrammatic.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolDateRange } from '../Hooks/useLineToolDateRange';

const DateRangeToolProgrammatic = ({ lineToolsApi, chartReady }) => {
    const { handleAddDateRangeA, handleAddDateRangeB, handleCreateDateRangeX, handleUpdateDateRangeX, handleRemoveDateRangeX, handleRemoveDateRangesRegex } = useLineToolDateRange(lineToolsApi);
    return (
        <Accordion sx={{ bgcolor: 'background.paper' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="body2" fontWeight="medium">Date Range</Typography></AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
                <Stack spacing={1}>
                    <Button variant="outlined" size="small" onClick={handleAddDateRangeA} disabled={!chartReady}>Add Range A</Button>
                    <Button variant="outlined" size="small" onClick={handleAddDateRangeB} disabled={!chartReady}>Add Range B</Button>
                    <Divider />
                    <Button variant="outlined" size="small" onClick={handleCreateDateRangeX} disabled={!chartReady}>Create RANGE_X</Button>
                    <Button variant="outlined" size="small" onClick={handleUpdateDateRangeX} disabled={!chartReady}>Update RANGE_X</Button>
                    <Button variant="outlined" size="small" color="error" onClick={handleRemoveDateRangeX} disabled={!chartReady}>Remove RANGE_X</Button>
                    <Button variant="outlined" size="small" color="error" onClick={handleRemoveDateRangesRegex} disabled={!chartReady}>Remove by Regex</Button>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};
export default DateRangeToolProgrammatic;

// File: /src/Components/DateAndPriceRangeToolInteractive.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolDateAndPriceRange } from '../Hooks/useLineToolDateAndPriceRange';

const DateAndPriceRangeToolInteractive = ({ lineToolsApi, chartReady }) => {
    const { handleSetActiveDefault } = useLineToolDateAndPriceRange(lineToolsApi);
    return (
        <Accordion sx={{ bgcolor: 'background.paper' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body2" fontWeight="medium">Date & Price Range</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
                <Stack spacing={1}>
                    <Button variant="outlined" size="small" onClick={handleSetActiveDefault} disabled={!chartReady}>
                        Activate
                    </Button>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};
export default DateAndPriceRangeToolInteractive;

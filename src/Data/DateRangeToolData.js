// /src/Data/DateRangeToolData.js

import { LineStyle } from 'lightweight-charts';

// Base timestamp for September 2025 (matches test chart data)
export const baseTimestamp = 1756771200; // Sept 1, 2025
export const day = 86400; // Seconds in a day

/**
 * Helper to create point objects.
 */
export const createPoints = (startBar, startPrice, endBar, endPrice) => [
    { timestamp: baseTimestamp + startBar * day, price: startPrice },
    { timestamp: baseTimestamp + endBar * day, price: endPrice },
];

// --- Default Options ---
export const defaultDateRangeOptions = {
    visible: true,
    editable: true,
    dateRange: {
        rectangle: {
            extend: { left: false, right: false },
            background: { color: 'rgba(33, 150, 243, 0.2)' },
            border: { width: 1, style: LineStyle.Solid, color: '#2196F3', radius: 0 },
        },
        showCenterHorizontalLine: true,
        showCenterVerticalLine: true,
        showBarCount: true,
        showDuration: true,
        showPriceChange: true,
    },
};

// --- Exotic/Custom Options ---
export const exoticDateRangeOptions = {
    visible: true,
    editable: true,
    dateRange: {
        rectangle: {
            extend: { left: false, right: false },
            background: { color: 'rgba(76, 175, 80, 0.25)' }, // Green theme
            border: { width: 2, style: LineStyle.Dashed, color: '#4CAF50', radius: 0 },
        },
        showCenterHorizontalLine: true,
        showCenterVerticalLine: false,
        showBarCount: true,
        showDuration: true,
        showPriceChange: false,
    },
};

// --- Sample Points for Testing ---
export const pointsForDateRangeA = createPoints(5, 120, 15, 180); // 10 bars, price up
export const pointsForDateRangeB = createPoints(18, 190, 25, 140); // 7 bars, price down

// --- createOrUpdateLineTool Test Points ---
export const dateRangeX_InitialOptions = {
    ...defaultDateRangeOptions,
    dateRange: {
        ...defaultDateRangeOptions.dateRange,
        rectangle: {
            ...defaultDateRangeOptions.dateRange.rectangle,
            border: { width: 1, style: LineStyle.Solid, color: '#FF9800', radius: 0 },
            background: { color: 'rgba(255, 152, 0, 0.2)' },
        },
    },
};

export const dateRangeX_UpdatedOptions = {
    ...defaultDateRangeOptions,
    dateRange: {
        ...defaultDateRangeOptions.dateRange,
        rectangle: {
            ...defaultDateRangeOptions.dateRange.rectangle,
            border: { width: 2, style: LineStyle.Solid, color: '#E91E63', radius: 0 },
            background: { color: 'rgba(233, 30, 99, 0.2)' },
        },
    },
};

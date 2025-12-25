// /src/Hooks/useLineToolTrendBasedFibExtension.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

const TOOL_TYPE = 'TrendBasedFibExtension';
const ID_PREFIX = 'TREND_FIB_EXT_';

// Base timestamp for test data (Sept 1, 2025 UTC)
const baseTimestamp = 1756771200;
const day = 86400;

// Default options for the tool
const defaultOptions = {
    line: { width: 1, color: '#787b86' },
    trendLine: { width: 2, color: '#2962ff' },
    retracementLine: { width: 1, color: '#787b86', style: 2 }, // Dashed
    extend: { left: false, right: false },
};

// Sample 3-point configuration for programmatic testing
const pointsForExtA = [
    { timestamp: baseTimestamp + 2 * day, price: 120 },  // P0: Trend start (swing low)
    { timestamp: baseTimestamp + 8 * day, price: 180 },  // P1: Trend end (swing high)
    { timestamp: baseTimestamp + 12 * day, price: 150 }, // P2: Retracement end (pullback)
];

const pointsForExtB = [
    { timestamp: baseTimestamp + 15 * day, price: 170 }, // P0: Trend start (swing high)
    { timestamp: baseTimestamp + 20 * day, price: 110 }, // P1: Trend end (swing low)
    { timestamp: baseTimestamp + 24 * day, price: 140 }, // P2: Retracement end (pullback high)
];

/**
 * Custom hook to manage all handlers and logic for the Trend-Based Fib Extension Tool.
 */
export const useLineToolTrendBasedFibExtension = (lineToolsApi) => {

    // --- Internal Helper for Programmatic Addition ---
    const addExtWithId = useCallback((id, points, options) => {
        console.log(`%c--- Button Clicked: Create Trend-Based Fib Extension (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');

        const optionsCopy = deepCopy(options);
        lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, points, optionsCopy, id);

        console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
        return id;
    }, [lineToolsApi]);


    // --- Handlers for Interactive Drawing Panel ---

    const handleSetActiveDefault = useCallback(() => {
        console.log(`%c--- Button Clicked: Activate Trend-Based Fib Extension (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
        lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(defaultOptions));
    }, [lineToolsApi]);

    const handleAddInteractiveDefault = useCallback(() => {
        console.log(`%c--- Button Clicked: Add Trend-Based Fib Extension (addLineTool: Default) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
        const id = lineToolsApi.addLineTool(TOOL_TYPE);
        if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
    }, [lineToolsApi]);


    // --- Handlers for Programmatic Creation Panel ---

    const handleAddExtA = useCallback(() => {
        addExtWithId(`${ID_PREFIX}A`, pointsForExtA, defaultOptions);
    }, [addExtWithId]);

    const handleAddExtB = useCallback(() => {
        addExtWithId(`${ID_PREFIX}B`, pointsForExtB, {
            ...defaultOptions,
            trendLine: { width: 2, color: '#f23645' },
        });
    }, [addExtWithId]);

    const handleRemoveExtA = useCallback(() => {
        console.log(`%c--- Button Clicked: Remove Extension A by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
        lineToolsApi.removeLineToolsById([`${ID_PREFIX}A`]);
    }, [lineToolsApi]);

    const handleRemoveExtB = useCallback(() => {
        console.log(`%c--- Button Clicked: Remove Extension B by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
        lineToolsApi.removeLineToolsById([`${ID_PREFIX}B`]);
    }, [lineToolsApi]);

    const handleRemoveAllExt = useCallback(() => {
        console.log(`%c--- Button Clicked: Remove All Extensions (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
        lineToolsApi.removeLineToolsByIdRegex(new RegExp(`^${ID_PREFIX}.*$`));
    }, [lineToolsApi]);


    // --- Return the comprehensive set of handlers ---
    return useMemo(() => ({
        // Interactive Handlers
        handleSetActiveDefault,
        handleAddInteractiveDefault,

        // Programmatic Handlers
        handleAddExtA,
        handleAddExtB,

        // Removal Handlers
        handleRemoveExtA,
        handleRemoveExtB,
        handleRemoveAllExt,
    }), [
        handleSetActiveDefault, handleAddInteractiveDefault,
        handleAddExtA, handleAddExtB,
        handleRemoveExtA, handleRemoveExtB, handleRemoveAllExt,
    ]);
};

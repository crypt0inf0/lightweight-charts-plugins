// /src/Hooks/useLineToolDateRange.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

import {
    defaultDateRangeOptions,
    exoticDateRangeOptions,
    pointsForDateRangeA,
    pointsForDateRangeB,
    dateRangeX_InitialOptions,
    dateRangeX_UpdatedOptions,
} from '../Data/DateRangeToolData';

const TOOL_TYPE = 'DateRange';
const ID_PREFIX = 'DR_PROG_';

/**
 * Custom hook to manage all handlers and logic for the DateRange Tool.
 */
export const useLineToolDateRange = (lineToolsApi) => {

    // Internal helper for programmatic addition
    const addDateRangeWithId = useCallback((id, points, options) => {
        console.log(`%c--- Button Clicked: Create Date Range (ID: ${id}) ---`, 'color: #fff; background: #2196F3; padding: 2px 5px;');

        const optionsCopy = deepCopy(options);
        lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, points, optionsCopy, id);

        console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
        return id;
    }, [lineToolsApi]);


    // --- Handlers for Interactive Drawing Panel ---

    const handleSetActiveDefault = useCallback(() => {
        console.log(`%c--- Button Clicked: Activate Default Date Range (addLineTool) ---`, 'color: #fff; background: #2196F3; padding: 2px 5px;');
        lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(defaultDateRangeOptions));
    }, [lineToolsApi]);

    const handleSetActiveExotic = useCallback(() => {
        console.log(`%c--- Button Clicked: Activate Exotic Date Range (addLineTool) ---`, 'color: #fff; background: #2196F3; padding: 2px 5px;');
        lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(exoticDateRangeOptions));
    }, [lineToolsApi]);

    const handleAddInteractiveDefault = useCallback(() => {
        console.log(`%c--- Button Clicked: Add Date Range (addLineTool: Default) ---`, 'color: #fff; background: #2196F3; padding: 2px 5px;');
        const id = lineToolsApi.addLineTool(TOOL_TYPE);
        if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
    }, [lineToolsApi]);


    // --- Handlers for Programmatic Creation Panel ---

    const handleAddDateRangeA = useCallback(() => {
        addDateRangeWithId(`${ID_PREFIX}A`, pointsForDateRangeA, defaultDateRangeOptions);
    }, [addDateRangeWithId]);

    const handleAddDateRangeB = useCallback(() => {
        addDateRangeWithId(`${ID_PREFIX}B`, pointsForDateRangeB, exoticDateRangeOptions);
    }, [addDateRangeWithId]);

    const handleCreateDateRangeX = useCallback(() => {
        console.log(`%c--- Button Clicked: Create DR_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #2196F3; padding: 2px 5px;');
        lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, pointsForDateRangeA, dateRangeX_InitialOptions, 'DR_X');
    }, [lineToolsApi]);

    const handleUpdateDateRangeX = useCallback(() => {
        console.log(`%c--- Button Clicked: Update DR_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #2196F3; padding: 2px 5px;');
        lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, pointsForDateRangeB, dateRangeX_UpdatedOptions, 'DR_X');
    }, [lineToolsApi]);

    const handleRemoveDateRangeX = useCallback(() => {
        console.log(`%c--- Button Clicked: Remove DR_X by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
        lineToolsApi.removeLineToolsById(['DR_X']);
    }, [lineToolsApi]);

    const handleRemoveDateRangesRegex = useCallback(() => {
        console.log(`%c--- Button Clicked: Remove Programmatic Date Ranges (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
        lineToolsApi.removeLineToolsByIdRegex(new RegExp(`^${ID_PREFIX}.*$`));
    }, [lineToolsApi]);


    // --- Return all handlers ---
    return useMemo(() => ({
        // Interactive Handlers
        handleSetActiveDefault,
        handleSetActiveExotic,
        handleAddInteractiveDefault,

        // Programmatic Handlers
        handleAddDateRangeA,
        handleAddDateRangeB,
        handleCreateDateRangeX,
        handleUpdateDateRangeX,

        // Removal Handlers
        handleRemoveDateRangeX,
        handleRemoveDateRangesRegex,
    }), [
        // Interactive
        handleSetActiveDefault, handleSetActiveExotic, handleAddInteractiveDefault,
        // Programmatic
        handleAddDateRangeA, handleAddDateRangeB, handleCreateDateRangeX, handleUpdateDateRangeX,
        // Removal
        handleRemoveDateRangeX, handleRemoveDateRangesRegex,
    ]);
};

// /src/Hooks/useLineToolDateAndPriceRange.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

const TOOL_TYPE = 'DateAndPriceRange';
const ID_PREFIX = 'DATE_PRICE_RANGE_';

// Base timestamp for test data (Sept 1, 2025 UTC)
const baseTimestamp = 1756771200;
const day = 86400;

// Default options
const defaultOptions = {
    dateAndPriceRange: {
        rectangle: {
            background: { color: 'rgba(41, 98, 255, 0.2)' },
        },
        verticalArrow: { color: '#2962ff' },
        horizontalArrow: { color: '#2962ff' },
    },
};

// Sample 2-point configurations
const pointsForRangeA = [
    { timestamp: baseTimestamp + 5 * day, price: 140 },
    { timestamp: baseTimestamp + 20 * day, price: 180 },
];

const pointsForRangeB = [
    { timestamp: baseTimestamp + 10 * day, price: 170 },
    { timestamp: baseTimestamp + 25 * day, price: 130 },
];

export const useLineToolDateAndPriceRange = (lineToolsApi) => {

    const addRangeWithId = useCallback((id, points, options) => {
        console.log(`%c--- Create Date & Price Range (ID: ${id}) ---`, 'color: #fff; background: #2962ff; padding: 2px 5px;');
        const optionsCopy = deepCopy(options);
        lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, points, optionsCopy, id);
        return id;
    }, [lineToolsApi]);

    const handleSetActiveDefault = useCallback(() => {
        console.log(`%c--- Activate Date & Price Range ---`, 'color: #fff; background: #2962ff; padding: 2px 5px;');
        lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(defaultOptions));
    }, [lineToolsApi]);

    const handleAddRangeA = useCallback(() => {
        addRangeWithId(`${ID_PREFIX}A`, pointsForRangeA, defaultOptions);
    }, [addRangeWithId]);

    const handleAddRangeB = useCallback(() => {
        addRangeWithId(`${ID_PREFIX}B`, pointsForRangeB, {
            ...defaultOptions,
            dateAndPriceRange: {
                ...defaultOptions.dateAndPriceRange,
                verticalArrow: { color: '#f23645' },
                horizontalArrow: { color: '#f23645' },
                rectangle: { background: { color: 'rgba(242, 54, 69, 0.2)' } },
            },
        });
    }, [addRangeWithId]);

    const handleRemoveRangeA = useCallback(() => {
        lineToolsApi.removeLineToolsById([`${ID_PREFIX}A`]);
    }, [lineToolsApi]);

    const handleRemoveRangeB = useCallback(() => {
        lineToolsApi.removeLineToolsById([`${ID_PREFIX}B`]);
    }, [lineToolsApi]);

    const handleRemoveAllRanges = useCallback(() => {
        lineToolsApi.removeLineToolsByIdRegex(new RegExp(`^${ID_PREFIX}.*$`));
    }, [lineToolsApi]);

    return useMemo(() => ({
        handleSetActiveDefault,
        handleAddRangeA,
        handleAddRangeB,
        handleRemoveRangeA,
        handleRemoveRangeB,
        handleRemoveAllRanges,
    }), [
        handleSetActiveDefault, handleAddRangeA, handleAddRangeB,
        handleRemoveRangeA, handleRemoveRangeB, handleRemoveAllRanges,
    ]);
};

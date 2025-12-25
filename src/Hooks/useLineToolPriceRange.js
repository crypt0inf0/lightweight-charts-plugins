// /src/Hooks/useLineToolPriceRange.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

// Import data specific to the PriceRange tool
import {
	defaultPriceRangeOptions,
	exoticPriceRangeOptions,
	pointsForPriceRangeA,
	pointsForPriceRangeB,
	pointsForPriceRangeC_OffScreenTop,
	priceRangeX_InitialOptions,
	priceRangeX_UpdatedOptions,
} from '../Data/PriceRangeToolData';

// Import necessary data helpers
import { baseTimestamp, day, createPoints } from '../Data/RectangleToolData'; 
import { useToolTestCases } from './useToolTestSurfaceGenerator';
import { PriceRangeOptionDefaults, PriceRangeUniversalTestConfig, PriceRangeContextualOverrides, PROPERTIES_TO_FORCE_TEST } from '../TestConfig/PriceRangeTestConfig';

const TOOL_TYPE = 'PriceRange';
const ID_PREFIX = 'PR_PROG_';

// --- Custom Placement Configuration for Automated Tests ---
const priceRangePlacementConfig = {
	// 2-point tool placement strategy
	PRICE_STEP: 30, // Large step due to tool height
	VERTICAL_POINTS_BETWEEN_POINTS: 15, 
	LINE_LENGTH: 5, 
	COLUMN_GAP: 3,
	MAX_TESTS_PER_COL: 10, 
	START_PRICE: 600,
	START_BAR_INDEX: -50,
};



/**
 * Custom hook to manage all handlers and logic for the PriceRange Tool.
 * This encapsulates its functionality, making it ready for integration.
 */
export const useLineToolPriceRange = (lineToolsApi) => {

	// --- Internal Helper for Programmatic Addition (Programmatic buttons need this wrapper) ---
	const addPriceRangeWithId = useCallback((id, points, options) => {
		console.log(`%c--- Button Clicked: Create Price Range (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
 
		// Create a deep copy of the provided options object before passing it to the API.
		const optionsCopy = deepCopy(options);
 
		// USE createOrUpdateLineTool TO FORCE THE ID (Handles programmatic creation)
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, points, optionsCopy, id); 

		console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
		return id; // Return the ID that was used
	}, [lineToolsApi]);


	// --- Handlers for Interactive Drawing Panel ---

	const handleSetActiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Default Price Range (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(defaultPriceRangeOptions));
	}, [lineToolsApi]);

	const handleSetActiveExotic = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Exotic Price Range (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(exoticPriceRangeOptions));
	}, [lineToolsApi]);

	const handleAddInteractiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Price Range (addLineTool: Default) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool(TOOL_TYPE);
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	// --- Handlers for Programmatic Creation Panel ---

	const handleAddPriceRangeA = useCallback(() => {
		addPriceRangeWithId(`${ID_PREFIX}A`, pointsForPriceRangeA, defaultPriceRangeOptions);
	}, [addPriceRangeWithId]);

	const handleAddPriceRangeB = useCallback(() => {
		addPriceRangeWithId(`${ID_PREFIX}B`, pointsForPriceRangeB, exoticPriceRangeOptions);
	}, [addPriceRangeWithId]);

	const handleAddPriceRangeC_OffScreen = useCallback(() => {
		// Test Culling Logic (Off-screen Top)
		addPriceRangeWithId(`${ID_PREFIX}C`, pointsForPriceRangeC_OffScreenTop, defaultPriceRangeOptions); 
	}, [addPriceRangeWithId]);

	const handleCreatePriceRangeX = useCallback(() => {
		console.log(`%c--- Button Clicked: Create PR_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, pointsForPriceRangeA, priceRangeX_InitialOptions, 'PR_X');
	}, [lineToolsApi]);

	const handleUpdatePriceRangeX = useCallback(() => {
		console.log(`%c--- Button Clicked: Update PR_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, pointsForPriceRangeB, priceRangeX_UpdatedOptions, 'PR_X');
	}, [lineToolsApi]);

	const handleRemovePriceRangeX = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove PR_X by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsById(['PR_X']);
	}, [lineToolsApi]);

	const handleRemovePriceRangeRegex = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Programmatic Price Ranges (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsByIdRegex(new RegExp(`^${ID_PREFIX}.*$`));
	}, [lineToolsApi]);

	// ------------------------------------------------------------------
	// --- Automated Test Surface Generation ---
	// ------------------------------------------------------------------
	
	// Hook to generate the comprehensive list of single-override test cases
	const automatedTestCases = useToolTestCases(
		TOOL_TYPE,
		PriceRangeOptionDefaults,
		PriceRangeUniversalTestConfig,
		PriceRangeContextualOverrides,
		PROPERTIES_TO_FORCE_TEST,
		priceRangePlacementConfig,
		{ strategy: 'TwoPoint' } // Default two-point tool
	);

	const handleGenerateAllTests = useCallback(() => {
		if (!lineToolsApi) return;
 
		console.log(`%c--- Button Clicked: Generating ${automatedTestCases.length} Automated Test Cases for Price Range ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
 
		// 1. Loop through all generated test cases and programmatically add them
		automatedTestCases.forEach((testCase, index) => {
			const toolId = `${ID_PREFIX}TEST_${index + 1}`;
 
			const optionsToUse = deepCopy(testCase.options);
 
			lineToolsApi.createOrUpdateLineTool(
				testCase.toolType, 
				testCase.points, 
				optionsToUse, 
				toolId
			);
		});

		console.log(`%c<- FINISHED: Added ${automatedTestCases.length} test tools.`, 'color: #32CD32; font-weight: bold;');
 
	}, [lineToolsApi, automatedTestCases]); 

	
	// --- Return the comprehensive set of handlers for the UI components to consume ---
	return useMemo(() => ({
		// Interactive Handlers
		handleSetActiveDefault,
		handleSetActiveExotic,
		handleAddInteractiveDefault,
 
		// Programmatic Handlers
		handleAddPriceRangeA,
		handleAddPriceRangeB,
		handleAddPriceRangeC_OffScreen,
		handleCreatePriceRangeX,
		handleUpdatePriceRangeX,
 
		// automated testing
		handleGenerateAllTests,

		// Removal Handlers
		handleRemovePriceRangeX,
		handleRemovePriceRangeRegex,
	}), [
		// Interactive
		handleSetActiveDefault, handleSetActiveExotic, handleAddInteractiveDefault,
		// Programmatic
		handleAddPriceRangeA, handleAddPriceRangeB, handleAddPriceRangeC_OffScreen, handleCreatePriceRangeX, handleUpdatePriceRangeX,
		// Removal
		handleRemovePriceRangeX, handleRemovePriceRangeRegex,
		// automated testing
		handleGenerateAllTests,
	]);
};
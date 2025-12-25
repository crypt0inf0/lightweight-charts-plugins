// /src/Hooks/useLineToolLongShortPosition.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

// Import data specific to the LongShortPosition tool
import {
	defaultLongShortPositionOptions,
	exoticLongShortPositionOptions,
	pointsForPositionA_Long,
	pointsForPositionB_Short,
	pointsForPositionC_OffScreenTop,
	positionX_InitialOptions,
	positionX_UpdatedOptions,
	MASTER_PATH_3_POINT_SHORT,
} from '../Data/LongShortPositionToolData';

// Import necessary data helpers
import { useToolTestCases } from './useToolTestSurfaceGenerator';
import { LongShortPositionOptionDefaults, LongShortPositionUniversalTestConfig, LongShortPositionContextualOverrides, PROPERTIES_TO_FORCE_TEST } from '../TestConfig/LongShortPositionTestConfig';

const TOOL_TYPE = 'LongShortPosition';
const ID_PREFIX = 'LSP_PROG_';

// --- Custom Placement Configuration for Automated Tests ---
const positionPlacementConfig = {
	// 3-point tool placement strategy
	PRICE_STEP: 40, // Very large step due to tool height (3x Risk)
	VERTICAL_POINTS_BETWEEN_POINTS: 10, 
	LINE_LENGTH: 5, 
	COLUMN_GAP: 2,
	MAX_TESTS_PER_COL: 15, // Fewer tools per column due to large vertical footprint
	START_BAR_INDEX: -50,
	START_PRICE: 600,
};

// --- Point Generation Strategy Configuration ---
const positionPointStrategyConfig = {
	strategy: 'CannedPath', // Use the CannedPath strategy
	path: MASTER_PATH_3_POINT_SHORT, // The predefined 3-point Short path
};



/**
 * Custom hook to manage all handlers and logic for the LongShortPosition Tool.
 * This encapsulates its functionality, making it ready for integration.
 */
export const useLineToolLongShortPosition = (lineToolsApi) => {

	// --- Internal Helper for Programmatic Addition (Programmatic buttons need this wrapper) ---
	const addPositionWithId = useCallback((id, points, options) => {
		console.log(`%c--- Button Clicked: Create Position (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
 
		// Create a deep copy of the provided options object before passing it to the API.
		const optionsCopy = deepCopy(options);
 
		// USE createOrUpdateLineTool TO FORCE THE ID (Handles programmatic creation)
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, points, optionsCopy, id); 

		console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
		return id; // Return the ID that was used
	}, [lineToolsApi]);


	// --- Handlers for Interactive Drawing Panel ---

	const handleSetActiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Default Position (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		// Interactive creation starts with an empty array of points
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(defaultLongShortPositionOptions));
	}, [lineToolsApi]);

	const handleSetActiveExotic = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Exotic Position (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(exoticLongShortPositionOptions));
	}, [lineToolsApi]);

	const handleAddInteractiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Position (addLineTool: Default) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool(TOOL_TYPE);
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	// --- Handlers for Programmatic Creation Panel ---

	const handleAddPositionA_Long = useCallback(() => {
		addPositionWithId(`${ID_PREFIX}A_LONG`, pointsForPositionA_Long, defaultLongShortPositionOptions);
	}, [addPositionWithId]);

	const handleAddPositionB_Short = useCallback(() => {
		addPositionWithId(`${ID_PREFIX}B_SHORT`, pointsForPositionB_Short, exoticLongShortPositionOptions);
	}, [addPositionWithId]);

	const handleAddPositionC_OffScreen = useCallback(() => {
		// Test Culling Logic (Off-screen Top)
		addPositionWithId(`${ID_PREFIX}C_CULL`, pointsForPositionC_OffScreenTop, defaultLongShortPositionOptions); 
	}, [addPositionWithId]);

	const handleCreatePositionX = useCallback(() => {
		console.log(`%c--- Button Clicked: Create LSP_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		// Use Long initial position
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, pointsForPositionA_Long, positionX_InitialOptions, 'LSP_X');
	}, [lineToolsApi]);

	const handleUpdatePositionX = useCallback(() => {
		console.log(`%c--- Button Clicked: Update LSP_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		// Update position and style to Short
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, pointsForPositionB_Short, positionX_UpdatedOptions, 'LSP_X');
	}, [lineToolsApi]);

	const handleRemovePositionX = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove LSP_X by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsById(['LSP_X']);
	}, [lineToolsApi]);

	const handleRemovePositionRegex = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Programmatic Positions (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsByIdRegex(new RegExp(`^${ID_PREFIX}.*$`));
	}, [lineToolsApi]);

	// ------------------------------------------------------------------
	// --- Automated Test Surface Generation ---
	// ------------------------------------------------------------------
	
	// Hook to generate the comprehensive list of single-override test cases
	const automatedTestCases = useToolTestCases(
		TOOL_TYPE,
		LongShortPositionOptionDefaults,
		LongShortPositionUniversalTestConfig,
		LongShortPositionContextualOverrides,
		PROPERTIES_TO_FORCE_TEST,
		positionPlacementConfig,
		positionPointStrategyConfig, // Pass the 3-point canned path strategy
		'entryStopLossText.value'
	);

	const handleGenerateAllTests = useCallback(() => {
		if (!lineToolsApi) return;
 
		console.log(`%c--- Button Clicked: Generating ${automatedTestCases.length} Automated Test Cases for Long Short Position ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
 
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
		handleAddPositionA_Long,
		handleAddPositionB_Short,
		handleAddPositionC_OffScreen,
		handleCreatePositionX,
		handleUpdatePositionX,
 
		// automated testing
		handleGenerateAllTests,

		// Removal Handlers
		handleRemovePositionX,
		handleRemovePositionRegex,
	}), [
		// Interactive
		handleSetActiveDefault, handleSetActiveExotic, handleAddInteractiveDefault,
		// Programmatic
		handleAddPositionA_Long, handleAddPositionB_Short, handleAddPositionC_OffScreen, handleCreatePositionX, handleUpdatePositionX,
		// Removal
		handleRemovePositionX, handleRemovePositionRegex,
		// automated testing
		handleGenerateAllTests,
	]);
};
// /src/Hooks/useLineToolVerticalLine.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

// Import data specific to the VerticalLine tool
import {
	defaultVerticalLineOptions,
	exoticVerticalLineOptions,
	pointsForVerticalA,
	pointsForVerticalB,
	pointsForVerticalC_OffScreenLeft,
	verticalX_InitialOptions,
	verticalX_UpdatedOptions,
} from '../Data/VerticalLineToolData';

// Import necessary data helpers
import { baseTimestamp, day, createPoints } from '../Data/RectangleToolData'; 
import { useToolTestCases } from './useToolTestSurfaceGenerator';
import { VerticalLineOptionDefaults, VerticalLineUniversalTestConfig, VerticalLineContextualOverrides, PROPERTIES_TO_FORCE_TEST } from '../TestConfig/VerticalLineTestConfig';

const TOOL_TYPE = 'VerticalLine';
const ID_PREFIX = 'VL_PROG_';

// --- Custom Placement Configuration for Automated Tests ---
const verticalLinePlacementConfig = {
	// Vertical Line (1-point tool) needs special placement strategy
	PRICE_STEP: 15, 
	VERTICAL_POINTS_BETWEEN_POINTS: 0, // Not applicable
	LINE_LENGTH: 0, // Not applicable
	COLUMN_GAP: 3,
	MAX_TESTS_PER_COL: 1,
	START_BAR_INDEX: -150,
};



/**
 * Custom hook to manage all handlers and logic for the VerticalLine Tool.
 * This encapsulates its functionality, making it ready for integration.
 */
export const useLineToolVerticalLine = (lineToolsApi) => {

	// --- Internal Helper for Programmatic Addition (Programmatic buttons need this wrapper) ---
	const addVerticalLineWithId = useCallback((id, points, options) => {
		console.log(`%c--- Button Clicked: Create Vertical Line (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
 
		// Create a deep copy of the provided options object before passing it to the API.
		const optionsCopy = deepCopy(options);
 
		// USE createOrUpdateLineTool TO FORCE THE ID (Handles programmatic creation)
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, points, optionsCopy, id); 

		console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
		return id; // Return the ID that was used
	}, [lineToolsApi]);


	// --- Handlers for Interactive Drawing Panel ---

	const handleSetActiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Default Vertical Line (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(defaultVerticalLineOptions));
	}, [lineToolsApi]);

	const handleSetActiveExotic = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Exotic Vertical Line (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(exoticVerticalLineOptions));
	}, [lineToolsApi]);

	const handleAddInteractiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Vertical Line (addLineTool: Default) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool(TOOL_TYPE);
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	// --- Handlers for Programmatic Creation Panel ---

	const handleAddVerticalLineA = useCallback(() => {
		addVerticalLineWithId(`${ID_PREFIX}A`, pointsForVerticalA, defaultVerticalLineOptions);
	}, [addVerticalLineWithId]);

	const handleAddVerticalLineB = useCallback(() => {
		addVerticalLineWithId(`${ID_PREFIX}B`, pointsForVerticalB, exoticVerticalLineOptions);
	}, [addVerticalLineWithId]);

	const handleAddVerticalLineC_OffScreen = useCallback(() => {
		// Test Culling Logic (Off-screen Left)
		addVerticalLineWithId(`${ID_PREFIX}C`, pointsForVerticalC_OffScreenLeft, defaultVerticalLineOptions); 
	}, [addVerticalLineWithId]);

	const handleCreateVerticalX = useCallback(() => {
		console.log(`%c--- Button Clicked: Create VL_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, createPoints(baseTimestamp + 15 * day, 175), verticalX_InitialOptions, 'VL_X');
	}, [lineToolsApi]);

	const handleUpdateVerticalX = useCallback(() => {
		console.log(`%c--- Button Clicked: Update VL_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, createPoints(baseTimestamp + 20 * day, 195), verticalX_UpdatedOptions, 'VL_X');
	}, [lineToolsApi]);

	const handleRemoveVerticalX = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove VL_X by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsById(['VL_X']);
	}, [lineToolsApi]);

	const handleRemoveVerticalRegex = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Programmatic Vertical Lines (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsByIdRegex(new RegExp(`^${ID_PREFIX}.*$`));
	}, [lineToolsApi]);

	// ------------------------------------------------------------------
	// --- Automated Test Surface Generation ---
	// ------------------------------------------------------------------
	
	// Hook to generate the comprehensive list of single-override test cases
	const automatedTestCases = useToolTestCases(
		TOOL_TYPE,
		VerticalLineOptionDefaults,
		VerticalLineUniversalTestConfig,
		VerticalLineContextualOverrides,
		PROPERTIES_TO_FORCE_TEST,
		verticalLinePlacementConfig,
		{ strategy: 'OnePoint' } // Explicitly set the strategy to generate 1 point
	);

	const handleGenerateAllTests = useCallback(() => {
		if (!lineToolsApi) return;
 
		console.log(`%c--- Button Clicked: Generating ${automatedTestCases.length} Automated Test Cases for Vertical Line ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
 
		// 1. Loop through all generated test cases and programmatically add them
		automatedTestCases.forEach((testCase, index) => {
			const toolId = `VL_TEST_${index + 1}`;
 
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
		handleAddVerticalLineA,
		handleAddVerticalLineB,
		handleAddVerticalLineC_OffScreen,
		handleCreateVerticalX,
		handleUpdateVerticalX,
 
		// automated testing
		handleGenerateAllTests,

		// Removal Handlers
		handleRemoveVerticalX,
		handleRemoveVerticalRegex,
	}), [
		// Interactive
		handleSetActiveDefault, handleSetActiveExotic, handleAddInteractiveDefault,
		// Programmatic
		handleAddVerticalLineA, handleAddVerticalLineB, handleAddVerticalLineC_OffScreen, handleCreateVerticalX, handleUpdateVerticalX,
		// Removal
		handleRemoveVerticalX, handleRemoveVerticalRegex,
		// automated testing
		handleGenerateAllTests,
	]);
};
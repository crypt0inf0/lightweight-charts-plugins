// /src/Hooks/useLineToolHorizontalLine.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

// Import data specific to the HorizontalLine tool
import {
	defaultHorizontalLineOptions,
	exoticHorizontalLineOptions,
	pointsForHorizontalA,
	pointsForHorizontalB,
	pointsForHorizontalC_OffScreenTop,
	horizontalX_InitialOptions,
	horizontalX_UpdatedOptions,
} from '../Data/HorizontalLineToolData';

// Import necessary data helpers

import { baseTimestamp, day, hour, createPoints } from '../Data/RectangleToolData'; 
import { useToolTestCases } from './useToolTestSurfaceGenerator';
import { HorizontalLineOptionDefaults, HorizontalLineUniversalTestConfig, HorizontalLineContextualOverrides, PROPERTIES_TO_FORCE_TEST } from '../TestConfig/HorizontalLineTestConfig';

const TOOL_TYPE = 'HorizontalLine';
const ID_PREFIX = 'HL_PROG_';

// --- Custom Placement Configuration for the Circle Tool ---
const horizontalLinePlacementConfig = {
    // These values are increased to prevent large circles from overlapping with each other
    PRICE_STEP: 15, 
    VERTICAL_POINTS_BETWEEN_POINTS: 2,
    LINE_LENGTH: 1, // Increase horizontal line length in test data
    COLUMN_GAP: 3,
	MAX_TESTS_PER_COL: 100,
};



/**
 * Custom hook to manage all handlers and logic for the HorizontalLine Tool.
 * This encapsulates its functionality, making it ready for integration.
 */
export const useLineToolHorizontalLine = (lineToolsApi) => {

	// --- Internal Helper for Programmatic Addition (Programmatic buttons need this wrapper) ---
	const addHorizontalLineWithId = useCallback((id, points, options) => {
		console.log(`%c--- Button Clicked: Create Horizontal Line (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
 
		// Create a deep copy of the provided options object before passing it to the API.
		const optionsCopy = deepCopy(options);
 
		// USE createOrUpdateLineTool TO FORCE THE ID (Handles programmatic creation)
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, points, optionsCopy, id); 

		console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
		return id; // Return the ID that was used
	}, [lineToolsApi]);


	// --- Handlers for Interactive Drawing Panel ---

	const handleSetActiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Default Horizontal Line (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(defaultHorizontalLineOptions));
	}, [lineToolsApi]);

	const handleSetActiveExotic = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Exotic Horizontal Line (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(exoticHorizontalLineOptions));
	}, [lineToolsApi]);

	const handleAddInteractiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Horizontal Line (addLineTool: Default) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool(TOOL_TYPE);
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	// --- Handlers for Programmatic Creation Panel ---

	const handleAddHorizontalA = useCallback(() => {
		addHorizontalLineWithId(`${ID_PREFIX}A`, pointsForHorizontalA, defaultHorizontalLineOptions);
	}, [addHorizontalLineWithId]);

	const handleAddHorizontalB = useCallback(() => {
		addHorizontalLineWithId(`${ID_PREFIX}B`, pointsForHorizontalB, exoticHorizontalLineOptions);
	}, [addHorizontalLineWithId]);

	const handleAddHorizontalC_OffScreen = useCallback(() => {
		// Test Culling Logic (Off-screen Top)
		addHorizontalLineWithId(`${ID_PREFIX}C`, pointsForHorizontalC_OffScreenTop, defaultHorizontalLineOptions); 
	}, [addHorizontalLineWithId]);

	const handleCreateHorizontalX = useCallback(() => {
		console.log(`%c--- Button Clicked: Create HL_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, createPoints(baseTimestamp + 15 * day, 175), horizontalX_InitialOptions, 'HL_X');
	}, [lineToolsApi]);

	const handleUpdateHorizontalX = useCallback(() => {
		console.log(`%c--- Button Clicked: Update HL_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, createPoints(baseTimestamp + 20 * day, 195), horizontalX_UpdatedOptions, 'HL_X');
	}, [lineToolsApi]);

	const handleRemoveHorizontalX = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove HL_X by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsById(['HL_X']);
	}, [lineToolsApi]);

	const handleRemoveHorizontalRegex = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Programmatic Horizontal Lines (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsByIdRegex(new RegExp(`^${ID_PREFIX}.*$`));
	}, [lineToolsApi]);

	// ------------------------------------------------------------------
	// --- Automated Test Surface Generation ---
	// ------------------------------------------------------------------
	
	// Hook to generate the comprehensive list of single-override test cases
	// NOTE: We need to use a strategy that generates 1 point instead of the default 2 points.
	const automatedTestCases = useToolTestCases(
		TOOL_TYPE,
		HorizontalLineOptionDefaults,
		HorizontalLineUniversalTestConfig,
		HorizontalLineContextualOverrides,
		PROPERTIES_TO_FORCE_TEST,
		horizontalLinePlacementConfig,
		{ strategy: 'OnePoint' } // Explicitly set the strategy to generate 1 point
	);

	const handleGenerateAllTests = useCallback(() => {
		if (!lineToolsApi) return;
 
		console.log(`%c--- Button Clicked: Generating ${automatedTestCases.length} Automated Test Cases for Horizontal Line ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
 
		// 1. Loop through all generated test cases and programmatically add them
		automatedTestCases.forEach((testCase, index) => {
			const toolId = `HL_TEST_${index + 1}`;
 
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
		handleAddHorizontalA,
		handleAddHorizontalB,
		handleAddHorizontalC_OffScreen,
		handleCreateHorizontalX,
		handleUpdateHorizontalX,
 
		// automated testing
		handleGenerateAllTests,

		// Removal Handlers
		handleRemoveHorizontalX,
		handleRemoveHorizontalRegex,
	}), [
		// Interactive
		handleSetActiveDefault, handleSetActiveExotic, handleAddInteractiveDefault,
		// Programmatic
		handleAddHorizontalA, handleAddHorizontalB, handleAddHorizontalC_OffScreen, handleCreateHorizontalX, handleUpdateHorizontalX,
		// Removal
		handleRemoveHorizontalX, handleRemoveHorizontalRegex,
		// automated testing
		handleGenerateAllTests,
	]);
};
// /src/Hooks/useLineToolHorizontalRay.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

// Import data specific to the HorizontalRay tool
import {
	defaultHorizontalRayOptions,
	exoticHorizontalRayOptions,
	pointsForHorizontalRayA,
	pointsForHorizontalRayB,
	pointsForHorizontalRayC_OffScreenTop,
	horizontalRayX_InitialOptions,
	horizontalRayX_UpdatedOptions,
} from '../Data/HorizontalRayToolData';

// Import necessary data helpers
import { baseTimestamp, day, createPoints } from '../Data/RectangleToolData'; 
import { useToolTestCases } from './useToolTestSurfaceGenerator';
import { HorizontalRayOptionDefaults, HorizontalRayUniversalTestConfig, HorizontalRayContextualOverrides, PROPERTIES_TO_FORCE_TEST } from '../TestConfig/HorizontalRayTestConfig';


const TOOL_TYPE = 'HorizontalRay';
const ID_PREFIX = 'HR_PROG_';

// --- Custom Placement Configuration for Automated Tests ---
const horizontalRayPlacementConfig = {
	// These values are increased to prevent large tools from overlapping with each other
	PRICE_STEP: 15, 
	VERTICAL_POINTS_BETWEEN_POINTS: 2,
	LINE_LENGTH: 1, 
	COLUMN_GAP: 3,
	MAX_TESTS_PER_COL: 100,
};



/**
 * Custom hook to manage all handlers and logic for the HorizontalRay Tool.
 * This encapsulates its functionality, making it ready for integration.
 */
export const useLineToolHorizontalRay = (lineToolsApi) => {

	// --- Internal Helper for Programmatic Addition (Programmatic buttons need this wrapper) ---
	const addHorizontalRayWithId = useCallback((id, points, options) => {
		console.log(`%c--- Button Clicked: Create Horizontal Ray (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
 
		// Create a deep copy of the provided options object before passing it to the API.
		const optionsCopy = deepCopy(options);
 
		// USE createOrUpdateLineTool TO FORCE THE ID (Handles programmatic creation)
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, points, optionsCopy, id); 

		console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
		return id; // Return the ID that was used
	}, [lineToolsApi]);


	// --- Handlers for Interactive Drawing Panel ---

	const handleSetActiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Default Horizontal Ray (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(defaultHorizontalRayOptions));
	}, [lineToolsApi]);

	const handleSetActiveExotic = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Exotic Horizontal Ray (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(exoticHorizontalRayOptions));
	}, [lineToolsApi]);

	const handleAddInteractiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Horizontal Ray (addLineTool: Default) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool(TOOL_TYPE);
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	// --- Handlers for Programmatic Creation Panel ---

	const handleAddHorizontalRayA = useCallback(() => {
		addHorizontalRayWithId(`${ID_PREFIX}A`, pointsForHorizontalRayA, defaultHorizontalRayOptions);
	}, [addHorizontalRayWithId]);

	const handleAddHorizontalRayB = useCallback(() => {
		addHorizontalRayWithId(`${ID_PREFIX}B`, pointsForHorizontalRayB, exoticHorizontalRayOptions);
	}, [addHorizontalRayWithId]);

	const handleAddHorizontalRayC_OffScreen = useCallback(() => {
		// Test Culling Logic (Off-screen Top)
		addHorizontalRayWithId(`${ID_PREFIX}C`, pointsForHorizontalRayC_OffScreenTop, defaultHorizontalRayOptions); 
	}, [addHorizontalRayWithId]);

	const handleCreateHorizontalRayX = useCallback(() => {
		console.log(`%c--- Button Clicked: Create HR_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, createPoints(baseTimestamp + 15 * day, 175), horizontalRayX_InitialOptions, 'HR_X');
	}, [lineToolsApi]);

	const handleUpdateHorizontalRayX = useCallback(() => {
		console.log(`%c--- Button Clicked: Update HR_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, createPoints(baseTimestamp + 20 * day, 195), horizontalRayX_UpdatedOptions, 'HR_X');
	}, [lineToolsApi]);

	const handleRemoveHorizontalRayX = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove HR_X by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsById(['HR_X']);
	}, [lineToolsApi]);

	const handleRemoveHorizontalRayRegex = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Programmatic Horizontal Ray Lines (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsByIdRegex(new RegExp(`^${ID_PREFIX}.*$`));
	}, [lineToolsApi]);

	// ------------------------------------------------------------------
	// --- Automated Test Surface Generation ---
	// ------------------------------------------------------------------
	
	// Hook to generate the comprehensive list of single-override test cases
	const automatedTestCases = useToolTestCases(
		TOOL_TYPE,
		HorizontalRayOptionDefaults,
		HorizontalRayUniversalTestConfig,
		HorizontalRayContextualOverrides,
		PROPERTIES_TO_FORCE_TEST,
		horizontalRayPlacementConfig,
		{ strategy: 'OnePoint' } // Explicitly set the strategy to generate 1 point
	);

	const handleGenerateAllTests = useCallback(() => {
		if (!lineToolsApi) return;
 
		console.log(`%c--- Button Clicked: Generating ${automatedTestCases.length} Automated Test Cases for Horizontal Ray ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
 
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
		handleAddHorizontalRayA,
		handleAddHorizontalRayB,
		handleAddHorizontalRayC_OffScreen,
		handleCreateHorizontalRayX,
		handleUpdateHorizontalRayX,
 
		// automated testing
		handleGenerateAllTests,

		// Removal Handlers
		handleRemoveHorizontalRayX,
		handleRemoveHorizontalRayRegex,
	}), [
		// Interactive
		handleSetActiveDefault, handleSetActiveExotic, handleAddInteractiveDefault,
		// Programmatic
		handleAddHorizontalRayA, handleAddHorizontalRayB, handleAddHorizontalRayC_OffScreen, handleCreateHorizontalRayX, handleUpdateHorizontalRayX,
		// Removal
		handleRemoveHorizontalRayX, handleRemoveHorizontalRayRegex,
		// automated testing
		handleGenerateAllTests,
	]);
};
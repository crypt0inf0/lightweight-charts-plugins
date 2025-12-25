// /src/Hooks/useLineToolRay.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

// Import data specific to the Ray tool
import {
	defaultRayLineOptions,
	exoticRayLineOptions,
	pointsForRayA,
	pointsForRayB,
	pointsForRayC_OffScreenLeft,
	rayX_InitialOptions,
	rayX_UpdatedOptions,
} from '../Data/RayToolData';

// Import necessary data helpers
import { baseTimestamp, day, hour, createPoints } from '../Data/RectangleToolData'; 
import { useToolTestCases } from './useToolTestSurfaceGenerator';
import { RayOptionDefaults, RayUniversalTestConfig, RayContextualOverrides, PROPERTIES_TO_FORCE_TEST } from '../TestConfig/RayTestConfig';

const TOOL_TYPE = 'Ray';
const ID_PREFIX = 'RAY_PROG_';

// --- Custom Placement Configuration for Automated Tests ---
const rayLinePlacementConfig = {
	MAX_TESTS_PER_COL: 200,
	PRICE_STEP: 10,
};

/**
 * Custom hook to manage all handlers and logic for the Ray Tool.
 * This encapsulates its functionality, making it ready for integration.
 */
export const useLineToolRay = (lineToolsApi) => {

	// --- Internal Helper for Programmatic Addition (Programmatic buttons need this wrapper) ---
	const addRayLineWithId = useCallback((id, points, options) => {
		console.log(`%c--- Button Clicked: Create Ray Line (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
 
		// Create a deep copy of the provided options object before passing it to the API.
		const optionsCopy = deepCopy(options);
 
		// USE createOrUpdateLineTool TO FORCE THE ID (Handles programmatic creation)
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, points, optionsCopy, id); 

		console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
		return id; // Return the ID that was used
	}, [lineToolsApi]);


	// --- Handlers for Interactive Drawing Panel ---

	const handleSetActiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Default Ray Line (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(defaultRayLineOptions));
	}, [lineToolsApi]);

	const handleSetActiveExotic = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Exotic Ray Line (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(exoticRayLineOptions));
	}, [lineToolsApi]);

	const handleAddInteractiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Ray Line (addLineTool: Default) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool(TOOL_TYPE);
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	// --- Handlers for Programmatic Creation Panel ---

	const handleAddRayA = useCallback(() => {
		addRayLineWithId(`${ID_PREFIX}A`, pointsForRayA, defaultRayLineOptions);
	}, [addRayLineWithId]);

	const handleAddRayB = useCallback(() => {
		addRayLineWithId(`${ID_PREFIX}B`, pointsForRayB, exoticRayLineOptions);
	}, [addRayLineWithId]);

	const handleAddRayC_OffScreen = useCallback(() => {
		// Test Culling Logic (Off-screen left, non-extending)
		addRayLineWithId(`${ID_PREFIX}C`, pointsForRayC_OffScreenLeft, defaultRayLineOptions); 
	}, [addRayLineWithId]);

	const handleCreateRayX = useCallback(() => {
		console.log(`%c--- Button Clicked: Create RAY_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, createPoints(baseTimestamp + 1 * day, 185, baseTimestamp + 4 * day, 165), rayX_InitialOptions, 'RAY_X');
	}, [lineToolsApi]);

	const handleUpdateRayX = useCallback(() => {
		console.log(`%c--- Button Clicked: Update RAY_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, createPoints(baseTimestamp + 1 * day, 195, baseTimestamp + 4 * day, 175), rayX_UpdatedOptions, 'RAY_X');
	}, [lineToolsApi]);

	const handleRemoveRayX = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove RAY_X by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsById(['RAY_X']);
	}, [lineToolsApi]);

	const handleRemoveRayRegex = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Programmatic Ray Lines (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsByIdRegex(new RegExp(`^${ID_PREFIX}.*$`));
	}, [lineToolsApi]);

	// ------------------------------------------------------------------
	// --- Automated Test Surface Generation ---
	// ------------------------------------------------------------------
	
	// Hook to generate the comprehensive list of single-override test cases
	const automatedTestCases = useToolTestCases(
		TOOL_TYPE,
		RayOptionDefaults,
		RayUniversalTestConfig,
		RayContextualOverrides,
		PROPERTIES_TO_FORCE_TEST,
		rayLinePlacementConfig,
	);

	const handleGenerateAllTests = useCallback(() => {
		if (!lineToolsApi) return;
 
		console.log(`%c--- Button Clicked: Generating ${automatedTestCases.length} Automated Test Cases for Ray Line ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
 
		// 1. Loop through all generated test cases and programmatically add them
		automatedTestCases.forEach((testCase, index) => {
			const toolId = `RAY_TEST_${index + 1}`;
 
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
		handleAddRayA,
		handleAddRayB,
		handleAddRayC_OffScreen,
		handleCreateRayX,
		handleUpdateRayX,
 
		// automated testing
		handleGenerateAllTests,

		// Removal Handlers
		handleRemoveRayX,
		handleRemoveRayRegex,
	}), [
		// Interactive
		handleSetActiveDefault, handleSetActiveExotic, handleAddInteractiveDefault,
		// Programmatic
		handleAddRayA, handleAddRayB, handleAddRayC_OffScreen, handleCreateRayX, handleUpdateRayX,
		// Removal
		handleRemoveRayX, handleRemoveRayRegex,
		// automated testing
		handleGenerateAllTests,
	]);
};
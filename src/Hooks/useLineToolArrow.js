// /src/Hooks/useLineToolArrow.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

// Import data specific to the Arrow tool
import {
	defaultArrowLineOptions,
	exoticArrowLineOptions,
	pointsForArrowA,
	pointsForArrowB,
	pointsForArrowC_OffScreenLeft,
	arrowX_InitialOptions,
	arrowX_UpdatedOptions,
} from '../Data/ArrowToolData';

// Import necessary data helpers
import { baseTimestamp, day, hour, createPoints } from '../Data/RectangleToolData'; 
import { useToolTestCases } from './useToolTestSurfaceGenerator';
import { ArrowOptionDefaults, ArrowUniversalTestConfig, ArrowContextualOverrides, PROPERTIES_TO_FORCE_TEST } from '../TestConfig/ArrowTestConfig';

const TOOL_TYPE = 'Arrow';
const ID_PREFIX = 'ARROW_PROG_';

/**
 * Custom hook to manage all handlers and logic for the Arrow Tool.
 * This encapsulates its functionality, making it ready for integration.
 */
export const useLineToolArrow = (lineToolsApi) => {

	// --- Internal Helper for Programmatic Addition (Programmatic buttons need this wrapper) ---
	const addArrowLineWithId = useCallback((id, points, options) => {
		console.log(`%c--- Button Clicked: Create Arrow Line (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
 
		// Create a deep copy of the provided options object before passing it to the API.
		const optionsCopy = deepCopy(options);
 
		// USE createOrUpdateLineTool TO FORCE THE ID (Handles programmatic creation)
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, points, optionsCopy, id); 

		console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
		return id; // Return the ID that was used
	}, [lineToolsApi]);


	// --- Handlers for Interactive Drawing Panel ---

	const handleSetActiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Default Arrow Line (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(defaultArrowLineOptions));
	}, [lineToolsApi]);

	const handleSetActiveExotic = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Exotic Arrow Line (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;'); 
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(exoticArrowLineOptions));
	}, [lineToolsApi]);

	const handleAddInteractiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Arrow Line (addLineTool: Default) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool(TOOL_TYPE); 
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	// --- Handlers for Programmatic Creation Panel ---

	const handleAddArrowA = useCallback(() => {
		addArrowLineWithId(`${ID_PREFIX}A`, pointsForArrowA, defaultArrowLineOptions);
	}, [addArrowLineWithId]);

	const handleAddArrowB = useCallback(() => {
		addArrowLineWithId(`${ID_PREFIX}B`, pointsForArrowB, exoticArrowLineOptions);
	}, [addArrowLineWithId]);

	const handleAddArrowC_OffScreen = useCallback(() => {
		// Test Culling Logic (Off-screen left, non-extending)
		addArrowLineWithId(`${ID_PREFIX}C`, pointsForArrowC_OffScreenLeft, defaultArrowLineOptions); 
	}, [addArrowLineWithId]);

	const handleCreateArrowX = useCallback(() => {
		console.log(`%c--- Button Clicked: Create ARROW_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, createPoints(baseTimestamp + 1 * day, 185, baseTimestamp + 4 * day, 165), arrowX_InitialOptions, 'ARROW_X');
	}, [lineToolsApi]);

	const handleUpdateArrowX = useCallback(() => {
		console.log(`%c--- Button Clicked: Update ARROW_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, createPoints(baseTimestamp + 1 * day, 195, baseTimestamp + 4 * day, 175), arrowX_UpdatedOptions, 'ARROW_X');
	}, [lineToolsApi]);

	const handleRemoveArrowX = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove ARROW_X by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsById(['ARROW_X']);
	}, [lineToolsApi]);

	const handleRemoveArrowRegex = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Programmatic Arrow Lines (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsByIdRegex(new RegExp(`^${ID_PREFIX}.*$`));
	}, [lineToolsApi]);

	// ------------------------------------------------------------------
	// --- Automated Test Surface Generation ---
	// ------------------------------------------------------------------
	
	// Hook to generate the comprehensive list of single-override test cases
	const automatedTestCases = useToolTestCases(
		TOOL_TYPE,
		ArrowOptionDefaults,
		ArrowUniversalTestConfig,
		ArrowContextualOverrides,
		PROPERTIES_TO_FORCE_TEST
	);

	const handleGenerateAllTests = useCallback(() => {
		if (!lineToolsApi) return;
 
		console.log(`%c--- Button Clicked: Generating ${automatedTestCases.length} Automated Test Cases for Arrow Line ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
 
		// 1. Loop through all generated test cases and programmatically add them
		automatedTestCases.forEach((testCase, index) => {
			const toolId = `AR_TEST_${index + 1}`;
 
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
		handleAddArrowA,
		handleAddArrowB,
		handleAddArrowC_OffScreen,
		handleCreateArrowX,
		handleUpdateArrowX,
 
		// automated testing
		handleGenerateAllTests,

		// Removal Handlers
		handleRemoveArrowX,
		handleRemoveArrowRegex,
	}), [
		// Interactive
		handleSetActiveDefault, handleSetActiveExotic, handleAddInteractiveDefault,
		// Programmatic
		handleAddArrowA, handleAddArrowB, handleAddArrowC_OffScreen, handleCreateArrowX, handleUpdateArrowX,
		// Removal
		handleRemoveArrowX, handleRemoveArrowRegex,
		// automated testing
		handleGenerateAllTests,
	]);
};
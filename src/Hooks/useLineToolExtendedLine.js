// /src/Hooks/useLineToolExtendedLine.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

// Import data specific to the ExtendedLine tool
import {
	defaultExtendedLineOptions,
	exoticExtendedLineOptions,
	extendedX_InitialOptions,
	extendedX_UpdatedOptions,
	pointsForExtendedA,
	pointsForExtendedB,
	pointsForExtendedC_OffScreenLeft,
} from '../Data/ExtendedLineToolData';

// Import necessary data helpers
import { baseTimestamp, day, hour, createPoints } from '../Data/RectangleToolData'; 
import { useToolTestCases } from './useToolTestSurfaceGenerator';
import { ExtendedLineOptionDefaults, ExtendedLineUniversalTestConfig, ExtendedLineContextualOverrides, PROPERTIES_TO_FORCE_TEST } from '../TestConfig/ExtendedLineTestConfig';

const TOOL_TYPE = 'ExtendedLine';
const ID_PREFIX = 'EXTENDED_PROG_';

// --- Custom Placement Configuration for Automated Tests ---
const extendedLinePlacementConfig = {
	MAX_TESTS_PER_COL: 200,
	PRICE_STEP: 10,
};

/**
 * Custom hook to manage all handlers and logic for the ExtendedLine Tool.
 * This encapsulates its functionality, making it ready for integration.
 */
export const useLineToolExtendedLine = (lineToolsApi) => {

	// --- Internal Helper for Programmatic Addition (Programmatic buttons need this wrapper) ---
	const addExtendedLineWithId = useCallback((id, points, options) => {
		console.log(`%c--- Button Clicked: Create ExtendedLine (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');

		// Create a deep copy of the provided options object before passing it to the API.
		const optionsCopy = deepCopy(options);

		// USE createOrUpdateLineTool TO FORCE THE ID (Handles programmatic creation)
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, points, optionsCopy, id); 

		console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
		return id; // Return the ID that was used
	}, [lineToolsApi]);


	// --- Handlers for Interactive Drawing Panel ---

	const handleSetActiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Default ExtendedLine (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(defaultExtendedLineOptions));
	}, [lineToolsApi]);

	const handleSetActiveExotic = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Exotic ExtendedLine (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(exoticExtendedLineOptions));
	}, [lineToolsApi]);

	const handleAddInteractiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Add ExtendedLine (addLineTool: Default) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool(TOOL_TYPE);
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	// --- Handlers for Programmatic Creation Panel ---

	const handleAddExtendedA = useCallback(() => {
		addExtendedLineWithId(`${ID_PREFIX}A`, pointsForExtendedA, defaultExtendedLineOptions);
	}, [addExtendedLineWithId]);

	const handleAddExtendedB = useCallback(() => {
		addExtendedLineWithId(`${ID_PREFIX}B`, pointsForExtendedB, exoticExtendedLineOptions);
	}, [addExtendedLineWithId]);

	const handleAddExtendedC_OffScreen = useCallback(() => {
		// Test Culling Logic (Off-screen left, but should render because it extends left)
		addExtendedLineWithId(`${ID_PREFIX}C`, pointsForExtendedC_OffScreenLeft, defaultExtendedLineOptions); 
	}, [addExtendedLineWithId]);

	const handleCreateExtendedX = useCallback(() => {
		console.log(`%c--- Button Clicked: Create EXTENDED_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, createPoints(baseTimestamp + 1 * day, 185, baseTimestamp + 4 * day, 165), extendedX_InitialOptions, 'EXTENDED_X');
	}, [lineToolsApi]);

	const handleUpdateExtendedX = useCallback(() => {
		console.log(`%c--- Button Clicked: Update EXTENDED_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, createPoints(baseTimestamp + 1 * day, 195, baseTimestamp + 4 * day, 175), extendedX_UpdatedOptions, 'EXTENDED_X');
	}, [lineToolsApi]);

	const handleRemoveExtendedX = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove EXTENDED_X by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsById(['EXTENDED_X']);
	}, [lineToolsApi]);

	const handleRemoveExtendedRegex = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Programmatic Extended Lines (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsByIdRegex(new RegExp(`^${ID_PREFIX}.*$`));
	}, [lineToolsApi]);

	// ------------------------------------------------------------------
	// --- Automated Test Surface Generation ---
	// ------------------------------------------------------------------
	
	// Hook to generate the comprehensive list of single-override test cases
	const automatedTestCases = useToolTestCases(
		TOOL_TYPE,
		ExtendedLineOptionDefaults,
		ExtendedLineUniversalTestConfig,
		ExtendedLineContextualOverrides,
		PROPERTIES_TO_FORCE_TEST,
		extendedLinePlacementConfig,
	);

	const handleGenerateAllTests = useCallback(() => {
		if (!lineToolsApi) return;
 
		console.log(`%c--- Button Clicked: Generating ${automatedTestCases.length} Automated Test Cases for ExtendedLine ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
 
		// 1. Optional: Clear all existing tools for a clean slate
		// lineToolsApi.removeAllLineTools(); 

		// 2. Loop through all generated test cases and programmatically add them
		automatedTestCases.forEach((testCase, index) => {
			const toolId = `EL_TEST_${index + 1}`;
 
		// The options object already contains the correct text.value from the generator logic.
		// We just need a copy to pass to the API.
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
		handleAddExtendedA,
		handleAddExtendedB,
		handleAddExtendedC_OffScreen,
		handleCreateExtendedX,
		handleUpdateExtendedX,
 
		// automated testing
		handleGenerateAllTests,

		// Removal Handlers
		handleRemoveExtendedX,
		handleRemoveExtendedRegex,
	}), [
		// Interactive
		handleSetActiveDefault, handleSetActiveExotic, handleAddInteractiveDefault,
		// Programmatic
		handleAddExtendedA, handleAddExtendedB, handleAddExtendedC_OffScreen, handleCreateExtendedX, handleUpdateExtendedX,
		// Removal
		handleRemoveExtendedX, handleRemoveExtendedRegex,
		// automated testing
		handleGenerateAllTests,
	]);
};
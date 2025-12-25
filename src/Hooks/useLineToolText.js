// /src/Hooks/useLineToolText.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

// Import data specific to the Text tool
import {
	defaultTextOptions,
	exoticTextOptions,
	pointsForTextA,
	pointsForTextB,
	pointsForTextC_OffScreenTop,
	textX_InitialOptions,
	textX_UpdatedOptions,
} from '../Data/TextToolData';

// Import necessary data helpers
import { baseTimestamp, day, createPoints } from '../Data/RectangleToolData'; 
import { useToolTestCases } from './useToolTestSurfaceGenerator';
import { TextOptionDefaults, TextUniversalTestConfig, TextContextualOverrides, PROPERTIES_TO_FORCE_TEST } from '../TestConfig/TextTestConfig';

const TOOL_TYPE = 'Text';
const ID_PREFIX = 'TX_PROG_';

// --- Custom Placement Configuration for Automated Tests ---
const textPlacementConfig = {
	// Text tool placement strategy
	PRICE_STEP: 30, // Large step because text boxes are large
	VERTICAL_POINTS_BETWEEN_POINTS: 0, 
	LINE_LENGTH: 0, 
	COLUMN_GAP: 6,
	MAX_TESTS_PER_COL: 15,
};



/**
 * Custom hook to manage all handlers and logic for the Text Tool.
 * This encapsulates its functionality, making it ready for integration.
 */
export const useLineToolText = (lineToolsApi) => {

	// --- Internal Helper for Programmatic Addition (Programmatic buttons need this wrapper) ---
	const addTextWithId = useCallback((id, points, options) => {
		console.log(`%c--- Button Clicked: Create Text Tool (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
 
		// Create a deep copy of the provided options object before passing it to the API.
		const optionsCopy = deepCopy(options);
 
		// USE createOrUpdateLineTool TO FORCE THE ID (Handles programmatic creation)
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, points, optionsCopy, id); 

		console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
		return id; // Return the ID that was used
	}, [lineToolsApi]);


	// --- Handlers for Interactive Drawing Panel ---

	const handleSetActiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Default Text Tool (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(defaultTextOptions));
	}, [lineToolsApi]);

	const handleSetActiveExotic = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Exotic Text Tool (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(exoticTextOptions));
	}, [lineToolsApi]);

	const handleAddInteractiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Text Tool (addLineTool: Default) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool(TOOL_TYPE);
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	// --- Handlers for Programmatic Creation Panel ---

	const handleAddTextA = useCallback(() => {
		addTextWithId(`${ID_PREFIX}A`, pointsForTextA, defaultTextOptions);
	}, [addTextWithId]);

	const handleAddTextB = useCallback(() => {
		addTextWithId(`${ID_PREFIX}B`, pointsForTextB, exoticTextOptions);
	}, [addTextWithId]);

	const handleAddTextC_OffScreen = useCallback(() => {
		// Test Culling Logic (Off-screen Top)
		addTextWithId(`${ID_PREFIX}C`, pointsForTextC_OffScreenTop, defaultTextOptions); 
	}, [addTextWithId]);

	const handleCreateTextX = useCallback(() => {
		console.log(`%c--- Button Clicked: Create TX_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, createPoints(baseTimestamp + 15 * day, 175), textX_InitialOptions, 'TX_X');
	}, [lineToolsApi]);

	const handleUpdateTextX = useCallback(() => {
		console.log(`%c--- Button Clicked: Update TX_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, createPoints(baseTimestamp + 20 * day, 195), textX_UpdatedOptions, 'TX_X');
	}, [lineToolsApi]);

	const handleRemoveTextX = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove TX_X by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsById(['TX_X']);
	}, [lineToolsApi]);

	const handleRemoveTextRegex = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Programmatic Text Tools (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsByIdRegex(new RegExp(`^${ID_PREFIX}.*$`));
	}, [lineToolsApi]);

	// ------------------------------------------------------------------
	// --- Automated Test Surface Generation ---
	// ------------------------------------------------------------------
	
	// Hook to generate the comprehensive list of single-override test cases
	const automatedTestCases = useToolTestCases(
		TOOL_TYPE,
		TextOptionDefaults,
		TextUniversalTestConfig,
		TextContextualOverrides,
		PROPERTIES_TO_FORCE_TEST,
		textPlacementConfig,
		{ strategy: 'OnePoint' } // Single point tool
	);

	const handleGenerateAllTests = useCallback(() => {
		if (!lineToolsApi) return;
 
		console.log(`%c--- Button Clicked: Generating ${automatedTestCases.length} Automated Test Cases for Text Tool ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
 
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
		handleAddTextA,
		handleAddTextB,
		handleAddTextC_OffScreen,
		handleCreateTextX,
		handleUpdateTextX,
 
		// automated testing
		handleGenerateAllTests,

		// Removal Handlers
		handleRemoveTextX,
		handleRemoveTextRegex,
	}), [
		// Interactive
		handleSetActiveDefault, handleSetActiveExotic, handleAddInteractiveDefault,
		// Programmatic
		handleAddTextA, handleAddTextB, handleAddTextC_OffScreen, handleCreateTextX, handleUpdateTextX,
		// Removal
		handleRemoveTextX, handleRemoveTextRegex,
		// automated testing
		handleGenerateAllTests,
	]);
};
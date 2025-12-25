// /src/Hooks/useLineToolParallelChannel.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

// Import data specific to the ParallelChannel tool
import {
	defaultParallelChannelOptions,
	exoticParallelChannelOptions,
	pointsForChannelA,
	pointsForChannelB,
	pointsForChannelC_OffScreenTop,
	channelX_InitialOptions,
	channelX_UpdatedOptions,
	MASTER_PATH_3_POINT,
} from '../Data/ParallelChannelToolData';

// Import necessary data helpers
import { baseTimestamp, day, createPoints } from '../Data/RectangleToolData'; 
import { useToolTestCases } from './useToolTestSurfaceGenerator';
import { ParallelChannelOptionDefaults, ParallelChannelUniversalTestConfig, ParallelChannelContextualOverrides, PROPERTIES_TO_FORCE_TEST } from '../TestConfig/ParallelChannelTestConfig';

const TOOL_TYPE = 'ParallelChannel';
const ID_PREFIX = 'PCH_PROG_';

// --- Custom Placement Configuration for Automated Tests ---
const channelPlacementConfig = {
	// 3-point tool placement strategy
	PRICE_STEP: 30, // Large step due to tool height
	VERTICAL_POINTS_BETWEEN_POINTS: 10, 
	LINE_LENGTH: 5, 
	COLUMN_GAP: 3,
	MAX_TESTS_PER_COL: 10, // Fewer tools per column
};

// --- Point Generation Strategy Configuration ---
const channelPointStrategyConfig = {
	strategy: 'CannedPath', // Use the CannedPath strategy
	path: MASTER_PATH_3_POINT, // The predefined 3-point path
};



/**
 * Custom hook to manage all handlers and logic for the ParallelChannel Tool.
 * This encapsulates its functionality, making it ready for integration.
 */
export const useLineToolParallelChannel = (lineToolsApi) => {

	// --- Internal Helper for Programmatic Addition (Programmatic buttons need this wrapper) ---
	const addChannelWithId = useCallback((id, points, options) => {
		console.log(`%c--- Button Clicked: Create Parallel Channel (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
 
		// Create a deep copy of the provided options object before passing it to the API.
		const optionsCopy = deepCopy(options);
 
		// USE createOrUpdateLineTool TO FORCE THE ID (Handles programmatic creation)
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, points, optionsCopy, id); 

		console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
		return id; // Return the ID that was used
	}, [lineToolsApi]);


	// --- Handlers for Interactive Drawing Panel ---

	const handleSetActiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Default Parallel Channel (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(defaultParallelChannelOptions));
	}, [lineToolsApi]);

	const handleSetActiveExotic = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Exotic Parallel Channel (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(exoticParallelChannelOptions));
	}, [lineToolsApi]);

	const handleAddInteractiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Parallel Channel (addLineTool: Default) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool(TOOL_TYPE);
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	// --- Handlers for Programmatic Creation Panel ---

	const handleAddChannelA = useCallback(() => {
		addChannelWithId(`${ID_PREFIX}A`, pointsForChannelA, defaultParallelChannelOptions);
	}, [addChannelWithId]);

	const handleAddChannelB = useCallback(() => {
		addChannelWithId(`${ID_PREFIX}B`, pointsForChannelB, exoticParallelChannelOptions);
	}, [addChannelWithId]);

	const handleAddChannelC_OffScreen = useCallback(() => {
		// Test Culling Logic (Off-screen Top)
		addChannelWithId(`${ID_PREFIX}C`, pointsForChannelC_OffScreenTop, defaultParallelChannelOptions); 
	}, [addChannelWithId]);

	const handleCreateChannelX = useCallback(() => {
		console.log(`%c--- Button Clicked: Create PCH_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, pointsForChannelA, channelX_InitialOptions, 'PCH_X');
	}, [lineToolsApi]);

	const handleUpdateChannelX = useCallback(() => {
		console.log(`%c--- Button Clicked: Update PCH_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, pointsForChannelB, channelX_UpdatedOptions, 'PCH_X');
	}, [lineToolsApi]);

	const handleRemoveChannelX = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove PCH_X by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsById(['PCH_X']);
	}, [lineToolsApi]);

	const handleRemoveChannelRegex = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Programmatic Parallel Channels (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsByIdRegex(new RegExp(`^${ID_PREFIX}.*$`));
	}, [lineToolsApi]);

	// ------------------------------------------------------------------
	// --- Automated Test Surface Generation ---
	// ------------------------------------------------------------------
	
	// Hook to generate the comprehensive list of single-override test cases
	const automatedTestCases = useToolTestCases(
		TOOL_TYPE,
		ParallelChannelOptionDefaults,
		ParallelChannelUniversalTestConfig,
		ParallelChannelContextualOverrides,
		PROPERTIES_TO_FORCE_TEST,
		channelPlacementConfig,
		channelPointStrategyConfig, // Pass the 3-point canned path strategy
		null,
		{ targetPointIndex: 0, offsetTimeUnits: 0, offsetPriceUnits: 12 }
	);

	const handleGenerateAllTests = useCallback(() => {
		if (!lineToolsApi) return;
 
		console.log(`%c--- Button Clicked: Generating ${automatedTestCases.length} Automated Test Cases for Parallel Channel ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
 
		// 1. Loop through all generated test cases and programmatically add them
		automatedTestCases.forEach((testCase, index) => {
			const toolId = `${ID_PREFIX}TEST_${index + 1}`;
			const labelToolId = `${toolId}_LABEL`;
 
			const optionsToUse = deepCopy(testCase.options);
 
			lineToolsApi.createOrUpdateLineTool(
				testCase.toolType, 
				testCase.points, 
				optionsToUse, 
				toolId
			);

			// --- 2. Create Auxiliary Label Tool (Text Primitive) ---
			const labelText = testCase.auxiliaryLabel.label;
			const labelPoint = testCase.auxiliaryLabel.point;
 
			const finalLabelOptions = {
				text: {
					value: labelText,
					box: {
						alignment: { horizontal: 'left', vertical: 'bottom' },
						background: { color: 'rgba(255, 255, 255, 0.9)' },
					}
				}
			};
 
			lineToolsApi.createOrUpdateLineTool(
				'Text',
				[labelPoint],
				finalLabelOptions,
				labelToolId
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
		handleAddChannelA,
		handleAddChannelB,
		handleAddChannelC_OffScreen,
		handleCreateChannelX,
		handleUpdateChannelX,
 
		// automated testing
		handleGenerateAllTests,

		// Removal Handlers
		handleRemoveChannelX,
		handleRemoveChannelRegex,
	}), [
		// Interactive
		handleSetActiveDefault, handleSetActiveExotic, handleAddInteractiveDefault,
		// Programmatic
		handleAddChannelA, handleAddChannelB, handleAddChannelC_OffScreen, handleCreateChannelX, handleUpdateChannelX,
		// Removal
		handleRemoveChannelX, handleRemoveChannelRegex,
		// automated testing
		handleGenerateAllTests,
	]);
};
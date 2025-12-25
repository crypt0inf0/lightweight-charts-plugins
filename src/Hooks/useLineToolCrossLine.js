// /src/Hooks/useLineToolCrossLine.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

// Import data specific to the CrossLine tool
import {
	defaultCrossLineOptions,
	exoticCrossLineOptions,
	pointsForCrossLineA,
	pointsForCrossLineB,
	pointsForCrossLineC_OffScreenTop,
	crossLineX_InitialOptions,
	crossLineX_UpdatedOptions,
} from '../Data/CrossLineToolData';

// Import necessary data helpers
import { baseTimestamp, day, createPoints } from '../Data/RectangleToolData'; 
import { useToolTestCases } from './useToolTestSurfaceGenerator';
import { CrossLineOptionDefaults, CrossLineUniversalTestConfig, CrossLineContextualOverrides, PROPERTIES_TO_FORCE_TEST } from '../TestConfig/CrossLineTestConfig';

const TOOL_TYPE = 'CrossLine';
const ID_PREFIX = 'CL_PROG_';

// --- Custom Placement Configuration for Automated Tests ---
const crossLinePlacementConfig = {
	// 1-point tool placement strategy
	PRICE_STEP: 15, 
	VERTICAL_POINTS_BETWEEN_POINTS: 10, // Not applicable
	LINE_LENGTH: 0, // Not applicable
	COLUMN_GAP: 3,
	MAX_TESTS_PER_COL: 1,
	START_BAR_INDEX: -10,
	resetPriceOnColumnWrap: false,
};



/**
 * Custom hook to manage all handlers and logic for the CrossLine Tool.
 * This encapsulates its functionality, making it ready for integration.
 */
export const useLineToolCrossLine = (lineToolsApi) => {

	// --- Internal Helper for Programmatic Addition (Programmatic buttons need this wrapper) ---
	const addCrossLineWithId = useCallback((id, points, options) => {
		console.log(`%c--- Button Clicked: Create Cross Line (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
 
		// Create a deep copy of the provided options object before passing it to the API.
		const optionsCopy = deepCopy(options);
 
		// USE createOrUpdateLineTool TO FORCE THE ID (Handles programmatic creation)
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, points, optionsCopy, id); 

		console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
		return id; // Return the ID that was used
	}, [lineToolsApi]);


	// --- Handlers for Interactive Drawing Panel ---

	const handleSetActiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Default Cross Line (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(defaultCrossLineOptions));
	}, [lineToolsApi]);

	const handleSetActiveExotic = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Exotic Cross Line (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(exoticCrossLineOptions));
	}, [lineToolsApi]);

	const handleAddInteractiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Cross Line (addLineTool: Default) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool(TOOL_TYPE);
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	// --- Handlers for Programmatic Creation Panel ---

	const handleAddCrossLineA = useCallback(() => {
		addCrossLineWithId(`${ID_PREFIX}A`, pointsForCrossLineA, defaultCrossLineOptions);
	}, [addCrossLineWithId]);

	const handleAddCrossLineB = useCallback(() => {
		addCrossLineWithId(`${ID_PREFIX}B`, pointsForCrossLineB, exoticCrossLineOptions);
	}, [addCrossLineWithId]);

	const handleAddCrossLineC_OffScreen = useCallback(() => {
		// Test Culling Logic (Off-screen Top)
		addCrossLineWithId(`${ID_PREFIX}C`, pointsForCrossLineC_OffScreenTop, defaultCrossLineOptions); 
	}, [addCrossLineWithId]);

	const handleCreateCrossLineX = useCallback(() => {
		console.log(`%c--- Button Clicked: Create CL_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, createPoints(baseTimestamp + 15 * day, 175), crossLineX_InitialOptions, 'CL_X');
	}, [lineToolsApi]);

	const handleUpdateCrossLineX = useCallback(() => {
		console.log(`%c--- Button Clicked: Update CL_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, createPoints(baseTimestamp + 20 * day, 195), crossLineX_UpdatedOptions, 'CL_X');
	}, [lineToolsApi]);

	const handleRemoveCrossLineX = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove CL_X by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsById(['CL_X']);
	}, [lineToolsApi]);

	const handleRemoveCrossLineRegex = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Programmatic Cross Lines (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsByIdRegex(new RegExp(`^${ID_PREFIX}.*$`));
	}, [lineToolsApi]);

	// ------------------------------------------------------------------
	// --- Automated Test Surface Generation ---
	// ------------------------------------------------------------------
	
	// Hook to generate the comprehensive list of single-override test cases
	const automatedTestCases = useToolTestCases(
		TOOL_TYPE,
		CrossLineOptionDefaults,
		CrossLineUniversalTestConfig,
		CrossLineContextualOverrides, // Empty ContextualOverrides for this tool
		PROPERTIES_TO_FORCE_TEST,
		crossLinePlacementConfig,
		{ strategy: 'OnePoint' },
		null,
		{ targetPointIndex: 0, offsetTimeUnits: 0, offsetPriceUnits: 6 }
	);

	const handleGenerateAllTests = useCallback(() => {
		if (!lineToolsApi) return;
 
		console.log(`%c--- Button Clicked: Generating ${automatedTestCases.length} Automated Test Cases for Cross Line ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
 
		// 1. Loop through all generated test cases and programmatically add them
		automatedTestCases.forEach((testCase, index) => {
			const toolId = `${ID_PREFIX}TEST_${index + 1}`;
			const labelToolId = `${toolId}_LABEL`;
 
			const optionsToUse = deepCopy(testCase.options);
			
			// CrossLine does not have a text option, so we remove the text block 
			// before passing it to the API, even if the generator put it there for labeling.
			if (optionsToUse.text) {
				optionsToUse.text = undefined;
			}
 
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
		handleAddCrossLineA,
		handleAddCrossLineB,
		handleAddCrossLineC_OffScreen,
		handleCreateCrossLineX,
		handleUpdateCrossLineX,
 
		// automated testing
		handleGenerateAllTests,

		// Removal Handlers
		handleRemoveCrossLineX,
		handleRemoveCrossLineRegex,
	}), [
		// Interactive
		handleSetActiveDefault, handleSetActiveExotic, handleAddInteractiveDefault,
		// Programmatic
		handleAddCrossLineA, handleAddCrossLineB, handleAddCrossLineC_OffScreen, handleCreateCrossLineX, handleUpdateCrossLineX,
		// Removal
		handleRemoveCrossLineX, handleRemoveCrossLineRegex,
		// automated testing
		handleGenerateAllTests,
	]);
};
// lightweight-charts-line-tool-freehand/src/Hooks/useLineToolHighlighter.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

// Import data specific to the Highlighter tool
import {
	defaultHighlighterOptions,
	pointsForHighlighterA,
	pointsForHighlighterB,
} from '../Data/HighlighterToolData';

// Import helpers from the existing structure
import { createPoints, baseTimestamp, day } from '../Data/RectangleToolData'; 
import { useToolTestCases } from './useToolTestSurfaceGenerator';
import { HighlighterUniversalTestConfig, HighlighterContextualOverrides, PROPERTIES_TO_FORCE_TEST, HighlighterPointStrategyConfig } from '../TestConfig/HighlighterTestConfig';


// --- Helper Constants for Programmatic Tests ---
const HIGHLIGHTER_ID_X = 'HIGHLIGHTER_X';
const TOOL_TYPE = 'Highlighter';


// --- Custom Placement Configuration for the Circle Tool ---
const highlighterPlacementConfig = {
    // These values are increased to prevent large circles from overlapping with each other
    PRICE_STEP: 15, 
    VERTICAL_POINTS_BETWEEN_POINTS: 8,
    LINE_LENGTH: 1, // Increase horizontal line length in test data
    COLUMN_GAP: 8,
};

/**
 * Custom hook to manage all handlers and logic for the Highlighter Line Tool.
 */
export const useLineToolHighlighter = (lineToolsApi) => {

	// --- Internal Helper for Programmatic Addition ---
	const addHighlighterWithId = useCallback((id, points, options) => {
		console.log(`%c--- Button Clicked: Create Highlighter (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
 
		const optionsCopy = deepCopy(options);
 
		// USE createOrUpdateLineTool TO FORCE THE ID 
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, points, optionsCopy, id); 

		console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
		return id;
	}, [lineToolsApi]);


	// --- Handlers for Interactive Drawing Panel ---

	const handleSetActiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Default Highlighter (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(defaultHighlighterOptions));
	}, [lineToolsApi]);

	const handleAddInteractiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Highlighter (addLineTool: Default) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool(TOOL_TYPE);
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);

	const handleAddInteractiveCustom = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Highlighter (addLineTool: Custom) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		// Example Custom Options: Thinner red translucent line
		const customOptions = deepCopy(defaultHighlighterOptions);
		customOptions.line.width = 10;
		customOptions.line.color = 'rgba(255, 0, 0, 0.3)';

		const id = lineToolsApi.addLineTool(TOOL_TYPE, [], customOptions); 
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	// --- Handlers for Programmatic Creation Panel ---

	const handleAddHighlighterA = useCallback(() => {
		addHighlighterWithId('HL_PROG_A', pointsForHighlighterA, deepCopy(defaultHighlighterOptions));
	}, [addHighlighterWithId]);

	const handleAddHighlighterB = useCallback(() => {
		// Create a custom B tool with a different color/thickness
		const customOptions = deepCopy(defaultHighlighterOptions);
		customOptions.line.width = 5;
		customOptions.line.color = 'rgba(0, 255, 0, 0.5)';

		addHighlighterWithId('HL_PROG_B', pointsForHighlighterB, customOptions);
	}, [addHighlighterWithId]);
	
	const handleCreateHighlighterX = useCallback(() => {
		console.log(`%c--- Button Clicked: Create ${HIGHLIGHTER_ID_X} ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		// Use a short, simple path for initial creation
		lineToolsApi.createOrUpdateLineTool(
			TOOL_TYPE,
			[
				createPoints(baseTimestamp + 1 * day, 180)[0],
				createPoints(baseTimestamp + 2 * day, 170)[0],
				createPoints(baseTimestamp + 3 * day, 160)[0],
			],
			deepCopy(defaultHighlighterOptions),
			HIGHLIGHTER_ID_X
		);
	}, [lineToolsApi]);

	const handleUpdateHighlighterX = useCallback(() => {
		console.log(`%c--- Button Clicked: Update ${HIGHLIGHTER_ID_X} ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		// Update with a longer path and different style
		const customOptions = deepCopy(defaultHighlighterOptions);
		customOptions.line.width = 3;
		customOptions.line.color = 'rgba(0, 0, 255, 0.8)';
		
		lineToolsApi.createOrUpdateLineTool(
			TOOL_TYPE,
			[
				createPoints(baseTimestamp + 1 * day, 190)[0],
				createPoints(baseTimestamp + 2 * day, 195)[0],
				createPoints(baseTimestamp + 3 * day, 185)[0],
				createPoints(baseTimestamp + 4 * day, 190)[0],
				createPoints(baseTimestamp + 5 * day, 180)[0],
			],
			customOptions,
			HIGHLIGHTER_ID_X
		);
	}, [lineToolsApi]);


	const handleRemoveHighlighterX = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove ${HIGHLIGHTER_ID_X} by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsById([HIGHLIGHTER_ID_X]);
	}, [lineToolsApi]);

	const handleRemoveHighlightersRegex = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Programmatic Highlighters (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsByIdRegex(/^HL_PROG_.*$/);
	}, [lineToolsApi]);

	// --- Automated Test Surface Generation ---
	const automatedTestCases = useToolTestCases(
		TOOL_TYPE,
		deepCopy(defaultHighlighterOptions), // Master Defaults
		HighlighterUniversalTestConfig,
		HighlighterContextualOverrides,
		PROPERTIES_TO_FORCE_TEST,
		highlighterPlacementConfig,
		HighlighterPointStrategyConfig, // Pass the strategy config
		null,
		{ targetPointIndex: 0, offsetTimeUnits: 0, offsetPriceUnits: 0 }
	);

	const handleGenerateAllTests = useCallback(() => {
		if (!lineToolsApi) return;
	 
		console.log(`%c--- Button Clicked: Generating ${automatedTestCases.length} Automated Test Cases for Highlighter ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
	 
		automatedTestCases.forEach((testCase, index) => {
			const toolId = `HL_TEST_${index + 1}`;
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
		handleAddInteractiveDefault,
		handleAddInteractiveCustom,
 
		// Programmatic Handlers
		handleAddHighlighterA,
		handleAddHighlighterB,
		handleCreateHighlighterX,
		handleUpdateHighlighterX,

		// Removal Handlers
		handleRemoveHighlighterX,
		handleRemoveHighlightersRegex,

		// Automated Testing Handler
  	handleGenerateAllTests,

	}), [
		// Interactive
		handleSetActiveDefault, handleAddInteractiveDefault, handleAddInteractiveCustom,
		// Programmatic
		handleAddHighlighterA, handleAddHighlighterB, handleCreateHighlighterX, handleUpdateHighlighterX,
		// Removal
		handleRemoveHighlighterX, handleRemoveHighlightersRegex,
		// Automated Testing Handler
  	handleGenerateAllTests,
	]);
};
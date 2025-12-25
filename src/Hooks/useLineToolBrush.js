// lightweight-charts-line-tool-freehand/src/Hooks/useLineToolBrush.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

// Import data specific to the Brush tool
import {
	defaultBrushOptions, // Default options
	defaultHighlighterOptions, // A custom option set to show styling difference
	pointsForBrushA, // Example programmatic path
	pointsForBrushB, // Example programmatic path
	MASTER_BRUSH_PATH,
} from '../Data/BrushToolData';

// Import helpers from the existing structure
import { createPoints, baseTimestamp, day } from '../Data/RectangleToolData'; 
import { useToolTestCases } from './useToolTestSurfaceGenerator';
import { BrushUniversalTestConfig, BrushContextualOverrides, PROPERTIES_TO_FORCE_TEST, BrushPointStrategyConfig } from '../TestConfig/BrushTestConfig';


// --- Helper Constants for Programmatic Tests ---
const BRUSH_ID_X = 'BRUSH_X';

// --- Custom Placement Configuration for the Circle Tool ---
const brushPlacementConfig = {
    // These values are increased to prevent large circles from overlapping with each other
    PRICE_STEP: 15, 
    VERTICAL_POINTS_BETWEEN_POINTS: 8,
    LINE_LENGTH: 1, // Increase horizontal line length in test data
    COLUMN_GAP: 8,
};


/**
 * Custom hook to manage all handlers and logic for the Brush Line Tool.
 * It provides the necessary functions for the UI component to initiate drawing and programmatic control.
 */
export const useLineToolBrush = (lineToolsApi) => {

	// --- Internal Helper for Programmatic Addition (Programmatic buttons need this wrapper) ---
	const addBrushWithId = useCallback((id, points, options) => {
		console.log(`%c--- Button Clicked: Create Brush (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
 
		// Create a deep copy of the provided options object before passing it to the API.
		const optionsCopy = deepCopy(options);
		const toolType = optionsCopy.toolType || 'Brush';
 
		// USE createOrUpdateLineTool TO FORCE THE ID (Handles programmatic creation)
		lineToolsApi.createOrUpdateLineTool(toolType, points, optionsCopy, id); 

		console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
		return id; // Return the ID that was used
	}, [lineToolsApi]);


	// --- Handlers for Interactive Drawing Panel ---

	const handleSetActiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Default Brush (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool('Brush', [], deepCopy(defaultBrushOptions));
	}, [lineToolsApi]);

	const handleSetActiveHighlighter = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Highlighter Style (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool('Brush', [], deepCopy(defaultHighlighterOptions));
	}, [lineToolsApi]);

	const handleAddInteractiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Brush (addLineTool: Default) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool('Brush'); 
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	const handleAddInteractiveHighlighter = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Brush (addLineTool: Highlighter Style) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool('Brush', [], deepCopy(defaultHighlighterOptions));
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	// --- Handlers for Programmatic Creation Panel ---

	const handleAddBrushA = useCallback(() => {
		addBrushWithId('BRUSH_PROG_A', pointsForBrushA, defaultBrushOptions);
	}, [addBrushWithId]);

	const handleAddBrushB = useCallback(() => {
		addBrushWithId('BRUSH_PROG_B', pointsForBrushB, defaultHighlighterOptions);
	}, [addBrushWithId]);
	
	const handleCreateBrushX = useCallback(() => {
		console.log(`%c--- Button Clicked: Create ${BRUSH_ID_X} ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		// Use a short, simple path for initial creation
		lineToolsApi.createOrUpdateLineTool(
			'Brush',
			[
				createPoints(baseTimestamp + 1 * day, 180)[0],
				createPoints(baseTimestamp + 2 * day, 170)[0],
				createPoints(baseTimestamp + 3 * day, 160)[0],
			],
			defaultBrushOptions,
			BRUSH_ID_X
		);
	}, [lineToolsApi]);

	const handleUpdateBrushX = useCallback(() => {
		console.log(`%c--- Button Clicked: Update ${BRUSH_ID_X} ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		// Update with a much longer path and different style
		lineToolsApi.createOrUpdateLineTool(
			'Brush',
			[
				createPoints(baseTimestamp + 1 * day, 190)[0],
				createPoints(baseTimestamp + 2 * day, 195)[0],
				createPoints(baseTimestamp + 3 * day, 185)[0],
				createPoints(baseTimestamp + 4 * day, 190)[0],
				createPoints(baseTimestamp + 5 * day, 180)[0],
			],
			defaultHighlighterOptions,
			BRUSH_ID_X
		);
	}, [lineToolsApi]);


	const handleRemoveBrushX = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove ${BRUSH_ID_X} by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsById([BRUSH_ID_X]);
	}, [lineToolsApi]);

	const handleRemoveBrushesRegex = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Programmatic Brushes (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsByIdRegex(/^BRUSH_PROG_.*$/);
	}, [lineToolsApi]);

	// --- Automated Test Surface Generation ---
	const automatedTestCases = useToolTestCases(
		'Brush',
		defaultBrushOptions, // Master Defaults
		BrushUniversalTestConfig,
		BrushContextualOverrides,
		PROPERTIES_TO_FORCE_TEST,
		brushPlacementConfig,
		BrushPointStrategyConfig, // Pass the strategy config
		null,
		{ targetPointIndex: 0, offsetTimeUnits: 0, offsetPriceUnits: 0 }
	);

	const handleGenerateAllTests = useCallback(() => {
		if (!lineToolsApi) return;
	 
		console.log(`%c--- Button Clicked: Generating ${automatedTestCases.length} Automated Test Cases for Brush ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
	 
		automatedTestCases.forEach((testCase, index) => {
			const toolId = `BRUSH_TEST_${index + 1}`;
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
		handleSetActiveHighlighter,
		handleAddInteractiveDefault,
		handleAddInteractiveHighlighter,
 
		// Programmatic Handlers
		handleAddBrushA,
		handleAddBrushB,
		handleCreateBrushX,
		handleUpdateBrushX,

		// Removal Handlers
		handleRemoveBrushX,
		handleRemoveBrushesRegex,

		// Automated Testing Handler
  	handleGenerateAllTests,

	}), [
		// Interactive
		handleSetActiveDefault, handleSetActiveHighlighter, handleAddInteractiveDefault, handleAddInteractiveHighlighter,
		// Programmatic
		handleAddBrushA, handleAddBrushB, handleCreateBrushX, handleUpdateBrushX,
		// Removal
		handleRemoveBrushX, handleRemoveBrushesRegex,
		// Automated Testing Handler
  	handleGenerateAllTests,
	]);
};
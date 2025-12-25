// File: /src/Hooks/useLineToolCircle.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

// Import data specific to the Circle tool
import {
	defaultCircleOptions,
	blueCircleOptions,
	pointsForCircleA,
	pointsForCircleB,
	pointsForCircleC,
} from '../Data/CircleToolData';
import { createPoints, baseTimestamp, day } from '../Data/RectangleToolData'; // Re-use common data helpers from RectangleData
import { useToolTestCases } from './useToolTestSurfaceGenerator';
import { CircleOptionDefaults, CircleUniversalTestConfig, CircleContextualOverrides, PROPERTIES_TO_FORCE_TEST } from '../TestConfig/CircleTestConfig';


// --- Helper Constants for Programmatic Tests ---
const CIRCLE_ID_X = 'CIRCLE_X';
const CIRCLE_ID_Y = 'CIRCLE_Y';

// --- Custom Placement Configuration for the Circle Tool ---
const circlePlacementConfig = {
    // These values are increased to prevent large circles from overlapping with each other
    PRICE_STEP: 15, 
    VERTICAL_POINTS_BETWEEN_POINTS: 4,
    LINE_LENGTH: 1, // Increase horizontal line length in test data
    COLUMN_GAP: 3,
};


/**
 * Custom hook to manage all handlers and logic for the Circle Line Tool.
 * It provides the necessary functions for the UI component to initiate drawing and programmatic control.
 */
export const useLineToolCircle = (lineToolsApi) => {

	// --- Internal Helper for Programmatic Addition (Programmatic buttons need this wrapper) ---
	const addCircleWithId = useCallback((id, points, options) => {
		console.log(`%c--- Button Clicked: Create Circle (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
 
		// Create a deep copy of the provided options object before passing it to the API.
		const optionsCopy = deepCopy(options);
		const toolType = optionsCopy.toolType || 'Circle';
 
		// USE createOrUpdateLineTool TO FORCE THE ID (Handles programmatic creation)
		lineToolsApi.createOrUpdateLineTool(toolType, points, optionsCopy, id); 

		console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
		return id; // Return the ID that was used
	}, [lineToolsApi]);


	// --- Handlers for Interactive Drawing Panel ---

	const handleSetActiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Default Circle (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool('Circle', [], deepCopy(defaultCircleOptions));
	}, [lineToolsApi]);

	const handleSetActiveBlue = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Blue Circle (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool('Circle', [], deepCopy(blueCircleOptions));
	}, [lineToolsApi]);

	const handleAddInteractiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Circle (addLineTool: Default) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool('Circle');
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	const handleAddInteractiveCustom = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Circle (addLineTool: Custom Options) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool('Circle', [], deepCopy(blueCircleOptions)); 
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	// --- Handlers for Programmatic Creation Panel ---

	const handleAddCircleA = useCallback(() => {
		addCircleWithId('CIRCLE_PROG_A', pointsForCircleA, defaultCircleOptions);
	}, [addCircleWithId]);

	const handleAddCircleB = useCallback(() => {
		addCircleWithId('CIRCLE_PROG_B', pointsForCircleB, blueCircleOptions);
	}, [addCircleWithId]);

	const handleAddCircleC = useCallback(() => {
		addCircleWithId('CIRCLE_PROG_C', pointsForCircleC, defaultCircleOptions);
	}, [addCircleWithId]);
	
	const handleCreateCircleX = useCallback(() => {
		console.log(`%c--- Button Clicked: Create ${CIRCLE_ID_X} ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(
			'Circle',
			createPoints(baseTimestamp + 1 * day, 180, baseTimestamp + 3 * day, 160),
			defaultCircleOptions,
			CIRCLE_ID_X
		);
	}, [lineToolsApi]);

	const handleUpdateCircleX = useCallback(() => {
		console.log(`%c--- Button Clicked: Update ${CIRCLE_ID_X} ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(
			'Circle',
			createPoints(baseTimestamp + 1 * day, 190, baseTimestamp + 4 * day, 110), // Significantly resized
			blueCircleOptions,
			CIRCLE_ID_X
		);
	}, [lineToolsApi]);


	const handleRemoveCircleX = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove ${CIRCLE_ID_X} by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsById([CIRCLE_ID_X]);
	}, [lineToolsApi]);

	const handleRemoveCirclesRegex = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Programmatic Circles (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsByIdRegex(/^CIRCLE_PROG_.*$/);
	}, [lineToolsApi]);

	// --- Automated Test Surface Generation ---
	const automatedTestCases = useToolTestCases(
		'Circle',
		CircleOptionDefaults,
		CircleUniversalTestConfig,
		CircleContextualOverrides,
		PROPERTIES_TO_FORCE_TEST,
		circlePlacementConfig
	);

	const handleGenerateAllTests = useCallback(() => {
		if (!lineToolsApi) return;
	 
		console.log(`%c--- Button Clicked: Generating ${automatedTestCases.length} Automated Test Cases for Circle ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
	 
		automatedTestCases.forEach((testCase, index) => {
			const toolId = `CIRCLE_TEST_${index + 1}`;
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
		handleSetActiveBlue,
		handleAddInteractiveDefault,
		handleAddInteractiveCustom,
 
		// Programmatic Handlers
		handleAddCircleA,
		handleAddCircleB,
		handleAddCircleC,
		handleCreateCircleX,
		handleUpdateCircleX,

		// Removal Handlers
		handleRemoveCircleX,
		handleRemoveCirclesRegex,

		// Automated Testing Handler
    	handleGenerateAllTests,

	}), [
		// Interactive
		handleSetActiveDefault, handleSetActiveBlue, handleAddInteractiveDefault, handleAddInteractiveCustom,
		// Programmatic
		handleAddCircleA, handleAddCircleB, handleAddCircleC, handleCreateCircleX, handleUpdateCircleX,
		// Removal
		handleRemoveCircleX, handleRemoveCirclesRegex,
		// Automated Testing Handler
    	handleGenerateAllTests,
	]);
};
// File: /src/Hooks/useLineToolRectangle.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

// Import data specific to the Rectangle tool
import {
	defaultRectangleOptions,
	redRoundedRectangleOptions,
	greenWordWrappedTextRectangleOptions,
	blueRotatedTextRectangleOptions,
	inflatedTextBoxRectangleOptions,
	pointsForRectA,
	pointsForRectB,
	pointsForRectC,
	pointsForRectD_outside,
	pointsForRectE_far_outside,
	createPoints,
	baseTimestamp,
	day,
	rectX_InitialOptions,
	rectX_UpdatedOptions,
	rectX_NonEditableOptions,
} from '../Data/RectangleToolData';
import { useToolTestCases } from './useToolTestSurfaceGenerator';
import { RectangleOptionDefaults, RectangleUniversalTestConfig, RectangleContextualOverrides, PROPERTIES_TO_FORCE_TEST } from '../TestConfig/RectangleTestConfig';




/**
 * Custom hook to manage all handlers and logic for the Rectangle Line Tool.
 * This ensures clean separation from the main LineToolTestPanel logic.
 */
export const useLineToolRectangle = (lineToolsApi) => {

	// --- Internal Helper for Programmatic Addition (Programmatic buttons need this wrapper) ---
	const addRectangleWithId = useCallback((id, points, options) => {
		console.log(`%c--- Button Clicked: Create Rectangle (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
 
		// Create a deep copy of the provided options object before passing it to the API.
		const optionsCopy = deepCopy(options);
 
		// USE createOrUpdateLineTool TO FORCE THE ID (Handles programmatic creation)
		lineToolsApi.createOrUpdateLineTool(optionsCopy.toolType, points, optionsCopy, id); 

		console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
		return id; // Return the ID that was used
	}, [lineToolsApi]);


	// --- Handlers for Interactive Drawing Panel ---

	const handleSetActiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Default Rect (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool('Rectangle', [], deepCopy(defaultRectangleOptions));
	}, [lineToolsApi]);

	const handleSetActiveRedRounded = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Red Rounded Rect (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool('Rectangle', [], deepCopy(redRoundedRectangleOptions));
	}, [lineToolsApi]);

	const handleAddInteractiveNoPointsNoOptions = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Rect (Interactive: No Args) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool('Rectangle'); 
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	const handleAddInteractiveEmptyPointsCustomOptions = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Rect (Interactive: Empty Points/Red Rounded Options) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool('Rectangle', [], deepCopy(redRoundedRectangleOptions)); 
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	// --- Handlers for Programmatic Creation Panel ---

	const handleAddRectA = useCallback(() => {
		addRectangleWithId('RECT_PROG_A', pointsForRectA, defaultRectangleOptions);
	}, [addRectangleWithId]);

	const handleAddRectB = useCallback(() => {
		addRectangleWithId('RECT_PROG_B', pointsForRectB, redRoundedRectangleOptions);
	}, [addRectangleWithId]);

	const handleAddRectC = useCallback(() => {
		addRectangleWithId('RECT_PROG_C', pointsForRectC, greenWordWrappedTextRectangleOptions);
	}, [addRectangleWithId]);

	const handleAddRectD_Outside = useCallback(() => {
		addRectangleWithId('RECT_PROG_D', pointsForRectD_outside, blueRotatedTextRectangleOptions);
	}, [addRectangleWithId]);

	const handleAddRectE_FarOutside = useCallback(() => {
		addRectangleWithId('RECT_PROG_E', pointsForRectE_far_outside, inflatedTextBoxRectangleOptions);
	}, [addRectangleWithId]);
	
	const handleCreateRectX = useCallback(() => {
		console.log(`%c--- Button Clicked: Create RECT_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool('Rectangle', createPoints(baseTimestamp + 1 * day, 150, baseTimestamp + 4 * day, 100), rectX_InitialOptions, 'RECT_X');
	}, [lineToolsApi]);

	const handleUpdateRectX = useCallback(() => {
		console.log(`%c--- Button Clicked: Update RECT_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool('Rectangle', createPoints(baseTimestamp + 1 * day, 160, baseTimestamp + 4 * day, 110), rectX_UpdatedOptions, 'RECT_X');
	}, [lineToolsApi]);

	const handleCreateRectY = useCallback(() => {
		console.log(`%c--- Button Clicked: Create RECT_Y (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool('Rectangle', createPoints(baseTimestamp + 6 * day, 130, baseTimestamp + 9 * day, 80), blueRotatedTextRectangleOptions, 'RECT_Y');
	}, [lineToolsApi]);


	// --- Handlers for Retrieval and Modification Panel (Utilizing Core API Handlers) ---
	
	const handleRemoveRectX = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove RECT_X by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsById(['RECT_X']);
	}, [lineToolsApi]);

	const handleRemoveRectsRegex = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Programmatic Rects (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsByIdRegex(/^RECT_PROG_.*$/);
	}, [lineToolsApi]);

	const handleApplyOptionsRectX = useCallback(() => {
		console.log(`%c--- Button Clicked: Apply Options to RECT_X (Make Non-Editable & Deselect) ---`, 'color: #fff; background: #FF9800; padding: 2px 5px;');
		// Full LineToolExport object as per V3.8 expectation for applyLineToolOptions
		const rectXFullExport = JSON.parse(lineToolsApi.getLineToolByID('RECT_X'))[0];
		if (rectXFullExport) {
			// Merge the non-editable options into the full export object
			const updatedRectX = {
				...rectXFullExport,
				options: {
					...rectXFullExport.options,
					...rectX_NonEditableOptions, // This contains editable: false
				},
			};
			lineToolsApi.applyLineToolOptions(updatedRectX);
		} else {
			console.warn("RECT_X not found for applying options.");
		}
	}, [lineToolsApi]);


	// Hook to generate the comprehensive list of single-override test cases
	const automatedTestCases = useToolTestCases(
		'Rectangle',
		RectangleOptionDefaults,
		RectangleUniversalTestConfig,
		RectangleContextualOverrides,
		PROPERTIES_TO_FORCE_TEST
	);
	
	const handleGenerateAllTests = useCallback(() => {
		if (!lineToolsApi) return;
 
		console.log(`%c--- Button Clicked: Generating ${automatedTestCases.length} Automated Test Cases for Rectangle ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
 
		// 1. Reset the placement manager inside the generation logic (handled by useToolTestCases now)
		// 2. Loop through all generated test cases and programmatically add them
		automatedTestCases.forEach((testCase, index) => {
			const toolId = `RECT_TEST_${index + 1}`;
 
			// We need to ensure text.value is preserved if it was set by the generator
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
		handleSetActiveRedRounded,
		handleAddInteractiveNoPointsNoOptions,
		handleAddInteractiveEmptyPointsCustomOptions,
		
		// Programmatic Handlers
		handleAddRectA,
		handleAddRectB,
		handleAddRectC,
		handleAddRectD_Outside,
		handleAddRectE_FarOutside,
		handleCreateRectX,
		handleUpdateRectX,
		handleCreateRectY,

		// Automated Testing Handler
		handleGenerateAllTests,
		
		// Removal/Modification Handlers (using core methods)
		handleRemoveRectX,
		handleRemoveRectsRegex,
		handleApplyOptionsRectX,
	}), [
		// Interactive
		handleSetActiveDefault, handleSetActiveRedRounded, handleAddInteractiveNoPointsNoOptions, handleAddInteractiveEmptyPointsCustomOptions,
		// Programmatic
		handleAddRectA, handleAddRectB, handleAddRectC, handleAddRectD_Outside, handleAddRectE_FarOutside, handleCreateRectX, handleUpdateRectX, handleCreateRectY,
		// Removal/Modification
		handleRemoveRectX, handleRemoveRectsRegex, handleApplyOptionsRectX,
		// automated testing
		handleGenerateAllTests
	]);
};
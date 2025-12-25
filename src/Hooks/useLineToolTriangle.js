// /src/Hooks/useLineToolTriangle.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

// Import data specific to the Triangle tool
import {
	defaultTriangleOptions,
	customTriangleOptions,
	pointsForTriangleA,
	pointsForTriangleB,
} from '../Data/TriangleToolData';

// Import helpers for automated testing
import { useToolTestCases } from './useToolTestSurfaceGenerator';
import { TriangleUniversalTestConfig, TriangleContextualOverrides, PROPERTIES_TO_FORCE_TEST, TrianglePointStrategyConfig } from '../TestConfig/TriangleTestConfig';


// --- Helper Constants for Programmatic Tests ---
const TRIANGLE_ID_X = 'TRIANGLE_X';

// --- Automated Test Configuration ---
// Assuming these are defined similarly to other tools, using a TwoPoint (Segment) logic
const trianglePlacementConfig = {
	PRICE_STEP: 10,
	VERTICAL_POINTS_BETWEEN_POINTS: 8,
	LINE_LENGTH: 5,
	COLUMN_GAP: 5,
};

const trianglePointStrategyConfig = {
	strategy: 'CannedPath', 
	path: pointsForTriangleA, // Use a canned path that is definitively 3 points
};


/**
 * Custom hook to manage all handlers and logic for the Triangle Line Tool.
 * It provides the necessary functions for the UI component to initiate drawing and programmatic control.
 *
 * @param {object} lineToolsApi - The wrapped API object from useLineToolsApi.
 */
export const useLineToolTriangle = (lineToolsApi) => {

	// --- Internal Helper for Programmatic Addition (Programmatic buttons need this wrapper) ---
	const addTriangleWithId = useCallback((id, points, options) => {
		console.log(`%c--- Button Clicked: Create Triangle (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		
		// Create a deep copy of the provided options object before passing it to the API.
		const optionsCopy = deepCopy(options);
		const toolType = optionsCopy.toolType || 'Triangle';
		
		// USE createOrUpdateLineTool TO FORCE THE ID (Handles programmatic creation)
		lineToolsApi.createOrUpdateLineTool(toolType, points, optionsCopy, id); 

		console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
		return id; // Return the ID that was used
	}, [lineToolsApi]);


	// --- Handlers for Interactive Drawing Panel ---

	const handleSetActiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Default Triangle (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool('Triangle', [], deepCopy(defaultTriangleOptions));
	}, [lineToolsApi]);

	const handleSetActiveCustom = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Custom Triangle (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool('Triangle', [], deepCopy(customTriangleOptions));
	}, [lineToolsApi]);

	const handleAddInteractiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Triangle (addLineTool: Default) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool('Triangle', [], {}); // Pass empty array to signal interactive
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	const handleAddInteractiveCustom = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Triangle (addLineTool: Custom Style) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool('Triangle', [], deepCopy(customTriangleOptions)); // Pass empty array and custom options
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	// --- Handlers for Programmatic Creation Panel ---

	const handleAddTriangleA = useCallback(() => {
		addTriangleWithId('TRIANGLE_PROG_A', pointsForTriangleA, defaultTriangleOptions);
	}, [addTriangleWithId]);

	const handleAddTriangleB = useCallback(() => {
		addTriangleWithId('TRIANGLE_PROG_B', pointsForTriangleB, customTriangleOptions);
	}, [addTriangleWithId]);
	
	const handleCreateTriangleX = useCallback(() => {
		console.log(`%c--- Button Clicked: Create ${TRIANGLE_ID_X} ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		// Use a short, simple path for initial creation
		lineToolsApi.createOrUpdateLineTool(
			'Triangle',
			pointsForTriangleA,
			defaultTriangleOptions,
			TRIANGLE_ID_X
		);
	}, [lineToolsApi]);

	const handleUpdateTriangleX = useCallback(() => {
		console.log(`%c--- Button Clicked: Update ${TRIANGLE_ID_X} ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		// Update with the other set of points and a custom style
		lineToolsApi.createOrUpdateLineTool(
			'Triangle',
			pointsForTriangleB,
			customTriangleOptions,
			TRIANGLE_ID_X
		);
	}, [lineToolsApi]);


	const handleRemoveTriangleX = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove ${TRIANGLE_ID_X} by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsById([TRIANGLE_ID_X]);
	}, [lineToolsApi]);

	const handleRemoveTrianglesRegex = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Programmatic Triangles (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsByIdRegex(/^TRIANGLE_PROG_.*$/);
	}, [lineToolsApi]);

	// --- Automated Test Surface Generation ---
	const automatedTestCases = useToolTestCases(
		'Triangle',
		defaultTriangleOptions, // Master Defaults
		TriangleUniversalTestConfig,
		TriangleContextualOverrides,
		PROPERTIES_TO_FORCE_TEST,
		trianglePlacementConfig,
		trianglePointStrategyConfig,
		null,
		{ targetPointIndex: 1, offsetTimeUnits: 0, offsetPriceUnits: 6 }
	);

	const handleGenerateAllTests = useCallback(() => {
		if (!lineToolsApi) return;
	
		console.log(`%c--- Button Clicked: Generating ${automatedTestCases.length} Automated Test Cases for Triangle ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
	
		automatedTestCases.forEach((testCase, index) => {
			const toolId = `TRIANGLE_TEST_${index + 1}`;

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
		handleSetActiveCustom,
		handleAddInteractiveDefault,
		handleAddInteractiveCustom,

		// Programmatic Handlers
		handleAddTriangleA,
		handleAddTriangleB,
		handleCreateTriangleX,
		handleUpdateTriangleX,

		// Removal Handlers
		handleRemoveTriangleX,
		handleRemoveTrianglesRegex,

		// Automated Testing Handler
		handleGenerateAllTests,

	}), [
		// Interactive
		handleSetActiveDefault, handleSetActiveCustom, handleAddInteractiveDefault, handleAddInteractiveCustom,
		// Programmatic
		handleAddTriangleA, handleAddTriangleB, handleCreateTriangleX, handleUpdateTriangleX,
		// Removal
		handleRemoveTriangleX, handleRemoveTrianglesRegex,
		// Automated Testing Handler
		handleGenerateAllTests,
	]);
};
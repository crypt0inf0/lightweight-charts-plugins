// /src/Hooks/useLineToolPath.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

// Import data specific to the Path tool
import {
	defaultPathOptions,
	customPathOptions,
	pointsForPathA,
	pointsForPathB,
	MASTER_PATH,
} from '../Data/PathToolData';

// Import helpers for automated testing
import { useToolTestCases } from './useToolTestSurfaceGenerator';
import { PathUniversalTestConfig, PathContextualOverrides, PROPERTIES_TO_FORCE_TEST, PathPointStrategyConfig } from '../TestConfig/PathTestConfig';


// --- Helper Constants for Programmatic Tests ---
const PATH_ID_X = 'PATH_X';

// --- Automated Test Configuration ---
const pathPlacementConfig = {
	PRICE_STEP: 10, // Increased step for better visibility
	VERTICAL_POINTS_BETWEEN_POINTS: 5,
	LINE_LENGTH: 1, // Increase horizontal line length in test data
	COLUMN_GAP: 8,
};

const pathPointStrategyConfig = {
	strategy: 'CannedPath', // Explicitly use the CannedPath strategy
	path: MASTER_PATH, // The predefined 5-point path
};


/**
 * Custom hook to manage all handlers and logic for the Path Line Tool.
 * It provides the necessary functions for the UI component to initiate drawing and programmatic control.
 *
 * @param {object} lineToolsApi - The wrapped API object from useLineToolsApi.
 */
export const useLineToolPath = (lineToolsApi) => {

	// --- Internal Helper for Programmatic Addition (Programmatic buttons need this wrapper) ---
	const addPathWithId = useCallback((id, points, options) => {
		console.log(`%c--- Button Clicked: Create Path (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		
		// Create a deep copy of the provided options object before passing it to the API.
		const optionsCopy = deepCopy(options);
		const toolType = optionsCopy.toolType || 'Path';
		
		// USE createOrUpdateLineTool TO FORCE THE ID (Handles programmatic creation)
		lineToolsApi.createOrUpdateLineTool(toolType, points, optionsCopy, id);
		
		console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
		return id; // Return the ID that was used
	}, [lineToolsApi]);


	// --- Handlers for Interactive Drawing Panel ---

	const handleSetActiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Default Path (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool('Path', [], deepCopy(defaultPathOptions));
	}, [lineToolsApi]);

	const handleSetActiveCustom = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Custom Path (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool('Path', [], deepCopy(customPathOptions));
	}, [lineToolsApi]);

	const handleAddInteractiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Path (addLineTool: Default) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool('Path', [], deepCopy(defaultPathOptions)); // Pass empty array to signal interactive
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	const handleAddInteractiveCustom = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Path (addLineTool: Custom Style) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool('Path', [], deepCopy(customPathOptions)); // Pass empty array and custom options
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	// --- Handlers for Programmatic Creation Panel ---

	const handleAddPathA = useCallback(() => {
		addPathWithId('PATH_PROG_A', pointsForPathA, defaultPathOptions);
	}, [addPathWithId]);

	const handleAddPathB = useCallback(() => {
		addPathWithId('PATH_PROG_B', pointsForPathB, customPathOptions);
	}, [addPathWithId]);
	
	const handleCreatePathX = useCallback(() => {
		console.log(`%c--- Button Clicked: Create ${PATH_ID_X} ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		// Use a short, simple path for initial creation
		lineToolsApi.createOrUpdateLineTool(
			'Path',
			[
				pointsForPathA[0],
				pointsForPathA[1],
			],
			defaultPathOptions,
			PATH_ID_X
		);
	}, [lineToolsApi]);

	const handleUpdatePathX = useCallback(() => {
		console.log(`%c--- Button Clicked: Update ${PATH_ID_X} ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		// Update with a much longer path and different style
		lineToolsApi.createOrUpdateLineTool(
			'Path',
			[
				pointsForPathB[0],
				pointsForPathB[1],
				pointsForPathB[2],
				pointsForPathB[3],
			],
			customPathOptions,
			PATH_ID_X
		);
	}, [lineToolsApi]);


	const handleRemovePathX = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove ${PATH_ID_X} by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsById([PATH_ID_X]);
	}, [lineToolsApi]);

	const handleRemovePathsRegex = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Programmatic Paths (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsByIdRegex(/^PATH_PROG_.*$/);
	}, [lineToolsApi]);

	// --- Automated Test Surface Generation ---
	const automatedTestCases = useToolTestCases(
		'Path',
		defaultPathOptions, // Master Defaults
		PathUniversalTestConfig,
		PathContextualOverrides,
		PROPERTIES_TO_FORCE_TEST,
		pathPlacementConfig,
		pathPointStrategyConfig,
		null,
		{ targetPointIndex: 0, offsetTimeUnits: 0, offsetPriceUnits: 1 }
	);

	const handleGenerateAllTests = useCallback(() => {
		if (!lineToolsApi) return;
	
		console.log(`%c--- Button Clicked: Generating ${automatedTestCases.length} Automated Test Cases for Path ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
	
		automatedTestCases.forEach((testCase, index) => {
			const toolId = `PATH_TEST_${index + 1}`;
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
		handleAddPathA,
		handleAddPathB,
		handleCreatePathX,
		handleUpdatePathX,

		// Removal Handlers
		handleRemovePathX,
		handleRemovePathsRegex,

		// Automated Testing Handler
		handleGenerateAllTests,

	}), [
		// Interactive
		handleSetActiveDefault, handleSetActiveCustom, handleAddInteractiveDefault, handleAddInteractiveCustom,
		// Programmatic
		handleAddPathA, handleAddPathB, handleCreatePathX, handleUpdatePathX,
		// Removal
		handleRemovePathX, handleRemovePathsRegex,
		// Automated Testing Handler
		handleGenerateAllTests,
	]);
};
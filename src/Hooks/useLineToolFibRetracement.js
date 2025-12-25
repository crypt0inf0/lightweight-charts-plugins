// /src/Hooks/useLineToolFibRetracement.js

import { useCallback, useMemo } from 'react';
import { deepCopy, TextAlignment, BoxVerticalAlignment, BoxHorizontalAlignment } from 'lightweight-charts-line-tools-core';
import { LineStyle } from 'lightweight-charts';

// Import data specific to the FibRetracement tool
import {
	defaultFibOptions,
	exoticFibOptions,
	pointsForFibA,
	pointsForFibB,
	pointsForFibC_OffScreenTop,
	fibX_InitialOptions,
	fibX_UpdatedOptions,
} from '../Data/FibRetracementToolData';

// Import necessary data helpers
import { baseTimestamp, day, createPoints } from '../Data/RectangleToolData'; 
import { useToolTestCases } from './useToolTestSurfaceGenerator';
import { FibRetracementOptionDefaults, FibRetracementUniversalTestConfig, FibRetracementContextualOverrides, PROPERTIES_TO_FORCE_TEST } from '../TestConfig/FibRetracementTestConfig';

const TOOL_TYPE = 'FibRetracement';
const ID_PREFIX = 'FIB_PROG_';

// --- Custom Placement Configuration for Automated Tests ---
const fibPlacementConfig = {
	// 2-point tool placement strategy
	PRICE_STEP: 40, // Large step due to tool height (Fibs can span wide)
	VERTICAL_POINTS_BETWEEN_POINTS: 15, 
	LINE_LENGTH: 10, 
	COLUMN_GAP: 5,
	MAX_TESTS_PER_COL: 5,
	START_PRICE: 250,
	START_BAR_INDEX: -30
};


// Configuration for the Auxiliary Label
const fibLabelConfig = {
	targetPointIndex: 1, // Anchor to P1
	offsetTimeUnits: 0, 
	offsetPriceUnits: 0,
	// Fine-tuning for the text tool's options (Micro-Offset)
	textOptionsOverride: {

		// Specific Text Tool Options
		text: {
			alignment: TextAlignment.Center,
			font: {
				color: "rgba(255, 255, 255, 1)",
				size: 14,
				bold: true,
				family: "Arial"
			},
			box: {
				alignment: {
					vertical: BoxVerticalAlignment.Bottom,
					horizontal: BoxHorizontalAlignment.Center
				},
				angle: 0,
				scale: 1,
				offset: {
					x: 0,
					y: 0
				},
				padding: {
					x: 0,
					y: 0
				},
				maxHeight: 100,
				shadow: {
					blur: 5,
					color: "rgba(0, 0, 0, 0)",
					offset: {
						x: 3,
						y: 3
					}
				},
				border: {
					color: "rgba(255, 255, 255, 1)",
					width: 1,
					radius: 0,
					highlight: false,
					style: LineStyle.Solid
				},
				background: {
					color: "rgba(255, 194, 41, 1)", // Default blue background
					inflation: {
						x: 0,
						y: 0
					}
				}
			},
			padding: 5, // Padding between text lines
			wordWrapWidth: 150,
			forceTextAlign: false,
			forceCalculateMaxLineWidth: false
		},
	},
};

/**
 * Custom hook to manage all handlers and logic for the FibRetracement Tool.
 * This encapsulates its functionality, making it ready for integration.
 */
export const useLineToolFibRetracement = (lineToolsApi) => {

	// --- Internal Helper for Programmatic Addition (Programmatic buttons need this wrapper) ---
	const addFibWithId = useCallback((id, points, options) => {
		console.log(`%c--- Button Clicked: Create Fib Retracement (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
 
		// Create a deep copy of the provided options object before passing it to the API.
		const optionsCopy = deepCopy(options);
 
		// USE createOrUpdateLineTool TO FORCE THE ID (Handles programmatic creation)
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, points, optionsCopy, id); 

		console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
		return id; // Return the ID that was used
	}, [lineToolsApi]);


	// --- Handlers for Interactive Drawing Panel ---

	const handleSetActiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Default Fib (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(defaultFibOptions));
	}, [lineToolsApi]);

	const handleSetActiveExotic = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Exotic Fib (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(exoticFibOptions));
	}, [lineToolsApi]);

	const handleAddInteractiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Fib Retracement (addLineTool: Default) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool(TOOL_TYPE);
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	// --- Handlers for Programmatic Creation Panel ---

	const handleAddFibA = useCallback(() => {
		addFibWithId(`${ID_PREFIX}A`, pointsForFibA, defaultFibOptions);
	}, [addFibWithId]);

	const handleAddFibB = useCallback(() => {
		addFibWithId(`${ID_PREFIX}B`, pointsForFibB, exoticFibOptions);
	}, [addFibWithId]);

	const handleAddFibC_OffScreen = useCallback(() => {
		// Test Culling Logic (Off-screen Top)
		addFibWithId(`${ID_PREFIX}C`, pointsForFibC_OffScreenTop, defaultFibOptions); 
	}, [addFibWithId]);

	const handleCreateFibX = useCallback(() => {
		console.log(`%c--- Button Clicked: Create FIB_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, pointsForFibA, fibX_InitialOptions, 'FIB_X');
	}, [lineToolsApi]);

	const handleUpdateFibX = useCallback(() => {
		console.log(`%c--- Button Clicked: Update FIB_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, pointsForFibB, fibX_UpdatedOptions, 'FIB_X');
	}, [lineToolsApi]);

	const handleRemoveFibX = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove FIB_X by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsById(['FIB_X']);
	}, [lineToolsApi]);

	const handleRemoveFibRegex = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Programmatic Fibs (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsByIdRegex(new RegExp(`^${ID_PREFIX}.*$`));
	}, [lineToolsApi]);

	// ------------------------------------------------------------------
	// --- Automated Test Surface Generation ---
	// ------------------------------------------------------------------
	
	// Hook to generate the comprehensive list of single-override test cases
	const automatedTestCases = useToolTestCases(
		TOOL_TYPE,
		FibRetracementOptionDefaults,
		FibRetracementUniversalTestConfig,
		FibRetracementContextualOverrides,
		PROPERTIES_TO_FORCE_TEST,
		fibPlacementConfig,
		{ strategy: 'TwoPoint' }, // Default two-point tool
		null,
		fibLabelConfig
	);

	const handleGenerateAllTests = useCallback(() => {
		if (!lineToolsApi) return;
 
		console.log(`%c--- Button Clicked: Generating ${automatedTestCases.length} Automated Test Cases for Fib Retracement ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
 
		// 1. Loop through all generated test cases and programmatically add them
		automatedTestCases.forEach((testCase, index) => {
			const toolId = `${ID_PREFIX}TEST_${index + 1}`;
			const labelToolId = `${toolId}_LABEL`;
 
			const optionsToUse = deepCopy(testCase.options);
			const labelPoint = testCase.auxiliaryLabel.point; // Point generated by the hook logic
			
 
			// --- 1. Create Main Fib Tool ---
			lineToolsApi.createOrUpdateLineTool(
				testCase.toolType, 
				testCase.points, 
				optionsToUse, 
				toolId
			);

			// --- 2. Create Auxiliary Label Tool (Text Primitive) ---
			// The label text is already calculated by the generator logic.
			const labelText = testCase.auxiliaryLabel.label;
			
			// The base options for the Text tool come from the configured options override
			const labelTextOptions = {
				text: {
					value: labelText,
					// Merge the text options override from the config (the 9th argument)
					...fibLabelConfig.textOptionsOverride.text, 
				}
			};

			// Force a white background for the text box for visibility
			const finalLabelOptions = deepCopy(labelTextOptions);
			//finalLabelOptions.text.box.background = { color: 'rgba(255, 255, 255, 0.9)' };
			
			lineToolsApi.createOrUpdateLineTool(
				'Text',
				[labelPoint], // Use the offset point
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
		handleAddFibA,
		handleAddFibB,
		handleAddFibC_OffScreen,
		handleCreateFibX,
		handleUpdateFibX,
 
		// automated testing
		handleGenerateAllTests,

		// Removal Handlers
		handleRemoveFibX,
		handleRemoveFibRegex,
	}), [
		// Interactive
		handleSetActiveDefault, handleSetActiveExotic, handleAddInteractiveDefault,
		// Programmatic
		handleAddFibA, handleAddFibB, handleAddFibC_OffScreen, handleCreateFibX, handleUpdateFibX,
		// Removal
		handleRemoveFibX, handleRemoveFibRegex,
		// automated testing
		handleGenerateAllTests,
	]);
};
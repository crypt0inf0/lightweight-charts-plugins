// /src/Hooks/useLineToolMarketDepth.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

// Import data specific to the MarketDepth tool
import {
	defaultMarketDepthOptions,
	exoticMarketDepthOptions,
	pointsForMarketDepthA,
	pointsForMarketDepthB,
	pointsForMarketDepthC_OffScreen,
	marketDepthX_InitialOptions,
	marketDepthX_UpdatedOptions,
	STATIC_MARKET_DEPTH_DATA, // [CRITICAL] Import the static data
} from '../Data/MarketDepthToolData';

// Import necessary data helpers
import { baseTimestamp, day, createPoints } from '../Data/RectangleToolData'; 
import { useToolTestCases } from './useToolTestSurfaceGenerator';
import { MarketDepthOptionDefaults, MarketDepthUniversalTestConfig, MarketDepthContextualOverrides, PROPERTIES_TO_FORCE_TEST } from '../TestConfig/MarketDepthTestConfig';

const TOOL_TYPE = 'MarketDepth';
const ID_PREFIX = 'MD_PROG_';

// --- Custom Placement Configuration for Automated Tests ---
const marketDepthPlacementConfig = {
	// 1-point tool placement strategy
	PRICE_STEP: 30, // Large step for visibility
	VERTICAL_POINTS_BETWEEN_POINTS: 0, 
	LINE_LENGTH: 0, 
	COLUMN_GAP: 20, // Wide column gap
	MAX_TESTS_PER_COL: 1,
	START_PRICE: 150.50,
	START_BAR_INDEX: -250,
};

// Helper to inject the static data into a given options object
const injectMarketDepthData = (options) => {
	const optionsCopy = deepCopy(options);
	optionsCopy.marketDepth = optionsCopy.marketDepth || {};
	// Inject the hardcoded data set
	optionsCopy.marketDepth.marketDepthData = STATIC_MARKET_DEPTH_DATA;
	return optionsCopy;
};


/**
 * Custom hook to manage all handlers and logic for the MarketDepth Tool.
 */
export const useLineToolMarketDepth = (lineToolsApi) => {

	// --- Internal Helper for Programmatic Addition (Programmatic buttons need this wrapper) ---
	const addMarketDepthWithId = useCallback((id, points, options) => {
		console.log(`%c--- Button Clicked: Create Market Depth (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
 
		// Inject the static data before creating the tool
		const optionsWithData = injectMarketDepthData(options);
 
		// USE createOrUpdateLineTool TO FORCE THE ID
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, points, optionsWithData, id); 

		console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
		return id; // Return the ID that was used
	}, [lineToolsApi]);


	// --- Handlers for Interactive Drawing Panel ---

	const handleSetActiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Default Market Depth (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const options = injectMarketDepthData(defaultMarketDepthOptions);
		lineToolsApi.addLineTool(TOOL_TYPE, [], options);
	}, [lineToolsApi]);

	const handleSetActiveExotic = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Exotic Market Depth (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const options = injectMarketDepthData(exoticMarketDepthOptions);
		lineToolsApi.addLineTool(TOOL_TYPE, [], options);
	}, [lineToolsApi]);

	const handleAddInteractiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Market Depth (addLineTool: Default) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const options = injectMarketDepthData(defaultMarketDepthOptions);
		const id = lineToolsApi.addLineTool(TOOL_TYPE, [], options);
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	// --- Handlers for Programmatic Creation Panel ---

	const handleAddMarketDepthA = useCallback(() => {
		addMarketDepthWithId(`${ID_PREFIX}A`, pointsForMarketDepthA, defaultMarketDepthOptions);
	}, [addMarketDepthWithId]);

	const handleAddMarketDepthB = useCallback(() => {
		addMarketDepthWithId(`${ID_PREFIX}B`, pointsForMarketDepthB, exoticMarketDepthOptions);
	}, [addMarketDepthWithId]);

	const handleAddMarketDepthC_OffScreen = useCallback(() => {
		addMarketDepthWithId(`${ID_PREFIX}C`, pointsForMarketDepthC_OffScreen, defaultMarketDepthOptions); 
	}, [addMarketDepthWithId]);

	const handleCreateMarketDepthX = useCallback(() => {
		console.log(`%c--- Button Clicked: Create MD_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		const options = injectMarketDepthData(marketDepthX_InitialOptions);
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, pointsForMarketDepthA, options, 'MD_X');
	}, [lineToolsApi]);

	const handleUpdateMarketDepthX = useCallback(() => {
		console.log(`%c--- Button Clicked: Update MD_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		const options = injectMarketDepthData(marketDepthX_UpdatedOptions);
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, pointsForMarketDepthB, options, 'MD_X');
	}, [lineToolsApi]);

	const handleRemoveMarketDepthX = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove MD_X by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsById(['MD_X']);
	}, [lineToolsApi]);

	const handleRemoveMarketDepthRegex = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Programmatic Market Depths (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsByIdRegex(new RegExp(`^${ID_PREFIX}.*$`));
	}, [lineToolsApi]);

	// ------------------------------------------------------------------
	// --- Automated Test Surface Generation ---
	// ------------------------------------------------------------------
	
	// Hook to generate the comprehensive list of single-override test cases
	const automatedTestCases = useToolTestCases(
		TOOL_TYPE,
		MarketDepthOptionDefaults,
		MarketDepthUniversalTestConfig,
		MarketDepthContextualOverrides,
		PROPERTIES_TO_FORCE_TEST,
		marketDepthPlacementConfig,
		{ strategy: 'OnePoint' },
		null, // This tool has no standard text block
		{ targetPointIndex: 0, offsetTimeUnits: 5, offsetPriceUnits: 5 } // Label 5 units above P0
	);

	const handleGenerateAllTests = useCallback(() => {
		if (!lineToolsApi) return;
 
		console.log(`%c--- Button Clicked: Generating ${automatedTestCases.length} Automated Test Cases for Market Depth ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
 
		// 1. Loop through all generated test cases and programmatically add them
		automatedTestCases.forEach((testCase, index) => {
			const toolId = `${ID_PREFIX}TEST_${index + 1}`;
			const labelToolId = `${toolId}_LABEL`;
 
			// Inject the static data into the generated options
			const optionsWithData = injectMarketDepthData(testCase.options);

			// --- 1. Create Main Market Depth Tool ---
			lineToolsApi.createOrUpdateLineTool(
				testCase.toolType, 
				testCase.points, 
				optionsWithData, 
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
		handleAddMarketDepthA,
		handleAddMarketDepthB,
		handleAddMarketDepthC_OffScreen,
		handleCreateMarketDepthX,
		handleUpdateMarketDepthX,
 
		// automated testing
		handleGenerateAllTests,

		// Removal Handlers
		handleRemoveMarketDepthX,
		handleRemoveMarketDepthRegex,
	}), [
		// Interactive
		handleSetActiveDefault, handleSetActiveExotic, handleAddInteractiveDefault,
		// Programmatic
		handleAddMarketDepthA, handleAddMarketDepthB, handleAddMarketDepthC_OffScreen, handleCreateMarketDepthX, handleUpdateMarketDepthX,
		// Removal
		handleRemoveMarketDepthX, handleRemoveMarketDepthRegex,
		// automated testing
		handleGenerateAllTests,
	]);
};
// /src/Hooks/useLineToolCallout.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

// Import data specific to the Callout tool
import {
	defaultCalloutOptions,
	exoticCalloutOptions,
	pointsForCalloutA,
	pointsForCalloutB,
	pointsForCalloutC_OffScreenTop,
	calloutX_InitialOptions,
	calloutX_UpdatedOptions,
} from '../Data/CalloutToolData';

// Import necessary data helpers
import { baseTimestamp, day, createPoints } from '../Data/RectangleToolData'; 
import { useToolTestCases } from './useToolTestSurfaceGenerator';
import { CalloutOptionDefaults, CalloutUniversalTestConfig, CalloutContextualOverrides, PROPERTIES_TO_FORCE_TEST } from '../TestConfig/CalloutTestConfig';

const TOOL_TYPE = 'Callout';
const ID_PREFIX = 'CLOT_PROG_'; // CLOT: Callout Tool

// --- Custom Placement Configuration for Automated Tests ---
const calloutPlacementConfig = {
	// 2-point tool placement strategy
	PRICE_STEP: 30, // Large step for the 2-point tool
	VERTICAL_POINTS_BETWEEN_POINTS: 15, 
	LINE_LENGTH: 5, 
	COLUMN_GAP: 5,
	MAX_TESTS_PER_COL: 10, // Fewer tools per column to avoid overcrowding
};



/**
 * Custom hook to manage all handlers and logic for the Callout Tool.
 * This encapsulates its functionality, making it ready for integration.
 */
export const useLineToolCallout = (lineToolsApi) => {

	// --- Internal Helper for Programmatic Addition (Programmatic buttons need this wrapper) ---
	const addCalloutWithId = useCallback((id, points, options) => {
		console.log(`%c--- Button Clicked: Create Callout (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
 
		// Create a deep copy of the provided options object before passing it to the API.
		const optionsCopy = deepCopy(options);
 
		// USE createOrUpdateLineTool TO FORCE THE ID (Handles programmatic creation)
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, points, optionsCopy, id); 

		console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
		return id; // Return the ID that was used
	}, [lineToolsApi]);


	// --- Handlers for Interactive Drawing Panel ---

	const handleSetActiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Default Callout (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(defaultCalloutOptions));
	}, [lineToolsApi]);

	const handleSetActiveExotic = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Exotic Callout (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool(TOOL_TYPE, [], deepCopy(exoticCalloutOptions));
	}, [lineToolsApi]);

	const handleAddInteractiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Add Callout (addLineTool: Default) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool(TOOL_TYPE);
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	// --- Handlers for Programmatic Creation Panel ---

	const handleAddCalloutA = useCallback(() => {
		addCalloutWithId(`${ID_PREFIX}A`, pointsForCalloutA, defaultCalloutOptions);
	}, [addCalloutWithId]);

	const handleAddCalloutB = useCallback(() => {
		addCalloutWithId(`${ID_PREFIX}B`, pointsForCalloutB, exoticCalloutOptions);
	}, [addCalloutWithId]);

	const handleAddCalloutC_OffScreen = useCallback(() => {
		// Test Culling Logic (Off-screen Top)
		addCalloutWithId(`${ID_PREFIX}C`, pointsForCalloutC_OffScreenTop, defaultCalloutOptions); 
	}, [addCalloutWithId]);

	const handleCreateCalloutX = useCallback(() => {
		console.log(`%c--- Button Clicked: Create CLOT_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, createPoints(baseTimestamp + 10 * day, 175, baseTimestamp + 20 * day, 195), calloutX_InitialOptions, 'CLOT_X');
	}, [lineToolsApi]);

	const handleUpdateCalloutX = useCallback(() => {
		console.log(`%c--- Button Clicked: Update CLOT_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool(TOOL_TYPE, createPoints(baseTimestamp + 5 * day, 140, baseTimestamp + 15 * day, 160), calloutX_UpdatedOptions, 'CLOT_X');
	}, [lineToolsApi]);

	const handleRemoveCalloutX = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove CLOT_X by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsById(['CLOT_X']);
	}, [lineToolsApi]);

	const handleRemoveCalloutRegex = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Programmatic Callouts (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsByIdRegex(new RegExp(`^${ID_PREFIX}.*$`));
	}, [lineToolsApi]);

	// ------------------------------------------------------------------
	// --- Automated Test Surface Generation ---
	// ------------------------------------------------------------------
	
	// Hook to generate the comprehensive list of single-override test cases
	const automatedTestCases = useToolTestCases(
		TOOL_TYPE,
		CalloutOptionDefaults,
		CalloutUniversalTestConfig,
		CalloutContextualOverrides,
		PROPERTIES_TO_FORCE_TEST,
		calloutPlacementConfig,
	);

	const handleGenerateAllTests = useCallback(() => {
		if (!lineToolsApi) return;
 
		console.log(`%c--- Button Clicked: Generating ${automatedTestCases.length} Automated Test Cases for Callout ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
 
		// 1. Loop through all generated test cases and programmatically add them
		automatedTestCases.forEach((testCase, index) => {
			const toolId = `${ID_PREFIX}TEST_${index + 1}`;
 
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
		handleSetActiveExotic,
		handleAddInteractiveDefault,
 
		// Programmatic Handlers
		handleAddCalloutA,
		handleAddCalloutB,
		handleAddCalloutC_OffScreen,
		handleCreateCalloutX,
		handleUpdateCalloutX,
 
		// automated testing
		handleGenerateAllTests,

		// Removal Handlers
		handleRemoveCalloutX,
		handleRemoveCalloutRegex,
	}), [
		// Interactive
		handleSetActiveDefault, handleSetActiveExotic, handleAddInteractiveDefault,
		// Programmatic
		handleAddCalloutA, handleAddCalloutB, handleAddCalloutC_OffScreen, handleCreateCalloutX, handleUpdateCalloutX,
		// Removal
		handleRemoveCalloutX, handleRemoveCalloutRegex,
		// automated testing
		handleGenerateAllTests,
	]);
};
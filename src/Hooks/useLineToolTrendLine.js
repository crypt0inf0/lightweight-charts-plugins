// File: /src/Hooks/useLineToolTrendLine.js

import { useCallback, useMemo } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';

// Import data specific to the TrendLine tool
import {
    defaultTrendLineOptions,
    exoticTrendLineOptions,
    extendedTrendLineOptions,
    pointsForTrendA,
    pointsForTrendB,
    pointsForTrendC_OffScreenLeft,
    trendX_InitialOptions,
    trendX_UpdatedOptions,
} from '../Data/TrendLineToolData';
import { baseTimestamp, day, hour, createPoints } from '../Data/RectangleToolData'; 
import { useToolTestCases } from './useToolTestSurfaceGenerator';
import { TrendLineOptionDefaults, TrendLineUniversalTestConfig, TrendLineContextualOverrides, PROPERTIES_TO_FORCE_TEST } from '../TestConfig/TrendLineTestConfig';


/**
 * Custom hook to manage all handlers and logic for the TrendLine Tool.
 * This encapsulates its functionality, making it ready for integration.
 */
export const useLineToolTrendLine = (lineToolsApi) => {

	// --- Internal Helper for Programmatic Addition (Programmatic buttons need this wrapper) ---
	const addTrendLineWithId = useCallback((id, points, options) => {
		console.log(`%c--- Button Clicked: Create TrendLine (ID: ${id}) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
 
		// Create a deep copy of the provided options object before passing it to the API.
		const optionsCopy = deepCopy(options);
 
		// USE createOrUpdateLineTool TO FORCE THE ID (Handles programmatic creation)
		// ToolType must be 'TrendLine'
		lineToolsApi.createOrUpdateLineTool('TrendLine', points, optionsCopy, id); 

		console.log(`%c<- TOOL CREATED/UPDATED: ID: ${id}`, 'color: #32CD32; font-weight: bold;');
		return id; // Return the ID that was used
	}, [lineToolsApi]);


	// --- Handlers for Interactive Drawing Panel ---

	const handleSetActiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Default TrendLine (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool('TrendLine', [], deepCopy(defaultTrendLineOptions)); 
	}, [lineToolsApi]);

	const handleSetActiveExotic = useCallback(() => {
		console.log(`%c--- Button Clicked: Activate Exotic TrendLine (addLineTool) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		lineToolsApi.addLineTool('TrendLine', [], deepCopy(exoticTrendLineOptions)); 
	}, [lineToolsApi]);

	const handleAddInteractiveDefault = useCallback(() => {
		console.log(`%c--- Button Clicked: Add TrendLine (addLineTool: Default) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool('TrendLine'); 
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	const handleAddInteractiveExtended = useCallback(() => {
		console.log(`%c--- Button Clicked: Add TrendLine (addLineTool: Extended) ---`, 'color: #fff; background: #8A2BE2; padding: 2px 5px;');
		const id = lineToolsApi.addLineTool('TrendLine', [], deepCopy(extendedTrendLineOptions)); 
		if (id) console.log(`%c<- Initiated interactive creation. ID: ${id}`, 'color: #32CD32; font-weight: bold;');
	}, [lineToolsApi]);


	// --- Handlers for Programmatic Creation Panel ---

	const handleAddTrendA = useCallback(() => {
		addTrendLineWithId('TREND_PROG_A', pointsForTrendA, defaultTrendLineOptions);
	}, [addTrendLineWithId]);

	const handleAddTrendB = useCallback(() => {
		addTrendLineWithId('TREND_PROG_B', pointsForTrendB, exoticTrendLineOptions);
	}, [addTrendLineWithId]);

	const handleAddTrendC_OffScreen = useCallback(() => {
		// Test Culling Logic (Off-screen left, non-extending)
		addTrendLineWithId('TREND_PROG_C', pointsForTrendC_OffScreenLeft, defaultTrendLineOptions); 
	}, [addTrendLineWithId]);

	const handleCreateTrendX = useCallback(() => {
		console.log(`%c--- Button Clicked: Create TREND_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool('TrendLine', createPoints(baseTimestamp + 1 * day, 185, baseTimestamp + 4 * day, 165), trendX_InitialOptions, 'TREND_X');
	}, [lineToolsApi]);

	const handleUpdateTrendX = useCallback(() => {
		console.log(`%c--- Button Clicked: Update TREND_X (createOrUpdateLineTool) ---`, 'color: #fff; background: #DAA520; padding: 2px 5px;');
		lineToolsApi.createOrUpdateLineTool('TrendLine', createPoints(baseTimestamp + 1 * day, 195, baseTimestamp + 4 * day, 175), trendX_UpdatedOptions, 'TREND_X');
	}, [lineToolsApi]);

	const handleRemoveTrendX = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove TREND_X by ID ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsById(['TREND_X']);
	}, [lineToolsApi]);

	const handleRemoveTrendsRegex = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Programmatic Trends (Regex) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeLineToolsByIdRegex(/^TREND_PROG_.*$/);
	}, [lineToolsApi]);

	// ------------------------------------------------------------------
	// --- Automated Test Surface Generation ---
	// ------------------------------------------------------------------
	
	// Hook to generate the comprehensive list of single-override test cases
	const automatedTestCases = useToolTestCases(
		"TrendLine",
		TrendLineOptionDefaults,
		TrendLineUniversalTestConfig,
		TrendLineContextualOverrides,
		PROPERTIES_TO_FORCE_TEST
	);

	const handleGenerateAllTests = useCallback(() => {
		if (!lineToolsApi) return;
		
		console.log(`%c--- Button Clicked: Generating ${automatedTestCases.length} Automated Test Cases for TrendLine ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
		
		// 1. Optional: Clear all existing tools for a clean slate
		// lineToolsApi.removeAllLineTools(); 

		// 2. Loop through all generated test cases and programmatically add them
		automatedTestCases.forEach((testCase, index) => {
			const toolId = `TL_TEST_${index + 1}`;
			
			// The options object already contains the correct text.value from the generator logic.
            // We just need a copy to pass to the API.
			const optionsToUse = deepCopy(testCase.options);
			
			lineToolsApi.createOrUpdateLineTool(
				testCase.toolType, 
				testCase.points, 
				optionsToUse, 
				toolId
			);
		});

		console.log(`%c<- FINISHED: Added ${automatedTestCases.length} test tools.`, 'color: #32CD32; font-weight: bold;');
		
	}, [lineToolsApi, automatedTestCases]); // Depend on lineToolsApi and the generated cases

	
	// --- Return the comprehensive set of handlers for the UI components to consume ---
	return useMemo(() => ({
		// Interactive Handlers
		handleSetActiveDefault,
		handleSetActiveExotic,
		handleAddInteractiveDefault,
		handleAddInteractiveExtended,
		
		// Programmatic Handlers
		handleAddTrendA,
		handleAddTrendB,
		handleAddTrendC_OffScreen,
		handleCreateTrendX,
		handleUpdateTrendX,
		
		// automated testing
		handleGenerateAllTests,

		// Removal Handlers
		handleRemoveTrendX,
		handleRemoveTrendsRegex,
	}), [
		// Interactive
		handleSetActiveDefault, handleSetActiveExotic, handleAddInteractiveDefault, handleAddInteractiveExtended,
		// Programmatic
		handleAddTrendA, handleAddTrendB, handleAddTrendC_OffScreen, handleCreateTrendX, handleUpdateTrendX,
		// Removal
		handleRemoveTrendX, handleRemoveTrendsRegex,
		// automated testing
		handleGenerateAllTests,
	]);
};
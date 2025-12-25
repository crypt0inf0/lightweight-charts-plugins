// /src/Hooks/useToolTestSurfaceGenerator.js

import { useMemo } from 'react';
import { LineStyle } from 'lightweight-charts';
import { deepCopy, merge } from 'lightweight-charts-line-tools-core';
import { PlacementManager } from './ToolDataUtils';
import { LONG_TEST_TEXT, ARRAY_RADIUS_TEST_VALUE } from '../TestConfig/TrendLineTestConfig';


// --- Helper Functions (Typically housed in a separate Utility file) ---

/**
 * Strategy Type for Tool Points.
 * @typedef {'OnePoint' | 'TwoPoint' | 'CannedPath'} PointGenerationType
 */

/**
 * Configuration object to tell the generator how to create test points.
 * @typedef {object} PointStrategyConfig
 * @property {PointGenerationType} strategy - The method to use for point generation.
 * @property {Array<object>} [path] - Required if strategy is 'CannedPath'. The array of LineToolPoint objects to translate.
 * @property {number} [count] - Required if strategy is 'OnePoint' or 'TwoPoint' (though TwoPoint is default).
 */

const deepMerge = (base, override) => {
	const copy = deepCopy(base);
	merge(copy, override);
	return copy;
};


/**
 * Custom hook to generate all single-override test cases for a line tool.
 *
 * @param {string} toolType - The string identifier for the tool (e.g., 'TrendLine').
 * @param {object} masterDefaults - The baseline options object (e.g., TrendLineOptionDefaults).
 * @param {object} testConfig - The map defining all test variations (TrendLineUniversalTestConfig).
 * @param {object} contextualOverrides - The map defining prerequisite overrides for specific tests.
 * @param {Array<string>} propertiesToForceTest - The list of properties that should be tested even if the value equals the default.
 * @param {object} [placementOptions] - Optional placement configuration (see defaults inside).
 * @param {PointStrategyConfig} [pointStrategyConfig] - Configuration for how points are generated.
 * @param {string | null} [labelInjectionPathOverride] - [MODIFIED] Optional path to inject the label (e.g., 'entryStopLossText.value'). Defaults to null.
 * @param {object | null} [auxiliaryLabelConfig] - [NEW] Optional config for generating a secondary label primitive.
 * @returns {Array<LineToolTestSpec>} An array of test case objects.
 */

// Constants from external data (for createLineToolPoint helper - assuming these are globally available or imported)
const day = 86400; 
const baseTimestamp = 1756857600;


export function useToolTestCases(
	toolType,
	masterDefaults,
	testConfig,
	contextualOverrides,
	propertiesToForceTest,
	placementOptions = {},
	pointStrategyConfig = { strategy: 'TwoPoint' }, // Default to TwoPoint strategy
	labelInjectionPathOverride = 'text.value', // Default is the standard path
	auxiliaryLabelConfig = null,
) {
	// Re-run the generation only when inputs change
	const testCases = useMemo(() => {
		//console.log('1. --- USE MEMO BLOCK IS EXECUTING ---');
		if (!masterDefaults || !testConfig) {
			console.error("useToolTestCases requires masterDefaults and testConfig.");
			return [];
		}



		// --- MOVED placement INSIDE useMemo, now accepts placementOptions ---
		const placement = (() => {
			const START_BAR_INDEX = 1; // Used for the first P1_BAR offset
			const MAX_TESTS_PER_COL = 15; // Assuming the hardcoded 15 is the row limit
			const START_PRICE = 195; // Initial price for the first row
			const PRICE_STEP = 5;   // Vertical space between tools
			const VERTICAL_POINTS_BETWEEN_POINTS = 5; //how much distance between the points of the tool
 
			// --- UPDATED CONSTANTS ---
			const LINE_LENGTH = 3;   // Horizontal width of the line segment (in time units)
			const COLUMN_GAP = 1;   // Extra time units to leave blank between columns
			// --- END UPDATED CONSTANTS ---

			// --- Apply placementOptions overrides (if provided) ---
			const opts = {
				START_BAR_INDEX,
				MAX_TESTS_PER_COL,
				START_PRICE,
				PRICE_STEP,
				VERTICAL_POINTS_BETWEEN_POINTS,
				LINE_LENGTH,
				COLUMN_GAP,
				resetPriceOnColumnWrap: true,
				...placementOptions // ← User-provided values override defaults
			};

			// Reassign with possibly overridden values, keeping original names
			const {
				START_BAR_INDEX: final_START_BAR_INDEX,
				MAX_TESTS_PER_COL: final_MAX_TESTS_PER_COL,
				START_PRICE: final_START_PRICE,
				PRICE_STEP: final_PRICE_STEP,
				VERTICAL_POINTS_BETWEEN_POINTS: final_VERTICAL_POINTS_BETWEEN_POINTS,
				LINE_LENGTH: final_LINE_LENGTH,
				COLUMN_GAP: final_COLUMN_GAP,
				resetPriceOnColumnWrap: final_RESET_PRICE_ON_COLUMN_WRAP
			} = opts;

			const final_COLUMN_FULL_FOOTPRINT = final_LINE_LENGTH + final_COLUMN_GAP;

			let currentPrice = final_START_PRICE;
			let currentRow = 0;
			let currentCol = 0;
 


			/**
			 * Creates a LineToolPoint structure.
			 */
			const createLineToolPoint = (barIndex, price) => {
				return {
					timestamp: baseTimestamp + barIndex * day,
					price: price
				};
			};

			/**
			 * Calculates the next unique P1 and P2 coordinates for a tool instance.
			 * @returns {Array<object>} The final array of points based on the strategy.
			 */
			const getNextPlacement = () => {
 
				// Time (X-axis) calculation: The start of the column is determined by the column index.
				const COLUMN_START_INDEX = final_START_BAR_INDEX + (currentCol * final_COLUMN_FULL_FOOTPRINT);
 
				const P1_BAR = COLUMN_START_INDEX;
				const P2_BAR = P1_BAR + final_LINE_LENGTH;
 
				// Y-axis calculation: The price is determined by the current row index.
				const P1_PRICE = currentPrice;
				const P2_PRICE = currentPrice - final_VERTICAL_POINTS_BETWEEN_POINTS;

				// Base P1 and P2 objects (used as the anchor for the test slot)
				const P1_BASE = createLineToolPoint(P1_BAR, P1_PRICE);
				const P2_BASE = createLineToolPoint(P2_BAR, P2_PRICE);

				// --- 2. Update Counters (Column-Major Traversal: Down, then Right) ---
 
				// Y-position (price) update for the next tool in this column
				currentPrice = P2_PRICE - final_PRICE_STEP;
 
				// Update column/row counter
				currentRow++;
				if (currentRow >= final_MAX_TESTS_PER_COL) {
					currentRow = 0; // Reset row to the top
					currentCol++; // Move to the next column (Right)
					if (final_RESET_PRICE_ON_COLUMN_WRAP) {
						currentPrice = final_START_PRICE; // Reset price to the starting price for the new column
					}
				}

				// --- 3. APPLY POINT GENERATION STRATEGY (The Fix) ---
				let finalPoints = [];
				const strategy = pointStrategyConfig.strategy || 'TwoPoint';

				switch (strategy) {
					case 'CannedPath': {
						if (!pointStrategyConfig.path || pointStrategyConfig.path.length === 0) {
							console.error("CannedPath strategy requires non-empty 'path' array. Falling back to TwoPoint.");
							finalPoints = [P1_BASE, P2_BASE];
							break;
						}
						
						// Strategy: Translate Master Path by the difference between P1_BASE and Master Path's P0
						
						const masterPath = pointStrategyConfig.path;
						const masterPathStart = masterPath[0]; // Assume master path is 0-based for translation

						// Vector = (P1_BASE Time - Master Path Start Time), (P1_BASE Price - Master Path Start Price)
						const timeVector = P1_BASE.timestamp - masterPathStart.timestamp;
						const priceVector = P1_BASE.price - masterPathStart.price;

						// Apply vector to every point in the master path
						finalPoints = masterPath.map(p => ({
							timestamp: p.timestamp + timeVector,
							price: p.price + priceVector,
						}));
						break;
					}
					case 'OnePoint': {
						// 1-Point Logic: Just the base P1 location
						finalPoints = [P1_BASE];
						break;
					}
					case 'TwoPoint':
					default: {
						// 2-Point Logic (The standard P1, P2 segment)
						finalPoints = [P1_BASE, P2_BASE];
						break;
					}
				}
				
				return finalPoints;
			};
 
			return {
				/** Resets the counters to the starting position. */
				reset: () => {
					currentPrice = final_START_PRICE;
					currentRow = 0;
					currentCol = 0;
				},
				/** Gets the next calculated set of coordinates. */
				getNext: getNextPlacement,
			};
		})();
		// --- END placement ---

		// 1. Reset the placement logic counters
		placement.reset();

		// Log the configuration being passed to the generator function
		//console.log('2. Test Config (testConfig) keys before call:', Object.keys(testConfig));

		// 2. Generate the test cases (Initial call: Root, Root, ConfigRoot, ContextualOverrides, PropertiesToForceTest, [])
		const cases = generateSingleOverrideTestCases(
			toolType,
			deepCopy(masterDefaults), // fullOptionsRoot (Deep copy to ensure purity)
			deepCopy(masterDefaults), // currentBaseNode (Deep copy to ensure purity)
			deepCopy(testConfig),	// testConfigNode (Deep copy to ensure purity)
			contextualOverrides,
			propertiesToForceTest,
			'',	// path (starts empty)
			[],	// Initial testCases array
			placement,
			pointStrategyConfig, // Pass strategy config down to generator logic
			labelInjectionPathOverride, // [MODIFIED] Pass the override down
			auxiliaryLabelConfig // [NEW] Pass the override down
		);
		
		// 3. Add the control baseline as the first element for comparison
		const pointsForBaseline = placement.getNext(); // Get the next spot (now returns the array of points)
 
		// --- Label Injection for Baseline Control ---
		const baselineOptions = deepMerge(masterDefaults, { text: { value: 'BASELINE CONTROL' } });

		if (labelInjectionPathOverride) { // [FIX] Conditional check
			// [NEW] Use dynamic injection path for the Baseline Control label
			const baselineLabelPathParts = labelInjectionPathOverride.split('.');
			let baselineLabelTarget = baselineOptions;
	
			for(let i = 0; i < baselineLabelPathParts.length - 1; i++) {
				const part = baselineLabelPathParts[i];
				baselineLabelTarget[part] = baselineLabelTarget[part] || {};
				baselineLabelTarget = baselineLabelTarget[part];
			}
			baselineLabelTarget[baselineLabelPathParts[baselineLabelPathParts.length - 1]] = 'BASELINE CONTROL';
		}
		
		// ---------------------------------------------

				// [NEW] Auxiliary Label Logic for Baseline Control
		let auxiliaryLabelDataBaseline = {};

		if (auxiliaryLabelConfig) {
			const targetPointIndex = auxiliaryLabelConfig.targetPointIndex || 0;
			const targetPoint = pointsForBaseline[targetPointIndex] || pointsForBaseline[0];
			
			// Apply offset
			const offsetLabelPoint = {
				timestamp: targetPoint.timestamp + (auxiliaryLabelConfig.offsetTimeUnits * day),
				price: targetPoint.price + auxiliaryLabelConfig.offsetPriceUnits
			};

			auxiliaryLabelDataBaseline = {
				point: offsetLabelPoint,
				label: 'BASELINE CONTROL',
				textOptionsOverride: auxiliaryLabelConfig.textOptionsOverride
			};
		}
 
		// NOTE: The generator logic below needs to be updated to pass the points array.
		cases.unshift({
			toolType: toolType,
			options: baselineOptions,
			points: pointsForBaseline, // The points array
			label: 'BASELINE CONTROL',
			auxiliaryLabel: auxiliaryLabelDataBaseline
		});

		return cases;

	}, [
		toolType,
		masterDefaults,
		testConfig,
		contextualOverrides,
		propertiesToForceTest,
		placementOptions, // Dependency: re-run if placement changes
		pointStrategyConfig, // Dependency: re-run if strategy changes
		labelInjectionPathOverride,
		auxiliaryLabelConfig
	]);

	return testCases;
}


// --- Core Generator Logic ---


/**
 * The recursive function to traverse the options structure and generate single-override test cases.
 */
const generateSingleOverrideTestCases = (toolType, fullOptionsRoot, currentBaseNode, testConfigNode, contextualOverrides, propertiesToForceTest, path = '', testCases = [], placement, pointStrategyConfig, labelInjectionPathOverride, auxiliaryLabelConfig) => {

	for (const key in testConfigNode) {
		const currentPath = path ? `${path}.${key}` : key;
		const testValues = testConfigNode[key];
 
		// Defensive check to ensure key exists in base node before proceeding with recursion/testing
		if (typeof currentBaseNode === 'object' && currentBaseNode !== null && !(key in currentBaseNode) && typeof testValues !== 'object') {
			continue;
		}

		if (Array.isArray(testValues)) {
			// --- Found a Primitive Property to Test ---

			// 1. Get Default Value
			const defaultValue = currentBaseNode && currentBaseNode[key];
 
			// 2. Lookup Contextual Override
			const contextualOverride = contextualOverrides[currentPath];
 
			// 3. Iterate over the defined test values
			testValues.forEach(testValue => {
 
				// 4. Skip if the test value is the exact same as the baseline default value
				if (testValue === defaultValue && !Array.isArray(testValue) && typeof testValue !== 'object') {
					// Bypass redundancy check if the current path is on the PROPERTIES_TO_FORCE_TEST list
					if (!propertiesToForceTest.includes(currentPath)) {
						return; // Skip this redundant test
					}
				}
 
				// 5. Construct the single-property override object (using nested structure)
				let singleTestOverride = {};
				let current = singleTestOverride;
				const parts = currentPath.split('.');
 
				// Logic to build the sparse 'singleTestOverride' object
				parts.forEach((part, index) => {
					current[part] = current[part] || {}; 
					if (index === parts.length - 1) {
						current[part] = testValue; 
					} 
					current = current[part];
				});
 
				// --- NEW CORE MERGE LOGIC (3 Stages) ---
 
				// Stage 0: Create a clean instance of the full root options
				let finalOptions = deepCopy(fullOptionsRoot);
 
				// Stage 1: Apply Contextual Prerequisite Overrides (if they exist for this path)
				if (contextualOverride) {
					finalOptions = deepMerge(finalOptions, contextualOverride);
				}
 
				// Stage 2: Apply the Single Tested Value Override
				finalOptions = deepMerge(finalOptions, singleTestOverride);

				// Clean up dummy keys
				if (finalOptions.line && finalOptions.line.testInfiniteLine !== undefined) {
					delete finalOptions.line.testInfiniteLine; 
				}				
 
				// 7. Determine Label Text for Display
				let displayValue = testValue;
				if (Array.isArray(testValue)) {
					// Check if it's the long test text value for display simplification
					if (testValue === LONG_TEST_TEXT) {
						 displayValue = 'LONG_TEST_TEXT';
					} else {
						 displayValue = `[${testValue.join(', ')}]`;
					}
				} else if (typeof testValue === 'number' || typeof testValue === 'boolean') {
					displayValue = String(testValue);
				} else if (typeof testValue === 'object' && testValue !== null) {
					displayValue = `[${Object.keys(testValue).join(', ')}]`;
				} else if (typeof testValue === 'string') {
					displayValue = `'${testValue}'`;
				}
 
				const labelText = `${currentPath} = ${displayValue}`;
 
				// 8. Final Label Injection Logic: 
				// Check if the injection target exists, then perform the labeling.
				// This relies on the path being passed down and applied to the finalOptions object.

				if (labelInjectionPathOverride) { // [FIX] Added Check for null/undefined/empty string
					const labelPathParts = labelInjectionPathOverride.split('.');
					let labelTarget = finalOptions;
					let defaultTarget = fullOptionsRoot;
	
					// Traverse the object to find the target field's parent
					for(let i = 0; i < labelPathParts.length - 1; i++) {
						const part = labelPathParts[i];
						labelTarget[part] = labelTarget[part] || {};
						defaultTarget[part] = defaultTarget[part] || {};
						labelTarget = labelTarget[part];
						defaultTarget = defaultTarget[part];
					}
					const finalKey = labelPathParts[labelPathParts.length - 1];
	
					if (labelTarget[finalKey] !== undefined) {
						const defaultTextValue = defaultTarget[finalKey];
	
						if (labelTarget[finalKey] === defaultTextValue) {
							labelTarget[finalKey] = labelText;
						}
					}
				}
 				
				
 
				// 9. Get Placement and Push Case
				const finalPoints = placement.getNext();

				// [ADD/MODIFY] Auxiliary Label Configuration for the secondary primitive
				let auxiliaryLabelData = {};

				if (auxiliaryLabelConfig) {
					const targetPointIndex = auxiliaryLabelConfig.targetPointIndex || 0; // Default to P0
					const targetPoint = finalPoints[targetPointIndex] || finalPoints[0]; // Fallback to P0
					
					// Apply offset
					const offsetLabelPoint = {
						timestamp: targetPoint.timestamp + (auxiliaryLabelConfig.offsetTimeUnits * day),
						price: targetPoint.price + auxiliaryLabelConfig.offsetPriceUnits
					};

					auxiliaryLabelData = {
						point: offsetLabelPoint,
						label: labelText,
						textOptionsOverride: auxiliaryLabelConfig.textOptionsOverride
					};
				}

				testCases.push({
					toolType: toolType,
					options: finalOptions,
					points: finalPoints,
					label: labelText,
					auxiliaryLabel: auxiliaryLabelData
				});
			});
 
		} else if (typeof testValues === 'object' && testValues !== null && !Array.isArray(testValues)) {
			// --- Found a Nested Object (Recurse) ---
			const nextBaseOptionNode = currentBaseNode[key] || {}; 

			// Recurse down, passing the contextualOverrides map again.
			generateSingleOverrideTestCases(
				toolType,
				fullOptionsRoot, 
				nextBaseOptionNode, 
				testValues, 
				contextualOverrides, 
				propertiesToForceTest,
				currentPath, 
				testCases,
				placement,
				pointStrategyConfig, // Pass strategy config down
				labelInjectionPathOverride,
				auxiliaryLabelConfig
			);
		}
	}

	return testCases;
};
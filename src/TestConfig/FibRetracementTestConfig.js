// /src/TestConfig/FibRetracementTestConfig.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType, deepCopy
} from 'lightweight-charts-line-tools-core';

// --- Import Tool Defaults ---
import { defaultFibOptions, FIB_LEVELS_BASE } from '../Data/FibRetracementToolData';



// ----------------------------------------------------------------------
// 1. BASELINE DEFAULTS FOR FIB RETRACEMENT TOOL
// ----------------------------------------------------------------------
export const FibRetracementOptionDefaults = deepCopy(defaultFibOptions);

// --- Constants & Config for Generator Hook ---
export const PROPERTIES_TO_FORCE_TEST = [
	'line.style',
	'line.width',
	'extend.left',
	'extend.right',
	'levels.1.color',
	'levels.1.opacity',
	'levels.4.distanceFromCoeff',
	'showPriceAxisLabels',
	'showTimeAxisLabels',
];

/**
 * Defines the unique value to test for every single primitive option
 * within the Fib Retracement tool's full options structure.
 */
export const FibRetracementUniversalTestConfig = {

	// --- I. LineToolOptionsCommon ---
	editable: [false],

	// Cursor Overrides
	defaultHoverCursor: [PaneCursorType.Crosshair],
	defaultDragCursor: [PaneCursorType.ZoomIn],
	defaultAnchorHoverCursor: [PaneCursorType.VerticalResize],
	defaultAnchorDragCursor: [PaneCursorType.HorizontalResize],
	notEditableCursor: [PaneCursorType.Pointer],
	
	// Label Visibility (Test both axis labels for price/time)
	showPriceAxisLabels: [false, true],
	showTimeAxisLabels: [false, true],
	priceAxisLabelAlwaysVisible: [true],
	timeAxisLabelAlwaysVisible: [true],


	// --- II. Core Line Properties (Applies to the 0 and 1 lines) ---
	line: {
		width: [1,2,3,4],
		style: [LineStyle.Solid, LineStyle.Dotted, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.SparseDotted],
	},
 
	// Global Extension (Applies to all lines)
	extend: {
		left: [false, true],
		right: [false, true],
	},
	testInfiniteLine: [true],

	// --- LEVELS TESTING ---
	// We treat the array like a nested object with numeric keys. 
	// The generator will build paths like 'levels.1.color'
	levels: {
		
		// TEST GROUP 1: Modifying Level 1 (Coeff 1)
		1: {
			// 1. Color: Will become the background fill color due to override logic
			color: ['rgba(255, 0, 255, 0.6)', 'rgba(0, 255, 255, 1)'], 
			
			// 2. Opacity: Controls the fill of the NEXT band (Level 1 -> 2)
			opacity: [0, 0.2, 0.4, 0.6, 0.8, 1], 
		},

		// TEST GROUP 2: Modifying Level 4 (Coeff 1.618)
		4: {
			distanceFromCoeff: [1.618, 1, 0, 0.618, 1, -0.618], 
		}
	}
	
};


// ----------------------------------------------------------------------
// 3. CONTEXTUAL OVERRIDES
// ----------------------------------------------------------------------

// Helper to create a specific "scene" for the levels
const createLevelScene = (modifierCallback) => {
	const levels = deepCopy(FIB_LEVELS_BASE);
	modifierCallback(levels);
	return { levels: levels };
};

export const FibRetracementContextualOverrides = {
	// Simple overrides for necessary boolean flags
	'editable': {
		editable: false,
	},
	'notEditableCursor': {
		editable: false,
	},
	// Override to create the Infinite Line combination
    'testInfiniteLine': {
        
		extend: {
			left: true,
			right: true,
		},
    
        // Also override the text to clearly label the infinite line
        text: {
            value: 'LINE.EXTEND.LEFT=TRUE & RIGHT=TRUE (Infinite Line)',
        },
    },

	// ---------------------------------------------------------------
	// OVERRIDE FOR: levels.1.color
	// ---------------------------------------------------------------
	// Objective: Make the tested color appear as the background fill.
	// Logic: Fill(0->1) uses L1.color and L0.opacity.
	'levels.1.color': createLevelScene((levels) => {
		levels.forEach(l => l.opacity = 0); // Hide everything else
		
		// Set L0 opacity to enable the fill for the band ending at L1
		levels[1].opacity = 0.1; 
		
		// L1 color is injected by the test runner
	}),

	// ---------------------------------------------------------------
	// OVERRIDE FOR: levels.1.opacity
	// ---------------------------------------------------------------
	// Objective: Test how L1's opacity affects the fill.
	// Logic: Fill(1->2) uses L2.color and L1.opacity.
	'levels.1.opacity': createLevelScene((levels) => {
		levels.forEach(l => l.opacity = 0); // Hide everything else
	}),


	// ---------------------------------------------------------------
	// OVERRIDE FOR: levels.2.distanceFromCoeff
	// ---------------------------------------------------------------
	'levels.4.distanceFromCoeff': createLevelScene((levels) => {
		levels[4].distanceFromCoeffEnabled = true; // Prerequisite: must be enabled to see change
	}),
};
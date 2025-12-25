// /src/TestConfig/TriangleTestConfig.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType,
} from 'lightweight-charts-line-tools-core';

// Import core geometry path for test generation
import { MASTER_TRIANGLE_PATH } from '../Data/TriangleToolData';

// --- Point Generation Strategy Configuration ---

/**
 * Configuration that tells the generator how to create the tool's points.
 * For the Triangle tool, this is a CannedPath strategy to ensure 3 points are generated.
 */
export const TrianglePointStrategyConfig = {
	strategy: 'CannedPath', // Explicitly use the CannedPath strategy
	path: MASTER_TRIANGLE_PATH, // The predefined 3-point path
};


// Define properties that should be generated even if the value matches the default (to ensure explicit testing)
export const PROPERTIES_TO_FORCE_TEST = [
	'triangle.border.width',
	'triangle.border.color',
	'triangle.border.style',
	'triangle.background.color',
];

/**
 * Defines the unique values to test for every single primitive option
 * within the Triangle tool's full options structure.
 */
export const TriangleUniversalTestConfig = {

	// --- I. LineToolOptionsCommon (Boolean and Cursor Overrides) ---
	
	editable: [false],

	// Cursor Overrides 
	defaultHoverCursor: [PaneCursorType.Crosshair],
	defaultDragCursor: [PaneCursorType.ZoomIn],
	defaultAnchorHoverCursor: [PaneCursorType.VerticalResize],
	defaultAnchorDragCursor: [PaneCursorType.HorizontalResize],
	notEditableCursor: [PaneCursorType.Pointer],
	
	// Label Visibility (Test if it can be turned off)
	showPriceAxisLabels: [false],
	showTimeAxisLabels: [false],
	priceAxisLabelAlwaysVisible: [true],
	timeAxisLabelAlwaysVisible: [true],


	// --- II. Triangle Specific Options (Border and Background) ---

	triangle: {
		// Border Properties
		border: {
			// Numerical D-B Test: [Minimal, Boundary]
			width: [1,2,3,4],
			color: ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)', 'rgba(0, 0, 255, 1)'], // Red, Green, Blue
 
			// Enum Tests:
			style: [LineStyle.Solid, LineStyle.Dotted, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.SparseDotted],
		},
 
		// Background Properties
		background: {
			// Use transparent and a mix of solid/translucent colors
			color: ['rgba(0, 0, 0, 0)', 'rgba(255, 165, 0, 0.6)', 'rgba(0, 255, 0, 0.2)'], // Transparent, Translucent Orange, Translucent Green
		},
	},
};


/**
 * Defines prerequisite overrides needed to make certain test values visible or functional.
 */
export const TriangleContextualOverrides = {
	'notEditableCursor': {
		editable: false,
	},
};
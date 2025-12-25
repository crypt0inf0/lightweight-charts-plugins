// lightweight-charts-line-tool-freehand/src/TestConfig/BrushTestConfig.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType,
	LineJoin,
	LineCap,
} from 'lightweight-charts-line-tools-core';

// Import the canonical default options structure and master path
import { MASTER_BRUSH_PATH } from '../Data/BrushToolData';

// --- Point Generation Strategy Configuration ---

/**
 * Configuration that tells the generator how to create the tool's points.
 * For the Brush tool, this is a CannedPath strategy.
 */
export const BrushPointStrategyConfig = {
	strategy: 'CannedPath', // Explicitly use the CannedPath strategy
	path: MASTER_BRUSH_PATH, // The predefined complex path
};


// Define properties that should be generated even if the value matches the default (to ensure explicit testing)
export const PROPERTIES_TO_FORCE_TEST = [
	'line.width',
	'line.color',
	'line.style',
	'line.join',
	'line.cap',
	'background.color',
];

/**
 * Defines the unique values to test for every single primitive option
 * within the Brush tool's full options structure.
 */
export const BrushUniversalTestConfig = {

	// --- I. LineToolOptionsCommon (Boolean and Cursor Overrides) ---
	editable: [false],

	// Cursor Overrides 
	defaultHoverCursor: [PaneCursorType.Crosshair],
	defaultDragCursor: [PaneCursorType.ZoomIn],
	defaultAnchorHoverCursor: [PaneCursorType.VerticalResize],
	defaultAnchorDragCursor: [PaneCursorType.HorizontalResize],
	notEditableCursor: [PaneCursorType.Pointer],
	
	// --- II. Brush Specific Options (Line Properties) ---

	line: {
		// Numerical D-B Test: [Minimal, Boundary]
		width: [1,2,3,4, 10],
		color: ['rgba(255, 41, 177, 1)', 'rgba(255, 255, 0, 0.5)'], // Solid Magenta, Translucent Yellow
		
		// Enum Tests:
		style: [LineStyle.Solid, LineStyle.Dotted, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.SparseDotted],
		
		// Join (Should be Round, but test others)
		join: [LineJoin.Bevel, LineJoin.Round, LineJoin.Miter ], 
		// Cap (Should be Round, but test others)
		cap: [LineCap.Butt, LineCap.Round, LineCap.Square], 

	},

	// --- III. Background Fill ---
	
	background: {
		color: ['rgba(0, 0, 255, 0.3)', 'rgba(255, 0, 0, 0.3)'], // Test with translucent fill colors
	},
};


/**
 * Defines prerequisite overrides needed to make certain test values visible or functional.
 */
export const BrushContextualOverrides = {
	'notEditableCursor': {
		editable: false, 
	},
};
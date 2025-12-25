// lightweight-charts-line-tool-freehand/src/TestConfig/HighlighterTestConfig.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType,
	LineJoin,
	LineCap,
	LineEnd,
} from 'lightweight-charts-line-tools-core';

// Import the necessary constants from the data file
import { defaultHighlighterOptions, MASTER_HIGHLIGHTER_PATH } from '../Data/HighlighterToolData';

/**
 * The primary set of default options for the Highlighter Tool, used as the base
 * for every single test case generated.
 */
export const HighlighterOptionDefaults = defaultHighlighterOptions;


// --- Point Generation Strategy Configuration ---

/**
 * Configuration that tells the generator how to create the tool's points.
 * For the Highlighter tool, this is a CannedPath strategy.
 */
export const HighlighterPointStrategyConfig = {
	strategy: 'CannedPath', // Explicitly use the CannedPath strategy
	path: MASTER_HIGHLIGHTER_PATH, // The predefined complex path
};


// Define properties that should be generated even if the value matches the default (to ensure explicit testing)
export const PROPERTIES_TO_FORCE_TEST = [
	'line.width',
	'line.color',
	'line.style',
	'line.join',
	'line.cap',
	'line.end',
	'background.color',
];

/**
 * Defines the unique values to test for every single primitive option
 * within the Highlighter tool's full options structure.
 */
export const HighlighterUniversalTestConfig = {

	// --- I. LineToolOptionsCommon (Boolean and Cursor Overrides) ---
	editable: [false],

	// Cursor Overrides 
	defaultHoverCursor: [PaneCursorType.Crosshair],
	defaultDragCursor: [PaneCursorType.ZoomIn],
	defaultAnchorHoverCursor: [PaneCursorType.VerticalResize],
	defaultAnchorDragCursor: [PaneCursorType.HorizontalResize],
	notEditableCursor: [PaneCursorType.Pointer],
	
	// --- II. Highlighter Specific Options (Line Properties) ---

	line: {
		// Numerical D-B Test: [Minimal, Boundary]
		width: [5, 10, 30], // Test various widths, including smaller ones
		color: ['rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.1)'], // Translucent Green, Very Translucent Red
		
		// Enum Tests:
		// Note: Style should always be Solid for a true Highlighter effect, but we test others to ensure robustness
		style: [LineStyle.Solid, LineStyle.Dotted, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.SparseDotted],
		
		// Join (Should be Round, but test others)
		join: [LineJoin.Bevel, LineJoin.Round, LineJoin.Miter ], 
		
		// Cap (Should be Round, but test others)
		cap: [LineCap.Butt, LineCap.Round, LineCap.Square], 
	},

	// --- III. Background Fill ---
	
	background: {
		// Testing non-transparent backgrounds (should be ignored for Highlighter)
		color: ['rgba(0, 0, 255, 0.1)', 'rgba(255, 0, 255, 0.1)'], 
	},
};


/**
 * Defines prerequisite overrides needed to make certain test values visible or functional.
 */
export const HighlighterContextualOverrides = {
	'notEditableCursor': {
		editable: false, 
	},
};
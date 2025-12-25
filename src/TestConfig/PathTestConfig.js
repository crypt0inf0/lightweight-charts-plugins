// /src/TestConfig/PathTestConfig.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType,
	LineJoin,
	LineCap,
	LineEnd,
} from 'lightweight-charts-line-tools-core';

// Import the canonical master path
import { MASTER_PATH } from '../Data/PathToolData';

// --- Point Generation Strategy Configuration ---

/**
 * Configuration that tells the generator how to create the tool's points.
 * For the Path tool, this is a CannedPath strategy based on the 5-point zig-zag.
 */
export const PathPointStrategyConfig = {
	strategy: 'CannedPath', // Explicitly use the CannedPath strategy
	path: MASTER_PATH, // The predefined 5-point zig-zag path
};


// Define properties that should be generated even if the value matches the default (to ensure explicit testing)
export const PROPERTIES_TO_FORCE_TEST = [
	'line.width',
	'line.color',
	'line.style',
	'line.join',
	'line.cap',
	'line.end.right',
	'line.end.left',
];

/**
 * Defines the unique values to test for every single primitive option
 * within the Path tool's full options structure.
 */
export const PathUniversalTestConfig = {

	// --- I. LineToolOptionsCommon (Boolean and Cursor Overrides) ---
	
	editable: [false],

	// Cursor Overrides 
	defaultHoverCursor: [PaneCursorType.Crosshair],
	defaultDragCursor: [PaneCursorType.ZoomIn],
	defaultAnchorHoverCursor: [PaneCursorType.VerticalResize],
	defaultAnchorDragCursor: [PaneCursorType.HorizontalResize],
	notEditableCursor: [PaneCursorType.Pointer],
	
	// --- II. Path Specific Options (Line Properties) ---

	line: {
		// Numerical D-B Test: [Minimal, Boundary]
		width: [1, 2, 3, 4],
		
		color: ['rgba(255, 0, 0, 1)', 'rgba(0, 255, 0, 1)', 'rgba(0, 0, 255, 0.5)'], // Red, Green, Translucent Blue
 
		// Enum Tests:
		style: [LineStyle.Solid, LineStyle.Dotted, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.SparseDotted],
 
		// Enum Tests: Testing all non-default LineJoin values
		join: [LineJoin.Bevel, LineJoin.Round, LineJoin.Miter ], // Default is Round
 
		// Enum Tests: Testing all non-default LineCap values
		cap: [LineCap.Butt, LineCap.Round, LineCap.Square,], // Default is Square
		
		end: {
			right: [LineEnd.Normal, LineEnd.Arrow, LineEnd.Circle],
			left: [LineEnd.Normal, LineEnd.Arrow, LineEnd.Circle],
		},

	},
};


/**
 * Defines prerequisite overrides needed to make certain test values visible or functional.
 */
export const PathContextualOverrides = {
	'notEditableCursor': {
		editable: false,
	},
	'line.join': {
        line: {
           width: 50,
        },
    },
	'line.cap': {
        line: {
           width: 20,
        },
    },	
};
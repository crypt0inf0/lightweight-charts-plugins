// /src/TestConfig/CrossLineTestConfig.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType, LineEnd, deepCopy
} from 'lightweight-charts-line-tools-core';

// --- Import data specific to the CrossLine tool ---
import { defaultCrossLineOptions } from '../Data/CrossLineToolData';

// ----------------------------------------------------------------------
// 1. BASELINE DEFAULTS FOR CROSS LINE
// ----------------------------------------------------------------------
// The master defaults for all single-override tests.
export const CrossLineOptionDefaults = deepCopy(defaultCrossLineOptions);

// --- Constants & Config for Generator Hook ---
export const PROPERTIES_TO_FORCE_TEST = [
	'line.style',
	'line.width',
	'line.color',
	'line.end.left',
	'line.end.right',
];

/**
 * Defines the unique value to test for every single primitive option
 * within the CrossLine tool's full options structure.
 */
export const CrossLineUniversalTestConfig = {

	// --- I. LineToolOptionsCommon (Boolean and Cursor Overrides) ---
	editable: [false],

	// Cursor Overrides (Testing only one non-default value) - USING ENUMERATIONS
	defaultHoverCursor: [PaneCursorType.Copy],
	defaultDragCursor: [PaneCursorType.ZoomIn],
	defaultAnchorHoverCursor: [PaneCursorType.VerticalResize],
	defaultAnchorDragCursor: [PaneCursorType.HorizontalResize], 
	notEditableCursor: [PaneCursorType.Pointer],

	// Label Visibility / Persistence Testing 
	showPriceAxisLabels: [false], 
	showTimeAxisLabels: [false], 
	priceAxisLabelAlwaysVisible: [false],
	timeAxisLabelAlwaysVisible: [false], 


	// --- II. CrossLine Specific Options ---

	// A. Line Properties
	line: {
		// Numerical D-B Test: [Minimal, Boundary]
		width: [1, 2, 3, 4],

		color: ['rgba(255, 0, 255, 1)'], // Magenta

		// Enum Tests: Testing all non-default LineStyle values
		style: [LineStyle.Solid, LineStyle.Dotted, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.SparseDotted],

		// End points (for all 4 segments)
		end: {
			left: [LineEnd.Normal, LineEnd.Arrow, LineEnd.Circle], // Default is Normal
			right: [LineEnd.Normal, LineEnd.Arrow, LineEnd.Circle],
		},
	},
};


// ----------------------------------------------------------------------
// 3. CONTEXTUAL OVERRIDES (Not required for CrossLine as it has no complex text/box options)
// ----------------------------------------------------------------------

export const CrossLineContextualOverrides = {
	// Simple overrides for necessary boolean flags
	'notEditableCursor': { editable: false },
};
// /src/TestConfig/ParallelChannelTestConfig.js

import { LineStyle } from 'lightweight-charts';
import { deepCopy, PaneCursorType } from 'lightweight-charts-line-tools-core';

// --- Import Tool Defaults ---
import { defaultParallelChannelOptions } from '../Data/ParallelChannelToolData';


// ----------------------------------------------------------------------
// 1. BASELINE DEFAULTS FOR PARALLEL CHANNEL TOOL
// ----------------------------------------------------------------------
export const ParallelChannelOptionDefaults = deepCopy(defaultParallelChannelOptions);


// --- Constants & Config for Generator Hook ---
export const PROPERTIES_TO_FORCE_TEST = [
	'channelLine.width',
	'channelLine.style',
	'channelLine.color',
	'middleLine.width',
	'middleLine.style',
	'middleLine.color',
	'extend.left',
	'extend.right',
	'showMiddleLine',
	'priceAxisLabelAlwaysVisible',
	'timeAxisLabelAlwaysVisible',
];

/**
 * Defines the unique value to test for every single primitive option
 * within the Parallel Channel tool's full options structure.
 */
export const ParallelChannelUniversalTestConfig = {

	// --- I. LineToolOptionsCommon ---
	editable: [false],

	// Cursor Overrides (Testing only one non-default value) - USING ENUMERATIONS
	defaultHoverCursor: [PaneCursorType.Crosshair],
	defaultDragCursor: [PaneCursorType.ZoomIn],
	defaultAnchorHoverCursor: [PaneCursorType.VerticalResize],
	defaultAnchorDragCursor: [PaneCursorType.HorizontalResize],
	notEditableCursor: [PaneCursorType.Pointer],	

	// Label Visibility
	showPriceAxisLabels: [true],
	showTimeAxisLabels: [true],
	priceAxisLabelAlwaysVisible: [true],
	timeAxisLabelAlwaysVisible: [true],

	

	// --- II. Parallel Channel Specific Options ---
	
	showMiddleLine: [false], // Toggle boolean visibility

	// A. Channel Line Properties (The two outer lines)
	channelLine: {
		width: [1, 2, 3, 4], 
		style: [LineStyle.Solid, LineStyle.Dotted, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.SparseDotted],
		color: ['rgba(255, 41, 177, 1)'], // Pink/Magenta
	},

	// B. Middle Line Properties
	middleLine: {
		width: [1, 2, 3, 4],
		style: [LineStyle.Solid, LineStyle.Dotted, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.SparseDotted],
		color: ['rgba(0, 255, 0, 1)'], // Green
	},
 
	// C. Extension Properties (The two outer lines)
	extend: {
		left: [true],
		right: [true],
	},

	testInfiniteLine: [true],

	// D. Background Properties
	background: {
		color: ['rgba(0, 76, 255, 0.4)', 'rgba(111, 0, 255, 0.9)'], // Yellow background
	},
};


// ----------------------------------------------------------------------
// 3. CONTEXTUAL OVERRIDES
// ----------------------------------------------------------------------

export const ParallelChannelContextualOverrides = {
	// Simple overrides for necessary boolean flags
	'editable': {
		editable: false,
	},
	'notEditableCursor': {
		editable: false,
	},
	'priceAxisLabelAlwaysVisible': {
		showPriceAxisLabels: true,
	},
	'timeAxisLabelAlwaysVisible': {
		showTimeAxisLabels: true,
	},
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
};
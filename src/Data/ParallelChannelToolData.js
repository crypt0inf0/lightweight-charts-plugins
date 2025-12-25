// /src/Data/ParallelChannelToolData.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType,
} from 'lightweight-charts-line-tools-core';

// --- Import base data helpers (assuming they are in the same relative path) ---
import { baseTimestamp, day, hour, createPoints, createLineToolPoint } from '../Hooks/ToolDataUtils';


// --- I. Programmatic Example Paths (3 Points Required) ---

// Helper function to create a 3-point tool structure
const create3Point = (t0, p0, t1, p1, t2, p2) => [
    createLineToolPoint(t0, p0),
    createLineToolPoint(t1, p1),
    createLineToolPoint(t2, p2),
];

// Path A: Simple upward channel
export const pointsForChannelA = create3Point(
    10, 100, // P0: Start of base
    20, 130, // P1: End of base
    10, 115  // P2: Offset for width
);

// Path B: Downward channel, wider/steeper
export const pointsForChannelB = create3Point(
    10, 180, // P0
    25, 140, // P1
    10, 175  // P2
);

// Path C: Off-screen top for culling test
export const pointsForChannelC_OffScreenTop = create3Point(
    10, 230, // P0
    20, 240, // P1
    10, 235  // P2
);


// --- II. Master Path for Automated Testing (MASTER_PATH_3_POINT) ---

// A simple 3-point channel template starting at Day 0, Price 100
export const MASTER_PATH_3_POINT = [
	createLineToolPoint(0, 100),   // P0: Base Line Start
	createLineToolPoint(5, 105),   // P1: Base Line End (5 days, 5 price units higher)
	createLineToolPoint(0, 115),   // P2: Offset Point (1 day, 15 price units higher than P0)
];


// --- III. Default Options for Parallel Channel Tool ---

export const defaultParallelChannelOptions = {
	ownerSourceId: '',
	defaultHoverCursor: PaneCursorType.Pointer,
	defaultDragCursor: PaneCursorType.Move,
	defaultAnchorHoverCursor: PaneCursorType.Pointer,
	defaultAnchorDragCursor: PaneCursorType.Grabbing,
	notEditableCursor: PaneCursorType.NotAllowed,
	showPriceAxisLabels: false,
	showTimeAxisLabels: false,
	priceAxisLabelAlwaysVisible: false,
	timeAxisLabelAlwaysVisible: false,

	// Channel specific options
	channelLine: {
		width: 2,
		color: '#2962ff',
		style: LineStyle.Solid,
	},
	middleLine: {
		width: 1,
		color: '#FF9800',
		style: LineStyle.Dashed,
	},
	showMiddleLine: true,
	extend: { left: false, right: false },
	background: { color: 'rgba(41, 98, 255, 0.2)' },
	
	visible: true,
	editable: true,
};

// --- IV. Custom Options for Testing ---

export const exoticParallelChannelOptions = {
	toolType: 'ParallelChannel',
	channelLine: {
		width: 4,
		color: 'rgba(255, 0, 0, 1)', // Red line
		style: LineStyle.LargeDashed,
	},
	middleLine: {
		width: 3,
		color: 'rgba(0, 255, 0, 1)', // Green middle line
		style: LineStyle.Solid,
	},
	showMiddleLine: false,
	extend: { left: true, right: true },
	background: { color: 'rgba(255, 0, 0, 0.1)' },
	visible: true,
	editable: true,
};


// --- Options for specific createOrUpdateLineTool tests ---

export const channelX_InitialOptions = {
	toolType: 'ParallelChannel',
	channelLine: { color: 'rgba(255, 255, 255, 1)', width: 1, style: LineStyle.Dotted },
	middleLine: { color: 'rgba(255, 255, 255, 1)', width: 1, style: LineStyle.Dotted },
	showMiddleLine: true,
	extend: { left: true, right: false },
	background: { color: 'rgba(255, 255, 255, 0.1)' },
	visible: true,
	editable: true,
};

// Test updating style and extensions
export const channelX_UpdatedOptions = {
	toolType: 'ParallelChannel',
	channelLine: { color: 'rgba(0, 255, 255, 1)', width: 3, style: LineStyle.Solid },
	middleLine: { color: 'rgba(255, 0, 255, 1)', width: 3, style: LineStyle.Solid },
	showMiddleLine: false,
	extend: { left: false, right: true },
	background: { color: 'rgba(0, 255, 255, 0.2)' },
	visible: true,
	editable: true,
};
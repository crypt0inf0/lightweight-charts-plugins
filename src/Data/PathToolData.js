// /src/Data/PathToolData.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType,
	LineJoin,
	LineEnd,
	LineCap,
} from 'lightweight-charts-line-tools-core';

// --- Re-use common data helpers from the existing test app structure ---
// NOTE: Assuming createLineToolPoint is the core helper from ToolDataUtils.js
import { createLineToolPoint } from '../Hooks/ToolDataUtils';


// --- I. Programmatic Example Paths (Simple Path A & B) ---

// Path A: A standard 3-point path (for programmatic test button A)
export const pointsForPathA = [
	createLineToolPoint(8, 175), // Day 2, Price 175
	createLineToolPoint(14, 185), // Day 5, Price 185
	createLineToolPoint(18, 170), // Day 8, Price 170
];

// Path B: A path with custom style (for programmatic test button B)
export const pointsForPathB = [
	createLineToolPoint(12, 160), // Day 12, Price 160
	createLineToolPoint(15, 165), // Day 15, Price 165
	createLineToolPoint(18, 160), // Day 18, Price 160
	createLineToolPoint(21, 155), // Day 21, Price 155
];

// --- II. Master Path for Automated Testing (MASTER_PATH) ---

// 5-point Horizontal Zig-Zag pattern starting at Day 0, Price 100.
// This path is designed to be translated by the test surface generator.
export const MASTER_PATH = [
	// P0: Start at Day 0, Price 100
	createLineToolPoint(0, 100),
	// P1: Day 2, Price 102 (Up slightly)
	createLineToolPoint(2, 102),
	// P2: Day 4, Price 100 (Down to base)
	createLineToolPoint(4, 100),
	// P3: Day 6, Price 102 (Up again)
	createLineToolPoint(6, 102),
	// P4: Day 8, Price 100 (End at base)
	createLineToolPoint(8, 100),
];

// --- III. Default Options for Path Tool ---
// Note: These must match the defaults defined in LineToolPath.ts
//GOTCHA something wrong with path grogramatic options
export const defaultPathOptions = {
	//toolType: 'Path',

	// --- Common Options ---
	visible: true,
	editable: true,
	defaultHoverCursor: PaneCursorType.Pointer,
	defaultDragCursor: PaneCursorType.Grabbing,
	defaultAnchorDragCursor: PaneCursorType.Grabbing,
	defaultAnchorHoverCursor: PaneCursorType.Pointer,
	notEditableCursor: PaneCursorType.NotAllowed,
	showPriceAxisLabels: false,
	showTimeAxisLabels: false,
	priceAxisLabelAlwaysVisible: false,
	timeAxisLabelAlwaysVisible: false,

	// --- Path Specific Options (Line & End) ---
	line: {
		width: 1,
		color: '#2962ff', // Default blue color
		style: LineStyle.Solid,
		join: LineJoin.Bevel,
		cap: LineCap.Butt,
		end: { left: LineEnd.Normal, right: LineEnd.Arrow }, // Arrowhead on the final segment
	},
};

// --- IV. Custom Options for Testing ---
// Example for a custom style (e.g., thick red dashed line)
export const customPathOptions = {
	toolType: 'Path',
	line: {
		width: 3,
		color: 'rgba(255, 0, 0, 1)',
		style: LineStyle.Dashed,
		join: LineJoin.Bevel,
		cap: LineCap.Butt,
		end: { left: LineEnd.Circle, right: LineEnd.Arrow },
	},
};
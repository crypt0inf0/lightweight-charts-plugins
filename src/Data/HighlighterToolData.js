// lightweight-charts-line-tool-freehand/src/Data/HighlighterToolData.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType,
	LineJoin,
	LineEnd,
} from 'lightweight-charts-line-tools-core';

// --- Re-use common data helpers from the existing test app structure ---
// Assuming these are available from the RectangleToolData context
import { baseTimestamp, day, hour, createPoints } from './RectangleToolData'; 


// --- I. Default Options for Highlighter Tool ---
export const defaultHighlighterOptions = {
	toolType: 'Highlighter',
	
	// --- Common Options ---
	visible: true,
	editable: true,
	defaultHoverCursor: PaneCursorType.Pointer,
	defaultDragCursor: PaneCursorType.Grabbing,
	showPriceAxisLabels: false,
	showTimeAxisLabels: false,

	// --- Highlighter Specific Options (Line & Background) ---
	line: {
		width: 20,
		color: 'rgba(255, 255, 0, 0.4)',
		style: LineStyle.Solid,
		join: LineJoin.Round,
		end: { left: LineEnd.Normal, right: LineEnd.Normal },
	},

	background: {
		color: 'rgba(146, 27, 27, 0)', // Transparent
	},
};

// --- II. Programmatic Example Paths (Copied from Brush to keep separate data dependencies) ---

// A complex path (U-shape) for the test cases
export const pointsForHighlighterA = [
	createPoints(baseTimestamp + 2 * day, 150)[0],
	createPoints(baseTimestamp + 3 * day, 155)[0],
	createPoints(baseTimestamp + 4 * day, 160)[0],
	createPoints(baseTimestamp + 5 * day, 165)[0],
	createPoints(baseTimestamp + 6 * day, 160)[0],
	createPoints(baseTimestamp + 7 * day, 155)[0],
	createPoints(baseTimestamp + 8 * day, 150)[0],
];

// A short, tight path for testing low point counts
export const pointsForHighlighterB = [
	createPoints(baseTimestamp + 10 * day, 180)[0],
	createPoints(baseTimestamp + 11 * day, 178)[0],
	createPoints(baseTimestamp + 12 * day, 175)[0],
];

// --- III. Master Path for Automated Testing (MASTER_HIGHLIGHTER_PATH) ---

// This path is identical to the Brush path, but defined under its own constant.
export const MASTER_HIGHLIGHTER_PATH = [
	// Start point (relative offsets)
	createPoints(0 * day, 100)[0],
	createPoints(1 * day, 105)[0], 
	createPoints(2 * day, 115)[0], 
	createPoints(3 * day, 120)[0], 
	// Mid-point (Curve)
	createPoints(4 * day, 118)[0], 
	createPoints(5 * day, 110)[0], 
	// End point
	createPoints(6 * day, 105)[0], 
	createPoints(7 * day, 100)[0], 
];
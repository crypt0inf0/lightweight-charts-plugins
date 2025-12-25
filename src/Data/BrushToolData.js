// lightweight-charts-line-tool-freehand/src/Data/BrushToolData.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType,
	LineEnd,
	LineJoin,
} from 'lightweight-charts-line-tools-core';

// --- Re-use common data helpers from the existing test app structure ---
// Assuming these are available from the RectangleToolData context
import { baseTimestamp, day, hour, createPoints } from './RectangleToolData'; 


// --- I. Default Options for Brush Tool (Simplified for Data File) ---
export const defaultBrushOptions = {
	toolType: 'Brush',
	
	// --- Common Options ---
	visible: true,
	editable: true,
	defaultHoverCursor: PaneCursorType.Pointer,
	defaultDragCursor: PaneCursorType.Grabbing,
	showPriceAxisLabels: false,
	showTimeAxisLabels: false,

	// --- Brush Specific Options (Line & Background) ---
	line: {
		width: 4,
		color: 'rgba(0, 188, 212, 1)', // Cyan
		style: LineStyle.Solid,
		join: LineJoin.Round,
		end: { left: LineEnd.Normal, right: LineEnd.Normal },
		extend: { left: false, right: false },
	},

	background: {
		color: 'rgba(0, 0, 0, 0)', // Transparent
	},
};

// --- II. Programmatic Example Paths ---

// A complex path (U-shape) for the test cases
export const pointsForBrushA = [
	createPoints(baseTimestamp + 2 * day, 150)[0], // Start Day 2
	createPoints(baseTimestamp + 3 * day, 155)[0], // Day 3
	createPoints(baseTimestamp + 4 * day, 160)[0], // Day 4
	createPoints(baseTimestamp + 5 * day, 165)[0], // Day 5 (Peak)
	createPoints(baseTimestamp + 6 * day, 160)[0], // Day 6
	createPoints(baseTimestamp + 7 * day, 155)[0], // Day 7
	createPoints(baseTimestamp + 8 * day, 150)[0], // Day 8 (End)
];

// A short, tight path for testing low point counts
export const pointsForBrushB = [
	createPoints(baseTimestamp + 10 * day, 180)[0], // Day 10
	createPoints(baseTimestamp + 11 * day, 178)[0], // Day 11
	createPoints(baseTimestamp + 12 * day, 175)[0], // Day 12
];

// --- III. Master Path for Automated Testing (MASTER_BRUSH_PATH) ---

// This path is designed to be moved and stretched by the test generator.
// It features a distinctive curve and direction change.
export const MASTER_BRUSH_PATH = [
	// Start point
	createPoints(0 * day, 100)[0],
	createPoints(1 * day, 105)[0], // +1 day
	createPoints(2 * day, 115)[0], // +2 days
	createPoints(3 * day, 120)[0], // +3 days
	// Mid-point (Curve)
	createPoints(4 * day, 118)[0], // +4 days
	createPoints(5 * day, 110)[0], // +5 days
	// End point
	createPoints(6 * day, 105)[0], // +6 days
	createPoints(7 * day, 100)[0], // +7 days
];


// --- IV. Custom Options for Highlighter ---

export const defaultHighlighterOptions = {
	toolType: 'Brush',
	line: {
		width: 20, // Thick line
		color: 'rgba(255, 255, 0, 0.4)', // Translucent Yellow
		style: LineStyle.Solid,
		join: LineJoin.Round,
		end: { left: LineEnd.Normal, right: LineEnd.Normal },
		extend: { left: false, right: false },
	},
	background: {
		color: 'rgba(0, 0, 0, 0)', // Transparent
	},
};
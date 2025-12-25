// /src/Data/TriangleToolData.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType,
	LineJoin,
	LineEnd,
	LineCap,
} from 'lightweight-charts-line-tools-core';

// Import core helpers
import { createLineToolPoint } from '../Hooks/ToolDataUtils';
import { baseTimestamp, day } from './RectangleToolData'; 


// --- I. Programmatic Example Paths ---

// Path A: A standard upright triangle (3 points)
export const pointsForTriangleA = [
	createLineToolPoint(2, 180), // Day 2, Price 180 (Base Left)
	createLineToolPoint(8, 180), // Day 8, Price 180 (Base Right)
	createLineToolPoint(5, 195), // Day 5, Price 195 (Peak)
];

// Path B: A right-angled triangle with different styling
export const pointsForTriangleB = [
	createLineToolPoint(12, 160), // Day 12, Price 160 (Corner 1)
	createLineToolPoint(12, 175), // Day 12, Price 175 (Corner 2 - Vertical)
	createLineToolPoint(18, 175), // Day 18, Price 175 (Corner 3 - Horizontal)
];

// --- II. Master Path for Automated Testing (MASTER_TRIANGLE_PATH) ---

// This is the base shape for the test surface generator to translate.
// A simple, non-axis-aligned triangle.
export const MASTER_TRIANGLE_PATH = [
	// P0
	createLineToolPoint(0, 100),
	// P1
	createLineToolPoint(5, 105),
	// P2
	createLineToolPoint(2, 115),
];


// --- III. Default Options for Triangle Tool ---
// Note: These must match the structure defined in LineToolTriangle.ts model
export const defaultTriangleOptions = {
	toolType: 'Triangle',

	// --- Common Options ---
	visible: true,
	editable: true,
	defaultHoverCursor: PaneCursorType.Pointer,
	defaultDragCursor: PaneCursorType.Grabbing,
	showPriceAxisLabels: true,
	showTimeAxisLabels: true,

	// --- Triangle Specific Options ---
	triangle: {
		background: { 
            color: 'rgba(76, 175, 80, 0.4)', // Translucent Green Fill
            // inflation is OMITTED as per interface
        },
		border: { 
            color: 'rgba(238, 0, 255, 1)', // Green Border
            width: 2, 
            style: LineStyle.Solid,
            // radius/highlight are OMITTED as per interface
        },
	},
};

// --- IV. Custom Options for Custom Style Test ---
// Example for a dashed, thick, filled triangle
export const customTriangleOptions = {
	toolType: 'Triangle',
	triangle: {
		background: { 
            color: 'rgba(244, 67, 54, 0.4)', // Translucent Red Fill
        },
		border: { 
            color: '#f44336', // Red Border
            width: 4, 
            style: LineStyle.Dashed,
        },
	},
};
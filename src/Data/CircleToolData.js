// File: /src/Data/CircleToolData.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType,
	TextAlignment,
	BoxVerticalAlignment,
	BoxHorizontalAlignment,
} from 'lightweight-charts-line-tools-core';
import { baseTimestamp, day, createPoints } from './RectangleToolData'; // Reuse common data and helpers

// --- 1. Default-looking Circle (for setActive + interactive, addLineTool + programmatic) ---
export const defaultCircleOptions = {
	toolType: 'Circle',
	
	// --- Common Options ---
	visible: true,
	editable: true,
	defaultHoverCursor: PaneCursorType.Pointer,
	defaultDragCursor: PaneCursorType.Grabbing,
	defaultAnchorHoverCursor: PaneCursorType.Pointer,
	defaultAnchorDragCursor: PaneCursorType.Grabbing,
	notEditableCursor: PaneCursorType.NotAllowed,
	showPriceAxisLabels: true,
	showTimeAxisLabels: true,
	priceAxisLabelAlwaysVisible: false,
	timeAxisLabelAlwaysVisible: false,

	// --- Circle Specific Options ---
	circle: {
		background: {
			color: "rgba(156,39,176,0.2)", // Semi-transparent Purple
		},
		border: {
			color: "#9c27b0", // Solid Purple border
			width: 1,
			style: LineStyle.Solid,
		},
		// extend is omitted in CircleOptions as agreed
	},

	// --- Text Options (Minimal default for structure) ---
	text: {
		value: "",
		alignment: TextAlignment.Center,
		font: {
			color: "rgba(255, 255, 255, 1)",
			size: 12,
			bold: false,
			italic: false,
			family: "Arial"
		},
		box: {
			alignment: {
				vertical: BoxVerticalAlignment.Middle,
				horizontal: BoxHorizontalAlignment.Center
			},
			angle: 0,
			scale: 1,
			padding: { x: 0, y: 0 },
			maxHeight: 100,
			shadow: {
				blur: 0,
				color: "rgba(0,0,0,0)",
				offset: { x: 0, y: 0 }
			},
			border: {
				color: "rgba(0,0,0,0)",
				width: 1,
				radius: 0,
				highlight: false,
				style: LineStyle.Solid
			},
			background: {
				color: "rgba(0,0,0,0)",
				inflation: { x: 0, y: 0 }
			},
		},
		padding: 0,
		wordWrapWidth: 0,
		forceTextAlign: false,
		forceCalculateMaxLineWidth: false
	},
};

// --- 2. Custom Blue Circle with Text (for setActive + interactive) ---
export const blueCircleOptions = {
	toolType: 'Circle',
	circle: {
		background: { color: 'rgba(0, 100, 255, 0.3)' }, // Semi-transparent Blue
		border: { width: 3, style: LineStyle.Dotted, color: '#0064FF' }, // Thicker, dotted blue border
	},
	text: {
		value: 'Target Zone',
		alignment: TextAlignment.Center,
		font: { size: 16, color: 'white', family: 'Arial', bold: true },
		box: {
			alignment: { vertical: BoxVerticalAlignment.Top, horizontal: BoxHorizontalAlignment.Center },
			padding: { x: 5, y: 5 },
			background: { color: 'rgba(0,0,0,0.5)' },
			border: { width: 1, color: 'rgba(255,255,255,0.8)', radius: 5, style: LineStyle.Solid },
		},
	},
	visible: true,
	editable: true,
};


// --- Example LineToolPoint arrays for programmatic 'addLineTool' calls ---
// Note: Points are Center (P0) and Radius Point (P1)
export const pointsForCircleA = createPoints(baseTimestamp + 1 * day, 180, baseTimestamp + 3 * day, 150); // Diagonal radius
export const pointsForCircleB = createPoints(baseTimestamp + 6 * day, 160, baseTimestamp + 6 * day, 120); // Vertical radius (to test shift constraint)
export const pointsForCircleC = createPoints(baseTimestamp + 12 * day, 170, baseTimestamp + 10 * day, 170); // Horizontal radius
// File: /src/Data/RectangleToolData.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType,
	TextAlignment,
	BoxVerticalAlignment,
	BoxHorizontalAlignment,
} from 'lightweight-charts-line-tools-core';

// --- Constants for Timestamps (Moved from original testData.js) ---
export const baseTimestamp = 1756857600; // Sept 1, 2025 (UTC)
export const hour = 60 * 60; // One hour in seconds
export const day = 24 * 60 * 60; // One day in seconds


// --- Helper for generating LineToolPoint arrays (Moved from original testData.js) ---
export function createPoints(time1, price1, time2, price2) {

	if ((time1 && price1) && (!time2 && !price2)) {
		return [
			{ timestamp: time1, price: price1 }
		]
	}

	if ((time1 && price1) && (time2 && price2)) {
		return [
			{ timestamp: time1, price: price1 },
			{ timestamp: time2, price: price2 },
		];
	}

	return [
		{ timestamp: time1, price: price1 },
		{ timestamp: time2, price: price2 },
	];
}

// --- Helper to create a single LineToolPoint using day offsets ---
export const createLineToolPoint = (dayOffset, price) => {
	return {
		timestamp: baseTimestamp + dayOffset * day,
		price: price
	};
};


// --- 1. Default-looking Rectangle (for setActive + interactive, addLineTool + programmatic) ---
export const defaultRectangleOptions = {
	// --- Common Options ---
	toolType: 'Rectangle',
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

	// --- Rectangle Specific Options ---
	rectangle: {
		background: {
			color: "rgba(156,39,176,0.2)",
			inflation: {
				x: 0,
				y: 0
			}
		},
		border: {
			color: "rgba(255, 247, 6, 1)",
			width: 1,
			radius: 0,
			highlight: false,
			style: LineStyle.Solid // 0 is LineStyle.Solid
		},
		extend: {
			right: false,
			left: false
		}
	},

	// --- Text Options ---
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
				vertical: BoxVerticalAlignment.Top,
				horizontal: BoxHorizontalAlignment.Center
			},
			angle: 0,
			scale: 1,
			offset: {
				x: 0,
				y: 0
			},
			padding: {
				x: 0,
				y: 0
			},
			maxHeight: 100,
			shadow: {
				blur: 0,
				color: "rgba(255,255,255,0)",
				offset: {
					x: 0,
					y: 0
				}
			},
			border: {
				color: "rgba(255,255,255,0)",
				width: 1,
				radius: 0,
				highlight: false,
				style: LineStyle.Solid
			},
			background: {
				color: "rgba(255,255,255,0)",
				inflation: {
					x: 0,
					y: 0
				}
			}
		},
		padding: 0,
		wordWrapWidth: 0,
		forceTextAlign: false,
		forceCalculateMaxLineWidth: false
	},
};

// --- 2. Red Rounded Rectangle with Basic Text (editable) ---
export const redRoundedRectangleOptions = {
	toolType: 'Rectangle',
	rectangle: {
		background: { color: 'rgba(255,0,0,0.3)' },
		border: { width: 2, style: LineStyle.Dashed, color: '#FF0000', radius: 10 },
	},
	text: {
		value: 'Rounded Red Box',
		alignment: TextAlignment.Center,
		font: { size: 16, color: 'white', family: 'Arial', bold: true },
		box: {
			alignment: { vertical: BoxVerticalAlignment.Middle, horizontal: BoxHorizontalAlignment.Center },
			padding: { x: 5, y: 5 },
			background: { color: 'rgba(0,0,0,0.5)' },
			border: { width: 1, color: 'rgba(255,255,255,0.8)', radius: 5, style: LineStyle.Solid },
		},
	},
	visible: true,
	editable: true,
};

// --- 3. Green Rectangle with Word-Wrapped, Max-Height Text (non-editable for testing applyLineToolOptions) ---
export const greenWordWrappedTextRectangleOptions = {
	toolType: 'Rectangle',
	rectangle: {
		background: { color: 'rgba(0,255,0,0.2)' },
		border: { width: 1, style: LineStyle.Solid, color: '#00FF00' },
	},
	text: {
		value: 'This is a long piece of text that should wrap within the specified word wrap width and be truncated if it exceeds the maximum height allowed for the text box. This is a very long sentence to test word wrapping extensively.',
		alignment: TextAlignment.Start,
		font: { size: 10, color: '#333333', family: 'Verdana' },
		box: {
			alignment: { vertical: BoxVerticalAlignment.Top, horizontal: BoxHorizontalAlignment.Left },
			offset: { x: 5, y: -5 }, // Offset slightly outside top-left
			padding: { x: 3, y: 3 },
			maxHeight: 40, // Limit height to test truncation
			background: { color: 'rgba(255,255,255,0.9)' },
			border: { width: 0.5, color: '#CCCCCC', radius: 0, style: LineStyle.Solid },
		},
		wordWrapWidth: 150, // Test word wrapping
	},
	visible: true,
	editable: true, // make editable by default for addLineTool, apply can change
};

// --- 4. Blue Rectangle with Rotated Text (editable) ---
export const blueRotatedTextRectangleOptions = {
	toolType: 'Rectangle',
	rectangle: {
		background: { color: 'rgba(0,0,255,0.2)' },
		border: { width: 1, style: LineStyle.Dotted, color: '#0000FF' },
	},
	text: {
		value: 'Rotated Text Example',
		alignment: TextAlignment.Center,
		font: { size: 18, color: 'yellow', family: 'Impact', bold: true },
		box: {
			alignment: { vertical: BoxVerticalAlignment.Middle, horizontal: BoxHorizontalAlignment.Center },
			angle: 45, // Rotate text 45 degrees
			padding: { x: 8, y: 8 },
			shadow: { blur: 5, color: 'rgba(0,0,0,0.7)', offset: { x: 3, y: 3 } },
			background: { color: 'rgba(50,50,50,0.7)' },
		},
	},
	visible: true,
	editable: true,
};

// --- 5. Rectangle with Text Box Inflation ---
export const inflatedTextBoxRectangleOptions = {
	toolType: 'Rectangle',
	rectangle: {
		background: { color: 'rgba(255,165,0,0.2)' },
		border: { width: 1, style: LineStyle.Solid, color: '#FFA500' },
	},
	text: {
		value: 'Inflated Text Box',
		alignment: TextAlignment.Center,
		font: { size: 14, color: 'white' },
		box: {
			alignment: { vertical: BoxVerticalAlignment.Bottom, horizontal: BoxHorizontalAlignment.Left },
			offset: { x: 0, y: 0 },
			padding: { x: 5, y: 5 },
			background: {
				color: 'rgba(100,0,100,0.6)',
				inflation: { x: 20, y: 10 }, // Inflate text box background
			},
			border: { width: 2, color: 'purple', radius: 3, style: LineStyle.Dashed },
		},
	},
	visible: true,
	editable: true,
};


// --- Example LineToolPoint arrays for programmatic 'addLineTool' calls ---

export const pointsForRectA = createPoints(baseTimestamp + 2 * day, 180, baseTimestamp + 7 * day, 120);
export const pointsForRectB = createPoints(baseTimestamp + 9 * day, 190, baseTimestamp + 14 * day, 130);
export const pointsForRectC = createPoints(baseTimestamp + 16 * day, 170, baseTimestamp + 21 * day, 110);
export const pointsForRectD_outside = createPoints(baseTimestamp + 25 * day, 180, baseTimestamp + 30 * day, 120);
export const pointsForRectE_far_outside = createPoints(baseTimestamp + 50 * day, 170, baseTimestamp + 60 * day, 100);


// --- Options for specific createOrUpdateLineTool tests ---
export const rectX_InitialOptions = {
	toolType: 'Rectangle',
	rectangle: { background: { color: 'rgba(255,255,0,0.3)' }, border: { width: 1, color: 'yellow' } },
	text: { value: 'RECT_X Initial' },
	visible: true,
	editable: true,
};

export const rectX_UpdatedOptions = {
	toolType: 'Rectangle',
	rectangle: { background: { color: 'rgba(0,100,255,0.4)' }, border: { width: 3, color: 'lightblue', style: LineStyle.Dotted } },
	text: { value: 'RECT_X Updated', font: { color: 'lightblue', size: 16 } },
	visible: true,
	editable: true,
};

export const rectX_NonEditableOptions = {
	toolType: 'Rectangle',
	rectangle: { background: { color: 'rgba(255,50,50,0.2)' }, border: { width: 1, color: 'red' } },
	text: { value: 'RECT_X Non-Editable' },
	visible: true,
	editable: false,
};
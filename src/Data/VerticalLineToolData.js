// /src/Data/VerticalLineToolData.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType,
	LineEnd,
	TextAlignment,
	BoxVerticalAlignment,
	BoxHorizontalAlignment,
} from 'lightweight-charts-line-tools-core';

// --- Import base data helpers (assuming they are in the same relative path) ---
import { baseTimestamp, day, hour, createPoints } from './RectangleToolData'; // Assuming createPoints/baseTimestamp are in RectangleToolData


// --- 1. Default Vertical Line (Used for interactive and programmatic defaults) ---

export const defaultVerticalLineOptions = {
	ownerSourceId: '',
	defaultHoverCursor: PaneCursorType.Pointer,
	defaultDragCursor: PaneCursorType.Grabbing,
	defaultAnchorHoverCursor: PaneCursorType.HorizontalResize, // Key: X-axis movement
	defaultAnchorDragCursor: PaneCursorType.Grabbing,
	notEditableCursor: PaneCursorType.NotAllowed,
	showPriceAxisLabels: false, // Key Difference: Price label is irrelevant/hidden
	showTimeAxisLabels: true, // Key Difference: Time label is primary identifier
	priceAxisLabelAlwaysVisible: false,
	timeAxisLabelAlwaysVisible: true, // Key Difference: Time label always visible
	text: {
		value: "Time Event",
		alignment: TextAlignment.Center,
		font: {
			color: "rgba(255, 255, 255, 1)",
			size: 12,
			bold: false,
			family: "Arial"
		},
		box: {
			alignment: {
				vertical: BoxVerticalAlignment.Top,
				horizontal: BoxHorizontalAlignment.Center // Center is good for a vertical line
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
				color: "rgba(0,0,0,0)",
				offset: {
					x: 0,
					y: 0
				}
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
	line: {
		color: "rgba(41,98,255,1)", // Default Magenta line
		width: 2,
		style: LineStyle.Solid,
		end: {
			left: LineEnd.Normal,
			right: LineEnd.Normal
		},
		//need extend true to have culling work properly to detect the extensions
		extend: {
			right: true, 
			left: true
		}
	},
	visible: true,
	editable: true
};

// --- 2. Exotic Vertical Line with Custom Style ---
export const exoticVerticalLineOptions = {
	toolType: 'VerticalLine',
	line: {
		width: 4,
		color: 'rgba(0, 255, 0, 1)', // Green color
		style: LineStyle.LargeDashed,
	},
	text: {
		value: 'Exotic Vertical',
		font: { size: 16, color: 'black', bold: true },
		box: {
			alignment: { vertical: BoxVerticalAlignment.Middle, horizontal: BoxHorizontalAlignment.Left },
			background: { color: 'rgba(255, 255, 0, 0.9)' },
			border: { color: 'black', width: 1, style: LineStyle.Solid, radius: 5 },
		},
	},
	visible: true,
	editable: true,
};


// --- Example LineToolPoint arrays for programmatic 'addLineTool' calls (Only 1 point needed) ---

// Programmatic Line A: Time position 10 days out
export const pointsForVerticalA = createPoints(baseTimestamp + 10 * day, 190);

// Programmatic Line B: Time position 20 days out
export const pointsForVerticalB = createPoints(baseTimestamp + 20 * day, 140);


// Point array for a line that is off-screen left
export const pointsForVerticalC_OffScreenLeft = createPoints(baseTimestamp - 10 * day, 150);

// --- Options for specific createOrUpdateLineTool tests ---

export const verticalX_InitialOptions = {
	toolType: 'VerticalLine',
	line: { color: 'rgba(255, 255, 255, 1)', width: 1, style: LineStyle.Dotted },
	text: { value: 'VL_X Initial', box: { alignment: { horizontal: BoxHorizontalAlignment.Center } } },
	visible: true,
	editable: true,
};

// Test updating position and changing text alignment
export const verticalX_UpdatedOptions = {
	toolType: 'VerticalLine',
	line: { color: 'rgba(255, 0, 255, 1)', width: 3, style: LineStyle.Dotted },
	text: { value: 'VL_X UPDATED', box: { alignment: { horizontal: BoxHorizontalAlignment.Right } } },
	visible: true,
	editable: true,
};
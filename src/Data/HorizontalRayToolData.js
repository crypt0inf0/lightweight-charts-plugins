// /src/Data/HorizontalRayToolData.js

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


// --- 1. Default Horizontal Ray (Used for interactive and programmatic defaults) ---

export const defaultHorizontalRayOptions = {
	ownerSourceId: '',
	defaultHoverCursor: PaneCursorType.Pointer,
	defaultDragCursor: PaneCursorType.Grabbing,
	defaultAnchorHoverCursor: PaneCursorType.VerticalResize,
	defaultAnchorDragCursor: PaneCursorType.Grabbing,
	notEditableCursor: PaneCursorType.NotAllowed,
	showPriceAxisLabels: true,
	showTimeAxisLabels: false,
	priceAxisLabelAlwaysVisible: true,
	timeAxisLabelAlwaysVisible: false,
	text: {
		value: "Ray Price Level",
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
				horizontal: BoxHorizontalAlignment.Left
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
		color: "rgba(255, 165, 0, 1)", // Default orange line
		width: 2,
		style: LineStyle.Solid,
		end: {
			left: LineEnd.Normal,
			right: LineEnd.Normal
		},
		extend: {
			right: true, // Key Difference: Extends right
			left: false // Key Difference: Does not extend left
		}
	},
	visible: true,
	editable: true
};

// --- 2. Exotic Horizontal Ray with Custom Style ---
export const exoticHorizontalRayOptions = {
	toolType: 'HorizontalRay',
	line: {
		width: 4,
		color: 'rgba(0, 255, 255, 1)', // Cyan color
		style: LineStyle.LargeDashed,
		extend: { right: true, left: false },
	},
	text: {
		value: 'Ray Support Level',
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

// Programmatic Line A: Top level, ray extends right
export const pointsForHorizontalRayA = createPoints(baseTimestamp + 10 * day, 190);

// Programmatic Line B: Middle level, ray extends right
export const pointsForHorizontalRayB = createPoints(baseTimestamp + 20 * day, 140);


// Point array for a line that is off-screen top
export const pointsForHorizontalRayC_OffScreenTop = createPoints(baseTimestamp + 5 * day, 230);


// --- Options for specific createOrUpdateLineTool tests ---

export const horizontalRayX_InitialOptions = {
	toolType: 'HorizontalRay',
	line: { color: 'rgba(255, 255, 255, 1)', width: 1, style: LineStyle.Dotted, extend: { right: true, left: false } },
	text: { value: 'HR_X Initial', box: { alignment: { horizontal: BoxHorizontalAlignment.Left } } },
	visible: true,
	editable: true,
};

// Test updating position and changing text alignment
export const horizontalRayX_UpdatedOptions = {
	toolType: 'HorizontalRay',
	line: { color: 'rgba(255, 0, 255, 1)', width: 3, style: LineStyle.Dotted, extend: { right: true, left: false } },
	text: { value: 'HR_X UPDATED', box: { alignment: { horizontal: BoxHorizontalAlignment.Center } } },
	visible: true,
	editable: true,
};
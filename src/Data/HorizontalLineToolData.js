// /src/Data/HorizontalLineToolData.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType,
	LineEnd,
	TextAlignment,
	BoxVerticalAlignment,
	BoxHorizontalAlignment,
	LineJoin,
	LineCap
} from 'lightweight-charts-line-tools-core';

// --- Import base data helpers (assuming they are in the same relative path) ---
import { baseTimestamp, day, hour, createPoints } from './RectangleToolData';



// --- 1. Default Horizontal Line (Used for interactive and programmatic defaults) ---

export const defaultHorizontalLineOptions = {
	ownerSourceId: '',
	defaultHoverCursor: PaneCursorType.Pointer,
	defaultDragCursor: PaneCursorType.Grabbing,
	defaultAnchorHoverCursor: PaneCursorType.VerticalResize,
	defaultAnchorDragCursor: PaneCursorType.Grabbing,
	notEditableCursor: PaneCursorType.NotAllowed,
	showPriceAxisLabels: true,
	showTimeAxisLabels: false, // Time axis label is not relevant for a horizontal line
	priceAxisLabelAlwaysVisible: true, // Typically, price axis label is always visible for HL
	timeAxisLabelAlwaysVisible: false,
  text: {
    value: "Price Level",
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
		color: "rgba(255, 165, 0, 1)", // Default red line
		width: 2,
		style: LineStyle.Solid,
		end: {
			left: LineEnd.Normal,
			right: LineEnd.Normal
		},
		extend: {
			right: true, // Full-span line is an infinite extension
			left: true // Full-span line is an infinite extension
		}
	},
	visible: true,
	editable: true
};

// --- 2. Exotic Horizontal Line with Custom Style ---
export const exoticHorizontalLineOptions = {
	toolType: 'HorizontalLine',
	line: {
		width: 4,
		color: 'rgba(0, 255, 255, 1)', // Cyan color
		style: LineStyle.LargeDashed,
	},
	text: {
		value: 'Support Level',
		font: { size: 16, color: 'black', bold: true },
		box: {
			alignment: { vertical: 'middle', horizontal: 'Left' },
			background: { color: 'rgba(255, 255, 0, 0.9)' },
			border: { color: 'black', width: 1, style: LineStyle.Solid, radius: 5 },
		},
	},
	visible: true,
	editable: true,
};


// --- Example LineToolPoint arrays for programmatic 'addLineTool' calls (Only 1 point needed) ---

// Programmatic Line A: Top level
export const pointsForHorizontalA = createPoints(baseTimestamp + 10 * day, 190);

// Programmatic Line B: Middle level
export const pointsForHorizontalB = createPoints(baseTimestamp + 20 * day, 140);


// Point array for a line that is off-screen top
export const pointsForHorizontalC_OffScreenTop = createPoints(baseTimestamp + 5 * day, 230);

// --- Options for specific createOrUpdateLineTool tests ---

export const horizontalX_InitialOptions = {
	toolType: 'HorizontalLine',
	line: { color: 'rgba(255, 255, 255, 1)', width: 1, style: LineStyle.Dotted },
	text: { value: 'HL_X Initial', box: { alignment: { horizontal: BoxHorizontalAlignment.Left } } },
	visible: true,
	editable: true,
};

// Test updating position and changing text alignment
export const horizontalX_UpdatedOptions = {
	toolType: 'HorizontalLine',
	line: { color: 'rgba(255, 0, 255, 1)', width: 3, style: LineStyle.Dotted },
	text: { value: 'HL_X UPDATED', box: { alignment: { horizontal: BoxHorizontalAlignment.Center } } },
	visible: true,
	editable: true,
};
// /src/Data/CrossLineToolData.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType,
	LineEnd,
} from 'lightweight-charts-line-tools-core';

// --- Import base data helpers (assuming they are in the same relative path) ---
import { baseTimestamp, day, hour, createPoints } from './RectangleToolData';


// --- 1. Default Cross Line (Used for interactive and programmatic defaults) ---
// Note: This tool should not have a 'text' property in the options, as per the interface.

export const defaultCrossLineOptions = {
	ownerSourceId: '',
	defaultHoverCursor: PaneCursorType.Crosshair,
	defaultDragCursor: PaneCursorType.Grabbing,
	defaultAnchorHoverCursor: PaneCursorType.Move,
	defaultAnchorDragCursor: PaneCursorType.Grabbing,
	notEditableCursor: PaneCursorType.NotAllowed,
	showPriceAxisLabels: true, // Should show both axis labels
	showTimeAxisLabels: true, 
	priceAxisLabelAlwaysVisible: true,
	timeAxisLabelAlwaysVisible: true,
	// MINIMAL TEXT BLOCK FOR TEST GENERATOR LABELING ONLY
	//text: {
	//	value: "CrossLine Test Label",
	//	alignment: 'center',
	//	font: { color: "rgba(255, 255, 255, 1)", size: 12, bold: false, family: "Arial" },
	//	box: { alignment: { vertical: 'middle', horizontal: 'center' } },
		// Minimal set of required text properties
	//},
	line: {
		color: "rgba(255, 191, 0, 1)", // Default light blue/gray
		width: 1,
		style: LineStyle.Solid, // Crosshairs are often dashed
		end: {
			left: LineEnd.Normal,
			right: LineEnd.Normal
		},
		extend: {
			right: true, // Extension is ignored by the vertical segment in view
			left: true // Extension is ignored by the vertical segment in view
		}
	},
	visible: true,
	editable: true
};

// --- 2. Exotic Cross Line with Custom Style ---
export const exoticCrossLineOptions = {
	toolType: 'CrossLine',
	line: {
		width: 3,
		color: 'rgba(255, 0, 255, 1)', // Magenta color
		style: LineStyle.Solid,
	},
	visible: true,
	editable: true,
};


// --- Example LineToolPoint arrays for programmatic 'addLineTool' calls (Only 1 point needed) ---

// Programmatic Line A: Top level
export const pointsForCrossLineA = createPoints(baseTimestamp + 10 * day, 190);

// Programmatic Line B: Middle level
export const pointsForCrossLineB = createPoints(baseTimestamp + 20 * day, 140);


// Point array for a line that is off-screen top
export const pointsForCrossLineC_OffScreenTop = createPoints(baseTimestamp + 5 * day, 230);

// --- Options for specific createOrUpdateLineTool tests ---

export const crossLineX_InitialOptions = {
	toolType: 'CrossLine',
	line: { color: 'rgba(255, 255, 255, 1)', width: 1, style: LineStyle.Dotted },
	visible: true,
	editable: true,
};

// Test updating position and changing style
export const crossLineX_UpdatedOptions = {
	toolType: 'CrossLine',
	line: { color: 'rgba(255, 255, 0, 1)', width: 2, style: LineStyle.Dashed },
	visible: true,
	editable: true,
};
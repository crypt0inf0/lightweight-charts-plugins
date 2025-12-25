// /src/Data/ExtendedLineToolData.js

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


// --- 1. Default-looking Extended Line (Used for interactive and programmatic defaults) ---

// NOTE: This object is constructed to only specify the *differences* from the TrendLine base,
// but for a clean programmatic test, we'll define a full set of default options.
export const defaultExtendedLineOptions = {
	ownerSourceId: '',
	defaultHoverCursor: PaneCursorType.Pointer,
	defaultDragCursor: PaneCursorType.Grabbing,
	defaultAnchorHoverCursor: PaneCursorType.Pointer,
	defaultAnchorDragCursor: PaneCursorType.Grabbing,
	notEditableCursor: PaneCursorType.NotAllowed,
	showPriceAxisLabels: true,
	showTimeAxisLabels: true,
	priceAxisLabelAlwaysVisible: false,
	timeAxisLabelAlwaysVisible: false,
  text: {
    value: "Extended Line",
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
    },
    padding: 0,
    wordWrapWidth: 0,
    forceTextAlign: false,
    forceCalculateMaxLineWidth: false
  },
  line: {
    color: "rgba(255, 165, 0, 1)", // Default orange line
    width: 1,
    style: LineStyle.Solid,
    join: LineJoin.Round,
    cap: LineCap.Butt,
		end: {
			left: LineEnd.Normal,
			right: LineEnd.Normal
		},
    extend: {
      right: true, // Key property for ExtendedLine
      left: true // Key property for ExtendedLine
    }
  },
  visible: true,
  editable: true
};

// --- 2. Exotic Extended Line with Dashed Line and Custom Text ---
export const exoticExtendedLineOptions = {
	toolType: 'ExtendedLine',
	line: {
		width: 3,
		color: 'rgba(255, 0, 255, 1)', // Magenta color
		style: LineStyle.Dashed,
		extend: { left: true, right: true },
	},
	text: {
		value: 'Exotic Extended Line',
		font: { size: 14, color: 'white', bold: true },
		box: {
			alignment: { vertical: 'middle', horizontal: 'center' },
			background: { color: 'rgba(0, 0, 0, 0.7)' },
		},
	},
	visible: true,
	editable: true,
};


// --- Example LineToolPoint arrays for programmatic 'addLineTool' calls ---

// Programmatic Line A: Top left to bottom right segment
export const pointsForExtendedA = createPoints(baseTimestamp + 5 * day, 185, baseTimestamp + 12 * day, 155);

// Programmatic Line B: Bottom left to top right segment
export const pointsForExtendedB = createPoints(baseTimestamp + 18 * day, 140, baseTimestamp + 25 * day, 170);

// Point array for a line that starts off-screen left, used to test culling logic
export const pointsForExtendedC_OffScreenLeft = createPoints(baseTimestamp - 10 * day, 190, baseTimestamp - 3 * day, 170);


// --- Options for specific createOrUpdateLineTool tests ---

export const extendedX_InitialOptions = {
	toolType: 'ExtendedLine',
	line: { color: 'rgba(100, 150, 255, 1)', width: 2 },
	text: { value: 'EXTENDED_X' },
	visible: true,
	editable: true,
};

export const extendedX_UpdatedOptions = {
	toolType: 'ExtendedLine',
	// Test the user's ability to override the default extension
	line: { color: 'rgba(255, 100, 100, 1)', width: 4, style: LineStyle.Dotted, extend: { left: false, right: true } },
	text: { value: 'EXTENDED_X UPDATED (RAY-LIKE)' },
	visible: true,
	editable: true,
};
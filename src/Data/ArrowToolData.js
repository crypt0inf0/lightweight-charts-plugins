// /src/Data/ArrowToolData.js

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


// --- 1. Default Arrow Line (Used for interactive and programmatic defaults) ---

// NOTE: This object is constructed to only specify the *differences* from the TrendLine base,
// but for a clean programmatic test, we'll define a full set of default options.
export const defaultArrowLineOptions = {
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
    value: "Arrow Line",
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
    },
    padding: 0,
    wordWrapWidth: 0,
    forceTextAlign: false,
    forceCalculateMaxLineWidth: false
  },
  line: {
    color: "rgba(0, 255, 0, 1)", // Default green line
    width: 1,
    style: LineStyle.Solid,
    join: LineJoin.Round,
    cap: LineCap.Butt,
		end: {
			left: LineEnd.Normal,
			right: LineEnd.Arrow // Key property for Arrow
		},
    extend: {
      right: false,
      left: false
    }
  },
  visible: true,
  editable: true
};

// --- 2. Exotic Arrow Line with Custom Style ---
export const exoticArrowLineOptions = {
	toolType: 'Arrow',
	line: {
		width: 3,
		color: 'rgba(255, 0, 0, 1)', // Red color
		style: LineStyle.Dashed,
		end: { right: LineEnd.Arrow },
	},
	text: {
		value: 'Exotic Arrow',
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
export const pointsForArrowA = createPoints(baseTimestamp + 8 * day, 190, baseTimestamp + 15 * day, 160);

// Programmatic Line B: Bottom left to top right segment
export const pointsForArrowB = createPoints(baseTimestamp + 20 * day, 145, baseTimestamp + 27 * day, 175);

// Point array for a line that starts off-screen left, used to test culling logic
export const pointsForArrowC_OffScreenLeft = createPoints(baseTimestamp - 10 * day, 195, baseTimestamp - 3 * day, 180);


// --- Options for specific createOrUpdateLineTool tests ---

export const arrowX_InitialOptions = {
	toolType: 'Arrow',
	line: { color: 'rgba(0, 255, 255, 1)', width: 2 },
	text: { value: 'ARROW_X' },
	visible: true,
	editable: true,
};

// Test the user's ability to override the default arrow and set a circle end.
export const arrowX_UpdatedOptions = {
	toolType: 'Arrow',
	line: { color: 'rgba(255, 100, 100, 1)', width: 4, style: LineStyle.Dotted, end: { right: LineEnd.Circle } },
	text: { value: 'ARROW_X UPDATED (CIRCLE-END)' },
	visible: true,
	editable: true,
};
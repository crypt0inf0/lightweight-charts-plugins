// /src/Data/RayToolData.js

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


// --- 1. Default Ray Line (Used for interactive and programmatic defaults) ---

export const defaultRayLineOptions = {
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
    value: "Ray Line",
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
    color: "rgba(255, 255, 0, 1)", // Default yellow line
    width: 1,
    style: LineStyle.Solid,
    join: LineJoin.Round,
    cap: LineCap.Butt,
		end: {
			left: LineEnd.Normal,
			right: LineEnd.Normal
		},
    extend: {
      right: true, // Key property for Ray
      left: false
    }
  },
  visible: true,
  editable: true
};

// --- 2. Exotic Ray Line with Custom Style ---
export const exoticRayLineOptions = {
	toolType: 'Ray',
	line: {
		width: 3,
		color: 'rgba(0, 255, 255, 1)', // Cyan color
		style: LineStyle.Dashed,
		extend: { right: true, left: false },
	},
	text: {
		value: 'Exotic Ray',
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

// Programmatic Line A: Top left to bottom right segment (extends right)
export const pointsForRayA = createPoints(baseTimestamp + 8 * day, 195, baseTimestamp + 15 * day, 165);

// Programmatic Line B: Bottom left to top right segment (extends right)
export const pointsForRayB = createPoints(baseTimestamp + 20 * day, 150, baseTimestamp + 27 * day, 180);

// Point array for a line that starts off-screen left, used to test culling logic
export const pointsForRayC_OffScreenLeft = createPoints(baseTimestamp - 10 * day, 190, baseTimestamp - 3 * day, 170);


// --- Options for specific createOrUpdateLineTool tests ---

export const rayX_InitialOptions = {
	toolType: 'Ray',
	line: { color: 'rgba(255, 165, 0, 1)', width: 2 },
	text: { value: 'RAY_X' },
	visible: true,
	editable: true,
};

// Test the user's ability to override the default extension and set a left extension (turning it into a left-ray)
export const rayX_UpdatedOptions = {
	toolType: 'Ray',
	line: { color: 'rgba(100, 100, 255, 1)', width: 4, style: LineStyle.Dotted, extend: { left: true, right: false } },
	text: { value: 'RAY_X UPDATED (LEFT-RAY)' },
	visible: true,
	editable: true,
};
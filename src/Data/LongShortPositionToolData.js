// /src/Data/LongShortPositionToolData.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType,
	TextAlignment,
	BoxVerticalAlignment,
	BoxHorizontalAlignment,
} from 'lightweight-charts-line-tools-core';

// --- Import base data helpers (assuming they are in the same relative path) ---
import { baseTimestamp, day, hour, createPoints, createLineToolPoint } from '../Hooks/ToolDataUtils';


// Helper function to create a 3-point position tool structure
const create3PointPosition = (t0, p0, t1, p1, t2, p2) => [
    createLineToolPoint(t0, p0), // P0: Entry
    createLineToolPoint(t1, p1), // P1: Stop Loss
    createLineToolPoint(t2, p2), // P2: Profit Target
];

// --- I. Programmatic Example Paths (3 Points Required) ---

// Path A: Long Position (Entry > Stop)
// Defined by 3 specific points for programmatic tests
export const pointsForPositionA_Long = create3PointPosition(
    15, 150, // P0: Entry
    17, 140, // P1: Stop Loss (Risk: 10)
    17, 180  // P2: Profit Target (Reward: 30)
);

// Path B: Short Position (Entry < Stop)
export const pointsForPositionB_Short = create3PointPosition(
    25, 180, // P0: Entry
    27, 190, // P1: Stop Loss (Risk: 10)
    27, 150  // P2: Profit Target (Reward: 30)
);

// Path C: Off-screen top for culling test
export const pointsForPositionC_OffScreenTop = create3PointPosition(
    10, 230, // P0
    12, 220, // P1
    12, 260  // P2
);


// --- II. Master Path for Automated Testing (MASTER_PATH_3_POINT) ---

// A simple 3-point position template starting at Day 0, Price 100 for Entry.
// This is a SHORT position template (Entry < Stop).
export const MASTER_PATH_3_POINT_SHORT = [
	createLineToolPoint(0, 150),   // P0: Entry
	createLineToolPoint(1, 155),   // P1: Stop Loss (5 units risk)
	createLineToolPoint(1, 135),   // P2: PT (15 units reward - 3x)
];

// --- III. Default Options for LongShortPosition Tool ---

export const defaultLongShortPositionOptions = {
	ownerSourceId: '',
	defaultHoverCursor: PaneCursorType.Pointer,
	defaultDragCursor: PaneCursorType.Move,
	defaultAnchorHoverCursor: PaneCursorType.VerticalResize,
	defaultAnchorDragCursor: PaneCursorType.VerticalResize,
	notEditableCursor: PaneCursorType.NotAllowed,
	showPriceAxisLabels: true,
	showTimeAxisLabels: true,
	priceAxisLabelAlwaysVisible: false,
	timeAxisLabelAlwaysVisible: false,

	showAutoText: true,
	entryStopLossRectangle: {
		background: { color: 'rgba(255, 0, 0, 0.2)' },
		border: { width: 1, style: LineStyle.Solid, color: 'red', radius: 0 },
		extend: { left: false, right: false },
	},
	entryPtRectangle: {
		background: { color: 'rgba(0, 128, 0, 0.2)' },
		border: { width: 1, style: LineStyle.Solid, color: 'green', radius: 0 },
		extend: { left: false, right: false },
	},
	// Text options are minimal/placeholders as showAutoText is true by default
	entryStopLossText: {
		value: '', padding: 5, font: { color: 'white', size: 12 },
		box: { alignment: { vertical: BoxVerticalAlignment.Middle, horizontal: BoxHorizontalAlignment.Left } },
	},
	entryPtText: {
		value: '', padding: 5, font: { color: 'white', size: 12 },
		box: { alignment: { vertical: BoxVerticalAlignment.Middle, horizontal: BoxHorizontalAlignment.Left } },
	},
	
	visible: true,
	editable: true,
};

// --- IV. Custom Options for Testing ---

export const exoticLongShortPositionOptions = {
	toolType: 'LongShortPosition',
	showAutoText: true, // Key difference: Disable auto text to test manual text
	entryStopLossRectangle: {
		background: { color: 'rgba(255, 255, 0, 0.3)' }, // Yellow risk
		border: { width: 3, style: LineStyle.LargeDashed, color: 'orange', radius: 5 },
	},
	entryPtRectangle: {
		background: { color: 'rgba(0, 255, 255, 0.3)' }, // Cyan reward
		border: { width: 3, style: LineStyle.Dashed, color: 'blue', radius: 5 },
	},
	// Use manual text
	entryStopLossText: {
		value: 'Reward Manual',
		font: { color: 'red' },
		box: { alignment: { vertical: BoxVerticalAlignment.Middle, horizontal: BoxHorizontalAlignment.Center } },
	},
	entryPtText: {
		value: 'Reward Manual',
		font: { color: 'green' },
		box: { alignment: { vertical: BoxVerticalAlignment.Middle, horizontal: BoxHorizontalAlignment.Center } },
	},
	visible: true,
	editable: true,
};


// --- Options for specific createOrUpdateLineTool tests ---

export const positionX_InitialOptions = {
	toolType: 'LongShortPosition',
	showAutoText: true,
	entryStopLossRectangle: { background: { color: 'rgba(255, 0, 0, 0.5)' } },
	entryPtRectangle: { background: { color: 'rgba(0, 255, 0, 0.5)' } },
	visible: true,
	editable: true,
};

export const positionX_UpdatedOptions = {
	toolType: 'LongShortPosition',
	showAutoText: true,
	entryStopLossRectangle: { background: { color: 'rgba(0, 0, 255, 0.5)' } },
	entryPtRectangle: { background: { color: 'rgba(255, 0, 255, 0.5)' } },
	visible: true,
	editable: true,
};
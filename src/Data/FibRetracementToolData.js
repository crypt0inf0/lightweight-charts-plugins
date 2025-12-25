// /src/Data/FibRetracementToolData.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType,
} from 'lightweight-charts-line-tools-core';

// --- Import base data helpers ---
import { baseTimestamp, day, hour, createPoints, createLineToolPoint } from './RectangleToolData'; 
import { deepCopy } from 'lightweight-charts-line-tools-core';


// --- 1. Base Levels Configuration (4 levels) ---
export const FIB_LEVELS_BASE = [
	{ color: "#f6ff00ff", coeff: -0.618, opacity: 0, distanceFromCoeffEnabled: false, distanceFromCoeff: 0 },
	{ color: "#787b86", coeff: 0, opacity: 0, distanceFromCoeffEnabled: false, distanceFromCoeff: 0 },
	{ color: "#f23645", coeff: 0.618, opacity: 0, distanceFromCoeffEnabled: false, distanceFromCoeff: 0 },
	{ color: "#00FF00", coeff: 1.0, opacity: 0, distanceFromCoeffEnabled: true, distanceFromCoeff: 0 },
	{ color: "#2962ff", coeff: 1.618, opacity: 0, distanceFromCoeffEnabled: false, distanceFromCoeff: 0 },
];

// --- 2. Default Fib Retracement Options ---

export const defaultFibOptions = {
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

	line: {
		width: 2,
		style: LineStyle.Solid,
	},
	extend: { left: false, right: false },
	levels: deepCopy(FIB_LEVELS_BASE), // Use the custom 4-level array

	// Minimal Trade Strategy for structure parity
	tradeStrategy: {
		enabled: false,
		longOrShort: "",
		fibBracketOrders: [{
			uniqueId: null, conditionLevelCoeff: null, conditionLevelPrice: 0, entryLevelCoeff: null, entryLevelPrice: 0,
			stopMethod: "fib", stopLevelCoeff: null, stopPriceInput: null, stopPointsInput: null, finalStopPrice: 0,
			ptMethod: "fib", ptLevelCoeff: null, ptPriceInput: null, ptPointsInput: null, finalPtPrice: 0,
			isMoveStopToEnabled: false, moveStopToMethod: "fib", moveStopToLevelCoeff: null, moveStopToPriceInput: null,
			moveStopToPointsInput: null, finalMoveStopToPrice: 0, triggerBracketUniqueId: null
		}],
	},
	
	visible: true,
	editable: true,
};

// --- 3. Exotic Fib Retracement Options (To test fills and custom lines) ---
export const exoticFibOptions = {
	toolType: 'FibRetracement',
	line: {
		width: 4,
		color: 'rgba(255, 255, 255, 1)', // White line for contrast
		style: LineStyle.LargeDashed,
	},
	extend: { left: true, right: true },
	levels: [
		{ color: "#787b86", coeff: 0, opacity: 0.5, distanceFromCoeffEnabled: false, distanceFromCoeff: 0 },
		{ color: "#f23645", coeff: 0.618, opacity: 0.2, distanceFromCoeffEnabled: false, distanceFromCoeff: 0 },
		{ color: "#00FF00", coeff: 1.0, opacity: 0.5, distanceFromCoeffEnabled: true, distanceFromCoeff: 0 },
		{ color: "#2962ff", coeff: 1.618, opacity: 0.2, distanceFromCoeffEnabled: false, distanceFromCoeff: 0 },
	],
	visible: true,
	editable: true,
};


// --- 4. Example LineToolPoint arrays for programmatic 'addLineTool' calls (2 points needed) ---

// Programmatic Tool A: Upward move
export const pointsForFibA = createPoints(baseTimestamp + 5 * day, 100, baseTimestamp + 15 * day, 180);

// Programmatic Tool B: Downward move
export const pointsForFibB = createPoints(baseTimestamp + 25 * day, 200, baseTimestamp + 30 * day, 120);


// Programmatic Tool C: Off-screen top
export const pointsForFibC_OffScreenTop = createPoints(baseTimestamp + 5 * day, 230, baseTimestamp + 10 * day, 240);

// --- 5. Options for specific createOrUpdateLineTool tests ---

export const fibX_InitialOptions = {
	toolType: 'FibRetracement',
	line: { color: 'rgba(255, 255, 0, 1)', width: 1, style: LineStyle.Dotted },
	levels: deepCopy(FIB_LEVELS_BASE).map(l => ({ ...l, color: 'yellow' })), // All yellow lines
	visible: true,
	editable: true,
};

// Test updating position and changing level color/opacity
export const fibX_UpdatedOptions = {
	toolType: 'FibRetracement',
	line: { color: 'rgba(0, 255, 255, 1)', width: 3, style: LineStyle.Solid },
	levels: [
		{ coeff: 0, color: '#00FFFF', opacity: 0.2 },
		{ coeff: 0.618, color: '#00FFFF', opacity: 0.2 },
		{ coeff: 1.0, color: '#00FFFF', opacity: 0.2 },
		{ coeff: 1.618, color: '#00FFFF', opacity: 0.2 },
	],
	visible: true,
	editable: true,
};
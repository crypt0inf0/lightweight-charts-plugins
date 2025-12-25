// /src/Data/PriceRangeToolData.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType,
	TextAlignment,
	BoxVerticalAlignment,
	BoxHorizontalAlignment,
	LineEnd,
} from 'lightweight-charts-line-tools-core';

// --- Re-use common data helpers from the existing test app structure ---
import { baseTimestamp, day, hour, createPoints } from './RectangleToolData'; 


// --- 1. Default Price Range Options ---

export const defaultPriceRangeOptions = {
	ownerSourceId: '',
	defaultHoverCursor: PaneCursorType.Pointer,
	defaultDragCursor: PaneCursorType.Grabbing,
	defaultAnchorHoverCursor: PaneCursorType.Pointer,
	defaultAnchorDragCursor: PaneCursorType.Grabbing,
	notEditableCursor: PaneCursorType.NotAllowed,
	showPriceAxisLabels: true,
	showTimeAxisLabels: true,

	// --- Common Text Options (Often used for the Price Difference label) ---
	text: {
		value: 'Range Label',
		padding: 0,
		wordWrapWidth: 0,
		forceTextAlign: false,
		forceCalculateMaxLineWidth: false,
		alignment: TextAlignment.Center,
		font: {
			color: '#ffffff',
			size: 14,
			bold: true,
			family: 'Arial',
		},
		box: {
			alignment: { vertical: BoxVerticalAlignment.Top, horizontal: BoxHorizontalAlignment.Center },
			angle: 0,
			scale: 1,
		}
	},

	// --- PriceRange Specific Options (Inside the priceRange Block) ---
	priceRange: { 
		rectangle: {
			extend: { left: false, right: false },
			background: { color: 'rgba(156, 39, 176, 0.2)' }, // Purple background
			border: { width: 1, style: LineStyle.Solid, color: '#9c27b0', radius: 0 },
		},

		horizontalLine: {
			width: 1,
			color: '#9c27b0',
			style: LineStyle.Dashed,
		},
		verticalLine: {
			width: 1,
			color: '#9c27b0',
			style: LineStyle.Solid,
		},

		showCenterHorizontalLine: true,
		showCenterVerticalLine: true,
	},
	
	visible: true,
	editable: true,
};

// --- 2. Exotic Price Range Options ---
export const exoticPriceRangeOptions = {
	toolType: 'PriceRange',
	text: {
		value: 'Exotic Price Range',
		font: { 
			size: 20, 
			color: 'black', 
		},
	},
	priceRange: { 
		rectangle: {
			extend: { left: true, right: true },
			background: { color: 'rgba(255, 0, 0, 0.1)' },
			border: { width: 3, style: LineStyle.LargeDashed, color: '#FF0000', radius: 5 },
		},

		horizontalLine: {
			width: 3,
			color: '#00FF00',
			style: LineStyle.Solid,
		},
		verticalLine: {
			width: 3,
			color: '#0000FF',
			style: LineStyle.Solid,
		},
		showCenterHorizontalLine: true,
		showCenterVerticalLine: true,
	},
	visible: true,
	editable: true,
};


// --- Example LineToolPoint arrays for programmatic 'addLineTool' calls (2 points needed) ---

// Programmatic Tool A: Upward move
export const pointsForPriceRangeA = createPoints(baseTimestamp + 5 * day, 100, baseTimestamp + 15 * day, 180);

// Programmatic Tool B: Downward move
export const pointsForPriceRangeB = createPoints(baseTimestamp + 25 * day, 200, baseTimestamp + 30 * day, 120);


// Programmatic Tool C: Off-screen top
export const pointsForPriceRangeC_OffScreenTop = createPoints(baseTimestamp + 5 * day, 230, baseTimestamp + 10 * day, 240);


// --- Options for specific createOrUpdateLineTool tests ---

export const priceRangeX_InitialOptions = {
	toolType: 'PriceRange',
	priceRange: { 
		rectangle: { background: { color: 'rgba(255, 255, 0, 0.3)' } },
		showCenterHorizontalLine: true,
		showCenterVerticalLine: true,
	},
	text: { value: 'PR_X Initial' },
	visible: true,
	editable: true,
};

// Test updating position and turning off center lines
export const priceRangeX_UpdatedOptions = {
	toolType: 'PriceRange',
	priceRange: { 
		showCenterHorizontalLine: false,
		showCenterVerticalLine: false,
	},
	text: { value: 'PR_X UPDATED' },
	visible: true,
	editable: true,
};
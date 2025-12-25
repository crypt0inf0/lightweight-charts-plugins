// /src/Data/TextToolData.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType,
	TextAlignment,
	BoxVerticalAlignment,
	BoxHorizontalAlignment,
} from 'lightweight-charts-line-tools-core';

// --- Import base data helpers (assuming they are in the same relative path) ---
import { baseTimestamp, day, hour, createPoints } from './RectangleToolData';


// --- 1. Default Text Tool Options ---

export const defaultTextOptions = {
	ownerSourceId: '',
	defaultHoverCursor: PaneCursorType.Move,
	defaultDragCursor: PaneCursorType.Grabbing,
	defaultAnchorHoverCursor: PaneCursorType.Pointer,
	defaultAnchorDragCursor: PaneCursorType.Grabbing,
	notEditableCursor: PaneCursorType.NotAllowed,
	showPriceAxisLabels: false,
	showTimeAxisLabels: false,
	priceAxisLabelAlwaysVisible: false,
	timeAxisLabelAlwaysVisible: false,
	
	// Specific Text Tool Options
	text: {
		value: "Anchor Text",
		alignment: TextAlignment.Center,
		font: {
			color: "rgba(255, 255, 255, 1)",
			size: 14,
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
				blur: 5,
				color: "rgba(0, 0, 0, 0.5)",
				offset: {
					x: 3,
					y: 3
				}
			},
			border: {
				color: "rgba(255, 255, 255, 0.8)",
				width: 1,
				radius: 0,
				highlight: false,
				style: LineStyle.Solid
			},
			background: {
				color: "rgba(170, 0, 255, 0.7)", // Default blue background
				inflation: {
					x: 0,
					y: 0
				}
			}
		},
		padding: 5, // Padding between text lines
		wordWrapWidth: 150,
		forceTextAlign: false,
		forceCalculateMaxLineWidth: false
	},
	visible: true,
	editable: true,
};

// --- 2. Exotic Text Tool Options ---
export const exoticTextOptions = {
	toolType: 'Text',
	text: {
		value: "Exotic Text Example\nwith alternating radius\nSecond Line\nThird Line",
		font: { 
			size: 20, 
			color: 'black', 
			bold: true,
			family: 'Verdana' 
		},
		box: {
			alignment: { vertical: BoxVerticalAlignment.Middle, horizontal: BoxHorizontalAlignment.Center },
			angle: 0,
			scale: 1,
			background: { color: 'rgba(255, 255, 0, 0.9)' },
			border: { color: 'red', width: 2, style: LineStyle.Dotted, radius: [20, 0, 20, 0] },
		},
	},
	visible: true,
	editable: true,
};


// --- Example LineToolPoint arrays for programmatic 'addLineTool' calls (Only 1 point needed) ---

// Programmatic Point A: Top-left area
export const pointsForTextA = createPoints(baseTimestamp + 10 * day, 190);

// Programmatic Point B: Middle area
export const pointsForTextB = createPoints(baseTimestamp + 20 * day, 140);


// Point array for a tool that is off-screen top
export const pointsForTextC_OffScreenTop = createPoints(baseTimestamp + 5 * day, 230);

// --- Options for specific createOrUpdateLineTool tests ---

export const textX_InitialOptions = {
	toolType: 'Text',
	text: { 
		value: 'TX_X Initial', 
		font: { color: 'orange' }, 
		box: { 
			offset: { x: 50, y: 0 }, 
			alignment: { horizontal: BoxHorizontalAlignment.Center } 
		}
	},
	visible: true,
	editable: true,
};

// Test updating position and changing rotation
export const textX_UpdatedOptions = {
	toolType: 'Text',
	text: { 
		value: 'TX_X UPDATED AND ROTATED', 
		font: { color: 'lime' }, 
		box: { angle: 45, offset: { x: 0, y: 0 } } 
	},
	visible: true,
	editable: true,
};
// /src/Data/CalloutToolData.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType,
	LineEnd,
	TextAlignment,
	BoxVerticalAlignment,
	BoxHorizontalAlignment,
} from 'lightweight-charts-line-tools-core';

// --- Import base data helpers (assuming they are in the same relative path) ---
import { baseTimestamp, day, hour, createPoints } from './RectangleToolData';


// --- 1. Default Callout Options ---

export const defaultCalloutOptions = {
	ownerSourceId: '',
	defaultHoverCursor: PaneCursorType.Pointer,
	defaultDragCursor: PaneCursorType.Grabbing,
	defaultAnchorHoverCursor: PaneCursorType.Move,
	defaultAnchorDragCursor: PaneCursorType.Grabbing,
	notEditableCursor: PaneCursorType.NotAllowed,
	showPriceAxisLabels: true,
	showTimeAxisLabels: true,
	priceAxisLabelAlwaysVisible: false,
	timeAxisLabelAlwaysVisible: false,
	
	line: {
		color: "rgba(41, 98, 255, 1)", // Default blue line
		width: 2,
		style: LineStyle.Solid,
		end: {
			left: LineEnd.Normal,
			right: LineEnd.Normal // End on the text box side
		},
		extend: {
			right: false,
			left: false
		}
	},
	
	// Text Options (Focus of the Callout Tool)
	text: {
		value: "Callout Text\nfor Point 2",
		alignment: TextAlignment.Center,
		font: {
			color: "rgba(255, 255, 255, 1)",
			size: 14,
			bold: true,
			family: "Arial"
		},
		box: {
			alignment: {
				vertical: BoxVerticalAlignment.Middle,
				horizontal: BoxHorizontalAlignment.Center
			},
			angle: 0,
			scale: 1,
			offset: {
				x: 0,
				y: 0
			},
			padding: {
				x: 8,
				y: 8
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
				color: "rgba(198, 44, 44, 0.88)",
				width: 2,
				radius: 5,
				highlight: false,
				style: LineStyle.Solid
			},
			background: {
				color: "rgba(41, 98, 255, 0.9)", // Opaque blue background
				inflation: {
					x: 0,
					y: 0
				}
			}
		},
		padding: 5, 
		wordWrapWidth: 150,
		forceTextAlign: false,
		forceCalculateMaxLineWidth: false
	},
	visible: true,
	editable: true,
};

// --- 2. Exotic Callout Options ---
export const exoticCalloutOptions = {
	toolType: 'Callout',
	line: {
		width: 4,
		color: 'rgba(255, 0, 0, 1)', // Red line
		style: LineStyle.LargeDashed,
		end: { right: LineEnd.Circle }, // Circle end on the text box side
	},
	text: {
		value: "Exotic Callout\nWarning!",
		font: { 
			size: 20, 
			color: 'black', 
			bold: true,
			family: 'Verdana' 
		},
		box: {
			alignment: { vertical: BoxVerticalAlignment.Top, horizontal: BoxHorizontalAlignment.Right },
			angle: -15,
			background: { color: 'rgba(255, 255, 0, 0.9)' },
			border: { color: 'red', width: 2, style: LineStyle.Dotted, radius: [20, 0, 20, 0] },
		},
	},
	visible: true,
	editable: true,
};


// --- Example LineToolPoint arrays for programmatic 'addLineTool' calls (2 points needed) ---

// Programmatic Tool A: Pointer near low price, Box near high price
export const pointsForCalloutA = createPoints(baseTimestamp + 5 * day, 100, baseTimestamp + 15 * day, 180);

// Programmatic Tool B: Pointer near high price, Box near low price
export const pointsForCalloutB = createPoints(baseTimestamp + 25 * day, 200, baseTimestamp + 30 * day, 120);


// Point array for a tool that is off-screen top
export const pointsForCalloutC_OffScreenTop = createPoints(baseTimestamp + 5 * day, 230, baseTimestamp + 10 * day, 240);

// --- Options for specific createOrUpdateLineTool tests ---

export const calloutX_InitialOptions = {
	toolType: 'Callout',
	text: { 
		value: 'CL_X Initial', 
		font: { color: 'orange' }, 
		box: { offset: { x: 50, y: 0 } } 
	},
	visible: true,
	editable: true,
};

// Test updating position and changing rotation
export const calloutX_UpdatedOptions = {
	toolType: 'Callout',
	text: { 
		value: 'CL_X UPDATED AND ROTATED', 
		font: { color: 'lime' }, 
		box: { angle: 45 } 
	},
	visible: true,
	editable: true,
};
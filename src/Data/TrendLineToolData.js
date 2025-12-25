// File: /src/Data/TrendLineToolData.js

import { LineStyle } from 'lightweight-charts';
// Import necessary constants from where they are now defined (RectangleToolData in this case, for base time/day)
import { baseTimestamp, day, hour, createPoints } from './RectangleToolData'; 
import {
	PaneCursorType,
	LineEnd,
	TextAlignment,
	BoxVerticalAlignment,
	BoxHorizontalAlignment,
	LineJoin,
	LineCap
} from 'lightweight-charts-line-tools-core';
// --- 1. Default-looking Trend Line (Active/Interactive) ---
/*
export const defaultTrendLineOptions = {
	toolType: 'TrendLine', 
	line: {
		width: 2,
		color: 'rgba(255, 165, 0, 1)', // Orange color
		style: LineStyle.Solid,
		extend: { left: false, right: false },
	},
	text: {
		value: '',
	},
	visible: true,
	editable: true,
};
*/

export const defaultTrendLineOptions = {
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
        value: "",
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
        color: "rgba(41,98,255,1)",
        width: 1,
        style: LineStyle.Solid,
        join: LineJoin.Round,
        cap: LineCap.Butt,
		end: {
			left: LineEnd.Normal,
			right: LineEnd.Normal
		},
        extend: {
            right: false,
            left: false
        }
    },
    visible: true,
    editable: true
}

// --- 2. Exotic Trend Line with Dashed Line and Custom Text ---
export const exoticTrendLineOptions = {
	toolType: 'TrendLine',
	line: {
		width: 3,
		color: 'rgba(0, 255, 255, 1)', // Cyan color
		style: LineStyle.Dashed,
		extend: { left: false, right: false }, // Still a segment
	},
	text: {
		value: 'Target Entry Point',
		//alignment: 'Center',
		font: { size: 12, color: 'white', family: 'Arial', bold: true },
		box: {
			alignment: { vertical: 'middle', horizontal: 'center' },
			//angle: -90, // Example: Rotate text to match line angle (in reality, this would be dynamic)
			padding: { x: 5, y: 5 },
			background: { color: 'rgba(0, 0, 0, 0.7)' },
			border: { width: 1, color: 'rgba(255, 255, 255, 0.5)', radius: 3, style: LineStyle.Solid },
		},
	},
	visible: true,
	editable: true,
};

// --- 3. Extended Line for Culling Test ---
export const extendedTrendLineOptions = {
	toolType: 'TrendLine',
	line: {
		width: 1,
		color: 'rgba(255, 50, 50, 1)', // Red color
		style: LineStyle.LargeDashed,
		extend: { left: true, right: true }, // Infinite Line
	},
	text: {
		value: 'Extended Line Test',
		// ... minimal text options ...
	},
	visible: true,
	editable: true,
};

// --- Example LineToolPoint arrays for programmatic 'addLineTool' calls ---

export const pointsForTrendA = createPoints(baseTimestamp + 3 * day, 180, baseTimestamp + 10 * day, 150);
export const pointsForTrendB = createPoints(baseTimestamp + 15 * day, 130, baseTimestamp + 22 * day, 100);

// Point array for a line that starts off-screen left, used to test culling logic
export const pointsForTrendC_OffScreenLeft = createPoints(baseTimestamp - 10 * day, 190, baseTimestamp - 3 * day, 170);


// --- Options for specific createOrUpdateLineTool tests ---

export const trendX_InitialOptions = {
	toolType: 'TrendLine',
	line: { color: 'rgba(0, 200, 0, 1)', width: 2 },
	text: { value: 'TREND_X' },
	visible: true,
	editable: true,
};

export const trendX_UpdatedOptions = {
	toolType: 'TrendLine',
	line: { color: 'rgba(255, 100, 100, 1)', width: 4, style: LineStyle.Dotted },
	text: { value: 'TREND_X UPDATED' },
	visible: true,
	editable: true,
};
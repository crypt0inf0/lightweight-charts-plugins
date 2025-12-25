// /src/Data/MarketDepthToolData.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType,
	TextAlignment,
	BoxVerticalAlignment,
	BoxHorizontalAlignment,
	deepCopy,
} from 'lightweight-charts-line-tools-core';

// --- Import base data helpers ---
import { baseTimestamp, day, hour, createPoints } from './RectangleToolData';


// --- I. Static Market Depth Test Data (5 Bids, 5 Asks) ---

// Base timestamp for data (current bar index 10)
const DEPTH_BASE_TIME = baseTimestamp + 10 * day;

// Single static dataset used for all tests
export const STATIC_MARKET_DEPTH_DATA = {
  Bids: [
    // Price must be 150.00, then drop by 0.50 increments
    { Price: '150.00', TotalSize: '500', EarliestTime: DEPTH_BASE_TIME.toString() }, // Max Bid
    { Price: '149.50', TotalSize: '250', EarliestTime: DEPTH_BASE_TIME.toString() },
    { Price: '149.00', TotalSize: '150', EarliestTime: DEPTH_BASE_TIME.toString() },
    { Price: '148.50', TotalSize: '100', EarliestTime: DEPTH_BASE_TIME.toString() },
    { Price: '148.00', TotalSize: '50', EarliestTime: DEPTH_BASE_TIME.toString() },
  ],
  Asks: [
    // Price must start at 150.50, then increase by 0.50 increments
    { Price: '151.00', TotalSize: '100', EarliestTime: DEPTH_BASE_TIME.toString() },
    { Price: '151.50', TotalSize: '300', EarliestTime: DEPTH_BASE_TIME.toString() },
    { Price: '152.00', TotalSize: '600', EarliestTime: DEPTH_BASE_TIME.toString() }, // Max Ask (and Combined Max)
    { Price: '152.50', TotalSize: '450', EarliestTime: DEPTH_BASE_TIME.toString() },
    { Price: '153.00', TotalSize: '150', EarliestTime: DEPTH_BASE_TIME.toString() },
  ],
};


// --- II. Default Market Depth Options ---

export const defaultMarketDepthOptions = {
	ownerSourceId: '',
	editable: true,
	defaultHoverCursor: PaneCursorType.Default,
	defaultDragCursor: PaneCursorType.Default,
	notEditableCursor: PaneCursorType.Default,
	showPriceAxisLabels: false,
	showTimeAxisLabels: true,

	// Text for Anchor Point
	text: {
		value: '',
		font: { color: "#ffffff", size: 10, family: "sans-serif" },
		box: { alignment: { vertical: BoxVerticalAlignment.Top, horizontal: BoxHorizontalAlignment.Left }, offset: { x: 5, y: 5 } },
	},

	// MarketDepth Specific Options
	marketDepth: {
		lineWidth: 1,
		lineStyle: LineStyle.Solid,
		lineOffset: 30,
		lineLength: 300,
		lineBidColor: 'rgba(42, 122, 129, 1)',
		lineAskColor: 'rgba(210, 73, 73, 1)',
		totalBidAskCalcMethod: 'combined', // Default method
		timestampStartOffset: 50,
		// Data will be injected by the hook
		marketDepthData: { Bids: [], Asks: [] }, 
	},
	
	visible: true,
};

// --- III. Exotic Market Depth Options ---

export const exoticMarketDepthOptions = {
	toolType: 'MarketDepth',
	marketDepth: {
		lineWidth: 3,
		lineStyle: LineStyle.Dashed,
		lineOffset: 50,
		lineLength: 400,
		lineBidColor: 'rgba(255, 165, 0, 1)', // Orange Bids
		lineAskColor: 'rgba(0, 255, 0, 1)', // Green Asks
		totalBidAskCalcMethod: 'independent', // Test independent method
		timestampStartOffset: 10,
	},
	text: {
		value: 'Depth Anchor - Exotic',
		font: { color: 'yellow', size: 14, bold: true },
	},
	visible: true,
};


// --- IV. Example LineToolPoint arrays for programmatic 'addLineTool' calls (1 point needed) ---

// Anchor Point A: Mid-chart
export const pointsForMarketDepthA = createPoints(baseTimestamp + 15 * day, 150);

// Anchor Point B: Left side
export const pointsForMarketDepthB = createPoints(baseTimestamp + 5 * day, 150);

// Anchor Point C: Off-screen
export const pointsForMarketDepthC_OffScreen = createPoints(baseTimestamp - 10 * day, 150);


// --- V. Options for specific createOrUpdateLineTool tests ---

export const marketDepthX_InitialOptions = {
	toolType: 'MarketDepth',
	marketDepth: {
		lineBidColor: 'blue',
		lineAskColor: 'red',
	},
	text: { value: 'MD_X Initial' },
	visible: true,
};

export const marketDepthX_UpdatedOptions = {
	toolType: 'MarketDepth',
	marketDepth: {
		lineBidColor: 'lime',
		lineAskColor: 'orange',
		totalBidAskCalcMethod: 'independent',
	},
	text: { value: 'MD_X UPDATED' },
	visible: true,
};
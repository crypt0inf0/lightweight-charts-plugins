// /src/TestConfig/MarketDepthTestConfig.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType, deepCopy,
} from 'lightweight-charts-line-tools-core';

// --- Import Tool Defaults ---
import { defaultMarketDepthOptions } from '../Data/MarketDepthToolData';


// ----------------------------------------------------------------------
// 1. BASELINE DEFAULTS FOR MARKET DEPTH TOOL
// ----------------------------------------------------------------------
export const MarketDepthOptionDefaults = deepCopy(defaultMarketDepthOptions);


// --- Constants & Config for Generator Hook ---
export const PROPERTIES_TO_FORCE_TEST = [
	'marketDepth.lineWidth',
	'marketDepth.lineStyle',
	'marketDepth.lineBidColor',
	'marketDepth.lineAskColor',
	'marketDepth.lineOffset',
	'marketDepth.lineLength',
	'marketDepth.timestampStartOffset',
	'marketDepth.totalBidAskCalcMethod',
];

/**
 * Defines the unique value to test for every single primitive option
 * within the Market Depth tool's full options structure.
 */
export const MarketDepthUniversalTestConfig = {

	// --- I. LineToolOptionsCommon ---
	
	// --- II. MarketDepth Specific Options ---

	marketDepth: {
		// A. Line Properties
		lineWidth: [1, 2, 3, 4],
		lineStyle: [LineStyle.Solid, LineStyle.Dotted, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.SparseDotted],
		lineBidColor: ['rgba(255, 255, 0, 1)', 'rgba(0, 0, 255, 1)'],
		lineAskColor: ['rgba(255, 0, 255, 1)', 'rgba(0, 255, 255, 1)'],

		// B. Positional/Sizing Properties
		lineOffset: [0, 10, 100],
		lineLength: [100, 300],
		timestampStartOffset: [0, 10, 100],

		// C. Functional Properties
		totalBidAskCalcMethod: ['independent', 'combined'],
	},

	// --- III. Text Properties (for Anchor Label) ---
	//text: {
	//	font: {
	//		color: ['#FF0000'],
	//		size: [10, 20],
	//	},
	//},
};


// ----------------------------------------------------------------------
// 3. CONTEXTUAL OVERRIDES
// ----------------------------------------------------------------------

export const MarketDepthContextualOverrides = {
	// No complex array logic, so simple overrides suffice.

	// Test case to ensure the combined method is used correctly.
	'marketDepth.totalBidAskCalcMethod': {
		marketDepth: { totalBidAskCalcMethod: 'combined' },
	},
};
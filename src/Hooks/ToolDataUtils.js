// /src/Hooks/ToolDataUtils.js

import { LineStyle } from 'lightweight-charts';

// --- I. Core Constants (exported for use by Data files) ---
export const baseTimestamp = 1756857600; // Sept 1, 2025 (UTC)
export const hour = 60 * 60; // One hour in seconds
export const day = 24 * 60 * 60; // One day in seconds

// --- Helper for generating LineToolPoint arrays ---
export function createPoints(time1, price1, time2, price2) {
	if ((time1 && price1) && (!time2 && !price2)) {
		return [
			{ timestamp: time1, price: price1 }
		]
	}

	if ((time1 && price1) && (time2 && price2)) {
		return [
			{ timestamp: time1, price: price1 },
			{ timestamp: time2, price: price2 },
		];
	}

	return [
		{ timestamp: time1, price: price1 },
		{ timestamp: time2, price: price2 },
	];
}

// --- II. Test Text Constants ---


// --- III. Core Data Lookups (for modularity) ---


// --- IV. Helper for Placement Logic (Coordinate Generation) ---

/**
 * Helper to create a LineToolPoint structure using the base timestamp/day definitions.
 * NOTE: This assumes baseTimestamp and day are imported/available from your Data directory.
 * @param {} dayOffset - The day index offset from baseTimestamp.
 * @param {} price - The price value.
 * @returns {{timestamp: number, price: number}} LineToolPoint.
 */
export const createLineToolPoint = (dayOffset, price) => {
	// Constants sourced from /src/Data/RectangleToolData.js:
	const day = 24 * 60 * 60; // One day in seconds
	const baseTimestamp = 1756857600; // Sept 1, 2025 (UTC)

	// Add hour offset to prevent alignment with bar opening/closing time
	//const hour = 60 * 60; 

	return {
		//timestamp: baseTimestamp + dayOffset * day + hour,
		timestamp: baseTimestamp + dayOffset * day,
		price: price
	};
};


/**
 * Placement logic manager to generate non-overlapping coordinates for tools.
 */
export const PlacementManager = (() => {
	const START_BAR_INDEX = 1;
	const START_PRICE = 195;
	const PRICE_STEP = 5;
	const TIME_STEP = 3;
	const ROWS = 15; // Define max rows before starting a new column
	const MAX_TESTS_PER_COL = 15; // Set a visual limit based on expected density (e.g. 15 tools tall)

	let currentBarIndex = START_BAR_INDEX;
	let currentPrice = START_PRICE;
	let currentRow = 0;
	let currentCol = 0;

	const getNextPlacement = () => {
		// --- 1. Calculate Coordinates (Based on current row/col) ---

		// Time (X-axis) determined by column index
		const P1_DAY_OFFSET = currentBarIndex + currentCol * TIME_STEP;
		const P2_DAY_OFFSET = P1_DAY_OFFSET + TIME_STEP;

		// Price (Y-axis) determined by current row index, stepping down from START_PRICE
		const P1_PRICE = START_PRICE - (currentRow * PRICE_STEP);
		const P2_PRICE = P1_PRICE - (PRICE_STEP / 2); // Slight downward slope

		const P1 = createLineToolPoint(P1_DAY_OFFSET, P1_PRICE);
		const P2 = createLineToolPoint(P2_DAY_OFFSET, P2_PRICE);

		// --- 2. Update Counters (Column-Major Traversal: Down, then Right) ---

		// Increment the row first (move down)
		currentRow++;

		// Check if max rows reached (time to wrap to next column)
		if (currentRow >= MAX_TESTS_PER_COL) {
			currentRow = 0; // Reset row to the top
			currentCol++; // Move to the next column (Right)
			currentBarIndex = START_BAR_INDEX; // Reset X-offset for the next column (optional, but clean)
		}

		return { P1, P2 };
	};


	return {
		/** Resets the counters to the starting position. MUST be called before generating a new set of tests. */
		reset: () => {
			currentBarIndex = START_BAR_INDEX;
			currentPrice = START_PRICE;
			currentRow = 0;
			currentCol = 0;
		},
		/** Gets the next calculated set of coordinates. */
		getNext: getNextPlacement,
	};
})();
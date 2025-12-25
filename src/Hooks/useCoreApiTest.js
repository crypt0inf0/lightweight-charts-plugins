// File: /src/Hooks/useCoreApiTest.js

import { useState, useCallback, useRef, useEffect } from 'react';
import { deepCopy } from 'lightweight-charts-line-tools-core';


/**
 * Custom hook to manage all handlers and state related to testing the Core Plugin API
 * (Events, Removal, Export/Import, Crosshair).
 */
export const useCoreApiTest = (lineToolsApi, chartInstanceRef, candlestickSeriesRef, chartReady) => {
	const [exportedJson, setExportedJson] = useState('');
	const [subscribedAfterEdit, setSubscribedAfterEdit] = useState(false);
	const [subscribedDoubleClick, setSubscribedDoubleClick] = useState(false);

	// Refs for event handlers to manage subscriptions safely
	const afterEditHandlerRef = useRef(null);
	const doubleClickHandlerRef = useRef(null);
	
	// --- Base Event Handlers (Loggers) ---
	const handleAfterEdit = useCallback((params) => {
		console.log("%c--- EVENT FIRED: AfterEdit ---", 'color: #FFA500; font-weight: bold;');
		console.log("Event Params:", params);
	}, []);

	const handleDoubleClick = useCallback((params) => {
		console.log("%c--- EVENT FIRED: DoubleClick ---", 'color: #FFA500; font-weight: bold;');
		console.log("Event Params:", params);
	}, []);


	// Store handlers in refs for stable subscription/unsubscription
	useEffect(() => {
		afterEditHandlerRef.current = handleAfterEdit;
		doubleClickHandlerRef.current = handleDoubleClick;
	}, [handleAfterEdit, handleDoubleClick]);


	// --- Group: Event Subscriptions ---
	const toggleSubscribeAfterEdit = useCallback(() => {
		if (chartReady) {
			const handler = afterEditHandlerRef.current;
			if (subscribedAfterEdit) {
				lineToolsApi.unsubscribeLineToolsAfterEdit(handler);
				setSubscribedAfterEdit(false);
			} else {
				lineToolsApi.subscribeLineToolsAfterEdit(handler);
				setSubscribedAfterEdit(true);
			}
		}
	}, [chartReady, subscribedAfterEdit, lineToolsApi]);

	const toggleSubscribeDoubleClick = useCallback(() => {
		if (chartReady) {
			const handler = doubleClickHandlerRef.current;
			if (subscribedDoubleClick) {
				lineToolsApi.unsubscribeLineToolsDoubleClick(handler);
				setSubscribedDoubleClick(false);
			} else {
				lineToolsApi.subscribeLineToolsDoubleClick(handler);
				setSubscribedDoubleClick(true);
			}
		}
	}, [chartReady, subscribedDoubleClick, lineToolsApi]);


	// --- Group: Tool Retrieval & Persistence ---
	const handleExportAll = useCallback(async () => {
		console.log(`%c--- Button Clicked: Export All Tools ---`, 'color: #fff; background: #FF9800; padding: 2px 5px;');
		const json = lineToolsApi.exportLineTools();
		setExportedJson(json);
	}, [lineToolsApi]);

	const handleImportAll = useCallback(() => {
		if (exportedJson) {
			console.log(`%c--- Button Clicked: Import All (from last export) ---`, 'color: #fff; background: #FF9800; padding: 2px 5px;');
			lineToolsApi.importLineTools(exportedJson);
		} else {
			console.warn("No JSON exported yet. Please export first.");
		}
	}, [lineToolsApi, exportedJson]);

	const handleGetSelected = useCallback(() => {
		console.log(`%c--- Button Clicked: Get Selected Tools ---`, 'color: #fff; background: #4CAF50; padding: 2px 5px;');
		lineToolsApi.getSelectedLineTools();
	}, [lineToolsApi]);


	// --- Group: Tool Removal ---
	const handleRemoveSelected = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove Selected Tool(s) ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeSelectedLineTools();
	}, [lineToolsApi]);

	const handleRemoveAll = useCallback(() => {
		console.log(`%c--- Button Clicked: Remove All Tools ---`, 'color: #fff; background: #D32F2F; padding: 2px 5px;');
		lineToolsApi.removeAllLineTools();
	}, [lineToolsApi]);


	// --- Group: Crosshair Control ---
	const handleSetCrosshairPixel = useCallback(() => {
		console.log(`%c--- Button Clicked: Set Crosshair (Pixel 300, 200) ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
		lineToolsApi.setCrossHairXY(300, 200, true);
	}, [lineToolsApi]);

	const handleSetCrosshairCenter = useCallback(() => {
		console.log(`%c--- Button Clicked: Set Crosshair (Chart Center) ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
		if (chartInstanceRef.current && chartReady) {
			const chartElement = chartInstanceRef.current.chartElement(); // Get the actual DOM element
			const chartElementClient = chartElement.parentNode; // The Grid container size is more stable
			const centerX = Math.round(chartElementClient.clientWidth / 2);
			const centerY = Math.round(chartElementClient.clientHeight / 2);
			lineToolsApi.setCrossHairXY(centerX, centerY, true);
		} else {
			console.warn("Chart not ready to set crosshair.");
		}
	}, [lineToolsApi, chartInstanceRef, chartReady]);

	const handleSetCrosshairLogical = useCallback(() => {
		console.log(`%c--- Button Clicked: Set Crosshair (Logical Offset) ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
		if (chartInstanceRef.current && candlestickSeriesRef.current && chartReady) {
			const chart = chartInstanceRef.current;
			const series = candlestickSeriesRef.current; // Primary series reference
			const timeScale = chart.timeScale();

			// Get visible logical range to find a reference point
			const logicalRange = timeScale.getVisibleLogicalRange();
			if (!logicalRange) {
				console.warn("No visible logical range to calculate crosshair position from.");
				return;
			}

			// Calculate a new logical index: 5 bars to the left of the current center
			const currentCenterLogical = (logicalRange.from + logicalRange.to) / 2;
			const targetLogical = currentCenterLogical - 5; // 5 bars to the left

			// Convert targetLogical to an X coordinate
			const targetX = timeScale.logicalToCoordinate(targetLogical);
			
			// Example price: 100 on the main series' scale
			const targetPrice = 100;
			const targetPriceY = series.priceToCoordinate(targetPrice);

			if (targetX === null || targetPriceY === null) {
				console.warn("Could not convert target logical index/price to coordinate for crosshair.");
				return;
			}

			lineToolsApi.setCrossHairXY(targetX, targetPriceY, true);
		} else {
			console.warn("Chart/Series not ready to set crosshair from logical values.");
		}
	}, [lineToolsApi, chartInstanceRef, candlestickSeriesRef, chartReady]);


	const handleClearCrosshair = useCallback(() => {
		console.log(`%c--- Button Clicked: Clear Crosshair ---`, 'color: #fff; background: #607D8B; padding: 2px 5px;');
		lineToolsApi.clearCrossHair();
	}, [lineToolsApi]);


	// --- Return Object ---
	return {
		// Event State
		subscribedAfterEdit,
		subscribedDoubleClick,
		exportedJson,

		// Handlers (Events)
		toggleSubscribeAfterEdit,
		toggleSubscribeDoubleClick,

		// Handlers (Core Ops)
		handleExportAll,
		handleImportAll,
		handleGetSelected,
		
		// Handlers (Removal)
		handleRemoveSelected,
		handleRemoveAll,
		
		// Handlers (Crosshair)
		handleSetCrosshairPixel,
		handleSetCrosshairCenter,
		handleSetCrosshairLogical,
		handleClearCrosshair,
	};
};
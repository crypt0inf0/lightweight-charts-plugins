// File: /src/Components/LightweightCandlestickChart.jsx

import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, CandlestickSeries, CrosshairMode } from 'lightweight-charts';
import { createLineToolsPlugin } from 'lightweight-charts-line-tools-core';
import { LineToolRectangle } from 'lightweight-charts-line-tools-rectangle';
import {
	LineToolTrendLine,
	LineToolExtendedLine,
	LineToolArrow,
	LineToolRay,
	LineToolHorizontalLine,
	LineToolHorizontalRay,
	LineToolVerticalLine,
	LineToolCrossLine,
	LineToolCallout,
} from 'lightweight-charts-line-tools-lines';
import { LineToolCircle } from 'lightweight-charts-line-tools-circle';
import { LineToolBrush, LineToolHighlighter } from 'lightweight-charts-line-tools-freehand';
import { LineToolPath } from 'lightweight-charts-line-tools-path';
import { LineToolTriangle } from 'lightweight-charts-line-tools-triangle';
import { LineToolText } from 'lightweight-charts-line-tools-text';
import { LineToolParallelChannel } from 'lightweight-charts-line-tools-parallel-channel';
import { LineToolPriceRange } from 'lightweight-charts-line-tools-price-range';
import { LineToolLongShortPosition } from 'lightweight-charts-line-tools-long-short-position';
import { LineToolFibRetracement } from 'lightweight-charts-line-tools-fib-retracement';
import { LineToolMarketDepth } from 'lightweight-charts-line-tools-market-depth';
import { LineToolElliottImpulse, LineToolElliottCorrection } from '../plugin/elliott-wave/src/index';
import { LineToolDateRange } from '../plugin/date-range/src/index';
import { LineToolTrendBasedFibExtension } from '../plugin/trend-based-fib-extension/src/index';
import { LineToolDateAndPriceRange } from '../plugin/date-and-price-range/src/index';
import LineToolTestPanel from './LineToolTestPanel';
import DrawingToolbar from './DrawingToolbar';
import { Box } from '@mui/material';


const colors = {
	backgroundColor: '#1E222D',
	lineColor: '#2962FF',
	textColor: '#D1D4DC',
};

/**
 * Generates a consistent, repeatable set of daily candlestick data between two dates.
 */
function generateTestCandlestickData(startDateStr, endDateStr) {
	const data = [];
	const startDate = new Date(startDateStr + 'T00:00:00Z');
	const endDate = new Date(endDateStr + 'T00:00:00Z');

	let currentDate = new Date(startDate);
	let i = 0;

	const basePrice = 150;
	const amplitude = 50;

	while (currentDate <= endDate) {
		const time = Math.floor(currentDate.getTime() / 1000);
		const open = basePrice + Math.cos(i / 20) * amplitude * 0.8;
		const close = basePrice + Math.sin(i / 10) * amplitude;
		const highFuzz = (i % 5) + 1;
		const lowFuzz = (i % 7) + 1;
		const high = Math.max(open, close) + highFuzz;
		const low = Math.min(open, close) - lowFuzz;
		data.push({ time, open, high, low, close });
		currentDate.setUTCDate(currentDate.getUTCDate() + 1);
		i++;
	}
	return data;
}

const LightweightCandlestickChart = () => {
	const chartContainerRef = useRef(null);
	const chartInstanceRef = useRef(null);
	const lineToolsPluginRef = useRef(null);
	const candlestickSeriesRef = useRef(null);
	const [chartReady, setChartReady] = useState(false);
	const [activeTool, setActiveTool] = useState('cursor');

	// --- Chart & Plugin Initialization Effect ---
	useEffect(() => {
		const handleResize = () => {
			if (chartInstanceRef.current && chartContainerRef.current) {
				chartInstanceRef.current.applyOptions({
					width: chartContainerRef.current.clientWidth,
					height: chartContainerRef.current.clientHeight,
				});
			}
		};

		if (!chartContainerRef.current || chartContainerRef.current.clientWidth === 0) {
			return;
		}

		// 1. Initialize Chart
		const chart = createChart(chartContainerRef.current, {
			layout: {
				background: {
					type: ColorType.Solid,
					color: colors.backgroundColor,
				},
				textColor: colors.textColor,
			},
			width: chartContainerRef.current.clientWidth,
			height: chartContainerRef.current.clientHeight,
			grid: {
				vertLines: { visible: false },
				horzLines: { visible: false }
			},
			crosshair: {
				mode: CrosshairMode.Normal,
			}
		});
		chartInstanceRef.current = chart;

		chart.timeScale().fitContent();

		const newCandlestickSeries = chart.addSeries(CandlestickSeries, {
			upColor: '#26A69A',
			downColor: '#EF5350',
			borderVisible: false,
			wickUpColor: '#26A69A',
			wickDownColor: '#EF5350',
		});
		candlestickSeriesRef.current = newCandlestickSeries;

		newCandlestickSeries.setData(generateTestCandlestickData('2025-09-01', '2025-09-30'));

		// 2. Initialize Line Tools Plugin
		const lineTools = createLineToolsPlugin(
			chartInstanceRef.current,
			candlestickSeriesRef.current
		);
		lineToolsPluginRef.current = lineTools;

		// 3. Register Line Tools
		lineTools.registerLineTool('Rectangle', LineToolRectangle);
		lineTools.registerLineTool('TrendLine', LineToolTrendLine);
		lineTools.registerLineTool('Circle', LineToolCircle);
		lineTools.registerLineTool('Brush', LineToolBrush);
		lineTools.registerLineTool('Highlighter', LineToolHighlighter);
		lineTools.registerLineTool('Path', LineToolPath);
		lineTools.registerLineTool('Triangle', LineToolTriangle);
		lineTools.registerLineTool('ExtendedLine', LineToolExtendedLine);
		lineTools.registerLineTool('Arrow', LineToolArrow);
		lineTools.registerLineTool('Ray', LineToolRay);
		lineTools.registerLineTool('HorizontalLine', LineToolHorizontalLine);
		lineTools.registerLineTool('HorizontalRay', LineToolHorizontalRay);
		lineTools.registerLineTool('VerticalLine', LineToolVerticalLine);
		lineTools.registerLineTool('CrossLine', LineToolCrossLine);
		lineTools.registerLineTool('Text', LineToolText);
		lineTools.registerLineTool('Callout', LineToolCallout);
		lineTools.registerLineTool('ParallelChannel', LineToolParallelChannel);
		lineTools.registerLineTool('PriceRange', LineToolPriceRange);
		lineTools.registerLineTool('LongShortPosition', LineToolLongShortPosition);
		lineTools.registerLineTool('FibRetracement', LineToolFibRetracement);
		lineTools.registerLineTool('MarketDepth', LineToolMarketDepth);
		lineTools.registerLineTool('ElliottImpulse', LineToolElliottImpulse);
		lineTools.registerLineTool('ElliottCorrection', LineToolElliottCorrection);
		lineTools.registerLineTool('DateRange', LineToolDateRange);
		lineTools.registerLineTool('TrendBasedFibExtension', LineToolTrendBasedFibExtension);
		lineTools.registerLineTool('DateAndPriceRange', LineToolDateAndPriceRange);

		setChartReady(true);

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			if (chartInstanceRef.current) {
				if (lineToolsPluginRef.current) {
					lineToolsPluginRef.current.removeAllLineTools();
				}
				chartInstanceRef.current.remove();
				chartInstanceRef.current = null;
			}
		};
	}, []);

	const handleToolChange = (toolId) => {
		setActiveTool(toolId);
	};

	const handleClearAll = () => {
		if (lineToolsPluginRef.current) {
			lineToolsPluginRef.current.removeAllLineTools();
		}
	};

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>
			{/* Drawing Toolbar - Top */}
			<DrawingToolbar
				lineToolsPluginRef={lineToolsPluginRef}
				activeTool={activeTool}
				onToolChange={handleToolChange}
				onClearAll={handleClearAll}
			/>

			{/* Main Content - Split View */}
			<Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
				{/* Left Panel - Controls */}
				<Box
					sx={{
						width: 320,
						minWidth: 280,
						maxWidth: 400,
						height: '100%',
						overflowY: 'auto',
						borderRight: '1px solid',
						borderColor: 'divider',
						bgcolor: 'background.paper',
					}}
				>
					<LineToolTestPanel
						lineToolsPluginRef={lineToolsPluginRef}
						chartInstanceRef={chartInstanceRef}
						candlestickSeriesRef={candlestickSeriesRef}
						chartReady={chartReady}
					/>
				</Box>

				{/* Right Panel - Chart */}
				<Box
					ref={chartContainerRef}
					sx={{
						flex: 1,
						height: '100%',
						bgcolor: colors.backgroundColor,
					}}
				/>
			</Box>
		</Box>
	);
};

export default LightweightCandlestickChart;
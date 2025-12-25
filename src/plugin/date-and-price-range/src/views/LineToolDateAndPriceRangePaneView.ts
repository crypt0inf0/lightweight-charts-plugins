// /lightweight-charts-line-tools-date-and-price-range/src/views/LineToolDateAndPriceRangePaneView.ts

import {
    IChartApiBase,
    ISeriesApi,
    SeriesType,
    Coordinate,
    LineStyle,
} from 'lightweight-charts';

import {
    BaseLineTool,
    LineToolPaneView,
    CompositeRenderer,
    AnchorPoint,
    OffScreenState,
    getToolCullingState,
    LineToolOptionsInternal,
    TextRenderer,
    RectangleRenderer,
    SegmentRenderer,
    deepCopy,
    LineEnd,
    BoxVerticalAlignment,
    BoxHorizontalAlignment,
    TextAlignment,
    LineOptions,
    TextRendererData,
    LineToolPoint,
    LineToolCullingInfo,
    HitTestResult,
    HitTestType,
} from 'lightweight-charts-line-tools-core';

import { LineToolDateAndPriceRange } from '../model/LineToolDateAndPriceRange';

/**
 * Pane View for the Date and Price Range tool.
 *
 * Renders:
 * 1. Filled rectangle (background)
 * 2. Vertical arrow (price direction)
 * 3. Horizontal arrow (time direction)
 * 4. Info label (price, percentage, bars, days)
 */
export class LineToolDateAndPriceRangePaneView<HorzScaleItem> extends LineToolPaneView<HorzScaleItem> {

    protected _verticalArrowRenderer: SegmentRenderer<HorzScaleItem> = new SegmentRenderer(new HitTestResult(HitTestType.MovePoint));
    protected _horizontalArrowRenderer: SegmentRenderer<HorzScaleItem> = new SegmentRenderer(new HitTestResult(HitTestType.MovePoint));
    protected _infoLabelRenderer: TextRenderer<HorzScaleItem> = new TextRenderer();

    public constructor(
        source: LineToolDateAndPriceRange<HorzScaleItem>,
        chart: IChartApiBase<any>,
        series: ISeriesApi<SeriesType, any>,
    ) {
        super(source as BaseLineTool<HorzScaleItem>, chart, series);
    }

    protected override _updateImpl(height: number, width: number): void {
        this._invalidated = false;
        this._renderer.clear();

        const tool = this._tool as LineToolDateAndPriceRange<HorzScaleItem>;
        const options = tool.options() as LineToolOptionsInternal<any>;

        if (!options.visible) {
            return;
        }

        // 1. Coordinate Conversion
        const hasScreenPoints = this._updatePoints();
        if (!hasScreenPoints || this._points.length < tool.pointsCount) {
            return;
        }

        const compositeRenderer = this._renderer as CompositeRenderer<HorzScaleItem>;
        const P0 = this._points[0];
        const P1 = this._points[1];

        // Sort for geometry
        const minX = Math.min(P0.x, P1.x);
        const maxX = Math.max(P0.x, P1.x);
        const minY = Math.min(P0.y, P1.y);
        const maxY = Math.max(P0.y, P1.y);

        const topLeftScreen = new AnchorPoint(minX, minY, 0);
        const bottomRightScreen = new AnchorPoint(maxX, maxY, 1);

        // Get measurement data
        const measurementData = tool.getMeasurementData();

        const commonCursorOptions = {
            toolDefaultHoverCursor: options.defaultHoverCursor,
            toolDefaultDragCursor: options.defaultDragCursor,
        };

        // --- 1. Rectangle Background ---
        this._rectangleRenderer.setData({
            ...deepCopy(options.dateAndPriceRange.rectangle),
            points: [topLeftScreen, bottomRightScreen],
            hitTestBackground: false,
            ...commonCursorOptions,
        });
        compositeRenderer.append(this._rectangleRenderer);

        // --- 2. Vertical Arrow (Price Direction) ---
        const midX = (minX + maxX) / 2 as Coordinate;

        // Arrow from start price to end price (direction based on movement)
        const verticalStart = new AnchorPoint(midX, P0.y, 0);
        const verticalEnd = new AnchorPoint(midX, P1.y, 1);

        const verticalArrowOptions: LineOptions = {
            ...deepCopy(options.dateAndPriceRange.verticalArrow),
        };

        this._verticalArrowRenderer.setData({
            points: [verticalStart, verticalEnd],
            line: verticalArrowOptions,
            ...commonCursorOptions,
        });
        compositeRenderer.append(this._verticalArrowRenderer);

        // --- 3. Horizontal Arrow (Time Direction) ---
        const midY = (minY + maxY) / 2 as Coordinate;

        // Arrow from start time to end time
        const horizontalStart = new AnchorPoint(P0.x, midY, 0);
        const horizontalEnd = new AnchorPoint(P1.x, midY, 1);

        const horizontalArrowOptions: LineOptions = {
            ...deepCopy(options.dateAndPriceRange.horizontalArrow),
        };

        this._horizontalArrowRenderer.setData({
            points: [horizontalStart, horizontalEnd],
            line: horizontalArrowOptions,
            ...commonCursorOptions,
        });
        compositeRenderer.append(this._horizontalArrowRenderer);

        // --- 4. Info Label ---
        if (measurementData) {
            const priceFormatter = this._series.priceFormatter();

            // Build label text
            const priceSign = measurementData.isUpward ? '+' : '-';
            const percentSign = measurementData.isUpward ? '+' : '-';

            const priceDiffText = priceFormatter.format(measurementData.priceDiff);
            const percentText = measurementData.percentChange.toFixed(2);

            // Line 1: Price change (percent) total
            const line1 = `${priceSign}${priceDiffText} (${percentSign}${percentText}%)`;

            // Line 2: Bars, Days
            const line2 = `${measurementData.barCount} bars, ${measurementData.dayCount}d`;

            const labelText = `${line1}\n${line2}`;

            // Position label above the rectangle
            const labelPivot = new AnchorPoint(
                ((minX + maxX) / 2) as Coordinate,
                (minY - 5) as Coordinate,
                0
            );

            const labelOptions = deepCopy(options.text);
            labelOptions.value = labelText;
            labelOptions.alignment = TextAlignment.Center;
            labelOptions.box.alignment.horizontal = BoxHorizontalAlignment.Center;
            labelOptions.box.alignment.vertical = BoxVerticalAlignment.Bottom;
            labelOptions.font.size = 11;
            labelOptions.font.bold = false;

            const textData: TextRendererData = {
                points: [labelPivot],
                text: labelOptions,
                hitTestBackground: true,
            };

            this._infoLabelRenderer.setData(textData);
            compositeRenderer.append(this._infoLabelRenderer);
        }

        // --- 5. Anchors ---
        this._addAnchors(compositeRenderer);
    }

    protected override _addAnchors(renderer: CompositeRenderer<HorzScaleItem>): void {
        this._points.forEach((point, index) => {
            const anchor = this.createLineAnchor({
                points: [point],
            }, index);
            renderer.append(anchor);
        });
    }
}

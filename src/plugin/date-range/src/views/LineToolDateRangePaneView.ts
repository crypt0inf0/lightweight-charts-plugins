// lightweight-charts-line-tools-date-range/src/views/LineToolDateRangePaneView.ts

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
    BoxVerticalAlignment,
    BoxHorizontalAlignment,
    PaneCursorType,
    TextAlignment,
    LineOptions,
    TextRendererData,
    LineToolPoint,
    LineToolCullingInfo,
    LineEnd,
} from 'lightweight-charts-line-tools-core';

import { LineToolDateRange } from '../model/LineToolDateRange';


/**
 * Pane View for the Date Range tool - TradingView Style
 *
 * This view renders:
 * 1. A rectangle (shaded area)
 * 2. An arrow line from start to end point
 * 3. A label at the TOP showing bar count and duration
 * 4. Only 2 anchor circles at the corners
 */
export class LineToolDateRangePaneView<HorzScaleItem> extends LineToolPaneView<HorzScaleItem> {

    // Arrow line renderer (from start to end with arrow)
    protected _arrowLineRenderer: SegmentRenderer<HorzScaleItem> = new SegmentRenderer();
    protected _dateInfoLabelRenderer: TextRenderer<HorzScaleItem> = new TextRenderer();

    public constructor(
        source: LineToolDateRange<HorzScaleItem>,
        chart: IChartApiBase<any>,
        series: ISeriesApi<SeriesType, any>,
    ) {
        super(source as BaseLineTool<HorzScaleItem>, chart, series);
    }

    protected override _updateImpl(height: number, width: number): void {
        this._invalidated = false;
        this._renderer.clear();

        const tool = this._tool as LineToolDateRange<HorzScaleItem>;
        const options = tool.options() as any;

        if (!options.visible) {
            return;
        }

        // Coordinate Conversion
        const hasScreenPoints = this._updatePoints();
        if (!hasScreenPoints || this._points.length < tool.pointsCount) {
            return;
        }

        const compositeRenderer = this._renderer as CompositeRenderer<HorzScaleItem>;
        const P0 = this._points[0]; // Start point
        const P1 = this._points[1]; // End point

        // Calculate geometric bounds
        const minX = Math.min(P0.x, P1.x);
        const maxX = Math.max(P0.x, P1.x);
        const minY = Math.min(P0.y, P1.y);
        const maxY = Math.max(P0.y, P1.y);

        const topLeftScreen = new AnchorPoint(minX, minY, 0);
        const bottomRightScreen = new AnchorPoint(maxX, maxY, 1);

        // Culling check
        const P0_cull = this._tool.getPoint(0)!;
        const P1_cull = this._tool.getPoint(1)!;

        if (P0_cull && P1_cull && this._points.length >= this._tool.pointsCount && !this._tool.isCreating() && !this._tool.isEditing()) {
            const minTime = Math.min(P0_cull.timestamp, P1_cull.timestamp);
            const maxTime = Math.max(P0_cull.timestamp, P1_cull.timestamp);
            const minPrice = Math.min(P0_cull.price, P1_cull.price);
            const maxPrice = Math.max(P0_cull.price, P1_cull.price);

            const P_TL: LineToolPoint = { timestamp: minTime, price: maxPrice };
            const P_TR: LineToolPoint = { timestamp: maxTime, price: maxPrice };
            const P_BR: LineToolPoint = { timestamp: maxTime, price: minPrice };
            const P_BL: LineToolPoint = { timestamp: minTime, price: minPrice };

            const cullingPoints: LineToolPoint[] = [P_TL, P_TR, P_BR, P_BL];

            const cullingInfo: LineToolCullingInfo = {
                subSegments: [
                    [0, 1],
                    [3, 2]
                ]
            };

            const extendOptions = options.dateRange.rectangle.extend;
            const cullingState = getToolCullingState(cullingPoints, tool, extendOptions, undefined, cullingInfo);

            let shouldCull = false;

            switch (cullingState) {
                case OffScreenState.OffScreenTop:
                case OffScreenState.OffScreenBottom:
                    shouldCull = true;
                    break;
                case OffScreenState.OffScreenLeft:
                    if (extendOptions.right !== true) {
                        shouldCull = true;
                    }
                    break;
                case OffScreenState.OffScreenRight:
                    if (extendOptions.left !== true) {
                        shouldCull = true;
                    }
                    break;
                case OffScreenState.FullyOffScreen:
                    shouldCull = true;
                    break;
                case OffScreenState.Visible:
                default:
                    shouldCull = false;
                    break;
            }

            if (shouldCull) {
                compositeRenderer.clear();
                return;
            }
        }


        // 1. Rectangle Body (shaded area)
        const rectBodyPoints: [AnchorPoint, AnchorPoint] = [topLeftScreen, bottomRightScreen];

        this._rectangleRenderer.setData({
            ...deepCopy(options.dateRange.rectangle),
            points: rectBodyPoints,
            hitTestBackground: true,
            toolDefaultHoverCursor: options.defaultHoverCursor,
            toolDefaultDragCursor: options.defaultDragCursor,
        });

        compositeRenderer.append(this._rectangleRenderer);

        // 2. Arrow Line from P0 to P1 (TradingView style - horizontal line at center with arrow)
        const midY = (P0.y + P1.y) / 2 as Coordinate;
        const arrowLinePoints: [AnchorPoint, AnchorPoint] = [
            new AnchorPoint(P0.x, midY, 0),
            new AnchorPoint(P1.x, midY, 1),
        ];

        this._arrowLineRenderer.setData({
            points: arrowLinePoints,
            line: {
                width: 2,
                color: options.dateRange.rectangle.border.color || '#2196F3',
                style: LineStyle.Solid,
                join: 'miter',
                cap: 'butt',
                // Arrow at the end (right side)
                end: {
                    left: LineEnd.Normal,
                    right: LineEnd.Arrow
                },
                extend: { left: false, right: false },
            } as LineOptions,
        });
        compositeRenderer.append(this._arrowLineRenderer);

        // 3. Date Info Label at TOP (outside the box)
        const activePoints = tool.points();

        if (activePoints.length >= 2) {
            this._addDateInfoLabel(compositeRenderer, tool, P0, P1, minY, options);
        }

        // 4. Only 2 Anchors at corners (TradingView style)
        this._addAnchors(compositeRenderer);
    }

    /**
     * Renders the label at the TOP of the box - TradingView style
     * Format: "65 bars, 3d 3h 45m"
     */
    private _addDateInfoLabel(
        renderer: CompositeRenderer<HorzScaleItem>,
        tool: LineToolDateRange<HorzScaleItem>,
        P0: AnchorPoint,
        P1: AnchorPoint,
        topY: number,
        options: any,
    ): void {
        const dateRangeOptions = options.dateRange;

        const allActivePoints = tool.points();
        if (allActivePoints.length < 2) return;

        const point0 = allActivePoints[0];
        const point1 = allActivePoints[1];

        // Calculate bar count
        const timestamp0 = point0.timestamp as number;
        const timestamp1 = point1.timestamp as number;
        const barCount = Math.abs(Math.round((timestamp1 - timestamp0) / 86400)); // Assuming daily bars

        // Calculate duration
        const durationSeconds = Math.abs(timestamp1 - timestamp0);
        const durationText = this._formatDurationCompact(durationSeconds);

        // Build label text - TradingView format: "65 bars, 3d 3h 45m"
        const labelParts: string[] = [];

        if (dateRangeOptions.showBarCount) {
            labelParts.push(`${barCount} bars`);
        }

        if (dateRangeOptions.showDuration) {
            labelParts.push(durationText);
        }

        if (labelParts.length === 0) return;

        // Join with comma and space like TradingView
        const labelText = labelParts.join(', ');

        // Position at CENTER TOP (above the box)
        const centerX = (P0.x + P1.x) / 2 as Coordinate;
        const labelY = (topY - 25) as Coordinate; // 25px above the top edge

        const centerTopPivot = new AnchorPoint(centerX, labelY, 0);

        // Prepare TextOptions - clean minimal style like TradingView
        const finalLabelOptions = deepCopy(options.text);
        finalLabelOptions.value = labelText;

        finalLabelOptions.box.alignment.horizontal = BoxHorizontalAlignment.Center;
        finalLabelOptions.box.alignment.vertical = BoxVerticalAlignment.Bottom;
        finalLabelOptions.alignment = TextAlignment.Center;
        finalLabelOptions.font.size = 12;
        finalLabelOptions.font.bold = false;
        finalLabelOptions.font.color = '#787B86'; // TradingView gray text

        // Clean background with subtle styling
        finalLabelOptions.box.background = {
            color: 'rgba(255, 255, 255, 0.95)',
            inflation: { x: 6, y: 3 }
        };
        finalLabelOptions.box.border = {
            color: '#E0E3EB',
            width: 1,
            radius: 3,
            highlight: false,
            style: LineStyle.Solid
        };
        finalLabelOptions.box.shadow = {
            blur: 2,
            color: 'rgba(0, 0, 0, 0.1)',
            offset: { x: 0, y: 1 }
        };

        const textRendererData: TextRendererData = {
            points: [centerTopPivot],
            text: finalLabelOptions,
            hitTestBackground: false,
        };

        this._dateInfoLabelRenderer.setData(textRendererData);
        renderer.append(this._dateInfoLabelRenderer);
    }

    /**
     * Formats duration in a compact TradingView style: "3d 3h 45m"
     */
    private _formatDurationCompact(seconds: number): string {
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        const parts: string[] = [];

        if (days > 0) {
            parts.push(`${days}d`);
        }
        if (hours > 0) {
            parts.push(`${hours}h`);
        }
        if (minutes > 0 || parts.length === 0) {
            parts.push(`${minutes}m`);
        }

        return parts.join(' ');
    }

    /**
     * Creates only 2 anchor points at P0 and P1 (TradingView style - simple circles)
     */
    protected override _addAnchors(renderer: CompositeRenderer<any>): void {
        if (this._points.length < 2) return;

        const P0 = this._points[0];
        const P1 = this._points[1];

        // Only 2 anchors - at start and end corners
        const anchor0 = new AnchorPoint(P0.x, P0.y, 0, false, PaneCursorType.Move);
        const anchor1 = new AnchorPoint(P1.x, P1.y, 1, false, PaneCursorType.Move);

        const anchorData = {
            points: [anchor0, anchor1],
        };

        const toolOptions = this._tool.options();
        renderer.append(this.createLineAnchor({
            ...anchorData,
            defaultAnchorHoverCursor: toolOptions.defaultAnchorHoverCursor,
            defaultAnchorDragCursor: toolOptions.defaultAnchorDragCursor,
        }, 0));
    }
}

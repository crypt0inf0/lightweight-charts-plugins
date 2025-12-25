// /lightweight-charts-line-tools-date-and-price-range/src/model/LineToolDateAndPriceRange.ts

import {
    IChartApiBase,
    ISeriesApi,
    IHorzScaleBehavior,
    SeriesType,
    LineStyle,
    Coordinate,
} from 'lightweight-charts';

import {
    BaseLineTool,
    LineToolPoint,
    LineToolType,
    LineToolOptionsInternal,
    Point,
    merge,
    DeepPartial,
    LineToolsCorePlugin,
    deepCopy,
    PriceAxisLabelStackingManager,
    LineEnd,
    TextAlignment,
    BoxVerticalAlignment,
    BoxHorizontalAlignment,
    TextOptions,
    LineOptions,
    PaneCursorType,
    InteractionPhase,
    ConstraintResult,
    HitTestResult,
    CompositeRenderer,
} from 'lightweight-charts-line-tools-core';

import { LineToolDateAndPriceRangePaneView } from '../views/LineToolDateAndPriceRangePaneView';

/**
 * Defines the default configuration options for the Date and Price Range tool.
 */
export const DateAndPriceRangeOptionDefaults: LineToolOptionsInternal<any> = {
    visible: true,
    editable: true,
    defaultHoverCursor: PaneCursorType.Pointer,
    defaultDragCursor: PaneCursorType.Grabbing,
    defaultAnchorHoverCursor: PaneCursorType.Pointer,
    defaultAnchorDragCursor: PaneCursorType.Grabbing,
    notEditableCursor: PaneCursorType.NotAllowed,
    showPriceAxisLabels: true,
    showTimeAxisLabels: true,
    priceAxisLabelAlwaysVisible: false,
    timeAxisLabelAlwaysVisible: false,

    // Text label configuration
    text: {
        value: '',
        padding: 0,
        wordWrapWidth: 0,
        forceTextAlign: false,
        forceCalculateMaxLineWidth: false,
        alignment: TextAlignment.Center,
        font: {
            color: 'rgba(255, 255, 255, 1)',
            size: 12,
            bold: false,
            italic: false,
            family: 'sans-serif',
        },
        box: {
            alignment: { vertical: BoxVerticalAlignment.Top, horizontal: BoxHorizontalAlignment.Center },
            angle: 0,
            scale: 1,
            padding: { x: 5, y: 3 },
            maxHeight: 0,
            shadow: { blur: 0, color: 'transparent', offset: { x: 0, y: 0 } },
            border: { color: 'transparent', width: 0, radius: 0, highlight: false, style: LineStyle.Solid },
            background: { color: 'rgba(41, 98, 255, 0.9)', inflation: { x: 5, y: 3 } },
        },
    } as TextOptions,

    // Visual configuration
    dateAndPriceRange: {
        rectangle: {
            extend: { left: false, right: false },
            background: { color: 'rgba(41, 98, 255, 0.2)' },
            border: { width: 0, style: LineStyle.Solid, color: 'transparent', radius: 0 },
        },

        // Vertical arrow (shows price direction)
        verticalArrow: {
            width: 1,
            color: '#2962ff',
            style: LineStyle.Solid,
            join: 'miter',
            cap: 'butt',
            end: { left: LineEnd.Normal, right: LineEnd.Arrow },
            extend: { left: false, right: false },
        } as LineOptions,

        // Horizontal arrow (shows time direction)
        horizontalArrow: {
            width: 1,
            color: '#2962ff',
            style: LineStyle.Dashed,
            join: 'miter',
            cap: 'butt',
            end: { left: LineEnd.Normal, right: LineEnd.Arrow },
            extend: { left: false, right: false },
        } as LineOptions,
    }
};

/**
 * Date and Price Range drawing tool.
 *
 * This 2-point tool displays:
 * - A filled rectangle
 * - Vertical arrow showing price direction
 * - Horizontal arrow showing time direction
 * - Info label with price change, percentage, bar count, and days
 */
export class LineToolDateAndPriceRange<HorzScaleItem> extends BaseLineTool<HorzScaleItem> {
    public override readonly toolType: LineToolType = 'DateAndPriceRange' as LineToolType;
    public override readonly pointsCount: number = 2;

    public override maxAnchorIndex(): number {
        return 1; // 2 anchors: P0, P1 (no virtual anchors for simplicity)
    }

    public supportsClickClickCreation(): boolean { return true; }
    public supportsClickDragCreation(): boolean { return true; }
    public supportsShiftClickClickConstraint(): boolean { return true; }
    public supportsShiftClickDragConstraint(): boolean { return true; }

    public constructor(
        coreApi: LineToolsCorePlugin<HorzScaleItem>,
        chart: IChartApiBase<HorzScaleItem>,
        series: ISeriesApi<SeriesType, HorzScaleItem>,
        horzScaleBehavior: IHorzScaleBehavior<HorzScaleItem>,
        options: DeepPartial<LineToolOptionsInternal<any>> = {},
        points: LineToolPoint[] = [],
        priceAxisLabelStackingManager: PriceAxisLabelStackingManager<HorzScaleItem>
    ) {
        const finalOptions = deepCopy(DateAndPriceRangeOptionDefaults) as LineToolOptionsInternal<any>;
        merge(finalOptions, options as DeepPartial<LineToolOptionsInternal<any>>);

        super(
            coreApi,
            chart,
            series,
            horzScaleBehavior,
            finalOptions,
            points,
            'DateAndPriceRange' as LineToolType,
            2,
            priceAxisLabelStackingManager
        );

        this._setPaneViews([new LineToolDateAndPriceRangePaneView(this, this._chart, this._series)]);
    }

    /**
     * Calculates the measurement data between the two points.
     */
    public getMeasurementData(): {
        priceDiff: number;
        percentChange: number;
        barCount: number;
        dayCount: number;
        isUpward: boolean;
        isRightward: boolean;
    } | null {
        const points = this.points();
        if (points.length < 2) return null;

        const [p0, p1] = points;

        // Price calculations
        const priceDiff = p1.price - p0.price;
        const percentChange = p0.price !== 0 ? (priceDiff / p0.price) * 100 : 0;
        const isUpward = priceDiff >= 0;

        // Time calculations
        const timeDiff = p1.timestamp - p0.timestamp;
        const isRightward = timeDiff >= 0;

        // Calculate bar count (using logical index if available)
        let barCount = 0;
        try {
            const timeScale = this._chart.timeScale();
            const idx0 = timeScale.timeToCoordinate(p0.timestamp as any);
            const idx1 = timeScale.timeToCoordinate(p1.timestamp as any);
            if (idx0 !== null && idx1 !== null) {
                // Approximate bars based on timestamp difference
                barCount = Math.abs(Math.round(timeDiff / 86400)); // Rough daily bars
            }
        } catch {
            barCount = Math.abs(Math.round(timeDiff / 86400));
        }

        // Calculate days (assuming timestamps are in seconds)
        const dayCount = Math.abs(Math.round(timeDiff / 86400));

        return {
            priceDiff: Math.abs(priceDiff),
            percentChange: Math.abs(percentChange),
            barCount,
            dayCount,
            isUpward,
            isRightward,
        };
    }

    /**
     * Intentionally empty - preserve point order for direction.
     */
    public normalize(): void {
        // Do not normalize. Direction is important.
    }

    public override getShiftConstrainedPoint(
        pointIndex: number,
        rawScreenPoint: Point,
        phase: InteractionPhase,
        originalLogicalPoint: LineToolPoint,
        allOriginalLogicalPoints: LineToolPoint[]
    ): ConstraintResult {
        const originalScreenPoint = this.pointToScreenPoint(originalLogicalPoint);
        if (!originalScreenPoint) {
            return { point: rawScreenPoint, snapAxis: 'none' };
        }

        if (phase === InteractionPhase.Creation) {
            const P0_logical = allOriginalLogicalPoints[0];
            const P0_screen = this.pointToScreenPoint(P0_logical)!;
            return {
                point: new Point(rawScreenPoint.x, P0_screen.y),
                snapAxis: 'price',
            };
        }

        return {
            point: new Point(rawScreenPoint.x, originalScreenPoint.y),
            snapAxis: 'price',
        };
    }

    public override _internalHitTest(x: Coordinate, y: Coordinate): HitTestResult<any> | null {
        if (!this._paneViews || this._paneViews.length === 0) {
            return null;
        }

        const paneView = this._paneViews[0] as LineToolDateAndPriceRangePaneView<HorzScaleItem>;
        const compositeRenderer = paneView.renderer() as CompositeRenderer<HorzScaleItem>;

        if (!compositeRenderer || !compositeRenderer.hitTest) {
            return null;
        }

        return compositeRenderer.hitTest(x, y);
    }
}

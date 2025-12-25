// /src/model/LineToolElliottImpulse.ts

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
    LineToolsCorePlugin,
    LineEnd,
    deepCopy,
    merge,
    DeepPartial,
    PaneCursorType,
    FinalizationMethod,
    PriceAxisLabelStackingManager,
    HitTestResult,
    LineToolHitTestData,
    CompositeRenderer,
} from 'lightweight-charts-line-tools-core';

import { LineToolElliottPaneView } from '../views/LineToolElliottPaneView';

/**
 * Labels for the Elliott Impulse Wave (6 points: 0 through 5)
 */
export const IMPULSE_LABELS = ['(0)', '(1)', '(2)', '(3)', '(4)', '(5)'];

/**
 * Default options for Elliott Impulse Wave tool.
 */
export const ElliottImpulseOptionDefaults: any = {
    visible: true,
    editable: true,
    defaultHoverCursor: PaneCursorType.Pointer,
    defaultDragCursor: PaneCursorType.Grabbing,
    defaultAnchorHoverCursor: PaneCursorType.Pointer,
    defaultAnchorDragCursor: PaneCursorType.Grabbing,
    notEditableCursor: PaneCursorType.NotAllowed,
    showPriceAxisLabels: false,
    showTimeAxisLabels: false,
    priceAxisLabelAlwaysVisible: false,
    timeAxisLabelAlwaysVisible: false,

    // Line styling
    line: {
        width: 2,
        color: '#2962ff',
        style: LineStyle.Solid,
        end: { left: LineEnd.Normal, right: LineEnd.Normal },
    },

    // Label styling (custom options for Elliott Wave)
    label: {
        font: 'bold 14px Arial',
        color: '#2962ff',
        offset: 15,
    },
};

/**
 * Elliott Impulse Wave Tool (1-2-3-4-5 pattern)
 * 
 * A 5-point drawing tool for marking Elliott Wave impulse patterns.
 * Each point is labeled with numbers 1 through 5.
 */
export class LineToolElliottImpulse<HorzScaleItem> extends BaseLineTool<HorzScaleItem> {
    public override readonly toolType: LineToolType = 'ElliottImpulse' as LineToolType;
    public override readonly pointsCount: number = 6;

    /**
     * The wave labels for this tool
     */
    public readonly waveLabels: string[] = IMPULSE_LABELS;

    public override maxAnchorIndex(): number {
        return 5; // 0-indexed, 6 points
    }

    public override supportsClickClickCreation(): boolean {
        return true;
    }

    public override supportsClickDragCreation(): boolean {
        return false;
    }

    public override supportsShiftClickClickConstraint(): boolean {
        return false;
    }

    public constructor(
        coreApi: LineToolsCorePlugin<HorzScaleItem>,
        chart: IChartApiBase<HorzScaleItem>,
        series: ISeriesApi<SeriesType, HorzScaleItem>,
        horzScaleBehavior: IHorzScaleBehavior<HorzScaleItem>,
        options: DeepPartial<any> = {},
        points: LineToolPoint[] = [],
        priceAxisLabelStackingManager: PriceAxisLabelStackingManager<HorzScaleItem>
    ) {
        const finalOptions = deepCopy(ElliottImpulseOptionDefaults);
        merge(finalOptions, options);

        super(
            coreApi,
            chart,
            series,
            horzScaleBehavior,
            finalOptions,
            points,
            'ElliottImpulse' as LineToolType,
            6, // Fixed 6 points (0 through 5)
            priceAxisLabelStackingManager
        );

        this._setPaneViews([new LineToolElliottPaneView(this, this._chart, this._series, IMPULSE_LABELS)]);
    }

    /**
     * Finalize when all 5 points are placed
     */
    public override getFinalizationMethod(): FinalizationMethod {
        return FinalizationMethod.PointCount;
    }

    public override _internalHitTest(x: Coordinate, y: Coordinate): HitTestResult<LineToolHitTestData> | null {
        if (!this._paneViews || this._paneViews.length === 0 || !this._paneViews[0]) {
            return null;
        }

        const compositeRenderer = this._paneViews[0].renderer() as CompositeRenderer<HorzScaleItem>;

        if (!compositeRenderer || !compositeRenderer.hitTest) {
            return null;
        }

        return compositeRenderer.hitTest(x, y);
    }
}

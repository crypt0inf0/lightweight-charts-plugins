// /src/model/LineToolElliottCorrection.ts

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
 * Labels for the Elliott Correction Wave (4 points: 0, A, B, C)
 */
export const CORRECTION_LABELS = ['(0)', '(A)', '(B)', '(C)'];

/**
 * Default options for Elliott Correction Wave tool.
 */
export const ElliottCorrectionOptionDefaults: any = {
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

    // Line styling - different color for correction waves
    line: {
        width: 2,
        color: '#ff6d00',
        style: LineStyle.Solid,
        end: { left: LineEnd.Normal, right: LineEnd.Normal },
    },

    // Label styling
    label: {
        font: 'bold 14px Arial',
        color: '#ff6d00',
        offset: 15,
    },
};

/**
 * Elliott Correction Wave Tool (0-A-B-C pattern)
 * 
 * A 4-point drawing tool for marking Elliott Wave correction patterns.
 * Points are labeled (0), (A), (B), and (C).
 */
export class LineToolElliottCorrection<HorzScaleItem> extends BaseLineTool<HorzScaleItem> {
    public override readonly toolType: LineToolType = 'ElliottCorrection' as LineToolType;
    public override readonly pointsCount: number = 4;

    /**
     * The wave labels for this tool
     */
    public readonly waveLabels: string[] = CORRECTION_LABELS;

    public override maxAnchorIndex(): number {
        return 3; // 0-indexed, 4 points
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
        const finalOptions = deepCopy(ElliottCorrectionOptionDefaults);
        merge(finalOptions, options);

        super(
            coreApi,
            chart,
            series,
            horzScaleBehavior,
            finalOptions,
            points,
            'ElliottCorrection' as LineToolType,
            4, // Fixed 4 points (0, A, B, C)
            priceAxisLabelStackingManager
        );

        this._setPaneViews([new LineToolElliottPaneView(this, this._chart, this._series, CORRECTION_LABELS)]);
    }

    /**
     * Finalize when all 4 points are placed
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

// /lightweight-charts-line-tools-trend-based-fib-extension/src/model/LineToolTrendBasedFibExtension.ts

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
    LineToolOptionsInternal,
    LineToolType,
    DeepPartial,
    LineToolsCorePlugin,
    merge,
    deepCopy,
    PriceAxisLabelStackingManager,
    HitTestResult,
    Point,
    InteractionPhase,
    ConstraintResult,
} from 'lightweight-charts-line-tools-core';

import { LineToolTrendBasedFibExtensionPaneView } from '../views/LineToolTrendBasedFibExtensionPaneView';

/**
 * Extension level configuration interface - matches FibRetracementLevel structure
 */
export interface TrendBasedFibExtensionLevel {
    color: string;
    coeff: number;
    opacity: number;
    distanceFromCoeffEnabled: boolean;
    distanceFromCoeff: number;
}

/**
 * Defines the default configuration for the Trend-Based Fibonacci Extension tool.
 *
 * **Tutorial Note:**
 * This tool is structurally complex because it generates many visual elements from three points.
 * These defaults include:
 * 1. **Levels:** An array of coefficients (0, 0.236, 0.382, etc.) with their associated colors and opacities.
 * 2. **Extension:** Configuration to extend all level lines infinitely to the left or right.
 * 3. **Trend/Retracement Lines:** Separate styling for the connecting lines between anchor points.
 *
 * The math: ExtensionPrice = P2.price + (P1.price - P0.price) * level.coeff
 */
export const TrendBasedFibExtensionOptionDefaults: LineToolOptionsInternal<any> = {
    visible: true,
    editable: true,
    showPriceAxisLabels: true,
    showTimeAxisLabels: true,
    priceAxisLabelAlwaysVisible: false,
    timeAxisLabelAlwaysVisible: false,

    line: {
        width: 1,
        style: LineStyle.Solid,
    },
    // Trend line style (P0 to P1)
    trendLine: {
        width: 1,
        style: LineStyle.Solid,
        color: '#787b86',
    },
    // Retracement line style (P1 to P2)
    retracementLine: {
        width: 1,
        style: LineStyle.Dashed,
        color: '#787b86',
    },
    // Global Extension - sets extension for all level lines
    extend: { left: false, right: false },

    // Fibonacci Extension Levels (projected from P2)
    levels: [
        { color: "#787b86", coeff: 0, opacity: 0, distanceFromCoeffEnabled: false, distanceFromCoeff: 0 },
        { color: "#f23645", coeff: 0.236, opacity: 0, distanceFromCoeffEnabled: false, distanceFromCoeff: 0 },
        { color: "#81c784", coeff: 0.382, opacity: 0, distanceFromCoeffEnabled: false, distanceFromCoeff: 0 },
        { color: "#4caf50", coeff: 0.5, opacity: 0, distanceFromCoeffEnabled: false, distanceFromCoeff: 0 },
        { color: "#089981", coeff: 0.618, opacity: 0, distanceFromCoeffEnabled: false, distanceFromCoeff: 0 },
        { color: "#64b5f6", coeff: 0.786, opacity: 0, distanceFromCoeffEnabled: false, distanceFromCoeff: 0 },
        { color: "#787b86", coeff: 1, opacity: 0, distanceFromCoeffEnabled: false, distanceFromCoeff: 0 },
        { color: "#9c27b0", coeff: 1.272, opacity: 0, distanceFromCoeffEnabled: false, distanceFromCoeff: 0 },
        { color: "#2962ff", coeff: 1.618, opacity: 0, distanceFromCoeffEnabled: false, distanceFromCoeff: 0 },
        { color: "#e91e63", coeff: 2, opacity: 0, distanceFromCoeffEnabled: false, distanceFromCoeff: 0 },
        { color: "#f23645", coeff: 2.618, opacity: 0, distanceFromCoeffEnabled: false, distanceFromCoeff: 0 },
        { color: "#ff9800", coeff: 3.618, opacity: 0, distanceFromCoeffEnabled: false, distanceFromCoeff: 0 },
        { color: "#9c27b0", coeff: 4.236, opacity: 0, distanceFromCoeffEnabled: false, distanceFromCoeff: 0 },
    ] as TrendBasedFibExtensionLevel[],
};

/**
 * Concrete implementation of the Trend-Based Fibonacci Extension drawing tool.
 *
 * **What is a Trend-Based Fibonacci Extension?**
 * It is a 3-point tool used to project potential price targets based on a prior trend:
 * 1. P0: Start of the trend (e.g., swing low)
 * 2. P1: End of the trend (e.g., swing high)
 * 3. P2: End of the retracement (e.g., pullback low)
 *
 * **Extension Math:**
 * ExtensionPrice = P2.price + (P1.price - P0.price) * level.coeff
 *
 * For an uptrend, P0 < P1, so extensions project targets above P2.
 * For a downtrend, P0 > P1, so extensions project targets below P2.
 *
 * **Inheritance:**
 * It extends `BaseLineTool` directly. While similar to FibRetracement, its 3-point
 * requirement and unique extension math necessitate a distinct model and view.
 */
export class LineToolTrendBasedFibExtension<HorzScaleItem> extends BaseLineTool<HorzScaleItem> {
    /**
     * The unique identifier for this tool type ('TrendBasedFibExtension').
     *
     * @override
     */
    public override readonly toolType: LineToolType = 'TrendBasedFibExtension' as LineToolType;

    /**
     * Defines the number of anchor points required to draw this tool.
     *
     * A Trend-Based Fib Extension requires exactly **3 points** to define the trend and retracement.
     *
     * @override
     */
    public override readonly pointsCount: number = 3;

    /**
     * Explicitly defines the highest valid index for an interactive anchor point.
     *
     * Since the tool is defined by 3 points, the valid handles are at index 0, 1, and 2.
     *
     * @override
     * @returns `2`
     */
    public maxAnchorIndex(): number {
        return 2; // 3 anchors: P0, P1, and P2
    }

    /**
     * Confirms that this tool can be created via discrete mouse clicks.
     *
     * @override
     * @returns `true`
     */
    public supportsClickClickCreation(): boolean { return true; }

    /**
     * Confirms that this tool can be created via a click-and-drag gesture.
     *
     * @override
     * @returns `true`
     */
    public supportsClickDragCreation(): boolean { return true; }

    /**
     * Enables geometric constraints (Shift key) during click-based creation.
     *
     * @override
     * @returns `true`
     */
    public supportsShiftClickClickConstraint(): boolean { return true; }

    /**
     * Enables geometric constraints (Shift key) during drag-based creation or editing.
     *
     * @override
     * @returns `true`
     */
    public supportsShiftClickDragConstraint(): boolean { return true; }

    /**
     * Initializes the Trend-Based Fibonacci Extension tool.
     *
     * **Tutorial Note on Construction:**
     * 1. **Deep Copy:** It performs a `deepCopy` of the `TrendBasedFibExtensionOptionDefaults` to ensure
     *    this tool instance has its own unique levels array that won't affect other instances.
     * 2. **Merge:** It merges the user's `options` to allow custom level colors or visibility.
     * 3. **View:** It assigns the `LineToolTrendBasedFibExtensionPaneView`, which handles the heavy lifting
     *    of iterating through levels and drawing lines and fills.
     *
     * @param coreApi - The Core Plugin API.
     * @param chart - The Lightweight Charts Chart API.
     * @param series - The Series API this tool is attached to.
     * @param horzScaleBehavior - The horizontal scale behavior.
     * @param options - Configuration overrides.
     * @param points - Initial points.
     * @param priceAxisLabelStackingManager - The manager for label collision.
     */
    public constructor(
        coreApi: LineToolsCorePlugin<HorzScaleItem>,
        chart: IChartApiBase<HorzScaleItem>,
        series: ISeriesApi<SeriesType, HorzScaleItem>,
        horzScaleBehavior: IHorzScaleBehavior<HorzScaleItem>,
        options: DeepPartial<LineToolOptionsInternal<any>> = {},
        points: LineToolPoint[] = [],
        priceAxisLabelStackingManager: PriceAxisLabelStackingManager<HorzScaleItem>
    ) {
        // 1. Create a deep copy of the canonical default options.
        const finalOptions = deepCopy(TrendBasedFibExtensionOptionDefaults) as LineToolOptionsInternal<any>;

        // 2. Merge the user-provided 'options' into this unique deep-copied base.
        merge(finalOptions, options as DeepPartial<LineToolOptionsInternal<any>>);

        // 3. Call the BaseLineTool constructor.
        super(
            coreApi,
            chart,
            series,
            horzScaleBehavior,
            finalOptions,
            points,
            'TrendBasedFibExtension' as LineToolType,
            3,
            priceAxisLabelStackingManager
        );

        // 4. Set the PaneView.
        this._setPaneViews([new LineToolTrendBasedFibExtensionPaneView(this, this._chart, this._series)]);
    }

    /**
     * Calculates the exact logical coordinates for every configured extension level.
     *
     * **Tutorial Note on the Math:**
     * 1. It calculates the trend distance (P1.price - P0.price).
     * 2. For each coefficient (e.g., 0.618), it calculates: `ExtensionPrice = P2.price + (TrendDistance * Coefficient)`.
     * 3. It generates two logical points per level, spanning horizontally between the min/max time of the anchors.
     *
     * This method serves as the "Calculated Data Source" for both the rendering logic and the culling engine.
     *
     * @returns An array of level data, including the start/end logical points, the raw price, and the coefficient.
     */
    public getExtensionLevelPoints(): { start: LineToolPoint, end: LineToolPoint, price: number, coeff: number }[] {
        const points = this.points();
        if (points.length < 3) return [];

        const [p0, p1, p2] = points;
        const options = this.options();

        // Calculate trend distance (the range P1 - P0)
        const trendPriceDiff = p1.price - p0.price;

        // Find the time range for extension lines
        const tMin = Math.min(p0.timestamp, p1.timestamp, p2.timestamp);
        const tMax = Math.max(p0.timestamp, p1.timestamp, p2.timestamp);

        const extensionPoints: { start: LineToolPoint, end: LineToolPoint, price: number, coeff: number }[] = [];

        for (const level of options.levels as TrendBasedFibExtensionLevel[]) {
            // Calculate extension price: P2.price + (P1.price - P0.price) * coeff
            const extensionPrice = p2.price + (trendPriceDiff * level.coeff);

            const startPoint: LineToolPoint = { timestamp: tMin, price: extensionPrice };
            const endPoint: LineToolPoint = { timestamp: tMax, price: extensionPrice };

            extensionPoints.push({
                start: startPoint,
                end: endPoint,
                price: extensionPrice,
                coeff: level.coeff,
            });
        }

        return extensionPoints;
    }

    /**
     * Flattens all calculated extension levels into a single array of logical points for the culling engine.
     *
     * **Why is this needed?**
     * The culling engine requires a flat list of points to perform its geometric intersection tests.
     * Since a Fib Extension isn't just one line but a collection of many, this helper ensures
     * every level is accounted for when determining if the tool should be rendered.
     *
     * @returns A flat array of `LineToolPoint` objects representing every level.
     */
    public getAllLogicalPointsForCulling(): LineToolPoint[] {
        const segments = this.getExtensionLevelPoints();
        const allLogicalPoints: LineToolPoint[] = [];

        // Include the main anchor points
        const points = this.points();
        for (const p of points) {
            allLogicalPoints.push(p);
        }

        // The culler needs a single array of points to index into.
        for (const segment of segments) {
            allLogicalPoints.push(segment.start);
            allLogicalPoints.push(segment.end);
        }

        return allLogicalPoints;
    }

    /**
     * Intentionally empty override to prevent automatic point sorting.
     *
     * **Tutorial Note:**
     * In many tools, sorting points by time (Left-to-Right) is helpful. However, in a Fibonacci
     * Extension, the **order** of the draw (P0 → P1 → P2) defines the trend direction.
     *
     * By disabling normalization, we preserve the user's intended directionality.
     *
     * @override
     */
    public normalize(): void {
        // Do not normalize. Direction is important for user intent.
    }

    /**
     * Implements a horizontal lock (Price Lock) constraint when the Shift key is held during editing.
     *
     * **Logic Details:**
     * When dragging an anchor point while holding Shift, the tool locks the movement to the
     * anchor's **original Price level**. This allows the user to slide the extension tool
     * left or right across the timeline to align with different bars without accidentally
     * shifting the vertical price range.
     *
     * @param pointIndex - The index of the anchor being dragged.
     * @param rawScreenPoint - The current mouse position.
     * @param phase - The interaction phase (Creation or Editing).
     * @param originalLogicalPoint - The snapshot of the point's logical state before the drag began.
     * @param allOriginalLogicalPoints - The full state of all points before the drag began.
     * @returns The constrained result locking the Y-axis to the original price.
     * @override
     */
    public override getShiftConstrainedPoint(
        pointIndex: number,
        rawScreenPoint: Point,
        phase: InteractionPhase,
        originalLogicalPoint: LineToolPoint,
        allOriginalLogicalPoints: LineToolPoint[]
    ): ConstraintResult {
        // We need to determine which Logical Point determines the Y-level.
        let referenceLogicalPoint: LineToolPoint | null = null;

        if (phase === InteractionPhase.Creation) {
            // CREATION Behavior:
            // if creating do not constrain to anything
        } else {
            // EDITING Behavior (User Request):
            // When editing P0, P1, or P2, holding shift should lock it to its ORIGINAL price.
            // This allows sliding the point left/right without changing the price level.
            // 'originalLogicalPoint' IS the snapshot of the point being dragged.
            referenceLogicalPoint = originalLogicalPoint;
        }

        if (!referenceLogicalPoint) {
            return { point: rawScreenPoint, snapAxis: 'none' };
        }

        // Convert the reference logical price to a screen Y coordinate
        const referenceScreenPoint = this.pointToScreenPoint(referenceLogicalPoint);

        if (!referenceScreenPoint) {
            return { point: rawScreenPoint, snapAxis: 'none' };
        }

        // Lock Y to the reference, keep X from the mouse
        return {
            point: new Point(rawScreenPoint.x, referenceScreenPoint.y),
            snapAxis: 'price',
        };
    }

    /**
     * Performs a hit test for the extension tool by delegating to its associated Pane View.
     *
     * **Architecture Note:**
     * Because this tool renders many independent segments (lines) and areas (fills),
     * the logic for "What did the user click?" is most accurately handled by the View's
     * `CompositeRenderer`.
     *
     * Calling `renderer()` on the view ensures the visual state is up-to-date before the
     * hit-test is performed.
     *
     * @param x - X coordinate in pixels.
     * @param y - Y coordinate in pixels.
     * @returns A hit result if the mouse is over any line, fill, or handle, otherwise `null`.
     * @override
     */
    public override _internalHitTest(x: Coordinate, y: Coordinate): HitTestResult<any> | null {
        if (!this._paneViews || this._paneViews.length === 0 || !this._paneViews[0]) {
            return null;
        }

        const paneView = this._paneViews[0] as LineToolTrendBasedFibExtensionPaneView<HorzScaleItem>;
        paneView.renderer(); // Ensure the view is updated

        const compositeRenderer = paneView.renderer() as any;

        if (!compositeRenderer || !compositeRenderer.hitTest) {
            return null;
        }

        return compositeRenderer.hitTest(x, y);
    }
}

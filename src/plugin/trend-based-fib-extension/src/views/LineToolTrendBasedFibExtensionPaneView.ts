// /lightweight-charts-line-tools-trend-based-fib-extension/src/views/LineToolTrendBasedFibExtensionPaneView.ts

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
    SegmentRenderer,
    RectangleRenderer,
    TextRenderer,
    AnchorPoint,
    OffScreenState,
    getToolCullingState,
    LineToolOptionsInternal,
    deepCopy,
    LineJoin,
    LineCap,
    LineOptions,
    HitTestResult,
    BoxHorizontalAlignment,
    BoxVerticalAlignment,
    TextAlignment,
    LineToolPoint,
    HitTestType,
    LineToolCullingInfo,
    TextOptions,
} from 'lightweight-charts-line-tools-core';

import { LineToolTrendBasedFibExtension, TrendBasedFibExtensionLevel } from '../model/LineToolTrendBasedFibExtension';

// Helper interface for calculated level data (Now holds the final screen Y as well)
interface LevelCoordinates {
    price: number;
    coordinate: Coordinate;
}

/**
 * Pane View for the Trend-Based Fibonacci Extension tool.
 *
 * **Tutorial Note on Complexity:**
 * This view manages rendering of:
 * 1. A `SegmentRenderer` for the trend line (P0 → P1).
 * 2. A `SegmentRenderer` for the retracement line (P1 → P2).
 * 3. An array of renderer sets for extension levels (line, rectangle, label).
 *
 * It implements a "Sub-Segment" culling strategy to ensure the tool remains visible
 * as long as any individual level line is on screen.
 */
export class LineToolTrendBasedFibExtensionPaneView<HorzScaleItem> extends LineToolPaneView<HorzScaleItem> {

    /**
     * Renderer for the trend line (P0 to P1).
     * @protected
     */
    protected _trendLineRenderer: SegmentRenderer<HorzScaleItem> = new SegmentRenderer(new HitTestResult(HitTestType.MovePoint));

    /**
     * Renderer for the retracement line (P1 to P2).
     * @protected
     */
    protected _retracementLineRenderer: SegmentRenderer<HorzScaleItem> = new SegmentRenderer(new HitTestResult(HitTestType.MovePoint));

    /**
     * An array of pooled renderer sets. Each entry contains the line, rectangle,
     * and label renderers for a specific extension level.
     * @protected
     */
    protected _levelRenderers: {
        line: SegmentRenderer<HorzScaleItem>;
        rectangle: RectangleRenderer<HorzScaleItem>;
        label: TextRenderer<HorzScaleItem>;
    }[] = [];

    /**
     * Initializes the extension view and pre-allocates renderer sets for the
     * levels configured in the tool options.
     *
     * @param source - The specific extension model instance.
     * @param chart - The Chart API.
     * @param series - The Series API.
     */
    public constructor(
        source: LineToolTrendBasedFibExtension<HorzScaleItem>,
        chart: IChartApiBase<any>,
        series: ISeriesApi<SeriesType, any>,
    ) {
        super(source as BaseLineTool<HorzScaleItem>, chart, series);

        // Initialize renderers for all potential levels
        const maxLevels = source.options().levels.length;
        for (let i = 0; i < maxLevels; i++) {
            this._levelRenderers.push({
                line: new SegmentRenderer(new HitTestResult(HitTestType.MovePoint)),
                rectangle: new RectangleRenderer(),
                label: new TextRenderer(),
            });
        }
    }

    /**
     * Calculates the price difference between the current level and a user-specified
     * target coefficient.
     *
     * **Tutorial Note:**
     * This feature allows traders to see exactly how many price units exist between
     * two specific Fib levels (e.g., "Distance from 0.618 to 0.5 line").
     *
     * @param config - The configuration for the current level.
     * @param levelPrice - The calculated price of the current level.
     * @param levelsConfig - The full list of level configurations.
     * @param levelsData - The pre-calculated coordinates and prices for all levels.
     * @returns A formatted string like "(Diff: 10.50 from 0.5 line)" or an empty string.
     * @private
     */
    private _calculateDistanceText(
        config: TrendBasedFibExtensionLevel,
        levelPrice: number,
        levelsConfig: TrendBasedFibExtensionLevel[],
        levelsData: LevelCoordinates[]
    ): string {
        // FIX: Only check if enabled. Do NOT check for === 0, as 0 is a valid target coefficient.
        if (!config.distanceFromCoeffEnabled) {
            return '';
        }

        // Search the full levelsConfig array to find the target's index
        const targetIndex = levelsConfig.findIndex(level => level.coeff === config.distanceFromCoeff);

        if (targetIndex === -1) {
            return '';
        }

        // Use the found index to access the complete, pre-calculated coordinates array
        const targetPrice = levelsData[targetIndex].price;
        const priceDifference = Math.abs(levelPrice - targetPrice);

        if (priceDifference === 0) {
            return '';
        }

        const priceFormatter = this._series.priceFormatter();
        const formattedPriceDifference = priceFormatter.format(priceDifference);

        return ` (Diff: ${formattedPriceDifference} from ${config.distanceFromCoeff} line)`;
    }

    /**
     * Helper to generate a translucent RGBA color string from a hex or rgb input.
     *
     * **Why use this?**
     * To create the "faded" background effect between extension levels, we must apply
     * the user-defined `opacity` to the level's primary `color`. This method parses
     * various CSS color formats and injects the correct alpha value.
     *
     * @param color - The base color string (Hex or RGB).
     * @param opacity - The alpha value (0 to 1).
     * @returns A valid `rgba(...)` CSS string.
     * @private
     */
    private _getFadedColor(color: string, opacity: number): string {
        let r = 0, g = 0, b = 0;

        if (color.startsWith('#')) {
            const hex = color.slice(1);
            if (hex.length === 3) {
                // Handle short hex #RGB
                r = parseInt(hex[0] + hex[0], 16);
                g = parseInt(hex[1] + hex[1], 16);
                b = parseInt(hex[2] + hex[2], 16);
            } else if (hex.length >= 6) {
                // Handle standard hex #RRGGBB
                r = parseInt(hex.substring(0, 2), 16);
                g = parseInt(hex.substring(2, 4), 16);
                b = parseInt(hex.substring(4, 6), 16);
            }
        } else if (color.startsWith('rgb')) {
            // Extract numbers from "rgb(r, g, b)" or "rgba(r, g, b, a)"
            const matches = color.match(/(\d+(\.\d+)?)/g);
            if (matches && matches.length >= 3) {
                r = parseFloat(matches[0]);
                g = parseFloat(matches[1]);
                b = parseFloat(matches[2]);
            } else {
                // Fallback if regex fails (unlikely for valid CSS colors)
                return color;
            }
        } else {
            // Fallback for named colors (e.g. "red", "blue")
            // To support names properly, you'd need a canvas context or a lookup table.
            // Returning a safe default grey here.
            return `rgba(120, 123, 134, ${opacity})`;
        }

        // Return new string with the specific FILL opacity
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    /**
     * The core update logic.
     *
     * This method performs a multi-stage render pass:
     * 1. **Data Prep:** Synchronizes the model's calculated levels with the view.
     * 2. **Culling:** Performs a robust geometric check against every level line.
     * 3. **Trend/Retracement Lines:** Renders the connecting lines between anchor points.
     * 4. **Level Loop:** Iterates through sorted levels to configure lines, fills, and labels.
     *
     * @param height - The height of the pane.
     * @param width - The width of the pane.
     * @protected
     * @override
     */
    protected override _updateImpl(height: number, width: number): void {
        this._invalidated = false;
        this._renderer.clear();

        const model = this._tool as LineToolTrendBasedFibExtension<HorzScaleItem>;
        const options = model.options() as LineToolOptionsInternal<any>;
        const points = model.points();

        if (!options.visible || points.length < model.pointsCount) {
            return;
        }

        // 1. Convert anchor points to screen coordinates
        const hasScreenPoints = this._updatePoints();
        if (!hasScreenPoints || this._points.length < 3) {
            return;
        }

        const [screenP0, screenP1, screenP2] = this._points;
        const [p0, p1, p2] = points;

        // 2. Get extension level data from model - sort by coeff for consistent rendering
        const extensionData = model.getExtensionLevelPoints().sort((a, b) => a.coeff - b.coeff);

        // Get sorted config to match the sorted extensionData
        const levelsConfig = (options.levels as TrendBasedFibExtensionLevel[]).slice().sort((a, b) => a.coeff - b.coeff);

        // --- CULLING PREPARATION ---
        const paneDrawingWidth = this._tool.getChartDrawingWidth();

        // CRITICAL FIX: Generate culling points directly from our sorted extensionData.
        const allLogicalPointsForCulling: LineToolPoint[] = [];

        // Include anchor points first
        for (const p of points) {
            allLogicalPointsForCulling.push(p);
        }

        // Flatten extension level segments
        for (const segment of extensionData) {
            allLogicalPointsForCulling.push(segment.start);
            allLogicalPointsForCulling.push(segment.end);
        }

        // Map pre-calculated coordinates
        const allLevelCoordinates: LevelCoordinates[] = extensionData.map(segment => {
            const price = segment.price;
            const coordinate = this._series.priceToCoordinate(price);
            return { price: price, coordinate: coordinate as Coordinate };
        });

        // Setup Culling Arrays
        const subSegments: number[][] = [];
        // Add trend line segment (points 0-1)
        subSegments.push([0, 1]);
        // Add retracement line segment (points 1-2)
        subSegments.push([1, 2]);
        // Add extension level segments
        const baseIndex = 3;
        const numSegments = extensionData.length;
        for (let i = 0; i < numSegments; i++) {
            subSegments.push([baseIndex + i * 2, baseIndex + i * 2 + 1]);
        }

        // Perform Culling Check
        const cullingInfo: LineToolCullingInfo = { subSegments: subSegments };

        /**
         * CULLING PREPARATION & MULTI-SEGMENT CHECK
         *
         * Extension tools are large and can span far beyond the viewport. To ensure
         * performance while preventing "popping" (the tool disappearing while a
         * level is still visible):
         *
         * 1. We flatten every level into a single array of logical points.
         * 2. We define `subSegments` where every pair of points forms a level line.
         * 3. `getToolCullingState` performs a robust intersection test on every
         *    individual line, accounting for infinite extensions if enabled.
         */
        const cullingState = getToolCullingState(
            allLogicalPointsForCulling,
            this._tool as BaseLineTool<HorzScaleItem>,
            options.extend,
            undefined,
            cullingInfo
        );

        if (cullingState !== OffScreenState.Visible) {
            return;
        }
        // --- CULLING END ---

        const commonCursorOptions = {
            toolDefaultHoverCursor: options.defaultHoverCursor,
            toolDefaultDragCursor: options.defaultDragCursor,
        };

        // 3. Render Trend Line (P0 → P1)
        const trendLineOptions: LineOptions = {
            ...(deepCopy(options.trendLine || options.line) as any),
            join: LineJoin.Miter,
            cap: LineCap.Butt,
        };

        this._trendLineRenderer.setData({
            points: [
                new AnchorPoint(screenP0.x as Coordinate, screenP0.y as Coordinate, 0),
                new AnchorPoint(screenP1.x as Coordinate, screenP1.y as Coordinate, 1),
            ],
            line: trendLineOptions,
            ...commonCursorOptions,
        });
        this._renderer.append(this._trendLineRenderer);

        // 4. Render Retracement Line (P1 → P2)
        const retracementLineOptions: LineOptions = {
            ...(deepCopy(options.retracementLine || options.line) as any),
            join: LineJoin.Miter,
            cap: LineCap.Butt,
        };

        this._retracementLineRenderer.setData({
            points: [
                new AnchorPoint(screenP1.x as Coordinate, screenP1.y as Coordinate, 1),
                new AnchorPoint(screenP2.x as Coordinate, screenP2.y as Coordinate, 2),
            ],
            line: retracementLineOptions,
            ...commonCursorOptions,
        });
        this._renderer.append(this._retracementLineRenderer);

        // 5. Base line options for extension levels
        const lineOptions: LineOptions = {
            ...(deepCopy(options.line) as any),
            extend: options.extend,
            join: LineJoin.Miter,
            cap: LineCap.Butt,
        };

        const minScreenX = Math.min(screenP0.x, screenP1.x, screenP2.x);
        const maxScreenX = Math.max(screenP0.x, screenP1.x, screenP2.x);

        // --- RENDER LOOP ---
        for (let i = 0; i < levelsConfig.length; i++) {
            const config = levelsConfig[i];
            const levelData = allLevelCoordinates[i];
            const levelPrice = levelData.price;
            const levelCoord = levelData.coordinate;

            if (levelCoord === null || !isFinite(levelCoord)) continue;

            // If the user added more levels dynamically, create new renderers now.
            if (!this._levelRenderers[i]) {
                this._levelRenderers[i] = {
                    line: new SegmentRenderer(new HitTestResult(HitTestType.MovePoint)),
                    rectangle: new RectangleRenderer(),
                    label: new TextRenderer(),
                };
            }
            const levelRendererSet = this._levelRenderers[i];

            const priceFormatter = this._series.priceFormatter();

            // --- A. Text Label Setup ---
            const distanceText = this._calculateDistanceText(config, levelPrice, levelsConfig, allLevelCoordinates);
            const labelText = `${config.coeff} (${priceFormatter.format(levelPrice)})${distanceText}`;

            const X_left_of_pane = 0 as Coordinate;
            const X_min_segment = minScreenX as Coordinate;

            const P_TextLeftAnchor = new AnchorPoint(X_left_of_pane, levelCoord, i);
            const P_TextRightAnchor = new AnchorPoint(X_min_segment, levelCoord, i);

            const finalTextOptions: TextOptions = {
                value: labelText,
                padding: 0,
                wordWrapWidth: 0,
                forceTextAlign: false,
                forceCalculateMaxLineWidth: false,
                alignment: TextAlignment.Right,
                font: {
                    family: 'sans-serif', size: 12, bold: false, italic: false,
                    color: config.color,
                },
                box: {
                    alignment: { horizontal: BoxHorizontalAlignment.Right, vertical: BoxVerticalAlignment.Middle },
                    padding: { x: 5, y: 3 },
                }
            } as TextOptions;

            /**
             * TEXT LABEL SETUP
             *
             * We construct the label string: `[Coeff] ([Price]) [Optional Distance]`.
             * The label is anchored to the left edge of the visible level segment.
             * We use an `AnchorPoint` with the current loop index `i` to ensure
             * hit-testing links back to the correct logical level.
             */
            levelRendererSet.label.setData({
                points: [P_TextLeftAnchor, P_TextRightAnchor],
                text: finalTextOptions,
                hitTestBackground: true,
            });

            // --- B. Line Segment Setup ---
            const lineStart = new AnchorPoint(
                options.extend.left ? 0 as Coordinate : minScreenX as Coordinate,
                levelCoord,
                i
            );
            const lineEnd = new AnchorPoint(
                options.extend.right ? paneDrawingWidth as Coordinate : maxScreenX as Coordinate,
                levelCoord,
                i
            );

            /**
             * LINE SEGMENT CONFIGURATION
             *
             * Each extension level is drawn as a horizontal line.
             * - If `extend.left` or `extend.right` is enabled, the segment is
             *   projected to the pane boundaries (0 or paneWidth).
             * - Otherwise, the line is bounded by the X-coordinates of the
             *   anchor points P0, P1, and P2.
             */
            levelRendererSet.line.setData({
                points: [lineStart, lineEnd],
                line: { ...lineOptions, color: config.color } as LineOptions,
                ...commonCursorOptions,
            });

            // --- C. Background Rectangle (Fill) Setup ---
            let hasRectangle = false;
            if (i > 0) {
                const prevConfig = levelsConfig[i - 1];
                const prevLevelCoord = allLevelCoordinates[i - 1].coordinate;
                const rectMinY = Math.min(levelCoord, prevLevelCoord);
                const rectMaxY = Math.max(levelCoord, prevLevelCoord);

                if (prevConfig.opacity > 0) {
                    // -----------------------------------------------------------
                    // CHANGE: Use prevConfig.color instead of config.color
                    // -----------------------------------------------------------
                    // This ensures the "Lower" level (prevConfig) owns both the
                    // opacity AND the color of the fill extending upwards.
                    const fillColor = this._getFadedColor(prevConfig.color, prevConfig.opacity);

                    const rectPoint1 = new AnchorPoint(minScreenX as Coordinate, rectMinY, 0);
                    const rectPoint2 = new AnchorPoint(maxScreenX as Coordinate, rectMaxY, 1);

                    /**
                     * BACKGROUND FILL (CONSECUTIVE LEVELS)
                     *
                     * To create the colored bands between levels:
                     * 1. We look at the "Previous" level in our sorted list.
                     * 2. We define a rectangle spanning the vertical gap between the
                     *    current level and the previous one.
                     * 3. The "Lower" level (lower coefficient) defines the color
                     *    and opacity for the fill extending upwards.
                     */
                    levelRendererSet.rectangle.setData({
                        points: [rectPoint1, rectPoint2],
                        background: { color: fillColor },
                        border: { width: 0, style: LineStyle.Solid, radius: 0 },
                        extend: options.extend,
                        hitTestBackground: false,
                    } as any);

                    hasRectangle = true;
                }
            }

            // --- D. APPEND TO RENDERER (ORDER MATTERS) ---

            // 1. Background Rectangles (Bottom Layer)
            if (hasRectangle) {
                this._renderer.append(levelRendererSet.rectangle);
            }

            // 2. Lines (Middle Layer)
            this._renderer.append(levelRendererSet.line);

            // 3. Labels (Top Layer)
            this._renderer.append(levelRendererSet.label);
        }

        // --- 6. Add Anchors ---
        this._addAnchors(this._renderer);
    }

    /**
     * Adds the three primary interactive anchor points (P0, P1, and P2).
     *
     * @param renderer - The composite renderer to append anchors to.
     * @protected
     * @override
     */
    protected override _addAnchors(renderer: CompositeRenderer<HorzScaleItem>): void {
        this._points.forEach((point, index) => {
            const anchor = this.createLineAnchor({
                points: [point],
            }, index);
            renderer.append(anchor);
        });
    }
}

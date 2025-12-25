// /src/views/LineToolElliottPaneView.ts

import {
    IChartApiBase,
    ISeriesApi,
    SeriesType,
    Coordinate
} from 'lightweight-charts';

import {
    BaseLineTool,
    LineToolPaneView,
    CompositeRenderer,
    PolygonRenderer,
    PolygonRendererData,
    AnchorPoint,
    OffScreenState,
    getToolCullingState,
    LineToolPoint,
    PaneCursorType,
    getToolBoundingBox,
    LineOptions,
} from 'lightweight-charts-line-tools-core';

/**
 * Pane View for Elliott Wave tools.
 * 
 * Renders:
 * 1. Connected line segments between all points
 * 2. Text labels (1-5 or A-C) at each vertex
 */
export class LineToolElliottPaneView<HorzScaleItem> extends LineToolPaneView<HorzScaleItem> {

    /**
     * Renderer for the connecting lines
     */
    protected _polygonRenderer: PolygonRenderer<HorzScaleItem> = new PolygonRenderer();

    /**
     * The wave labels to display at each point
     */
    private _waveLabels: string[];

    /**
     * Canvas for drawing labels (will be drawn manually in the polygon renderer callback or similar)
     */
    private _labelData: Array<{ x: number; y: number; label: string }> = [];

    public constructor(
        source: BaseLineTool<HorzScaleItem>,
        chart: IChartApiBase<any>,
        series: ISeriesApi<SeriesType, any>,
        waveLabels: string[]
    ) {
        super(source as BaseLineTool<any>, chart, series);
        this._waveLabels = waveLabels;
    }

    /**
     * Core update logic - renders lines and labels
     */
    protected override _updateImpl(height: number, width: number): void {
        this._invalidated = false;
        this._renderer.clear();
        this._labelData = [];

        const options = this._tool.options() as any;
        const permanentPoints = this._tool.getPermanentPointsForTranslation();

        if (!options.visible) {
            return;
        }

        if (this._tool.points().length < 1) {
            return;
        }

        // Convert logical points to screen coordinates
        const hasScreenPoints = this._updatePoints();

        if (!hasScreenPoints || this._points.length === 0) {
            return;
        }

        // Culling check using AABB
        if (!this._tool.isCreating() && !this._tool.isEditing() && permanentPoints.length > 1) {
            const toolAABB = getToolBoundingBox(permanentPoints);

            if (toolAABB) {
                const boundingPointsLogical: LineToolPoint[] = [
                    { timestamp: toolAABB.minTime, price: toolAABB.maxPrice },
                    { timestamp: toolAABB.maxTime, price: toolAABB.minPrice }
                ];

                const cullingState = getToolCullingState(boundingPointsLogical, this._tool);

                if (cullingState !== OffScreenState.Visible) {
                    this._renderer.clear();
                    return;
                }
            }
        }

        // Get line options
        const finalLineOptions = options.line as LineOptions;

        // Configure polygon renderer for the lines
        const polygonRendererData: PolygonRendererData = {
            points: this._points,
            line: finalLineOptions,
            hitTestBackground: false,
            toolDefaultHoverCursor: options.defaultHoverCursor,
            toolDefaultDragCursor: options.defaultDragCursor,
        };

        this._polygonRenderer.setData(polygonRendererData);
        (this._renderer as CompositeRenderer<HorzScaleItem>).append(this._polygonRenderer);

        // Store label positions for custom drawing
        const labelOptions = options.label || { font: 'bold 14px Arial', color: '#2962ff', offset: 15 };

        this._points.forEach((point, index) => {
            if (index < this._waveLabels.length) {
                this._labelData.push({
                    x: point.x as number,
                    y: point.y as number,
                    label: this._waveLabels[index]
                });
            }
        });

        // Add anchors
        this._addAnchors(this._renderer as CompositeRenderer<HorzScaleItem>);
    }

    /**
     * Creates anchor points for each vertex
     */
    protected override _addAnchors(renderer: CompositeRenderer<HorzScaleItem>): void {
        if (this._points.length === 0) return;

        const anchorPoints: AnchorPoint[] = this._points.map((p, index) => {
            return new AnchorPoint(p.x, p.y, index, false);
        });

        const anchorData = {
            points: anchorPoints,
            pointsCursorType: anchorPoints.map(_ => PaneCursorType.DiagonalNwSeResize),
        };

        renderer.append(this.createLineAnchor(anchorData, 0));
    }

    /**
     * Custom draw method to render labels
     * This extends the base renderer to also draw text labels at each point
     */
    public drawLabels(ctx: CanvasRenderingContext2D): void {
        const options = this._tool.options() as any;
        const labelOptions = options.label || { font: 'bold 14px Arial', color: '#2962ff', offset: 15 };

        ctx.save();
        ctx.font = labelOptions.font;
        ctx.fillStyle = labelOptions.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        this._labelData.forEach((data, index) => {
            // Determine if label should be above or below the point
            // Based on wave direction (comparing to previous/next point)
            let yOffset = -labelOptions.offset;

            if (index > 0 && index < this._labelData.length) {
                const prevY = index > 0 ? this._labelData[index - 1].y : data.y;
                const nextY = index < this._labelData.length - 1 ? this._labelData[index + 1].y : data.y;

                // If this is a peak (lower y = higher on screen), put label above
                // If this is a trough (higher y = lower on screen), put label below
                if (data.y < prevY || data.y < nextY) {
                    yOffset = -labelOptions.offset; // Above
                } else {
                    yOffset = labelOptions.offset + 14; // Below (add font height)
                    ctx.textBaseline = 'top';
                }
            }

            ctx.fillText(data.label, data.x, data.y + yOffset);
        });

        ctx.restore();
    }

    /**
     * Get label data for external rendering
     */
    public getLabelData(): Array<{ x: number; y: number; label: string }> {
        return this._labelData;
    }
}

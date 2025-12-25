# Creating a New Line Tool Plugin

This guide shows how to create a new drawing tool plugin and integrate it into the test UI.

## Overview

A complete plugin integration requires:
1. **Plugin Package** - TypeScript model and view classes
2. **Chart Registration** - Import and register the tool
3. **Toolbar Icon** - Add to drawing toolbar
4. **Test Panel Components** - Interactive and Programmatic UI

---

## Step 1: Create Plugin Package

### Directory Structure
```
src/plugin/your-tool-name/
├── .gitignore
├── package.json
├── tsconfig.json
├── rollup.config.js
└── src/
    ├── index.ts           # Registration export
    ├── model/
    │   └── LineToolYourTool.ts    # Tool logic
    └── views/
        └── LineToolYourToolPaneView.ts  # Rendering
```

### .gitignore
```
node_modules/
dist/
docs
package-lock.json
```

### Model Class Template
```typescript
// src/model/LineToolYourTool.ts
import { BaseLineTool, LineToolType, FinalizationMethod, ... } from 'lightweight-charts-line-tools-core';

export const YourToolOptionDefaults: any = {
    visible: true,
    editable: true,
    line: { width: 2, color: '#2962ff', style: LineStyle.Solid },
    // Add custom options here
};

export class LineToolYourTool<HorzScaleItem> extends BaseLineTool<HorzScaleItem> {
    public override readonly toolType: LineToolType = 'YourTool' as LineToolType;
    public override readonly pointsCount: number = 2; // Number of points needed

    public override getFinalizationMethod(): FinalizationMethod {
        return FinalizationMethod.PointCount; // or DoubleClick
    }

    public constructor(coreApi, chart, series, horzScaleBehavior, options = {}, points = [], priceAxisLabelStackingManager) {
        const finalOptions = deepCopy(YourToolOptionDefaults);
        merge(finalOptions, options);
        super(coreApi, chart, series, horzScaleBehavior, finalOptions, points, 'YourTool' as LineToolType, 2, priceAxisLabelStackingManager);
        this._setPaneViews([new LineToolYourToolPaneView(this, this._chart, this._series)]);
    }
}
```

### View Class Template
```typescript
// src/views/LineToolYourToolPaneView.ts
import { LineToolPaneView, PolygonRenderer, CompositeRenderer } from 'lightweight-charts-line-tools-core';

export class LineToolYourToolPaneView<HorzScaleItem> extends LineToolPaneView<HorzScaleItem> {
    protected _polygonRenderer: PolygonRenderer<HorzScaleItem> = new PolygonRenderer();

    protected override _updateImpl(height: number, width: number): void {
        this._invalidated = false;
        this._renderer.clear();
        
        const options = this._tool.options() as any;
        if (!options.visible || this._tool.points().length < 1) return;
        
        const hasScreenPoints = this._updatePoints();
        if (!hasScreenPoints || this._points.length === 0) return;

        // Configure and append renderer
        this._polygonRenderer.setData({
            points: this._points,
            line: options.line,
            hitTestBackground: false,
        });
        (this._renderer as CompositeRenderer<HorzScaleItem>).append(this._polygonRenderer);
        this._addAnchors(this._renderer as CompositeRenderer<HorzScaleItem>);
    }
}
```

### Index Export
```typescript
// src/index.ts
export { LineToolYourTool } from './model/LineToolYourTool';
```

---

## Step 2: Register in Chart Component

Edit `LightweightCandlestickChart.jsx`:

```jsx
// Add import
import { LineToolYourTool } from '../plugin/your-tool-name/src/index';

// In useEffect, add registration
lineTools.registerLineTool('YourTool', LineToolYourTool);
```

---

## Step 3: Add Toolbar Icon

Edit `DrawingToolbar.jsx`:

```jsx
// Add to tools array
{ id: 'YourTool', name: 'Your Tool Name', icon: YourIcon, group: 'shapes' },
```

Groups: `shapes`, `lines`, `text`, `fibonacci`, `trading`, `elliott`

---

## Step 4: Create Test Panel Components

### Interactive Component
```jsx
// YourToolInteractive.jsx
import React from 'react';
import { Button, Typography, Accordion, AccordionSummary, AccordionDetails, Stack } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const YourToolInteractive = ({ lineToolsApi, chartReady }) => {
    const handleActivate = () => {
        lineToolsApi?.addLineTool('YourTool', [], {});
    };

    return (
        <Accordion sx={{ bgcolor: 'background.paper' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body2" fontWeight="medium">Your Tool</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
                <Stack spacing={1}>
                    <Button variant="outlined" size="small" onClick={handleActivate} disabled={!chartReady}>
                        Activate Default
                    </Button>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};
export default YourToolInteractive;
```

### Programmatic Component
```jsx
// YourToolProgrammatic.jsx
const day = 86400;
const baseTimestamp = 1756771200; // Sept 1, 2025

const YourToolProgrammatic = ({ lineToolsApi, chartReady }) => {
    const handleAdd = () => {
        lineToolsApi?.createOrUpdateLineTool('YourTool', [
            { timestamp: baseTimestamp + 1 * day, price: 160 },
            { timestamp: baseTimestamp + 3 * day, price: 180 },
        ], { line: { color: '#2962ff' } }, 'YOUR_TOOL_A');
    };

    const handleRemove = () => {
        lineToolsApi?.removeLineToolsById(['YOUR_TOOL_A']);
    };

    return (
        <Accordion sx={{ bgcolor: 'background.paper' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="body2" fontWeight="medium">Your Tool</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
                <Stack spacing={1}>
                    <Button variant="outlined" size="small" onClick={handleAdd} disabled={!chartReady}>Add Tool A</Button>
                    <Button variant="outlined" size="small" color="error" onClick={handleRemove} disabled={!chartReady}>Remove Tool A</Button>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
};
export default YourToolProgrammatic;
```

---

## Step 5: Add to LineToolTestPanel

Edit `LineToolTestPanel.jsx`:

```jsx
// Add imports
import YourToolInteractive from './YourToolInteractive';
import YourToolProgrammatic from './YourToolProgrammatic';

// Add to Interactive section (Section 4)
<Grid item size={12}>
    <YourToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
</Grid>

// Add to Programmatic section (Section 5)
<Grid item size={12}>
    <YourToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
</Grid>
```

---

## Quick Checklist

- [ ] Create plugin folder with model and view classes
- [ ] Export from `index.ts`
- [ ] Import and register in `LightweightCandlestickChart.jsx`
- [ ] Add toolbar entry in `DrawingToolbar.jsx`
- [ ] Create `*Interactive.jsx` component
- [ ] Create `*Programmatic.jsx` component
- [ ] Import both in `LineToolTestPanel.jsx`
- [ ] Add Grid items in sections 4 and 5

---

## Important Notes

1. **Timestamps Must Match Chart Data** - Use `1756771200` (Sept 2025) as base for programmatic creation
2. **Use `any` Types** - Custom tool types aren't in `LineToolOptionsMap`, use `any` to avoid TypeScript errors
3. **Tool Type Casting** - Cast tool type: `'YourTool' as LineToolType`
4. **Test Both Modes** - Verify interactive (click-to-draw) and programmatic (button-click) creation

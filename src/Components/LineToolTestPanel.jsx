// File: /src/Components/LineToolTestPanel.js

import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
	Box,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Grid,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLineToolsApi } from '../Hooks/useLineToolsApi';

// Import New Components (The Refactored UI)
import CoreApiTestPanel from './CoreApiTestPanel';
import RectangleToolInteractive from './RectangleToolInteractive';
import RectangleToolProgrammatic from './RectangleToolProgrammatic';
import TrendLineToolInteractive from './TrendLineToolInteractive';
import TrendLineToolProgrammatic from './TrendLineToolProgrammatic';
import CircleToolInteractive from './CircleToolInteractive';
import CircleToolProgrammatic from './CircleToolProgrammatic';
import BrushToolInteractive from './BrushToolInteractive';
import BrushToolProgrammatic from './BrushToolProgrammatic';
import HighlighterToolInteractive from './HighlighterToolInteractive';
import HighlighterToolProgrammatic from './HighlighterToolProgrammatic';
import PathToolInteractive from './PathToolInteractive';
import PathToolProgrammatic from './PathToolProgrammatic';
import TriangleToolInteractive from './TriangleToolInteractive';
import TriangleToolProgrammatic from './TriangleToolProgrammatic';
import ExtendedLineToolInteractive from './ExtendedLineToolInteractive';
import ExtendedLineToolProgrammatic from './ExtendedLineToolProgrammatic';
import ArrowToolInteractive from './ArrowToolInteractive';
import ArrowToolProgrammatic from './ArrowToolProgrammatic';
import RayToolInteractive from './RayToolInteractive';
import RayToolProgrammatic from './RayToolProgrammatic';
import HorizontalLineToolInteractive from './HorizontalLineToolInteractive';
import HorizontalLineToolProgrammatic from './HorizontalLineToolProgrammatic';
import HorizontalRayToolInteractive from './HorizontalRayToolInteractive';
import HorizontalRayToolProgrammatic from './HorizontalRayToolProgrammatic';
import VerticalLineToolInteractive from './VerticalLineToolInteractive';
import VerticalLineToolProgrammatic from './VerticalLineToolProgrammatic';
import CrossLineToolInteractive from './CrossLineToolInteractive';
import CrossLineToolProgrammatic from './CrossLineToolProgrammatic';
import TextToolInteractive from './TextToolInteractive';
import TextToolProgrammatic from './TextToolProgrammatic';
import CalloutToolInteractive from './CalloutToolInteractive';
import CalloutToolProgrammatic from './CalloutToolProgrammatic';
import ParallelChannelToolInteractive from './ParallelChannelToolInteractive';
import ParallelChannelToolProgrammatic from './ParallelChannelToolProgrammatic';
import PriceRangeToolInteractive from './PriceRangeToolInteractive';
import PriceRangeToolProgrammatic from './PriceRangeToolProgrammatic';
import LongShortPositionToolInteractive from './LongShortPositionToolInteractive';
import LongShortPositionToolProgrammatic from './LongShortPositionToolProgrammatic';
import FibRetracementToolInteractive from './FibRetracementToolInteractive';
import FibRetracementToolProgrammatic from './FibRetracementToolProgrammatic';
import MarketDepthToolInteractive from './MarketDepthToolInteractive';
import MarketDepthToolProgrammatic from './MarketDepthToolProgrammatic';
import ElliottImpulseToolInteractive from './ElliottImpulseToolInteractive';
import ElliottCorrectionToolInteractive from './ElliottCorrectionToolInteractive';
import ElliottImpulseToolProgrammatic from './ElliottImpulseToolProgrammatic';
import ElliottCorrectionToolProgrammatic from './ElliottCorrectionToolProgrammatic';
import DateRangeToolInteractive from './DateRangeToolInteractive';
import DateRangeToolProgrammatic from './DateRangeToolProgrammatic';
import TrendBasedFibExtensionToolInteractive from './TrendBasedFibExtensionToolInteractive';
import TrendBasedFibExtensionToolProgrammatic from './TrendBasedFibExtensionToolProgrammatic';
import DateAndPriceRangeToolInteractive from './DateAndPriceRangeToolInteractive';
import DateAndPriceRangeToolProgrammatic from './DateAndPriceRangeToolProgrammatic';


const LineToolTestPanel = ({ lineToolsPluginRef, chartInstanceRef, candlestickSeriesRef, chartReady }) => {
	const lineToolsApi = useLineToolsApi(lineToolsPluginRef);

	// --- Accordion Expanded State ---
	// Default expanded state to keep the main tool panels open
	const [expanded, setExpanded] = useState('interactivePanel');

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	// --- Render Function ---
	return (
		<Box sx={{ width: '100%', height: '100%', overflowY: 'auto', padding: 2, bgcolor: 'background.paper' }}>
			<Typography variant="h5" component="h2" gutterBottom>
				Line Tools Plugin Test Panel
			</Typography>

			{/* Section 1: Core API Tests (Event Subscriptions, Removal, Export/Import, Crosshair) */}
			<CoreApiTestPanel
				lineToolsApi={lineToolsApi}
				chartInstanceRef={chartInstanceRef}
				candlestickSeriesRef={candlestickSeriesRef}
				chartReady={chartReady}
			/>

			{/* Section 2: Interactive Drawing (Nested Accordions for Each Tool) */}
			<Accordion onChange={handleChange('interactivePanel')} sx={{ mb: 2 }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="subtitle1" fontWeight="medium">4. Interactive Drawing (Click Chart to Draw)</Typography></AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={2}>
						{/* Nested Accordion for Rectangle Tool (Interactive) */}
						<Grid item size={12}>
							<RectangleToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for TrendLine Tool (Interactive) */}
						<Grid item size={12}>
							<TrendLineToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Circle Tool (Interactive) */}
						<Grid item size={12}>
							<CircleToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Brush Tool (Interactive) */}
						<Grid item size={12}>
							<BrushToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Highlighter Tool (Interactive) */}
						<Grid item size={12}>
							<HighlighterToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Path Tool (Interactive) */}
						<Grid item size={12}>
							<PathToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Triangle Tool (Interactive) */}
						<Grid item size={12}>
							<TriangleToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for ExtendedLine Tool (Interactive) */}
						<Grid item size={12}>
							<ExtendedLineToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Arrow Tool (Interactive) */}
						<Grid item size={12}>
							<ArrowToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Ray Tool (Interactive) */}
						<Grid item size={12}>
							<RayToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for HorizontalLine Tool (Interactive) */}
						<Grid item size={12}>
							<HorizontalLineToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for HorizontalRay Tool (Interactive) */}
						<Grid item size={12}>
							<HorizontalRayToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for VerticalLine Tool (Interactive) */}
						<Grid item size={12}>
							<VerticalLineToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for CrossLine Tool (Interactive) */}
						<Grid item size={12}>
							<CrossLineToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Text Tool (Interactive) */}
						<Grid item size={12}>
							<TextToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Callout Tool (Interactive) */}
						<Grid item size={12}>
							<CalloutToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for ParallelChannel Tool (Interactive) */}
						<Grid item size={12}>
							<ParallelChannelToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for PriceRange Tool (Interactive) */}
						<Grid item size={12}>
							<PriceRangeToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for LongShortPosition Tool (Interactive) */}
						<Grid item size={12}>
							<LongShortPositionToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for FibRetracement Tool (Interactive) */}
						<Grid item size={12}>
							<FibRetracementToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for MarketDepth Tool (Interactive) */}
						<Grid item size={12}>
							<MarketDepthToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Elliott Impulse Tool (Interactive) */}
						<Grid item size={12}>
							<ElliottImpulseToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Elliott Correction Tool (Interactive) */}
						<Grid item size={12}>
							<ElliottCorrectionToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for DateRange Tool (Interactive) */}
						<Grid item size={12}>
							<DateRangeToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for TrendBasedFibExtension Tool (Interactive) */}
						<Grid item size={12}>
							<TrendBasedFibExtensionToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for DateAndPriceRange Tool (Interactive) */}
						<Grid item size={12}>
							<DateAndPriceRangeToolInteractive lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>

			{/* Section 3: Programmatic Tool Creation (Nested Accordions for Each Tool) */}
			<Accordion onChange={handleChange('programmaticPanel')} sx={{ mb: 2 }}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="subtitle1" fontWeight="medium">5. Programmatic Tool Creation</Typography></AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={2}>
						{/* Nested Accordion for Rectangle Tool (Programmatic) */}
						<Grid item size={12}>
							<RectangleToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for TrendLine Tool (Programmatic) */}
						<Grid item size={12}>
							<TrendLineToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Circle Tool (Programmatic) */}
						<Grid item size={12}>
							<CircleToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Brush Tool (Programmatic) */}
						<Grid item size={12}>
							<BrushToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Highlighter Tool (Programmatic) */}
						<Grid item size={12}>
							<HighlighterToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						<Grid item size={12}>
							<PathToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Triangle Tool (Programmatic) */}
						<Grid item size={12}>
							<TriangleToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for ExtendedLine Tool (Programmatic) */}
						<Grid item size={12}>
							<ExtendedLineToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Arrow Tool (Programmatic) */}
						<Grid item size={12}>
							<ArrowToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Ray Tool (Programmatic) */}
						<Grid item size={12}>
							<RayToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for HorizontalLine Tool (Programmatic) */}
						<Grid item size={12}>
							<HorizontalLineToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for HorizontalRay Tool (Programmatic) */}
						<Grid item size={12}>
							<HorizontalRayToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for VerticalLine Tool (Programmatic) */}
						<Grid item size={12}>
							<VerticalLineToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for CrossLine Tool (Programmatic) */}
						<Grid item size={12}>
							<CrossLineToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Text Tool (Programmatic) */}
						<Grid item size={12}>
							<TextToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Callout Tool (Programmatic) */}
						<Grid item size={12}>
							<CalloutToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for ParallelChannel Tool (Programmatic) */}
						<Grid item size={12}>
							<ParallelChannelToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for PriceRange Tool (Programmatic) */}
						<Grid item size={12}>
							<PriceRangeToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for LongShortPosition Tool (Programmatic) */}
						<Grid item size={12}>
							<LongShortPositionToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for FibRetracement Tool (Programmatic) */}
						<Grid item size={12}>
							<FibRetracementToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for MarketDepth Tool (Programmatic) */}
						<Grid item size={12}>
							<MarketDepthToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Elliott Impulse Tool (Programmatic) */}
						<Grid item size={12}>
							<ElliottImpulseToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for Elliott Correction Tool (Programmatic) */}
						<Grid item size={12}>
							<ElliottCorrectionToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for DateRange Tool (Programmatic) */}
						<Grid item size={12}>
							<DateRangeToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for TrendBasedFibExtension Tool (Programmatic) */}
						<Grid item size={12}>
							<TrendBasedFibExtensionToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
						{/* Nested Accordion for DateAndPriceRange Tool (Programmatic) */}
						<Grid item size={12}>
							<DateAndPriceRangeToolProgrammatic lineToolsApi={lineToolsApi} chartReady={chartReady} />
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>
		</Box>
	);
};

export default LineToolTestPanel;
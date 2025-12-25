// /src/TestConfig/ArrowTestConfig.js

import { LineStyle } from 'lightweight-charts';
import {
	defaultTrendLineOptions,
} from '../Data/TrendLineToolData'; // Import the baseline defaults
import {
  PaneCursorType, TextAlignment, BoxVerticalAlignment, BoxHorizontalAlignment, LineEnd, LineJoin, LineCap, deepCopy
} from 'lightweight-charts-line-tools-core';

// --- Base Options for Arrow ---

// Start with a copy of TrendLineOptionDefaults and apply the one defining change: arrow end cap.
export const ArrowOptionDefaults = deepCopy(defaultTrendLineOptions);
ArrowOptionDefaults.line = {
    ...ArrowOptionDefaults.line,
    end: { right: LineEnd.Arrow, left: LineEnd.Normal }, // Set the defining property for Arrow
    color: 'rgba(0, 255, 0, 1)', // Set a distinct default color for easy visual identification (Green)
};


// --- Constants used in Test Generation Logic ---
export const LONG_TEST_TEXT = "This is a necessary long text string to effectively test the wordWrapWidth and the maximum height truncation logic within the text box. The quick brown fox jumps over the lazy dogs. This sentence is deliberately repeated to ensure it exceeds typical line lengths.";
export const ARRAY_RADIUS_TEST_VALUE = [25, 0, 0, 25];


// Define properties that should be generated even if the value matches the default (to ensure explicit testing)
export const PROPERTIES_TO_FORCE_TEST = [
    'line.cap',
    'line.join',
	'line.style',
	'line.width',
	'line.color',
	'line.end.left',
	'line.end.right',
	'text.alignment',
	'text.padding',
	'text.wordWrapWidth',
	'text.box.alignment.vertical',
	'text.box.alignment.horizontal',
	'text.box.border.style',
	'text.box.border.width',
];

/**
 * Defines the unique value to test for every single primitive option
 * within the Arrow tool's full options structure.
 */
export const ArrowUniversalTestConfig = {

	// --- I. LineToolOptionsCommon (Boolean and Cursor Overrides) ---
	editable: [false],

	// Cursor Overrides (Testing only one non-default value) - USING ENUMERATIONS
	defaultHoverCursor: [PaneCursorType.Crosshair],
	defaultDragCursor: [PaneCursorType.ZoomIn],
	defaultAnchorHoverCursor: [PaneCursorType.VerticalResize],
	defaultAnchorDragCursor: [PaneCursorType.HorizontalResize],
	notEditableCursor: [PaneCursorType.Pointer],

	// Label Visibility / Persistence Testing
	showPriceAxisLabels: [false],
	showTimeAxisLabels: [false],
	priceAxisLabelAlwaysVisible: [true],
	timeAxisLabelAlwaysVisible: [true],


	// --- II. Arrow Specific Options ---

	// A. Line Properties
	line: {
		// Numerical D-B Test: [Minimal, Boundary]
		width: [1, 2, 3, 4],
		
		color: ['rgba(255, 41, 177, 1)'], // Pink/Magenta

		// Enum Tests: Testing all non-default LineStyle values
		style: [LineStyle.Solid, LineStyle.Dotted, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.SparseDotted],

		// Enum Tests: Testing all non-default LineJoin values
		join: [LineJoin.Bevel, LineJoin.Round, LineJoin.Miter ], // Default is Round

		// Enum Tests: Testing all non-default LineCap values
		cap: [LineCap.Butt, LineCap.Round, LineCap.Square,], // Default is Square

		// Test for arrow end on the left (an override of the default right arrow)
		end: {
			left: [LineEnd.Normal, LineEnd.Arrow, LineEnd.Circle], // Default is Normal
			right: [LineEnd.Normal, LineEnd.Arrow, LineEnd.Circle],
		},
		
		// Boolean Test: Extension (Test if the Arrow can also be an Extended Arrow)
		extend: {
			left: [true],
			right: [true],
		},
		testInfiniteLine: [true],
	},


	// B. Text Properties (Copied from TrendLineTestConfig to ensure all text features are retested)
	text: {
		// Placeholder for recursive logic
		value: ["TEST_TEXT_LABEL_PLACEHOLDER"],

		// Numerical D-B Tests
		padding: [0, 10, 20],
		wordWrapWidth: [1, 20, 50, 100],

		// Discrete/Boolean Tests
		forceTextAlign: [true],
		forceCalculateMaxLineWidth: [true],
     
		// Enum Tests: Testing all non-default TextAlignment values
		alignment: [TextAlignment.Center, TextAlignment.Start, TextAlignment.End, TextAlignment.Left, TextAlignment.Right],

		font: {
			size: [8, 20],
			bold: [true],
			italic: [true],
			color: ['rgba(0, 255, 0, 1)'],
			family: ['serif'],
		},

		box: {
			// Numerical D-B Tests
			angle: [15, 30, 45, 90],
			scale: [0.5, 1.5, 2],

			// Discrete/Enum Tests: Testing all non-default Box Alignment values
			alignment: {
				vertical: [BoxVerticalAlignment.Top, BoxVerticalAlignment.Middle, BoxVerticalAlignment.Bottom],
				horizontal: [BoxHorizontalAlignment.Left, BoxHorizontalAlignment.Center, BoxHorizontalAlignment.Right],
			},

			// Numerical D-B Tests
			offset: {
				x: [-100, 100],
				y: [-30, 30],
			},
			padding: {
				x: [25, 100],
				y: [25, 50],
			},
			maxHeight: [20, 40, 60],

			// Shadow Tests
			shadow: {
				blur: [5, 20],
				color: ['rgba(255, 0, 0, 0.9)'], 
				offset: {
					x: [10, 30],
					y: [10, 30],
				},
			},

			// Border Tests
			border: {
				width: [1, 2, 3, 4],
				color: ['rgba(0, 255, 213, 1)'], 
				// Enum Tests: Testing all non-default LineStyle values
				style: [LineStyle.Solid, LineStyle.Dotted, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.SparseDotted], 
				radius: [3, 10],
			},

			// Background Tests
			background: {
				color: ['rgba(227, 149, 15, 0.5)'], 
				inflation: {
					x: [10, 20],
					y: [10, 20],
				},
			},
		},
	},
};

// ----------------------------------------------------------------------
// 3. CONTEXTUAL OVERRIDES (Overrides to make a test case valid or visible)
// ----------------------------------------------------------------------

export const ArrowContextualOverrides = {
	// Copy over all necessary Contextual Overrides from the TrendLine config
	
	// When testing the 'notEditableCursor' value, we must ensure
	// 'editable' is set to false, otherwise the cursor will never display.
	'notEditableCursor': {
		editable: false,
	},
		// Override to create the Infinite Line combination
    'line.testInfiniteLine': {
        line: {
            extend: {
                left: true,
                right: true,
            },
        },
        // Also override the text to clearly label the infinite line
        text: {
            value: 'LINE.EXTEND.LEFT=TRUE & RIGHT=TRUE (Infinite Line)',
        },
    },
    'line.cap': {
        line: {
           width: 20,
        },
    },
	// Text Overrides (ensure text is visible)
	'text.wordWrapWidth': {
		text: { value: 'This is testing text.wordWrapWidth, This is testing text.wordWrapWidth, This is testing text.wordWrapWidth' },
	},
	'text.padding': {
		text: { value: "This testing text.padding then a new line, 3 lines max\nThis testing text.padding then a new line, 3 lines max\nThis testing text.padding then a new line, 3 lines max" },
	},

	'text.forceTextAlign': {
		text: { value: "text.forceTextAlign, browser needs to be LTR(left to right), this is a pain to test, so you can just ignore this", alignment: TextAlignment.Start, wordWrapWidth: 100 },
	},
	'text.forceCalculateMaxLineWidth': {
		text: { value: "text.forceCalculateMaxLineWidth, when true it changes wordWrapWidth to fit text on screen, as long as wordWrapWidth is not set" },
	},
	'text.box.padding.x': {
		text: { box: { background: { color: ['rgba(0, 0, 0, 0.5)'], } } },
	},
	'text.box.padding.y': {
		text: { box: { background: { color: ['rgba(0, 0, 0, 0.5)'], } } },
	},
	'text.box.maxHeight': {
		text: { value: "text.box.maxHeight, This is some text on new lines 4 times, text might disappear,\n This is some text on new lines 4 times, text might disappear,\n This is some text on new lines 4 times, text might disappear,\n This is some text on new lines 4 times, text might disappear" },
	},
	'text.box.shadow.blur': {
		text: { box: { shadow: { "color": "rgba(255,0,0,1)" }, background: { "color": "rgba(69, 168, 78, 1)" } } },
	},
	'text.box.shadow.color': {
		text: { box: { shadow: { color: "rgba(255,0,0,1)", offset: { x: 10, y: 10 } }, background: { color: "rgba(0, 17, 255, 1)" } } },
	},
	'text.box.shadow.offset.x': {
		text: { box: { shadow: { color: "rgba(255,0,0,1)" }, background: { color: "rgba(0, 17, 255, 1)" } } },
	},
	'text.box.shadow.offset.y': {
		text: { box: { shadow: { color: "rgba(255,0,0,1)" }, background: { color: "rgba(0, 17, 255, 1)" } } },
	},
	'text.box.border.width': {
		text: { box: { background: { color: "rgba(0, 17, 255, 0)" }, border: { color: ['#ff8000ff'], } } },
	},
	'text.box.border.style': {
		text: { box: { background: { color: "rgba(0, 17, 255, 0)" }, border: { color: ['#ff8000ff'], } } },
	},
	'text.box.border.radius': {
		text: { box: { background: { color: "rgba(0, 17, 255, 0)" }, border: { color: ['#ff8000ff'], } } },
	},
	'text.box.background.inflation.x': {
		text: { box: { background: { color: "rgba(0, 17, 255, 1)" } } },
	},
	'text.box.background.inflation.y': {
		text: { box: { background: { color: "rgba(0, 17, 255, 1)" } } },
	},
};
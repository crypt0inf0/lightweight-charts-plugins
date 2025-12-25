// /src/TestConfig/TextTestConfig.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType, TextAlignment, BoxVerticalAlignment, BoxHorizontalAlignment, deepCopy
} from 'lightweight-charts-line-tools-core';

// --- Import data specific to the Text tool ---
import { defaultTextOptions } from '../Data/TextToolData';

// --- Constants used in Test Generation Logic ---
export const LONG_TEST_TEXT = "This is a necessary long text string to effectively test the wordWrapWidth and the maximum height truncation logic within the text box. The quick brown fox jumps over the lazy dogs. This sentence is deliberately repeated to ensure it exceeds typical line lengths.";
export const ARRAY_RADIUS_TEST_VALUE = [25, 0, 0, 25];

// ----------------------------------------------------------------------
// 1. BASELINE DEFAULTS FOR TEXT TOOL
// ----------------------------------------------------------------------
// The master defaults for all single-override tests.
export const TextOptionDefaults = deepCopy(defaultTextOptions);


// --- Constants & Config for Generator Hook ---
export const PROPERTIES_TO_FORCE_TEST = [
  // These properties are required for the test surface to be properly labeled and interactive
  'text.box.alignment.vertical',
  'text.box.alignment.horizontal',
  'text.font.size',
  'text.box.shadow.blur',
  'text.box.border.width',
  'text.box.border.style',
  'text.box.border.radius',
];

/**
 * Defines the unique value to test for every single primitive option
 * within the Text tool's full options structure.
 */
export const TextUniversalTestConfig = {

	// --- I. LineToolOptionsCommon (Boolean and Cursor Overrides) ---
	editable: [false],

	// Cursor Overrides (Testing only one non-default value) - USING ENUMERATIONS
	defaultHoverCursor: [PaneCursorType.Crosshair],
	defaultDragCursor: [PaneCursorType.ZoomIn],
	defaultAnchorHoverCursor: [PaneCursorType.VerticalResize],
	defaultAnchorDragCursor: [PaneCursorType.HorizontalResize],
	notEditableCursor: [PaneCursorType.Pointer],


	// --- II. Text Specific Options (All the Text properties) ---
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

			// Discrete/Enum Tests: Testing all Box Alignment values
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
				color: ['rgba(198, 106, 36, 0.5)'], 
				inflation: {
					x: [10, 20],
					y: [10, 20],
				},
			},
		},
	},
};


// ----------------------------------------------------------------------
// 3. CONTEXTUAL OVERRIDES
// ----------------------------------------------------------------------

export const TextContextualOverrides = {

	// When testing the 'notEditableCursor' value, we must ensure
	// 'editable' is set to false, otherwise the cursor will never display.
	'notEditableCursor': {
		editable: false,
	},

	// Text Overrides (ensure text is visible)
	'text.wordWrapWidth': {
		text: { value: 'Testing Word Wrap Width with very very very long text string' },
	},
	'text.padding': {
		text: { value: "Testing text.padding.\nTest line 2.\nTest line 3." },
	},
	'text.forceTextAlign': {
		text: { value: "Testing text.forceTextAlign", alignment: TextAlignment.Start, wordWrapWidth: 100 },
	},
	'text.forceCalculateMaxLineWidth': {
		text: { value: "Testing forceCalculateMaxLineWidth" },
	},
	'text.box.padding.x': {
		text: { box: { background: { color: ['rgba(0, 0, 0, 0.5)'], } } },
	},
	'text.box.padding.y': {
		text: { box: { background: { color: ['rgba(0, 0, 0, 0.5)'], } } },
	},
	'text.box.maxHeight': {
		text: { value: "Max Height Test:\nLine 2\nLine 3\nLine 4\nLine 5" },
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

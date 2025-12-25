// /src/TestConfig/CalloutTestConfig.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType, TextAlignment, BoxVerticalAlignment, BoxHorizontalAlignment, LineEnd, deepCopy, LineJoin, LineCap
} from 'lightweight-charts-line-tools-core';

// --- Import data specific to the Callout tool ---
import { defaultCalloutOptions } from '../Data/CalloutToolData';

// --- Constants used in Test Generation Logic ---
export const LONG_TEST_TEXT = "This is a necessary long text string to effectively test the wordWrapWidth and the maximum height truncation logic within the text box. The quick brown fox jumps over the lazy dogs. This sentence is deliberately repeated to ensure it exceeds typical line lengths.";
export const ARRAY_RADIUS_TEST_VALUE = [25, 0, 0, 25];

// ----------------------------------------------------------------------
// 1. BASELINE DEFAULTS FOR CALLOUT TOOL
// ----------------------------------------------------------------------
// The master defaults for all single-override tests.
export const CalloutOptionDefaults = deepCopy(defaultCalloutOptions);

// --- Constants & Config for Generator Hook ---
export const PROPERTIES_TO_FORCE_TEST = [
	//'showPriceAxisLabels',
	//'showTimeAxisLabels',
	//'priceAxisLabelAlwaysVisible',
	//'timeAxisLabelAlwaysVisible',
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
 * within the Callout tool's full options structure.
 */
export const CalloutUniversalTestConfig = {

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

	// --- II. Callout Specific Options ---

	// A. Line Properties (The Stem)
	line: {
		// Numerical D-B Test: [Minimal, Boundary]
		width: [1, 2, 3, 4],

		color: ['rgba(255, 0, 255, 1)'], // Magenta

		// Enum Tests: Testing all non-default LineStyle values
		style: [LineStyle.Solid, LineStyle.Dotted, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.SparseDotted],

		// Enum Tests: Testing all non-default LineJoin values
		join: [LineJoin.Bevel, LineJoin.Round, LineJoin.Miter ], // Default is Round
 
		// Enum Tests: Testing all non-default LineCap values
		cap: [LineCap.Butt, LineCap.Round, LineCap.Square,], // Default is Square

		// End points (The stem connects P0 to P1/Box)
		end: {
			left: [LineEnd.Normal, LineEnd.Arrow, LineEnd.Circle], // Default is Normal
			right: [LineEnd.Normal, LineEnd.Arrow, LineEnd.Circle],
		},
 
		// Extension properties (should be false for a callout stem)
		extend: {
			left: [true], // Test user override
			right: [true], // Test user override
		},
		testInfiniteLine: [true],
	},


	// B. Text Properties (The Text Box)
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
// 3. CONTEXTUAL OVERRIDES
// ----------------------------------------------------------------------

export const CalloutContextualOverrides = {
	// Simple overrides for necessary boolean flags

	// When testing the 'notEditableCursor' value, we must ensure
	// 'editable' is set to false, otherwise the cursor will never display.
	'notEditableCursor': {
		// The override object structure starts at the root of the options object
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
	'text.wordWrapWidth': {
        text: {
            value: 'This is testing text.wordWrapWidth, This is testing text.wordWrapWidth, This is testing text.wordWrapWidth',
        },
	},
	'text.padding': {
        text: {
            value: "This testing text.padding then a new line, 3 lines max\nThis testing text.padding then a new line, 3 lines max\nThis testing text.padding then a new line, 3 lines max",
        },
	},
	'text.forceTextAlign': {
        text: {
            value: "text.forceTextAlign, browser needs to be LTR(left to right), this is a pain to test, so you can just ignore this",
			alignment: TextAlignment.Start,
			wordWrapWidth: 100,
        },
	},
	'text.forceCalculateMaxLineWidth': {
        text: {
            value: "text.forceCalculateMaxLineWidth, when true it changes wordWrapWidth to fit text on screen, as long as wordWrapWidth is not set",
        },
	},
	'text.box.padding.x': {
        text: {
			box: {
				background: {
					color: ['rgba(0, 0, 0, 0.5)'], 
				},
			}

        },
	},
	'text.box.padding.y': {
        text: {
			box: {
				background: {
					color: ['rgba(0, 0, 0, 0.5)'], 
				},
			}

        },
	},	
	'text.box.maxHeight': {
        text: {
            value: "text.box.maxHeight, This is some text on new lines 4 times, text might disappear,\n This is some text on new lines 4 times, text might disappear,\n This is some text on new lines 4 times, text might disappear,\n This is some text on new lines 4 times, text might disappear",
        },
	},	
	'text.box.shadow.blur': {
		text: {
			box: {
				shadow: {
					"color": "rgba(255,0,0,1)",
				},
				background: {
					"color": "rgba(69, 168, 78, 1)",
				},
			},
		},
	},	
	'text.box.shadow.color': {
		text: {
			box: {
				shadow: {
					color: "rgba(255,0,0,1)",
					offset: {
						x: 10,
						y: 10,
					},
				},
				background: {
					color: "rgba(0, 17, 255, 1)",
				},
			},
			value: "text.box.shadow.color = 'rgba(255, 0, 0, 0.9)' with shadow offset to see it",
		},
	},		
	'text.box.shadow.offset.x': {
		text: {
			box: {
				shadow: {
					color: "rgba(255,0,0,1)",
				},
				background: {
					color: "rgba(0, 17, 255, 1)",
				},
			},
		},
	},		
	'text.box.shadow.offset.y': {
		text: {
			box: {
				shadow: {
					color: "rgba(255,0,0,1)",
				},
				background: {
					color: "rgba(0, 17, 255, 1)",
				},
			},
		},
	},	
	'text.box.border.width': {
		text: {
			box: {
				background: {
					color: "rgba(0, 17, 255, 0)",
				},
				border: {
					color: ['#ff8000ff'], 
				},
			},

		},
	},		
	'text.box.border.style': {
		text: {
			box: {
				background: {
					color: "rgba(0, 17, 255, 0)",
				},
				border: {
					color: ['#ff8000ff'], 
				},
			},

		},
	},	
	'text.box.border.radius': {
		text: {
			box: {
				background: {
					color: "rgba(0, 17, 255, 0)",
				},
				border: {
					color: ['#ff8000ff'], 
				},
			},

		},
	},		
	'text.box.background.inflation.x': {
		text: {
			box: {
				background: {
					color: "rgba(0, 17, 255, 1)",
				},
			},

		},
	},		
	'text.box.background.inflation.y': {
		text: {
			box: {
				background: {
					color: "rgba(0, 17, 255, 1)",
				},
			},

		},
	},		

	//'editable': {
	//	editable: false,
	//},
	
};
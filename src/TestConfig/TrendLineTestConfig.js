// /src/TestConfig/TrendLineTestConfig.js

import { LineStyle } from 'lightweight-charts';
import {
	defaultTrendLineOptions,
} from '../Data/TrendLineToolData'; // Import the baseline defaults
import {
    PaneCursorType, TextAlignment, BoxVerticalAlignment, BoxHorizontalAlignment, LineEnd, LineJoin, LineCap
} from 'lightweight-charts-line-tools-core';

/**
 * The primary set of default options for the TrendLine, used as the base
 * for every single test case generated.
 */
export const TrendLineOptionDefaults = defaultTrendLineOptions;

// --- Constants used in Test Generation Logic ---
export const LONG_TEST_TEXT = "This is a necessary long text string to effectively test the wordWrapWidth and the maximum height truncation logic within the text box. The quick brown fox jumps over the lazy dogs. This sentence is deliberately repeated to ensure it exceeds typical line lengths.";
export const ARRAY_RADIUS_TEST_VALUE = [25, 0, 0, 25];


// Define properties that should be generated even if the value matches the default (to ensure explicit testing)
// this overrides redundency, so it will test all of these keys in the TrendLineUniversalTestConfig even if they are listed in defaultTrendLineOptions
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

    // Add other properties here if needed later
];

/**
 * Defines the unique value to test for every single primitive option
 * within the TrendLine tool's full options structure.
 * 
 * NOTE: For numerical properties, we use a two-point test: [Minimal/Default, Boundary/Exaggerated].
 */
export const TrendLineUniversalTestConfig = {

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


	// --- II. TrendLine Specific Options ---

	// A. Line Properties
	line: {
		// Numerical D-B Test: [Minimal, Boundary]
		width: [1,2,3,4], // Adjusted minimum to be non-default (assuming default is 1)

		color: ['rgba(255, 41, 177, 1)'],
 
		// Enum Tests: Testing all non-default LineStyle values
		style: [LineStyle.Solid, LineStyle.Dotted, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.SparseDotted],

		// Enum Tests: Testing all non-default LineJoin values
		join: [LineJoin.Bevel, LineJoin.Round, LineJoin.Miter ], // Default is Round
 
		// Enum Tests: Testing all non-default LineCap values
		cap: [LineCap.Butt, LineCap.Round, LineCap.Square,], // Default is Square
 
		// Enum Tests: Arrow/Circle - Testing all non-default LineEnd values
		end: {
			left: [LineEnd.Normal, LineEnd.Arrow, LineEnd.Circle], // Default is Normal
			right: [LineEnd.Normal, LineEnd.Arrow, LineEnd.Circle],
		},
 
		// Boolean Test: Extension
		extend: {
			left: [true],
			right: [true],
		},
		testInfiniteLine: [true],
	},


	// B. Text Properties
	text: {
		// Placeholder for recursive logic
		value: ["TEST_TEXT_LABEL_PLACEHOLDER"],

		// Numerical D-B Tests
		padding: [0, 10, 20], // Adjusted to non-default values
		wordWrapWidth: [1, 20, 50, 100], // Adjusted to non-default values

		// Discrete/Boolean Tests
		forceTextAlign: [true], 
		forceCalculateMaxLineWidth: [true],
        
		// Enum Tests: Testing all non-default TextAlignment values
		alignment: [TextAlignment.Center, TextAlignment.Start, TextAlignment.End, TextAlignment.Left, TextAlignment.Right], // Default is Center

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
				vertical: [BoxVerticalAlignment.Top, BoxVerticalAlignment.Middle, BoxVerticalAlignment.Bottom], // Default is Middle
				horizontal: [BoxHorizontalAlignment.Left, BoxHorizontalAlignment.Center, BoxHorizontalAlignment.Right], // Default is Center
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
				width: [1,2,3,4],
				color: ['rgba(0, 255, 213, 1)'], 
				// Enum Tests: Testing all non-default LineStyle values
				style: [LineStyle.Solid, LineStyle.Dotted, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.SparseDotted], // Default is Solid
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




// NOTE: We rely on the full dot-notation path of the property being tested
// to define the contextual override.

export const TrendLineContextualOverrides = {

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
};
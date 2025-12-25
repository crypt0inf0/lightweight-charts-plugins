// /src/TestConfig/PriceRangeTestConfig.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType, TextAlignment, BoxVerticalAlignment, BoxHorizontalAlignment, deepCopy
} from 'lightweight-charts-line-tools-core';

// --- Import Tool Defaults ---
import { defaultPriceRangeOptions } from '../Data/PriceRangeToolData';


// ----------------------------------------------------------------------
// 1. BASELINE DEFAULTS FOR PRICE RANGE TOOL
// ----------------------------------------------------------------------
export const PriceRangeOptionDefaults = deepCopy(defaultPriceRangeOptions);


// --- Constants & Config for Generator Hook ---
export const PROPERTIES_TO_FORCE_TEST = [
	'showPriceAxisLabels',
	'showTimeAxisLabels',
	'priceAxisLabelAlwaysVisible',
	'timeAxisLabelAlwaysVisible',
	'priceRange.rectangle.testInfiniteRectangle',
	'priceRange.rectangle.border.color',
	'priceRange.rectangle.border.width',
	'priceRange.rectangle.border.style',
	'priceRange.rectangle.border.radius',
	'priceRange.horizontalLine.width',
	'priceRange.horizontalLine.style',
	'priceRange.horizontalLine.color',
	'priceRange.verticalLine.width',
	'priceRange.verticalLine.style',
	'priceRange.verticalLine.color',
	'text.alignment',
	'text.padding',
	'text.box.alignment.vertical',
	'text.box.alignment.horizontal',
	'text.box.border.style',
	'text.box.border.width',
	'text.font.bold',
	'priceRange.showCenterHorizontalLine',
];

/**
 * Defines the unique value to test for every single primitive option
 * within the PriceRange tool's full options structure.
 */
export const PriceRangeUniversalTestConfig = {

	// --- I. LineToolOptionsCommon ---
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

	// --- II. PriceRange Specific Options ---
	
	priceRange: {

		// A. Rectangle Body
		rectangle: {
			// Border
			border: {
				width: [1, 2, 3, 4], 
				color: ['rgba(255, 255, 0, 1)', 'rgba(255, 119, 0, 1)'],
				style: [LineStyle.Solid, LineStyle.Dotted, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.SparseDotted],
				radius: [10, 20],
			},

			// Background
			background: {
				color: ['rgba(193, 217, 12, 0.5)', 'rgba(100, 255, 100, 0.5)'],
			},

			// Extension Toggle
			extend: {
				left: [true],
				right: [true],
			},

			testInfiniteRectangle: [true]
		},

		// B. Center Lines (Booleans)
		showCenterHorizontalLine: [false],
		showCenterVerticalLine: [false],

		// C. Horizontal Center Line Properties
		horizontalLine: {
			width: [1, 2, 3, 4],
			color: ['rgba(255, 255, 0, 1)', 'rgba(255, 119, 0, 1)'],
			style: [LineStyle.Solid, LineStyle.Dotted, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.SparseDotted],
		},

		// D. Vertical Center Line Properties
		verticalLine: {
			width: [1, 2, 3, 4],
			color: ['rgba(255, 255, 0, 1)', 'rgba(255, 119, 0, 1)'],
			style: [LineStyle.Solid, LineStyle.Dotted, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.SparseDotted],
		},
	},

	// --- III. Text Properties (for the optional label) ---
	text: {
		// Placeholder for recursive logic
		value: ["TEST_TEXT_LABEL_PLACEHOLDER"],

		padding: [0, 10, 20], // Adjusted to non-default values
		wordWrapWidth: [1, 20, 50, 100], // Adjusted to non-default values


		// Discrete/Boolean Tests
		forceTextAlign: [true], 
		forceCalculateMaxLineWidth: [true],
        
		// Enum Tests: Testing all non-default TextAlignment values
		alignment: [TextAlignment.Center, TextAlignment.Start, TextAlignment.End, TextAlignment.Left, TextAlignment.Right],

        font: {
            size: [8, 20],
            bold: [true, false],
            italic: [true],
            color: ['rgba(0, 255, 0, 1)'],
            family: ['serif'],
        },

		// Box Alignment
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
				width: [1,2,3,4],
				color: ['rgba(0, 255, 213, 1)'], 
				// Enum Tests: Testing all non-default LineStyle values
				style: [LineStyle.Solid, LineStyle.Dotted, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.SparseDotted],
				radius: [3, 10],
			},

			// Background Tests
			background: {
				color: ['rgba(227, 149, 15, 0.5)'], 
				inflation: {
					x: [10, 30],
					y: [10, 20],
				},
			},
		},
	},
};


// ----------------------------------------------------------------------
// 3. CONTEXTUAL OVERRIDES
// ----------------------------------------------------------------------

export const PriceRangeContextualOverrides = {
	// Simple overrides for necessary boolean flags

	'editable': {
		editable: false,
	},
	'notEditableCursor': {
		editable: false,
	},
	// Override to create the Infinite Line combination
    'priceRange.rectangle.testInfiniteRectangle': {
        priceRange: {
			rectangle: {
				extend: {
					left: true,
					right: true,
				},
			},
		},
        // Also override the text to clearly label the infinite line
        text: {
            value: 'RECTANGLE.EXTEND.LEFT=TRUE & RIGHT=TRUE (Infinite Rectangle)',
        },
    },
	// Ensure center lines are visible when testing their properties
	'priceRange.horizontalLine': {
		priceRange: { showCenterHorizontalLine: true },
	},
	'priceRange.verticalLine': {
		priceRange: { showCenterVerticalLine: true },
	},

	// Ensure border is visible when testing border properties
	'priceRange.rectangle.border.color': {
		priceRange: { rectangle: { border: { width: 3 } } },
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
	'text.box.border.color': {
		text: {
			box: {
				border: {

					width: 1,
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
					width: 3,
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
					width: 1,
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
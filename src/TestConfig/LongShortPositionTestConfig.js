// /src/TestConfig/LongShortPositionTestConfig.js

import { LineStyle } from 'lightweight-charts';
import {
	PaneCursorType, deepCopy, LineEnd, TextAlignment, BoxVerticalAlignment, BoxHorizontalAlignment
} from 'lightweight-charts-line-tools-core';

// --- Import Tool Defaults ---
import { defaultLongShortPositionOptions } from '../Data/LongShortPositionToolData';


// --- Constants for Text Testing (Used to access properties inside nested text objects) ---
const commonTextProps = {
    'value': ["Test"],
    'font.size': [8, 30],
    'box.alignment.horizontal': [BoxHorizontalAlignment.Left, BoxHorizontalAlignment.Center, BoxHorizontalAlignment.Right],
};


// ----------------------------------------------------------------------
// 1. BASELINE DEFAULTS FOR LONG SHORT POSITION TOOL
// ----------------------------------------------------------------------
export const LongShortPositionOptionDefaults = deepCopy(defaultLongShortPositionOptions);


// --- Constants & Config for Generator Hook ---
export const PROPERTIES_TO_FORCE_TEST = [
	'showAutoText',
	'defaultHoverCursor',
	'defaultDragCursor',
	'notEditableCursor',
	'defaultAnchorHoverCursor',
    'defaultAnchorDragCursor',
	// entryStopLossRectangle
	'entryStopLossRectangle.border.color',
	'entryStopLossRectangle.border.width',
	'entryStopLossRectangle.border.style',
	'entryStopLossRectangle.border.radius',

	// entryStopLossText
	'entryStopLossText.alignment',
	'entryStopLossText.box.alignment.vertical',
	'entryStopLossText.box.alignment.horizontal',
	'entryStopLossText.padding',

	// entryPtRectangle
	'entryPtRectangle.border.color',
	'entryPtRectangle.border.width',
	'entryPtRectangle.border.style',
	'entryPtRectangle.border.radius',

	// entryPtText
	'entryPtText.alignment',
	'entryPtText.box.alignment.vertical',
	'entryPtText.box.alignment.horizontal',
	'entryPtText.padding',
];

/**
 * Defines the unique value to test for every single primitive option
 * within the LongShortPosition tool's full options structure.
 */
export const LongShortPositionUniversalTestConfig = {

	// --- I. LineToolOptionsCommon ---
	editable: [false],

	// Cursor Overrides (Testing only one non-default value) - USING ENUMERATIONS
	defaultHoverCursor: [PaneCursorType.Crosshair],
	defaultDragCursor: [PaneCursorType.ZoomIn],
	defaultAnchorHoverCursor: [PaneCursorType.Wait],
	defaultAnchorDragCursor: [PaneCursorType.Cell],
	notEditableCursor: [PaneCursorType.Pointer],

	// Label Visibility / Persistence Testing
	showPriceAxisLabels: [false],
	showTimeAxisLabels: [false],
	priceAxisLabelAlwaysVisible: [true],
	timeAxisLabelAlwaysVisible: [true],

	// --- II. LongShortPosition Specific Options ---
	
	showAutoText: [false], // Test turning off auto text

	// A. Risk Rectangle (Entry/Stop)
	entryStopLossRectangle: {
        border: {
            width: [1,2,3,4],
            color: ['rgba(0, 255, 0, 1)'],
            style: [LineStyle.Solid, LineStyle.Dotted, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.SparseDotted],
            radius: [10, 20],
        },
        background: {
            color: ['rgba(0, 0, 255, 0.5)'],
        },
        extend: {
            left: [true],
            right: [true],
        },
		testInfiniteRectangle: [true],
	},

	// B. Reward Rectangle (Entry/PT)
	entryPtRectangle: {
        border: {
            width: [1,2,3,4],
            color: ['rgba(0, 38, 255, 1)'],
            style: [LineStyle.Solid, LineStyle.Dotted, LineStyle.Dashed, LineStyle.LargeDashed, LineStyle.SparseDotted],
            radius: [10, 20],
        },
        background: {
            color: ['rgba(0, 255, 0, 1)'],
        },
        extend: {
            left: [true],
            right: [true],
        },
		testInfiniteRectangle: [true],
	},

	// C. Manual Risk Text Configuration (Requires showAutoText: false)
	entryStopLossText: {
		value: ["TEST_TEXT_LABEL_PLACEHOLDER"],
		
        // Numerical D-B Tests
        padding: [0, 10, 20],
        wordWrapWidth: [1, 20, 50, 100],

        // Discrete/Boolean Tests
        forceTextAlign: [true],
        forceCalculateMaxLineWidth: [true],
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
	// D. Manual Reward Text Configuration (Requires showAutoText: false)
	entryPtText: {
		value: ["TEST_TEXT_LABEL_PLACEHOLDER"],

        // Numerical D-B Tests
        padding: [0, 10, 20],
        wordWrapWidth: [1, 20, 50, 100],

        // Discrete/Boolean Tests
        forceTextAlign: [true],
        forceCalculateMaxLineWidth: [true],
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

export const LongShortPositionContextualOverrides = {
	// Simple overrides for necessary boolean flags
	'editable': {
		editable: false,
	},
	'notEditableCursor': {
		editable: false,
	},
	// Override to create the Infinite Line combination
    'entryStopLossRectangle.testInfiniteRectangle': {
        entryStopLossRectangle: {
            extend: {
                left: true,
                right: true,
            },
        },
        // Also override the text to clearly label the infinite line
        text: {
            value: 'RECTANGLE.EXTEND.LEFT=TRUE & RIGHT=TRUE (Infinite Rectangle)',
        },
    },	
	// Override to create the Infinite Line combination
    'entryPtRectangle.testInfiniteRectangle': {
        entryPtRectangle: {
            extend: {
                left: true,
                right: true,
            },
        },
        // Also override the text to clearly label the infinite line
        text: {
            value: 'RECTANGLE.EXTEND.LEFT=TRUE & RIGHT=TRUE (Infinite Rectangle)',
        },
    },	
	
	'entryStopLossText.wordWrapWidth': {
        entryStopLossText: {
            value: 'This is testing text.wordWrapWidth, This is testing text.wordWrapWidth, This is testing text.wordWrapWidth',
        },
	},
	'entryStopLossText.padding': {
        entryStopLossText: {
            value: "This testing text.padding then a new line, 3 lines max\nThis testing text.padding then a new line, 3 lines max\nThis testing text.padding then a new line, 3 lines max",
        },
	},
	'entryStopLossText.forceTextAlign': {
       entryStopLossText: {
            value: "text.forceTextAlign, browser needs to be LTR(left to right), this is a pain to test, so you can just ignore this",
			alignment: TextAlignment.Start,
			wordWrapWidth: 100,
        },
	},
	'entryStopLossText.forceCalculateMaxLineWidth': {
        entryStopLossText: {
            value: "text.forceCalculateMaxLineWidth, when true it changes wordWrapWidth to fit text on screen, as long as wordWrapWidth is not set",
        },
	},
	'entryStopLossText.box.padding.x': {
        entryStopLossText: {
			box: {
				background: {
					color: "rgba(0, 0, 0, 0.5)", 
				},
			}

        },
	},
	'entryStopLossText.box.padding.y': {
        entryStopLossText: {
			box: {
				background: {
					color: "rgba(0, 0, 0, 0.5)", 
				},
			}

        },
	},	
	'entryStopLossText.box.maxHeight': {
        entryStopLossText: {
            value: "text.box.maxHeight, This is some text on new lines 4 times, text might disappear,\n This is some text on new lines 4 times, text might disappear,\n This is some text on new lines 4 times, text might disappear,\n This is some text on new lines 4 times, text might disappear",
        },
	},	
	'entryStopLossText.box.shadow.blur': {
		entryStopLossText: {
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
	'entryStopLossText.box.shadow.color': {
		entryStopLossText: {
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
	'entryStopLossText.box.shadow.offset.x': {
		entryStopLossText: {
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
	'entryStopLossText.box.shadow.offset.y': {
		entryStopLossText: {
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
	'entryStopLossText.box.border.width': {
		entryStopLossText: {
			box: {
				background: {
					color: "rgba(0, 17, 255, 0)",
				},
				border: {
					color: "#ff8000ff", 
				},
			},

		},
	},		
	'entryStopLossText.box.border.style': {
		entryStopLossText: {
			box: {
				background: {
					color: "rgba(0, 17, 255, 0)",
				},
				border: {
					color: "#ff8000ff",
					width: 1, 
				},
			},

		},
	},
	'entryStopLossText.box.border.color': {
		entryStopLossText: {
			box: {
				background: {
					color: "rgba(0, 17, 255, 0)",
				},
				border: {
					width: 1,
				},
			},

		},
	},			
	'entryStopLossText.box.border.radius': {
		entryStopLossText: {
			box: {
				background: {
					color: "rgba(0, 17, 255, 0)",
				},
				border: {
					color: "#ff8000ff", 
					width: 3.
				},
			},

		},
	},		
	'entryStopLossText.box.background.inflation.x': {
		entryStopLossText: {
			box: {
				background: {
					color: "rgba(0, 17, 255, 1)",
				},
			},

		},
	},		
	'entryStopLossText.box.background.inflation.y': {
		entryStopLossText: {
			box: {
				background: {
					color: "rgba(0, 17, 255, 1)",
				},
			},

		},
	},			
	
	'entryPtText.wordWrapWidth': {
        entryPtText: {
            value: 'This is testing text.wordWrapWidth, This is testing text.wordWrapWidth, This is testing text.wordWrapWidth',
        },
	},
	'entryPtText.padding': {
        entryPtText: {
            value: "This testing text.padding then a new line, 3 lines max\nThis testing text.padding then a new line, 3 lines max\nThis testing text.padding then a new line, 3 lines max",
        },
	},
	'entryPtText.forceTextAlign': {
        entryPtText: {
            value: "text.forceTextAlign, browser needs to be LTR(left to right), this is a pain to test, so you can just ignore this",
			alignment: TextAlignment.Start,
			wordWrapWidth: 100,
        },
	},
	'entryPtText.forceCalculateMaxLineWidth': {
        entryPtText: {
            value: "text.forceCalculateMaxLineWidth, when true it changes wordWrapWidth to fit text on screen, as long as wordWrapWidth is not set",
        },
	},
	'entryPtText.box.padding.x': {
       entryPtText: {
			box: {
				background: {
					color: "rgba(0, 0, 0, 0.5)", 
				},
			}

        },
	},
	'entryPtText.box.padding.y': {
        entryPtText: {
			box: {
				background: {
					color: "rgba(0, 0, 0, 0.5)", 
				},
			}

        },
	},	
	'entryPtText.box.maxHeight': {
        entryPtText: {
            value: "text.box.maxHeight, This is some text on new lines 4 times, text might disappear,\n This is some text on new lines 4 times, text might disappear,\n This is some text on new lines 4 times, text might disappear,\n This is some text on new lines 4 times, text might disappear",
        },
	},	
	'entryPtText.box.shadow.blur': {
		entryPtText: {
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
	'entryPtText.box.shadow.color': {
		entryPtText: {
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
	'entryPtText.box.shadow.offset.x': {
		entryPtText: {
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
	'entryPtText.box.shadow.offset.y': {
		entryPtText: {
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
	'entryPtText.box.border.width': {
		entryPtText: {
			box: {
				background: {
					color: "rgba(0, 17, 255, 0)",
				},
				border: {
					color: "#ff8000ff", 
				},
			},

		},
	},		
	'entryPtText.box.border.style': {
		entryPtText: {
			box: {
				background: {
					color: "rgba(0, 17, 255, 0)",
				},
				border: {
					color: "#ff8000ff",
					width: 1, 
				},
			},

		},
	},	
	'entryPtText.box.border.color': {
		entryPtText: {
			box: {
				background: {
					color: "rgba(0, 17, 255, 0)",
				},
				border: {
					width: 1,
				},
			},

		},
	},
	'entryPtText.box.border.radius': {
		entryPtText: {
			box: {
				background: {
					color: "rgba(0, 17, 255, 0)",
				},
				border: {
					color: "#ff8000ff", 
					width: 3,
				},
			},

		},
	},		
	'entryPtText.box.background.inflation.x': {
		entryPtText: {
			box: {
				background: {
					color: "rgba(0, 17, 255, 1)",
				},
			},

		},
	},		
	'entryPtText.box.background.inflation.y': {
		entryPtText: {
			box: {
				background: {
					color: "rgba(0, 17, 255, 1)",
				},
			},

		},
	},	
};
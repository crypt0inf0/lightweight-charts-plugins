// File: /src/Components/DrawingToolbar.jsx

import React from 'react';
import { Box, IconButton, Tooltip, Divider, ToggleButtonGroup, ToggleButton } from '@mui/material';

// MUI Icons for drawing tools
import NearMeIcon from '@mui/icons-material/NearMe'; // Cursor/Select
import CropSquareIcon from '@mui/icons-material/CropSquare'; // Rectangle
import ShowChartIcon from '@mui/icons-material/ShowChart'; // TrendLine
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'; // Circle
import GestureIcon from '@mui/icons-material/Gesture'; // Brush/Freehand
import HighlightIcon from '@mui/icons-material/Highlight'; // Highlighter
import TimelineIcon from '@mui/icons-material/Timeline'; // Path
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory'; // Triangle
import TrendingUpIcon from '@mui/icons-material/TrendingUp'; // ExtendedLine
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'; // Arrow
import CallMadeIcon from '@mui/icons-material/CallMade'; // Ray
import RemoveIcon from '@mui/icons-material/Remove'; // HorizontalLine
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter'; // VerticalLine
import AddIcon from '@mui/icons-material/Add'; // CrossLine
import TextFieldsIcon from '@mui/icons-material/TextFields'; // Text
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'; // Callout
import ViewStreamIcon from '@mui/icons-material/ViewStream'; // ParallelChannel
import HeightIcon from '@mui/icons-material/Height'; // PriceRange
import SwapVertIcon from '@mui/icons-material/SwapVert'; // LongShortPosition
import LinearScaleIcon from '@mui/icons-material/LinearScale'; // FibRetracement
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart'; // MarketDepth
import DateRangeIcon from '@mui/icons-material/DateRange'; // DateRange
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; // Clear all

const tools = [
    { id: 'cursor', name: 'Cursor', icon: NearMeIcon, group: 'navigation' },
    { id: 'Rectangle', name: 'Rectangle', icon: CropSquareIcon, group: 'shapes' },
    { id: 'Circle', name: 'Circle', icon: RadioButtonUncheckedIcon, group: 'shapes' },
    { id: 'Triangle', name: 'Triangle', icon: ChangeHistoryIcon, group: 'shapes' },
    { id: 'TrendLine', name: 'Trend Line', icon: ShowChartIcon, group: 'lines' },
    { id: 'ExtendedLine', name: 'Extended Line', icon: TrendingUpIcon, group: 'lines' },
    { id: 'Ray', name: 'Ray', icon: CallMadeIcon, group: 'lines' },
    { id: 'Arrow', name: 'Arrow', icon: ArrowRightAltIcon, group: 'lines' },
    { id: 'HorizontalLine', name: 'Horizontal Line', icon: RemoveIcon, group: 'lines' },
    { id: 'HorizontalRay', name: 'Horizontal Ray', icon: RemoveIcon, group: 'lines' },
    { id: 'VerticalLine', name: 'Vertical Line', icon: VerticalAlignCenterIcon, group: 'lines' },
    { id: 'CrossLine', name: 'Cross Line', icon: AddIcon, group: 'lines' },
    { id: 'ParallelChannel', name: 'Parallel Channel', icon: ViewStreamIcon, group: 'channels' },
    { id: 'FibRetracement', name: 'Fib Retracement', icon: LinearScaleIcon, group: 'fib' },
    { id: 'TrendBasedFibExtension', name: 'Trend-Based Fib Extension', icon: LinearScaleIcon, group: 'fib' },
    { id: 'Brush', name: 'Brush', icon: GestureIcon, group: 'freehand' },
    { id: 'Highlighter', name: 'Highlighter', icon: HighlightIcon, group: 'freehand' },
    { id: 'Path', name: 'Path', icon: TimelineIcon, group: 'freehand' },
    { id: 'Text', name: 'Text', icon: TextFieldsIcon, group: 'annotation' },
    { id: 'Callout', name: 'Callout', icon: ChatBubbleOutlineIcon, group: 'annotation' },
    { id: 'PriceRange', name: 'Price Range', icon: HeightIcon, group: 'trading' },
    { id: 'LongShortPosition', name: 'Long/Short Position', icon: SwapVertIcon, group: 'trading' },
    { id: 'MarketDepth', name: 'Market Depth', icon: StackedBarChartIcon, group: 'trading' },
    { id: 'DateRange', name: 'Date Range', icon: DateRangeIcon, group: 'trading' },
    { id: 'DateAndPriceRange', name: 'Date & Price Range', icon: HeightIcon, group: 'trading' },
    { id: 'ElliottImpulse', name: 'Elliott Impulse (12345)', icon: ShowChartIcon, group: 'elliott' },
    { id: 'ElliottCorrection', name: 'Elliott Correction (ABC)', icon: TimelineIcon, group: 'elliott' },
];

const DrawingToolbar = ({ lineToolsPluginRef, activeTool, onToolChange, onClearAll }) => {
    const handleToolClick = (toolId) => {
        if (toolId === 'cursor') {
            // Just switch to cursor mode (no active drawing)
            onToolChange('cursor');
        } else {
            // Activate the selected drawing tool using addLineTool with empty points
            // This starts interactive drawing mode
            const api = lineToolsPluginRef?.current;
            if (api && api.addLineTool) {
                api.addLineTool(toolId, [], {});
                console.log(`[DrawingToolbar] Activated ${toolId} for interactive drawing`);
            } else {
                console.warn('[DrawingToolbar] Line Tools API not ready');
            }
            onToolChange(toolId);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                px: 2,
                py: 1,
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
                overflowX: 'auto',
                minHeight: 48,
            }}
        >
            {/* Cursor/Selection Tool */}
            <Tooltip title="Cursor (Select)" arrow>
                <IconButton
                    size="small"
                    onClick={() => handleToolClick('cursor')}
                    sx={{
                        bgcolor: activeTool === 'cursor' ? 'primary.main' : 'transparent',
                        color: activeTool === 'cursor' ? 'primary.contrastText' : 'text.primary',
                        '&:hover': {
                            bgcolor: activeTool === 'cursor' ? 'primary.dark' : 'action.hover',
                        },
                    }}
                >
                    <NearMeIcon fontSize="small" />
                </IconButton>
            </Tooltip>

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            {/* Shapes Group */}
            {tools.filter(t => t.group === 'shapes').map((tool) => (
                <Tooltip key={tool.id} title={tool.name} arrow>
                    <IconButton
                        size="small"
                        onClick={() => handleToolClick(tool.id)}
                        sx={{
                            bgcolor: activeTool === tool.id ? 'primary.main' : 'transparent',
                            color: activeTool === tool.id ? 'primary.contrastText' : 'text.primary',
                            '&:hover': {
                                bgcolor: activeTool === tool.id ? 'primary.dark' : 'action.hover',
                            },
                        }}
                    >
                        <tool.icon fontSize="small" />
                    </IconButton>
                </Tooltip>
            ))}

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            {/* Lines Group */}
            {tools.filter(t => t.group === 'lines').map((tool) => (
                <Tooltip key={tool.id} title={tool.name} arrow>
                    <IconButton
                        size="small"
                        onClick={() => handleToolClick(tool.id)}
                        sx={{
                            bgcolor: activeTool === tool.id ? 'primary.main' : 'transparent',
                            color: activeTool === tool.id ? 'primary.contrastText' : 'text.primary',
                            '&:hover': {
                                bgcolor: activeTool === tool.id ? 'primary.dark' : 'action.hover',
                            },
                        }}
                    >
                        <tool.icon fontSize="small" />
                    </IconButton>
                </Tooltip>
            ))}

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            {/* Channels & Fib */}
            {tools.filter(t => t.group === 'channels' || t.group === 'fib').map((tool) => (
                <Tooltip key={tool.id} title={tool.name} arrow>
                    <IconButton
                        size="small"
                        onClick={() => handleToolClick(tool.id)}
                        sx={{
                            bgcolor: activeTool === tool.id ? 'primary.main' : 'transparent',
                            color: activeTool === tool.id ? 'primary.contrastText' : 'text.primary',
                            '&:hover': {
                                bgcolor: activeTool === tool.id ? 'primary.dark' : 'action.hover',
                            },
                        }}
                    >
                        <tool.icon fontSize="small" />
                    </IconButton>
                </Tooltip>
            ))}

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            {/* Freehand Group */}
            {tools.filter(t => t.group === 'freehand').map((tool) => (
                <Tooltip key={tool.id} title={tool.name} arrow>
                    <IconButton
                        size="small"
                        onClick={() => handleToolClick(tool.id)}
                        sx={{
                            bgcolor: activeTool === tool.id ? 'primary.main' : 'transparent',
                            color: activeTool === tool.id ? 'primary.contrastText' : 'text.primary',
                            '&:hover': {
                                bgcolor: activeTool === tool.id ? 'primary.dark' : 'action.hover',
                            },
                        }}
                    >
                        <tool.icon fontSize="small" />
                    </IconButton>
                </Tooltip>
            ))}

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            {/* Annotation Group */}
            {tools.filter(t => t.group === 'annotation').map((tool) => (
                <Tooltip key={tool.id} title={tool.name} arrow>
                    <IconButton
                        size="small"
                        onClick={() => handleToolClick(tool.id)}
                        sx={{
                            bgcolor: activeTool === tool.id ? 'primary.main' : 'transparent',
                            color: activeTool === tool.id ? 'primary.contrastText' : 'text.primary',
                            '&:hover': {
                                bgcolor: activeTool === tool.id ? 'primary.dark' : 'action.hover',
                            },
                        }}
                    >
                        <tool.icon fontSize="small" />
                    </IconButton>
                </Tooltip>
            ))}

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            {/* Trading Group */}
            {tools.filter(t => t.group === 'trading').map((tool) => (
                <Tooltip key={tool.id} title={tool.name} arrow>
                    <IconButton
                        size="small"
                        onClick={() => handleToolClick(tool.id)}
                        sx={{
                            bgcolor: activeTool === tool.id ? 'primary.main' : 'transparent',
                            color: activeTool === tool.id ? 'primary.contrastText' : 'text.primary',
                            '&:hover': {
                                bgcolor: activeTool === tool.id ? 'primary.dark' : 'action.hover',
                            },
                        }}
                    >
                        <tool.icon fontSize="small" />
                    </IconButton>
                </Tooltip>
            ))}

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            {/* Elliott Wave Group */}
            {tools.filter(t => t.group === 'elliott').map((tool) => (
                <Tooltip key={tool.id} title={tool.name} arrow>
                    <IconButton
                        size="small"
                        onClick={() => handleToolClick(tool.id)}
                        sx={{
                            bgcolor: activeTool === tool.id ? 'primary.main' : 'transparent',
                            color: activeTool === tool.id ? 'primary.contrastText' : 'text.primary',
                            '&:hover': {
                                bgcolor: activeTool === tool.id ? 'primary.dark' : 'action.hover',
                            },
                        }}
                    >
                        <tool.icon fontSize="small" />
                    </IconButton>
                </Tooltip>
            ))}

            {/* Spacer */}
            <Box sx={{ flexGrow: 1 }} />

            {/* Clear All Button */}
            <Tooltip title="Clear All Drawings" arrow>
                <IconButton
                    size="small"
                    onClick={onClearAll}
                    sx={{
                        color: 'error.main',
                        '&:hover': {
                            bgcolor: 'error.dark',
                            color: 'error.contrastText',
                        },
                    }}
                >
                    <DeleteOutlineIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default DrawingToolbar;

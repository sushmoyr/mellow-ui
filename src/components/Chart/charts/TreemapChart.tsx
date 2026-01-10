/**
 * MellowUI TreemapChart
 * 
 * Hierarchical data visualization using nested rectangles.
 */

import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { ChartTooltip } from '../ChartTooltip';
import { chartColors, getChartColor } from '../utils/chartColors';

export interface TreemapNode {
    name: string;
    value?: number;
    children?: TreemapNode[];
    color?: string;
    [key: string]: unknown; // Index signature for Recharts compatibility
}

export interface MellowTreemapChartProps {
    data: TreemapNode[];
    height?: number;
    colorful?: boolean;
    showLabels?: boolean;
    valueFormatter?: (value: number) => string;
}

// Custom content renderer
const CustomContent = ({
    x,
    y,
    width,
    height,
    name,
    index,
    colorful,
    showLabels,
}: any) => {
    const color = colorful ? getChartColor(index) : chartColors.primary[Math.min(index % 5, 4)];

    // Only show label if segment is large enough
    const showLabel = showLabels && width > 50 && height > 30;

    return (
        <g>
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                fill={color}
                stroke="white"
                strokeWidth={2}
                rx={4}
                ry={4}
                style={{ transition: 'all 0.3s ease' }}
            />
            {showLabel && (
                <text
                    x={x + width / 2}
                    y={y + height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize={12}
                    fontWeight={500}
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                >
                    {name}
                </text>
            )}
        </g>
    );
};

export function MellowTreemapChart({
    data,
    height = 300,
    colorful = true,
    showLabels = true,
    valueFormatter,
}: MellowTreemapChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <Treemap
                data={data as any}
                dataKey="value"
                nameKey="name"
                aspectRatio={4 / 3}
                stroke="white"
                content={<CustomContent colorful={colorful} showLabels={showLabels} />}
            >
                <Tooltip content={<ChartTooltip valueFormatter={valueFormatter} />} />
            </Treemap>
        </ResponsiveContainer>
    );
}

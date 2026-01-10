/**
 * MellowUI PieChart
 * 
 * Pie/Donut chart with animations and interactive segments.
 */

import { useState } from 'react';
import {
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Sector,
} from 'recharts';
import { ChartTooltip } from '../ChartTooltip';
import { ChartLegend } from '../ChartLegend';
import { chartColors, getChartColor } from '../utils/chartColors';

export interface PieChartData {
    name: string;
    value: number;
    color?: string;
}

export interface MellowPieChartProps {
    data: PieChartData[];
    height?: number;
    innerRadius?: number | string;
    outerRadius?: number | string;
    legend?: boolean;
    legendPosition?: 'bottom' | 'right';
    label?: boolean | 'percent' | 'value' | 'name';
    activeShape?: boolean;
    valueFormatter?: (value: number) => string;
    startAngle?: number;
    endAngle?: number;
}

// Custom active shape for hover effect
const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;

    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 8}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <text x={cx} y={cy - 10} textAnchor="middle" fill={chartColors.text} fontSize={14} fontWeight={600}>
                {payload.name}
            </text>
            <text x={cx} y={cy + 14} textAnchor="middle" fill={chartColors.textMuted} fontSize={20} fontWeight={700}>
                {value.toLocaleString()}
            </text>
        </g>
    );
};

export function MellowPieChart({
    data,
    height = 300,
    innerRadius = 0,
    outerRadius = '80%',
    legend = true,
    legendPosition = 'bottom',
    label = false,
    activeShape = true,
    valueFormatter,
    startAngle = 90,
    endAngle = -270,
}: MellowPieChartProps) {
    const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

    const isDonut = innerRadius !== 0;

    const handleMouseEnter = (_: any, index: number) => {
        if (activeShape) {
            setActiveIndex(index);
        }
    };

    const handleMouseLeave = () => {
        setActiveIndex(undefined);
    };

    // Label renderer
    const renderLabel = label ? (props: any) => {
        const { name, value, percent } = props;
        if (label === 'percent') return `${(percent * 100).toFixed(0)}%`;
        if (label === 'value') return valueFormatter ? valueFormatter(value) : value;
        if (label === 'name') return name;
        return `${name}: ${(percent * 100).toFixed(0)}%`;
    } : undefined;

    return (
        <ResponsiveContainer width="100%" height={height}>
            <RechartsPieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    dataKey="value"
                    nameKey="name"
                    startAngle={startAngle}
                    endAngle={endAngle}
                    paddingAngle={2}
                    activeIndex={activeIndex}
                    activeShape={activeShape && isDonut ? renderActiveShape : undefined}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    label={renderLabel}
                    labelLine={label ? { stroke: chartColors.textMuted } : false}
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={entry.name}
                            fill={entry.color || getChartColor(index)}
                            stroke="white"
                            strokeWidth={2}
                        />
                    ))}
                </Pie>

                <Tooltip content={<ChartTooltip valueFormatter={valueFormatter} />} />

                {legend && (
                    <Legend
                        content={<ChartLegend />}
                        layout={legendPosition === 'right' ? 'vertical' : 'horizontal'}
                        align={legendPosition === 'right' ? 'right' : 'center'}
                        verticalAlign={legendPosition === 'right' ? 'middle' : 'bottom'}
                    />
                )}
            </RechartsPieChart>
        </ResponsiveContainer>
    );
}

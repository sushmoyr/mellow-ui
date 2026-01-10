/**
 * MellowUI BarChart
 * 
 * Bar chart with rounded corners and grouped/stacked variants.
 */

import {
    BarChart as RechartsBarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import { ChartTooltip } from '../ChartTooltip';
import { ChartLegend } from '../ChartLegend';
import { chartColors, getChartColor } from '../utils/chartColors';

export interface BarChartSeries {
    dataKey: string;
    name?: string;
    color?: string;
    stackId?: string;
}

export interface MellowBarChartProps {
    data: Record<string, unknown>[];
    xKey: string;
    yKey?: string | string[];
    series?: BarChartSeries[];
    height?: number;
    grid?: boolean;
    layout?: 'vertical' | 'horizontal';
    stacked?: boolean;
    legend?: boolean;
    barSize?: number;
    radius?: number;
    valueFormatter?: (value: number) => string;
    /** Use categorical colors for each bar (single series) */
    colorful?: boolean;
}

export function MellowBarChart({
    data,
    xKey,
    yKey,
    series,
    height = 300,
    grid = true,
    layout = 'horizontal',
    stacked = false,
    legend = true,
    barSize = 24,
    radius = 6,
    valueFormatter,
    colorful = false,
}: MellowBarChartProps) {
    const seriesConfig: BarChartSeries[] = series || (
        typeof yKey === 'string'
            ? [{ dataKey: yKey, name: yKey }]
            : (yKey || []).map((key) => ({ dataKey: key, name: key }))
    );

    const isVertical = layout === 'vertical';

    return (
        <ResponsiveContainer width="100%" height={height}>
            <RechartsBarChart
                data={data}
                layout={layout}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
                {grid && (
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={chartColors.grid}
                        horizontal={!isVertical}
                        vertical={isVertical}
                    />
                )}

                {isVertical ? (
                    <>
                        <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: chartColors.textMuted, fontSize: 12 }} />
                        <YAxis dataKey={xKey} type="category" axisLine={{ stroke: chartColors.grid }} tickLine={false} tick={{ fill: chartColors.textMuted, fontSize: 12 }} />
                    </>
                ) : (
                    <>
                        <XAxis dataKey={xKey} axisLine={{ stroke: chartColors.grid }} tickLine={false} tick={{ fill: chartColors.textMuted, fontSize: 12 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: chartColors.textMuted, fontSize: 12 }} dx={-10} />
                    </>
                )}

                <Tooltip content={<ChartTooltip valueFormatter={valueFormatter} />} cursor={{ fill: 'rgba(179, 153, 255, 0.1)' }} />

                {legend && seriesConfig.length > 1 && <Legend content={<ChartLegend />} />}

                {seriesConfig.map((s, seriesIndex) => (
                    <Bar
                        key={s.dataKey}
                        dataKey={s.dataKey}
                        name={s.name || s.dataKey}
                        fill={s.color || getChartColor(seriesIndex)}
                        barSize={barSize}
                        radius={[radius, radius, radius, radius]}
                        stackId={stacked ? 'stack' : s.stackId}
                    >
                        {colorful && seriesConfig.length === 1 && data.map((_, index) => (
                            <Cell key={index} fill={getChartColor(index)} />
                        ))}
                    </Bar>
                ))}
            </RechartsBarChart>
        </ResponsiveContainer>
    );
}

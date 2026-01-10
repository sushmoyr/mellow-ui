/**
 * MellowUI AreaChart
 * 
 * Area chart with gradient fills and stacking support.
 */

import {
    AreaChart as RechartsAreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { ChartTooltip } from '../ChartTooltip';
import { ChartLegend } from '../ChartLegend';
import { chartColors, getChartColor } from '../utils/chartColors';

export interface AreaChartSeries {
    dataKey: string;
    name?: string;
    color?: string;
    gradient?: boolean;
    stackId?: string;
}

export interface MellowAreaChartProps {
    data: Record<string, unknown>[];
    xKey: string;
    yKey?: string | string[];
    series?: AreaChartSeries[];
    height?: number;
    grid?: boolean;
    curve?: 'linear' | 'smooth' | 'step';
    stacked?: boolean;
    legend?: boolean;
    valueFormatter?: (value: number) => string;
}

export function MellowAreaChart({
    data,
    xKey,
    yKey,
    series,
    height = 300,
    grid = true,
    curve = 'smooth',
    stacked = false,
    legend = true,
    valueFormatter,
}: MellowAreaChartProps) {
    const seriesConfig: AreaChartSeries[] = series || (
        typeof yKey === 'string'
            ? [{ dataKey: yKey, name: yKey, gradient: true }]
            : (yKey || []).map((key) => ({ dataKey: key, name: key }))
    );

    const curveType = curve === 'smooth' ? 'monotone' : curve === 'step' ? 'stepAfter' : 'linear';

    return (
        <ResponsiveContainer width="100%" height={height}>
            <RechartsAreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <defs>
                    {seriesConfig.map((s, index) => {
                        const color = s.color || getChartColor(index);
                        return (
                            <linearGradient key={s.dataKey} id={`gradient-${s.dataKey}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={color} stopOpacity={0.4} />
                                <stop offset="100%" stopColor={color} stopOpacity={0.05} />
                            </linearGradient>
                        );
                    })}
                </defs>

                {grid && (
                    <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
                )}

                <XAxis
                    dataKey={xKey}
                    axisLine={{ stroke: chartColors.grid }}
                    tickLine={false}
                    tick={{ fill: chartColors.textMuted, fontSize: 12 }}
                    dy={10}
                />

                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: chartColors.textMuted, fontSize: 12 }}
                    dx={-10}
                />

                <Tooltip content={<ChartTooltip valueFormatter={valueFormatter} />} />

                {legend && <Legend content={<ChartLegend />} />}

                {seriesConfig.map((s, index) => {
                    const color = s.color || getChartColor(index);
                    return (
                        <Area
                            key={s.dataKey}
                            type={curveType}
                            dataKey={s.dataKey}
                            name={s.name || s.dataKey}
                            stroke={color}
                            strokeWidth={2}
                            fill={s.gradient !== false ? `url(#gradient-${s.dataKey})` : color}
                            fillOpacity={s.gradient !== false ? 1 : 0.3}
                            stackId={stacked ? 'stack' : s.stackId}
                        />
                    );
                })}
            </RechartsAreaChart>
        </ResponsiveContainer>
    );
}

/**
 * MellowUI ComposedChart
 * 
 * Mixed chart combining line, bar, and area.
 */

import {
    ComposedChart as RechartsComposedChart,
    Line,
    Bar,
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

export interface ComposedChartSeries {
    dataKey: string;
    name?: string;
    type: 'line' | 'bar' | 'area';
    color?: string;
    yAxisId?: string;
}

export interface MellowComposedChartProps {
    data: Record<string, unknown>[];
    xKey: string;
    series: ComposedChartSeries[];
    height?: number;
    grid?: boolean;
    legend?: boolean;
    barSize?: number;
    valueFormatter?: (value: number) => string;
}

export function MellowComposedChart({
    data,
    xKey,
    series,
    height = 300,
    grid = true,
    legend = true,
    barSize = 20,
    valueFormatter,
}: MellowComposedChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <RechartsComposedChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                {grid && <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />}

                <XAxis
                    dataKey={xKey}
                    axisLine={{ stroke: chartColors.grid }}
                    tickLine={false}
                    tick={{ fill: chartColors.textMuted, fontSize: 12 }}
                />

                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: chartColors.textMuted, fontSize: 12 }}
                />

                <Tooltip content={<ChartTooltip valueFormatter={valueFormatter} />} />
                {legend && <Legend content={<ChartLegend />} />}

                {series.map((s, index) => {
                    const color = s.color || getChartColor(index);
                    const name = s.name || s.dataKey;

                    switch (s.type) {
                        case 'bar':
                            return (
                                <Bar
                                    key={s.dataKey}
                                    dataKey={s.dataKey}
                                    name={name}
                                    fill={color}
                                    barSize={barSize}
                                    radius={[4, 4, 0, 0]}
                                    yAxisId={s.yAxisId}
                                />
                            );
                        case 'area':
                            return (
                                <Area
                                    key={s.dataKey}
                                    type="monotone"
                                    dataKey={s.dataKey}
                                    name={name}
                                    stroke={color}
                                    fill={color}
                                    fillOpacity={0.3}
                                    yAxisId={s.yAxisId}
                                />
                            );
                        case 'line':
                        default:
                            return (
                                <Line
                                    key={s.dataKey}
                                    type="monotone"
                                    dataKey={s.dataKey}
                                    name={name}
                                    stroke={color}
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: color }}
                                    yAxisId={s.yAxisId}
                                />
                            );
                    }
                })}
            </RechartsComposedChart>
        </ResponsiveContainer>
    );
}

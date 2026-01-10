/**
 * MellowUI ScatterChart
 * 
 * Point distribution and bubble chart.
 */

import {
    ScatterChart as RechartsScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { ChartTooltip } from '../ChartTooltip';
import { ChartLegend } from '../ChartLegend';
import { chartColors, getChartColor } from '../utils/chartColors';

export interface ScatterChartSeries {
    data: Record<string, unknown>[];
    name: string;
    color?: string;
}

export interface MellowScatterChartProps {
    series: ScatterChartSeries[];
    xKey: string;
    yKey: string;
    zKey?: string; // For bubble size
    height?: number;
    grid?: boolean;
    legend?: boolean;
    xLabel?: string;
    yLabel?: string;
}

export function MellowScatterChart({
    series,
    xKey,
    yKey,
    zKey,
    height = 300,
    grid = true,
    legend = true,
    xLabel,
    yLabel,
}: MellowScatterChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <RechartsScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                {grid && <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />}

                <XAxis
                    dataKey={xKey}
                    type="number"
                    name={xLabel || xKey}
                    axisLine={{ stroke: chartColors.grid }}
                    tickLine={false}
                    tick={{ fill: chartColors.textMuted, fontSize: 12 }}
                />

                <YAxis
                    dataKey={yKey}
                    type="number"
                    name={yLabel || yKey}
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: chartColors.textMuted, fontSize: 12 }}
                />

                {zKey && <ZAxis dataKey={zKey} type="number" range={[40, 400]} />}

                <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltip />} />

                {legend && <Legend content={<ChartLegend />} />}

                {series.map((s, index) => (
                    <Scatter
                        key={s.name}
                        name={s.name}
                        data={s.data}
                        fill={s.color || getChartColor(index)}
                        fillOpacity={0.7}
                    />
                ))}
            </RechartsScatterChart>
        </ResponsiveContainer>
    );
}

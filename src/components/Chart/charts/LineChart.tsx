/**
 * MellowUI LineChart
 * 
 * Line chart with smooth curves and gradient fills.
 */

import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { ChartTooltip } from '../ChartTooltip';
import { ChartLegend } from '../ChartLegend';
import { ChartGradients } from '../Chart';
import { chartColors, getChartColor } from '../utils/chartColors';

export interface LineChartSeries {
    /** Data key for this series */
    dataKey: string;
    /** Display name */
    name?: string;
    /** Color (defaults to categorical palette) */
    color?: string;
    /** Show dots on line */
    dot?: boolean;
    /** Stroke width */
    strokeWidth?: number;
    /** Use gradient fill */
    gradient?: boolean;
}

export interface MellowLineChartProps {
    /** Chart data */
    data: Record<string, unknown>[];

    /** X-axis data key */
    xKey: string;

    /** Y-axis data key(s) - string for single series, array for multiple */
    yKey?: string | string[];

    /** Series configuration (alternative to yKey) */
    series?: LineChartSeries[];

    /** Chart height */
    height?: number;

    /** Show grid */
    grid?: boolean;

    /** Smooth curve type */
    curve?: 'linear' | 'smooth' | 'step';

    /** Show dots on lines */
    dots?: boolean;

    /** Show legend */
    legend?: boolean;

    /** Value formatter for tooltip */
    valueFormatter?: (value: number) => string;
}

/**
 * Line Chart with MellowUI styling
 * 
 * @example
 * ```tsx
 * <MellowLineChart
 *   data={salesData}
 *   xKey="month"
 *   yKey="revenue"
 * />
 * ```
 */
export function MellowLineChart({
    data,
    xKey,
    yKey,
    series,
    height = 300,
    grid = true,
    curve = 'smooth',
    dots = true,
    legend = true,
    valueFormatter,
}: MellowLineChartProps) {
    // Build series config
    const seriesConfig: LineChartSeries[] = series || (
        typeof yKey === 'string'
            ? [{ dataKey: yKey, name: yKey }]
            : (yKey || []).map((key) => ({ dataKey: key, name: key }))
    );

    const curveType = curve === 'smooth' ? 'monotone' : curve === 'step' ? 'stepAfter' : 'linear';

    return (
        <ResponsiveContainer width="100%" height={height}>
            <RechartsLineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <ChartGradients />

                {grid && (
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={chartColors.grid}
                        vertical={false}
                    />
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

                {seriesConfig.map((s, index) => (
                    <Line
                        key={s.dataKey}
                        type={curveType}
                        dataKey={s.dataKey}
                        name={s.name || s.dataKey}
                        stroke={s.color || getChartColor(index)}
                        strokeWidth={s.strokeWidth || 2}
                        dot={s.dot ?? dots ? { r: 4, fill: s.color || getChartColor(index) } : false}
                        activeDot={{ r: 6, strokeWidth: 2, stroke: 'white' }}
                    />
                ))}
            </RechartsLineChart>
        </ResponsiveContainer>
    );
}

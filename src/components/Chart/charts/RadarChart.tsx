/**
 * MellowUI RadarChart
 * 
 * Multi-axis comparison chart ("spider" chart).
 */

import {
    RadarChart as RechartsRadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { ChartTooltip } from '../ChartTooltip';
import { ChartLegend } from '../ChartLegend';
import { chartColors, getChartColor } from '../utils/chartColors';

export interface RadarChartSeries {
    dataKey: string;
    name?: string;
    color?: string;
    fillOpacity?: number;
}

export interface MellowRadarChartProps {
    data: Record<string, unknown>[];
    categoryKey: string;
    series: RadarChartSeries[];
    height?: number;
    legend?: boolean;
    valueFormatter?: (value: number) => string;
}

export function MellowRadarChart({
    data,
    categoryKey,
    series,
    height = 300,
    legend = true,
    valueFormatter,
}: MellowRadarChartProps) {
    return (
        <ResponsiveContainer width="100%" height={height}>
            <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius="80%">
                <PolarGrid stroke={chartColors.grid} />
                <PolarAngleAxis dataKey={categoryKey} tick={{ fill: chartColors.textMuted, fontSize: 12 }} />
                <PolarRadiusAxis tick={{ fill: chartColors.textMuted, fontSize: 10 }} axisLine={false} />

                {series.map((s, index) => {
                    const color = s.color || getChartColor(index);
                    return (
                        <Radar
                            key={s.dataKey}
                            name={s.name || s.dataKey}
                            dataKey={s.dataKey}
                            stroke={color}
                            fill={color}
                            fillOpacity={s.fillOpacity ?? 0.3}
                            strokeWidth={2}
                        />
                    );
                })}

                <Tooltip content={<ChartTooltip valueFormatter={valueFormatter} />} />
                {legend && <Legend content={<ChartLegend />} />}
            </RechartsRadarChart>
        </ResponsiveContainer>
    );
}

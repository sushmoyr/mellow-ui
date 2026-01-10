/**
 * MellowUI GaugeChart
 * 
 * Semicircular gauge for KPI/progress visualization.
 */

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { chartColors } from '../utils/chartColors';

export interface MellowGaugeChartProps {
    /** Current value */
    value: number;

    /** Minimum value */
    min?: number;

    /** Maximum value */
    max?: number;

    /** Label to display */
    label?: string;

    /** Color for the filled portion */
    color?: string;

    /** Background color for unfilled portion */
    backgroundColor?: string;

    /** Height of the chart */
    height?: number;

    /** Value formatter */
    valueFormatter?: (value: number) => string;

    /** Show percentage instead of value */
    showPercent?: boolean;
}

export function MellowGaugeChart({
    value,
    min = 0,
    max = 100,
    label,
    color = chartColors.primary[0],
    backgroundColor = chartColors.grid,
    height = 200,
    valueFormatter = (v) => v.toString(),
    showPercent = false,
}: MellowGaugeChartProps) {
    // Calculate percentage filled
    const percent = Math.min(Math.max((value - min) / (max - min), 0), 1);
    const filledValue = percent * 100;
    const remainingValue = 100 - filledValue;

    const data = [
        { name: 'filled', value: filledValue },
        { name: 'remaining', value: remainingValue },
    ];

    const displayValue = showPercent
        ? `${Math.round(percent * 100)}%`
        : valueFormatter(value);

    return (
        <div style={{ position: 'relative', width: '100%', height }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="80%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius="60%"
                        outerRadius="90%"
                        dataKey="value"
                        stroke="none"
                    >
                        <Cell fill={color} />
                        <Cell fill={backgroundColor} />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            {/* Center text */}
            <div
                style={{
                    position: 'absolute',
                    top: '55%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                }}
            >
                <div style={{ fontSize: 28, fontWeight: 700, color: chartColors.text }}>
                    {displayValue}
                </div>
                {label && (
                    <div style={{ fontSize: 14, color: chartColors.textMuted, marginTop: 4 }}>
                        {label}
                    </div>
                )}
            </div>
        </div>
    );
}

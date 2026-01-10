/**
 * MellowUI FunnelChart
 * 
 * Conversion/process flow visualization.
 */

import { getChartColor } from '../utils/chartColors';

export interface FunnelChartData {
    name: string;
    value: number;
    color?: string;
}

export interface MellowFunnelChartProps {
    data: FunnelChartData[];
    height?: number;
    showLabels?: boolean;
    showValues?: boolean;
    valueFormatter?: (value: number) => string;
}

export function MellowFunnelChart({
    data,
    height = 300,
    showLabels = true,
    showValues = true,
    valueFormatter = (v) => v.toLocaleString(),
}: MellowFunnelChartProps) {
    // Sort by value descending for proper funnel shape
    const sortedData = [...data].sort((a, b) => b.value - a.value);
    const maxValue = sortedData[0]?.value || 1;

    const segmentHeight = (height - 20) / sortedData.length;

    return (
        <div style={{ width: '100%', height, position: 'relative' }}>
            <svg width="100%" height={height} viewBox={`0 0 400 ${height}`} preserveAspectRatio="xMidYMid meet">
                {sortedData.map((item, index) => {
                    const percent = item.value / maxValue;
                    const nextPercent = sortedData[index + 1]
                        ? sortedData[index + 1].value / maxValue
                        : percent * 0.6;

                    const y = index * segmentHeight + 10;
                    const topWidth = 380 * percent;
                    const bottomWidth = 380 * nextPercent;

                    const topX = (400 - topWidth) / 2;
                    const bottomX = (400 - bottomWidth) / 2;

                    const color = item.color || getChartColor(index);

                    // Create trapezoid path
                    const path = `
            M ${topX} ${y}
            L ${topX + topWidth} ${y}
            L ${bottomX + bottomWidth} ${y + segmentHeight - 2}
            L ${bottomX} ${y + segmentHeight - 2}
            Z
          `;

                    return (
                        <g key={item.name}>
                            <path
                                d={path}
                                fill={color}
                                stroke="white"
                                strokeWidth={2}
                                style={{ transition: 'all 0.3s ease' }}
                            />
                            {showLabels && (
                                <text
                                    x={200}
                                    y={y + segmentHeight / 2}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill="white"
                                    fontSize={13}
                                    fontWeight={600}
                                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}
                                >
                                    {item.name}
                                    {showValues && ` (${valueFormatter(item.value)})`}
                                </text>
                            )}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

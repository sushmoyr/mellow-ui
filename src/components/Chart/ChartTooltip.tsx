/**
 * MellowUI Chart Tooltip
 * 
 * Custom styled tooltip for all chart components.
 */

import styles from './Chart.module.css';

export interface TooltipPayloadItem {
    value: number | string;
    name: string;
    color?: string;
    dataKey?: string;
}

export interface ChartTooltipProps {
    active?: boolean;
    payload?: TooltipPayloadItem[];
    label?: string | number;
    /** Custom formatter for values */
    valueFormatter?: (value: number) => string;
    /** Custom formatter for labels */
    labelFormatter?: (label: string) => string;
}

/**
 * Custom tooltip component for MellowUI charts
 */
export function ChartTooltip({
    active,
    payload,
    label,
    valueFormatter = (v) => v.toLocaleString(),
    labelFormatter = (l) => l,
}: ChartTooltipProps) {
    if (!active || !payload || payload.length === 0) {
        return null;
    }

    return (
        <div className={styles.tooltip}>
            <div className={styles.tooltipLabel}>{labelFormatter(String(label))}</div>
            {payload.map((entry, index) => (
                <div key={index} className={styles.tooltipItem}>
                    <span
                        className={styles.tooltipDot}
                        style={{ backgroundColor: entry.color }}
                    />
                    <span className={styles.tooltipName}>{entry.name}</span>
                    <span className={styles.tooltipValue}>
                        {typeof entry.value === 'number' ? valueFormatter(entry.value) : entry.value}
                    </span>
                </div>
            ))}
        </div>
    );
}

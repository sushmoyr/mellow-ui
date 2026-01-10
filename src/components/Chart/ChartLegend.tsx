/**
 * MellowUI Chart Legend
 * 
 * Custom styled legend for all chart components.
 */

import clsx from 'clsx';
import styles from './Chart.module.css';

export interface LegendItem {
    value: string;
    color: string;
    dataKey?: string;
}

export interface ChartLegendProps {
    /** Legend items */
    payload?: LegendItem[];

    /** Callback when item is clicked (for toggling series) */
    onClick?: (dataKey: string) => void;

    /** Currently hidden series */
    hiddenSeries?: string[];

    /** Position */
    align?: 'left' | 'center' | 'right';
}

/**
 * Custom legend component for MellowUI charts
 */
export function ChartLegend({
    payload = [],
    onClick,
    hiddenSeries = [],
    align = 'center',
}: ChartLegendProps) {
    return (
        <div
            className={styles.legend}
            style={{
                justifyContent:
                    align === 'left' ? 'flex-start' : align === 'right' ? 'flex-end' : 'center',
            }}
        >
            {payload.map((entry, index) => {
                const dataKey = entry.dataKey || entry.value;
                const isHidden = hiddenSeries.includes(dataKey);

                return (
                    <button
                        key={index}
                        type="button"
                        className={clsx(styles.legendItem, { [styles.inactive]: isHidden })}
                        onClick={() => onClick?.(dataKey)}
                    >
                        <span
                            className={styles.legendDot}
                            style={{ backgroundColor: entry.color }}
                        />
                        <span>{entry.value}</span>
                    </button>
                );
            })}
        </div>
    );
}

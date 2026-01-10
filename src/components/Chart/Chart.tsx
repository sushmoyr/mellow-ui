/**
 * MellowUI Chart Container
 * 
 * Responsive wrapper for all chart components with MellowUI styling.
 */

import { ReactNode, CSSProperties } from 'react';
import { ResponsiveContainer } from 'recharts';
import clsx from 'clsx';
import styles from './Chart.module.css';

export interface ChartProps {
    /** Chart content (LineChart, BarChart, etc.) */
    children: ReactNode;

    /** Chart title */
    title?: string;

    /** Chart description/subtitle */
    description?: string;

    /** Width - defaults to 100% */
    width?: number | string;

    /** Height - defaults to 300 */
    height?: number;

    /** Aspect ratio (overrides height) */
    aspect?: number;

    /** Additional class name */
    className?: string;

    /** Inline styles */
    style?: CSSProperties;

    /** Show loading state */
    loading?: boolean;

    /** Empty state content */
    empty?: boolean;

    /** Empty state message */
    emptyMessage?: string;
}

/**
 * Chart Container
 * 
 * Provides responsive sizing, title, and consistent styling for all charts.
 * 
 * @example
 * ```tsx
 * <Chart title="Monthly Revenue" height={400}>
 *   <LineChart data={data} />
 * </Chart>
 * ```
 */
export function Chart({
    children,
    title,
    description,
    width = '100%',
    height = 300,
    aspect,
    className,
    style,
    loading = false,
    empty = false,
    emptyMessage = 'No data available',
}: ChartProps) {
    return (
        <div className={clsx(styles.container, className)} style={style}>
            {(title || description) && (
                <div className={styles.header}>
                    {title && <h3 className={styles.title}>{title}</h3>}
                    {description && <p className={styles.description}>{description}</p>}
                </div>
            )}

            <div className={styles.chartArea}>
                {loading ? (
                    <div className={styles.loading}>
                        <div className={styles.loadingSpinner} />
                        <span>Loading chart...</span>
                    </div>
                ) : empty ? (
                    <div className={styles.empty}>
                        <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span>{emptyMessage}</span>
                    </div>
                ) : (
                    <ResponsiveContainer width={width} height={height} aspect={aspect}>
                        {children as React.ReactElement}
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}

// Gradient definitions component for SVG charts
export function ChartGradients() {
    return (
        <defs>
            <linearGradient id="mellowGradientPrimary" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B399FF" stopOpacity={1} />
                <stop offset="100%" stopColor="#815BCC" stopOpacity={1} />
            </linearGradient>
            <linearGradient id="mellowGradientArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B399FF" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#B399FF" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="mellowGradientSuccess" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#86EFAC" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#86EFAC" stopOpacity={0.05} />
            </linearGradient>
        </defs>
    );
}

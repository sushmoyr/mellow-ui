/**
 * MellowUI Grid Component
 * 
 * CSS Grid layout wrapper.
 */

import { forwardRef, ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';
import styles from './Grid.module.css';

export interface GridProps {
    /** Number of columns (default 12) */
    columns?: number | string;

    /** Grid gap */
    gap?: number | string;

    /** Row gap */
    rowGap?: number | string;

    /** Column gap */
    columnGap?: number | string;

    /** Align items */
    align?: 'start' | 'center' | 'end' | 'stretch';

    /** Justify items */
    justify?: 'start' | 'center' | 'end' | 'stretch';

    /** Children */
    children?: ReactNode;

    /** Custom className */
    className?: string;

    /** Custom styles */
    style?: CSSProperties;
}

export interface GridItemProps {
    /** Column span */
    colSpan?: number;

    /** Row span */
    rowSpan?: number;

    /** Start column */
    colStart?: number;

    /** Start row */
    rowStart?: number;

    /** Children */
    children?: ReactNode;

    /** Custom className */
    className?: string;

    /** Custom styles */
    style?: CSSProperties;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
    (
        {
            columns = 12,
            gap,
            rowGap,
            columnGap,
            align = 'stretch',
            justify = 'stretch',
            children,
            className,
            style,
        },
        ref
    ) => {
        const gapValue = gap !== undefined ? (typeof gap === 'number' ? `${gap}px` : gap) : undefined;
        const rowGapValue = rowGap !== undefined ? (typeof rowGap === 'number' ? `${rowGap}px` : rowGap) : gapValue;
        const colGapValue = columnGap !== undefined ? (typeof columnGap === 'number' ? `${columnGap}px` : columnGap) : gapValue;

        const gridTemplateColumns = typeof columns === 'number'
            ? `repeat(${columns}, 1fr)`
            : columns;

        return (
            <div
                ref={ref}
                className={clsx(styles.grid, className)}
                style={{
                    display: 'grid',
                    gridTemplateColumns,
                    rowGap: rowGapValue,
                    columnGap: colGapValue,
                    alignItems: align,
                    justifyItems: justify,
                    ...style,
                }}
            >
                {children}
            </div>
        );
    }
);

Grid.displayName = 'Grid';

export const GridItem = forwardRef<HTMLDivElement, GridItemProps>(
    (
        {
            colSpan,
            rowSpan,
            colStart,
            rowStart,
            children,
            className,
            style,
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={clsx(styles.gridItem, className)}
                style={{
                    gridColumn: colSpan ? `span ${colSpan}` : undefined,
                    gridRow: rowSpan ? `span ${rowSpan}` : undefined,
                    gridColumnStart: colStart,
                    gridRowStart: rowStart,
                    ...style,
                }}
            >
                {children}
            </div>
        );
    }
);

GridItem.displayName = 'GridItem';

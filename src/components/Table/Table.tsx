/**
 * MellowUI Table Component
 * 
 * Data table with styling.
 */

import { forwardRef, ReactNode, ThHTMLAttributes, TdHTMLAttributes, TableHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Table.module.css';

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
    /** Striped rows */
    striped?: boolean;

    /** Hoverable rows */
    hoverable?: boolean;

    /** Compact spacing */
    compact?: boolean;

    /** Custom className */
    className?: string;

    children: ReactNode;
}

export interface TableHeadProps {
    children: ReactNode;
    className?: string;
}

export interface TableBodyProps {
    children: ReactNode;
    className?: string;
}

export interface TableRowProps {
    children: ReactNode;
    className?: string;
    selected?: boolean;
}

export interface TableHeaderProps extends ThHTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode;
    className?: string;
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
    children?: ReactNode;
    className?: string;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
    ({ striped = false, hoverable = true, compact = false, children, className, ...props }, ref) => {
        return (
            <div className={styles.wrapper}>
                <table
                    ref={ref}
                    className={clsx(
                        styles.table,
                        {
                            [styles.striped]: striped,
                            [styles.hoverable]: hoverable,
                            [styles.compact]: compact,
                        },
                        className
                    )}
                    {...props}
                >
                    {children}
                </table>
            </div>
        );
    }
);

export const TableHead = ({ children, className }: TableHeadProps) => (
    <thead className={clsx(styles.thead, className)}>{children}</thead>
);

export const TableBody = ({ children, className }: TableBodyProps) => (
    <tbody className={clsx(styles.tbody, className)}>{children}</tbody>
);

export const TableRow = ({ children, className, selected }: TableRowProps) => (
    <tr className={clsx(styles.tr, { [styles.selected]: selected }, className)}>{children}</tr>
);

export const TableHeader = ({ children, className, ...props }: TableHeaderProps) => (
    <th className={clsx(styles.th, className)} {...props}>{children}</th>
);

export const TableCell = ({ children, className, ...props }: TableCellProps) => (
    <td className={clsx(styles.td, className)} {...props}>{children}</td>
);

Table.displayName = 'Table';
TableHead.displayName = 'TableHead';
TableBody.displayName = 'TableBody';
TableRow.displayName = 'TableRow';
TableHeader.displayName = 'TableHeader';
TableCell.displayName = 'TableCell';

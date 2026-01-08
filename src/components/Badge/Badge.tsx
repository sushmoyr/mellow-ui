/**
 * MellowUI Badge Component
 * 
 * Small status indicator or label.
 */

import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Badge.module.css';

export type BadgeVariant = 'solid' | 'soft' | 'outline';
export type BadgeSize = 'sm' | 'md';
export type BadgeColor = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';

export interface BadgeProps {
    /** Badge content */
    children: ReactNode;

    /** Visual variant */
    variant?: BadgeVariant;

    /** Size */
    size?: BadgeSize;

    /** Color scheme */
    color?: BadgeColor;

    /** Custom className */
    className?: string;
}

/**
 * MellowUI Badge
 * 
 * A small label for status or categorization.
 * 
 * @example
 * ```tsx
 * <Badge color="success">Active</Badge>
 * ```
 */
export function Badge({
    children,
    variant = 'soft',
    size = 'sm',
    color = 'primary',
    className,
}: BadgeProps) {
    return (
        <span
            className={clsx(
                styles.badge,
                styles[`variant-${variant}`],
                styles[`size-${size}`],
                styles[`color-${color}`],
                className
            )}
        >
            {children}
        </span>
    );
}

/**
 * MellowUI Progress Component
 * 
 * Loading indicator (bar and circular).
 */

import { forwardRef, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './Progress.module.css';

export type ProgressVariant = 'bar' | 'circular';
export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressColor = 'primary' | 'secondary' | 'accent';

export interface ProgressProps {
    /** Current value (0-100) */
    value?: number;

    /** Indeterminate mode (animated) */
    indeterminate?: boolean;

    /** Variant */
    variant?: ProgressVariant;

    /** Size */
    size?: ProgressSize;

    /** Color */
    color?: ProgressColor;

    /** Show value label */
    showValue?: boolean;

    /** Custom className */
    className?: string;

    /** Custom styles */
    style?: CSSProperties;

    /** Accessible label */
    'aria-label'?: string;
}

/**
 * MellowUI Progress
 * 
 * Loading indicator with bar or circular variant.
 */
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
    (
        {
            value = 0,
            indeterminate = false,
            variant = 'bar',
            size = 'md',
            color = 'primary',
            showValue = false,
            className,
            style,
            'aria-label': ariaLabel,
        },
        ref
    ) => {
        const clampedValue = Math.min(100, Math.max(0, value));

        if (variant === 'circular') {
            return (
                <CircularProgress
                    ref={ref}
                    value={clampedValue}
                    indeterminate={indeterminate}
                    size={size}
                    color={color}
                    showValue={showValue}
                    className={className}
                    style={style}
                    aria-label={ariaLabel}
                />
            );
        }

        return (
            <div
                ref={ref}
                className={clsx(
                    styles.bar,
                    styles[`size-${size}`],
                    styles[`color-${color}`],
                    { [styles.indeterminate]: indeterminate },
                    className
                )}
                style={style}
                role="progressbar"
                aria-valuenow={indeterminate ? undefined : clampedValue}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={ariaLabel}
            >
                <motion.div
                    className={styles.fill}
                    initial={false}
                    animate={indeterminate ? undefined : { width: `${clampedValue}%` }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                />
                {showValue && !indeterminate && (
                    <span className={styles.label}>{Math.round(clampedValue)}%</span>
                )}
            </div>
        );
    }
);

Progress.displayName = 'Progress';

// ========== Circular Variant ==========

interface CircularProgressProps extends Omit<ProgressProps, 'variant'> { }

const CircularProgress = forwardRef<HTMLDivElement, CircularProgressProps>(
    (
        {
            value = 0,
            indeterminate = false,
            size = 'md',
            color = 'primary',
            showValue = false,
            className,
            style,
            'aria-label': ariaLabel,
        },
        ref
    ) => {
        const sizeMap = { sm: 32, md: 48, lg: 64 };
        const strokeMap = { sm: 3, md: 4, lg: 5 };

        const diameter = sizeMap[size];
        const strokeWidth = strokeMap[size];
        const radius = (diameter - strokeWidth) / 2;
        const circumference = radius * 2 * Math.PI;
        const offset = circumference - (value / 100) * circumference;

        return (
            <div
                ref={ref}
                className={clsx(
                    styles.circular,
                    styles[`color-${color}`],
                    { [styles.indeterminateCircular]: indeterminate },
                    className
                )}
                style={{ width: diameter, height: diameter, ...style }}
                role="progressbar"
                aria-valuenow={indeterminate ? undefined : value}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={ariaLabel}
            >
                <svg width={diameter} height={diameter}>
                    {/* Track */}
                    <circle
                        className={styles.circleTrack}
                        cx={diameter / 2}
                        cy={diameter / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    {/* Progress */}
                    <motion.circle
                        className={styles.circleFill}
                        cx={diameter / 2}
                        cy={diameter / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeLinecap="round"
                        style={{
                            strokeDasharray: circumference,
                            transformOrigin: 'center',
                            transform: 'rotate(-90deg)',
                        }}
                        initial={false}
                        animate={indeterminate ? undefined : { strokeDashoffset: offset }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                </svg>
                {showValue && !indeterminate && (
                    <span className={styles.circularLabel}>{Math.round(value)}%</span>
                )}
            </div>
        );
    }
);

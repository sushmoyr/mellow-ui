/**
 * MellowUI FloatingActionButton (FAB)
 * 
 * A prominent circular button that floats over content for primary actions.
 */

import { forwardRef, ReactNode, MouseEventHandler } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useSquishy } from '../../motion/useSquishy';
import { useHover } from '../../motion/useHover';
import styles from './FloatingActionButton.module.css';

export type FABSize = 'sm' | 'md' | 'lg';
export type FABColor = 'primary' | 'secondary' | 'accent';
export type FABPosition = 'bottom-right' | 'bottom-left' | 'bottom-center';

export interface FloatingActionButtonProps {
    /** Icon to display */
    icon: ReactNode;

    /** Optional label (creates extended FAB) */
    label?: string;

    /** Size of the FAB */
    size?: FABSize;

    /** Color scheme */
    color?: FABColor;

    /** Position when using fixed positioning */
    position?: FABPosition;

    /** Whether to use fixed positioning */
    fixed?: boolean;

    /** Whether the FAB is disabled */
    disabled?: boolean;

    /** Click handler */
    onClick?: MouseEventHandler<HTMLButtonElement>;

    /** Custom className */
    className?: string;

    /** Accessible label */
    'aria-label'?: string;
}

/**
 * MellowUI FloatingActionButton
 * 
 * A prominent action button with squishy physics and hover lift.
 * 
 * @example
 * ```tsx
 * // Icon-only FAB
 * <FloatingActionButton icon={<PlusIcon />} aria-label="Add item" />
 * 
 * // Extended FAB with label
 * <FloatingActionButton icon={<PlusIcon />} label="Create" />
 * 
 * // Fixed position FAB
 * <FloatingActionButton 
 *   icon={<PlusIcon />} 
 *   fixed 
 *   position="bottom-right"
 * />
 * ```
 */
export const FloatingActionButton = forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
    (
        {
            icon,
            label,
            size = 'md',
            color = 'primary',
            position = 'bottom-right',
            fixed = false,
            disabled = false,
            onClick,
            className,
            'aria-label': ariaLabel,
        },
        ref
    ) => {
        const isExtended = !!label;

        const { scale, handlers: squishyHandlers } = useSquishy({
            disabled,
            scale: 0.92,
        });

        const { y, handlers: hoverHandlers } = useHover({
            disabled,
            y: -4,
        });

        const combinedHandlers = {
            onMouseEnter: hoverHandlers.onMouseEnter,
            onMouseLeave: () => {
                hoverHandlers.onMouseLeave();
                squishyHandlers.onPointerLeave();
            },
            onPointerDown: squishyHandlers.onPointerDown,
            onPointerUp: squishyHandlers.onPointerUp,
        };

        return (
            <motion.button
                ref={ref}
                type="button"
                className={clsx(
                    styles.fab,
                    styles[`size-${size}`],
                    styles[`color-${color}`],
                    {
                        [styles.extended]: isExtended,
                        [styles.fixed]: fixed,
                        [styles[position]]: fixed,
                        [styles.disabled]: disabled,
                    },
                    className
                )}
                style={{
                    scale,
                    y,
                }}
                disabled={disabled}
                onClick={onClick}
                aria-label={ariaLabel || label}
                {...combinedHandlers}
            >
                <span className={styles.icon}>{icon}</span>
                {isExtended && <span className={styles.label}>{label}</span>}
            </motion.button>
        );
    }
);

FloatingActionButton.displayName = 'FloatingActionButton';

// Alias for convenience
export const FAB = FloatingActionButton;

/**
 * MellowUI IconButton Component
 * 
 * Circular button for icon-only actions with subtle rotation on hover.
 */

import { forwardRef, ReactNode, MouseEventHandler } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useSquishy } from '../../motion/useSquishy';
import { useHover } from '../../motion/useHover';
import styles from './IconButton.module.css';

export type IconButtonSize = 'sm' | 'md' | 'lg';
export type IconButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost';
export type IconButtonColor = 'primary' | 'secondary' | 'accent' | 'danger';

export interface IconButtonProps {
    /** Icon element to display */
    icon: ReactNode;

    /** Accessible label (required for screen readers) */
    'aria-label': string;

    /** Size of the button */
    size?: IconButtonSize;

    /** Visual variant */
    variant?: IconButtonVariant;

    /** Color scheme */
    color?: IconButtonColor;

    /** Whether button is disabled */
    disabled?: boolean;

    /** Show loading state */
    isLoading?: boolean;

    /** Make it a circle (default) or rounded square */
    rounded?: boolean;

    /** Custom className */
    className?: string;

    /** Click handler */
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

/**
 * MellowUI IconButton
 * 
 * A circular button for icon-only actions with satisfying
 * squishy physics and subtle hover rotation.
 * 
 * @example
 * ```tsx
 * <IconButton 
 *   icon={<HeartIcon />} 
 *   aria-label="Like"
 *   color="accent"
 * />
 * ```
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    (
        {
            icon,
            'aria-label': ariaLabel,
            size = 'md',
            variant = 'soft',
            color = 'primary',
            disabled = false,
            isLoading = false,
            rounded = true,
            className,
            onClick,
        },
        ref
    ) => {
        const isDisabled = disabled || isLoading;

        const { scale: pressScale, handlers: pressHandlers } = useSquishy({
            disabled: isDisabled,
            scale: 0.9,
        });

        const { y: hoverY, handlers: hoverHandlers } = useHover({
            disabled: isDisabled,
            y: -2,
        });

        const combinedHandlers = {
            onMouseEnter: hoverHandlers.onMouseEnter,
            onMouseLeave: () => {
                hoverHandlers.onMouseLeave();
                pressHandlers.onPointerLeave();
            },
            onPointerDown: pressHandlers.onPointerDown,
            onPointerUp: pressHandlers.onPointerUp,
        };

        return (
            <motion.button
                ref={ref}
                type="button"
                className={clsx(
                    styles.iconButton,
                    styles[`size-${size}`],
                    styles[`variant-${variant}`],
                    styles[`color-${color}`],
                    {
                        [styles.rounded]: rounded,
                        [styles.square]: !rounded,
                        [styles.loading]: isLoading,
                    },
                    className
                )}
                style={{
                    scale: pressScale,
                    y: hoverY,
                }}
                disabled={isDisabled}
                aria-label={ariaLabel}
                onClick={onClick}
                {...combinedHandlers}
            >
                {isLoading ? (
                    <motion.span
                        className={styles.spinner}
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                    />
                ) : (
                    <span className={styles.icon}>{icon}</span>
                )}
            </motion.button>
        );
    }
);

IconButton.displayName = 'IconButton';

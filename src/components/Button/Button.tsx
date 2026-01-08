/**
 * MellowUI Button Component
 * 
 * A squishy, delightful button with spring physics.
 */

import { forwardRef, ReactNode, MouseEventHandler } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useSquishy } from '../../motion/useSquishy';
import { useHover } from '../../motion/useHover';
import styles from './Button.module.css';

export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonColor = 'primary' | 'secondary' | 'accent' | 'danger';

export interface ButtonProps {
    /** Visual variant */
    variant?: ButtonVariant;

    /** Size of the button */
    size?: ButtonSize;

    /** Color scheme */
    color?: ButtonColor;

    /** Show loading state */
    isLoading?: boolean;

    /** Icon before the label */
    leftIcon?: ReactNode;

    /** Icon after the label */
    rightIcon?: ReactNode;

    /** Make button full width */
    fullWidth?: boolean;

    /** Use pill shape (full border-radius) */
    pill?: boolean;

    /** Whether button is disabled */
    disabled?: boolean;

    /** Button type */
    type?: 'button' | 'submit' | 'reset';

    /** Custom className */
    className?: string;

    /** Click handler */
    onClick?: MouseEventHandler<HTMLButtonElement>;

    /** Button content */
    children: ReactNode;
}

/**
 * MellowUI Button
 * 
 * A satisfying, squishy button that responds to interaction
 * with spring physics and subtle hover effects.
 * 
 * @example
 * ```tsx
 * <Button variant="solid" color="primary">
 *   Click me!
 * </Button>
 * 
 * <Button variant="soft" color="accent" leftIcon={<HeartIcon />}>
 *   Like
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'solid',
            size = 'md',
            color = 'primary',
            isLoading = false,
            leftIcon,
            rightIcon,
            fullWidth = false,
            pill = false,
            disabled,
            type = 'button',
            className,
            onClick,
            children,
        },
        ref
    ) => {
        const isDisabled = disabled || isLoading;

        const { scale: pressScale, handlers: pressHandlers } = useSquishy({
            disabled: isDisabled,
            scale: 0.96,
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
                type={type}
                className={clsx(
                    styles.button,
                    styles[`variant-${variant}`],
                    styles[`size-${size}`],
                    styles[`color-${color}`],
                    {
                        [styles.fullWidth]: fullWidth,
                        [styles.pill]: pill,
                        [styles.loading]: isLoading,
                    },
                    className
                )}
                style={{
                    scale: pressScale,
                    y: hoverY,
                }}
                disabled={isDisabled}
                onClick={onClick}
                {...combinedHandlers}
            >
                {isLoading && (
                    <motion.span
                        className={styles.spinner}
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                    />
                )}
                {!isLoading && leftIcon && (
                    <span className={styles.icon}>{leftIcon}</span>
                )}
                <span className={styles.label}>{children}</span>
                {!isLoading && rightIcon && (
                    <span className={styles.icon}>{rightIcon}</span>
                )}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';

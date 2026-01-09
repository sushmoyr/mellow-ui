/**
 * MellowUI Toggle Component
 * 
 * A pressable button that maintains an on/off (pressed) state.
 * Commonly used in toolbars for formatting options.
 */

import { forwardRef, ReactNode, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useSquishy } from '../../motion/useSquishy';
import styles from './Toggle.module.css';

export type ToggleSize = 'sm' | 'md' | 'lg';
export type ToggleVariant = 'default' | 'outline';

export interface ToggleProps {
    /** Controlled pressed state */
    pressed?: boolean;

    /** Default pressed state (uncontrolled) */
    defaultPressed?: boolean;

    /** Called when pressed state changes */
    onPressedChange?: (pressed: boolean) => void;

    /** Size of the toggle */
    size?: ToggleSize;

    /** Visual variant */
    variant?: ToggleVariant;

    /** Whether the toggle is disabled */
    disabled?: boolean;

    /** Content (usually icon or short text) */
    children: ReactNode;

    /** Custom className */
    className?: string;

    /** Accessible label */
    'aria-label'?: string;
}

/**
 * MellowUI Toggle
 * 
 * A button that maintains pressed/unpressed state with satisfying
 * squishy physics. Perfect for toolbar actions.
 * 
 * @example
 * ```tsx
 * // Uncontrolled
 * <Toggle aria-label="Bold">
 *   <BoldIcon />
 * </Toggle>
 * 
 * // Controlled
 * <Toggle pressed={isBold} onPressedChange={setIsBold} aria-label="Bold">
 *   <BoldIcon />
 * </Toggle>
 * ```
 */
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
    (
        {
            pressed: pressedProp,
            defaultPressed = false,
            onPressedChange,
            size = 'md',
            variant = 'default',
            disabled = false,
            children,
            className,
            'aria-label': ariaLabel,
        },
        ref
    ) => {
        // Internal state for uncontrolled usage
        const [internalPressed, setInternalPressed] = useState(defaultPressed);

        // Determine if controlled
        const isControlled = pressedProp !== undefined;
        const isPressed = isControlled ? pressedProp : internalPressed;

        // Squishy animation
        const { scale, handlers: squishyHandlers } = useSquishy({
            disabled,
            scale: 0.94,
        });

        const handleClick = useCallback(() => {
            if (disabled) return;

            const newPressed = !isPressed;

            if (!isControlled) {
                setInternalPressed(newPressed);
            }

            onPressedChange?.(newPressed);
        }, [disabled, isPressed, isControlled, onPressedChange]);

        return (
            <motion.button
                ref={ref}
                type="button"
                className={clsx(
                    styles.toggle,
                    styles[`size-${size}`],
                    styles[`variant-${variant}`],
                    {
                        [styles.pressed]: isPressed,
                        [styles.disabled]: disabled,
                    },
                    className
                )}
                style={{ scale }}
                disabled={disabled}
                aria-pressed={isPressed}
                aria-label={ariaLabel}
                onClick={handleClick}
                {...squishyHandlers}
            >
                <span className={styles.content}>{children}</span>
            </motion.button>
        );
    }
);

Toggle.displayName = 'Toggle';

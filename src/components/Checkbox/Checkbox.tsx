/**
 * MellowUI Checkbox Component
 * 
 * Checkbox with bouncy checkmark animation and squishy physics.
 */

import { forwardRef, InputHTMLAttributes, useId, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useSquishy } from '../../motion/useSquishy';
import styles from './Checkbox.module.css';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    /** Label text */
    label?: string;

    /** Size of the checkbox */
    size?: CheckboxSize;

    /** Error state */
    error?: boolean;
}

/**
 * MellowUI Checkbox
 * 
 * A checkbox with a bouncy checkmark animation and squishy press physics.
 * 
 * @example
 * ```tsx
 * <Checkbox label="I agree to the terms" />
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            label,
            size = 'md',
            error = false,
            className,
            id,
            checked: controlledChecked,
            defaultChecked,
            disabled,
            onChange,
            ...props
        },
        ref
    ) => {
        const generatedId = useId();
        const inputId = id || generatedId;

        // Track internal checked state for uncontrolled mode
        const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);

        // Use controlled value if provided, otherwise use internal state
        const isControlled = controlledChecked !== undefined;
        const isChecked = isControlled ? controlledChecked : internalChecked;

        // Squishy animation
        const { scale, handlers } = useSquishy({
            disabled,
            scale: 0.85,
        });

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!isControlled) {
                setInternalChecked(e.target.checked);
            }
            onChange?.(e);
        };

        return (
            <label
                htmlFor={inputId}
                className={clsx(
                    styles.container,
                    styles[`size-${size}`],
                    {
                        [styles.disabled]: disabled,
                        [styles.error]: error,
                    },
                    className
                )}
                {...handlers}
            >
                <motion.div
                    className={styles.checkboxWrapper}
                    style={{ scale }}
                >
                    <input
                        ref={ref}
                        type="checkbox"
                        id={inputId}
                        className={styles.input}
                        checked={isControlled ? controlledChecked : undefined}
                        defaultChecked={!isControlled ? defaultChecked : undefined}
                        disabled={disabled}
                        onChange={handleChange}
                        {...props}
                    />
                    <div className={clsx(styles.checkbox, { [styles.checked]: isChecked })}>
                        <svg viewBox="0 0 24 24" className={styles.checkIcon}>
                            <motion.path
                                d="M4 12.5L9 17.5L20 6.5"
                                fill="none"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                    pathLength: isChecked ? 1 : 0,
                                    opacity: isChecked ? 1 : 0,
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            />
                        </svg>
                    </div>
                </motion.div>
                {label && <span className={styles.label}>{label}</span>}
            </label>
        );
    }
);

Checkbox.displayName = 'Checkbox';

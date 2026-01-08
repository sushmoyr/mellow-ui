/**
 * MellowUI Switch Component
 * 
 * Toggle switch with jelly physics.
 */

import { forwardRef, InputHTMLAttributes, useId, useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './Switch.module.css';

export type SwitchSize = 'sm' | 'md' | 'lg';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    /** Label text */
    label?: string;

    /** Size of the switch */
    size?: SwitchSize;
}

// Thumb positions for each size (in pixels)
// With padding: 2px, track inner width = trackWidth - 4px
// off = 0, on = innerWidth - thumbWidth
const thumbPositions = {
    sm: { off: 0, on: 16 },   // (36 - 4) - 16 = 16
    md: { off: 0, on: 20 },   // (44 - 4) - 20 = 20
    lg: { off: 0, on: 24 },   // (52 - 4) - 24 = 24
};

const spring = {
    type: 'spring' as const,
    stiffness: 500,
    damping: 30,
};

/**
 * MellowUI Switch
 * 
 * A toggle switch with satisfying jelly physics.
 * 
 * @example
 * ```tsx
 * <Switch label="Enable notifications" />
 * ```
 */
export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    (
        {
            label,
            size = 'md',
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

        // Track internal state for animation
        const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);

        const isControlled = controlledChecked !== undefined;
        const isChecked = isControlled ? controlledChecked : internalChecked;

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!isControlled) {
                setInternalChecked(e.target.checked);
            }
            onChange?.(e);
        };

        const positions = thumbPositions[size];

        return (
            <label
                htmlFor={inputId}
                className={clsx(
                    styles.container,
                    styles[`size-${size}`],
                    { [styles.disabled]: disabled },
                    className
                )}
            >
                <div className={styles.switchWrapper}>
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
                    <div className={clsx(styles.track, { [styles.checked]: isChecked })}>
                        <motion.div
                            className={styles.thumb}
                            animate={{ x: isChecked ? positions.on : positions.off }}
                            transition={spring}
                        />
                    </div>
                </div>
                {label && <span className={styles.label}>{label}</span>}
            </label>
        );
    }
);

Switch.displayName = 'Switch';

/**
 * MellowUI Slider Component
 * 
 * Range input with satisfying squishy thumb interaction.
 */

import { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import clsx from 'clsx';
import { springs } from '../../motion/springs';
import styles from './Slider.module.css';

export type SliderSize = 'sm' | 'md' | 'lg';
export type SliderColor = 'primary' | 'secondary' | 'accent';

export interface SliderProps {
    /** Current value (controlled) */
    value?: number;

    /** Default value (uncontrolled) */
    defaultValue?: number;

    /** Called when value changes */
    onValueChange?: (value: number) => void;

    /** Called when user finishes dragging */
    onValueCommit?: (value: number) => void;

    /** Minimum value */
    min?: number;

    /** Maximum value */
    max?: number;

    /** Step increment */
    step?: number;

    /** Size */
    size?: SliderSize;

    /** Color scheme */
    color?: SliderColor;

    /** Show value tooltip while dragging */
    showValue?: boolean;

    /** Disabled state */
    disabled?: boolean;

    /** Custom className */
    className?: string;

    /** Accessible label */
    'aria-label'?: string;
}

/**
 * MellowUI Slider
 * 
 * A range slider with squishy thumb animation and spring physics.
 * 
 * @example
 * ```tsx
 * // Simple slider
 * <Slider defaultValue={50} />
 * 
 * // Controlled with callback
 * <Slider value={volume} onValueChange={setVolume} max={100} />
 * 
 * // With value tooltip
 * <Slider defaultValue={50} showValue />
 * ```
 */
export const Slider = forwardRef<HTMLDivElement, SliderProps>(
    (
        {
            value: valueProp,
            defaultValue = 0,
            onValueChange,
            onValueCommit,
            min = 0,
            max = 100,
            step = 1,
            size = 'md',
            color = 'primary',
            showValue = false,
            disabled = false,
            className,
            'aria-label': ariaLabel,
        },
        ref
    ) => {
        const trackRef = useRef<HTMLDivElement>(null);
        const [internalValue, setInternalValue] = useState(defaultValue);
        const [isDragging, setIsDragging] = useState(false);

        const isControlled = valueProp !== undefined;
        const currentValue = isControlled ? valueProp : internalValue;

        // Calculate percentage
        const percentage = ((currentValue - min) / (max - min)) * 100;

        // Spring-animated thumb scale
        const thumbScale = useSpring(1, springs.bouncy);
        const thumbY = useSpring(0, springs.gentle);

        // Clamp and snap value to step
        const clampValue = useCallback((val: number) => {
            const clamped = Math.min(Math.max(val, min), max);
            const stepped = Math.round(clamped / step) * step;
            return Number(stepped.toFixed(10)); // Avoid floating point issues
        }, [min, max, step]);

        // Get value from mouse position
        const getValueFromPosition = useCallback((clientX: number) => {
            if (!trackRef.current) return currentValue;

            const rect = trackRef.current.getBoundingClientRect();
            const percent = (clientX - rect.left) / rect.width;
            const rawValue = min + percent * (max - min);
            return clampValue(rawValue);
        }, [min, max, clampValue, currentValue]);

        const updateValue = useCallback((newValue: number) => {
            if (!isControlled) {
                setInternalValue(newValue);
            }
            onValueChange?.(newValue);
        }, [isControlled, onValueChange]);

        const handlePointerDown = useCallback((e: React.PointerEvent) => {
            if (disabled) return;

            e.preventDefault();
            (e.target as HTMLElement).setPointerCapture(e.pointerId);

            setIsDragging(true);
            thumbScale.set(0.85);
            thumbY.set(-2);

            const newValue = getValueFromPosition(e.clientX);
            updateValue(newValue);
        }, [disabled, getValueFromPosition, updateValue, thumbScale, thumbY]);

        const handlePointerMove = useCallback((e: React.PointerEvent) => {
            if (!isDragging) return;

            const newValue = getValueFromPosition(e.clientX);
            updateValue(newValue);
        }, [isDragging, getValueFromPosition, updateValue]);

        const handlePointerUp = useCallback((e: React.PointerEvent) => {
            if (!isDragging) return;

            (e.target as HTMLElement).releasePointerCapture(e.pointerId);
            setIsDragging(false);
            thumbScale.set(1);
            thumbY.set(0);

            onValueCommit?.(currentValue);
        }, [isDragging, currentValue, onValueCommit, thumbScale, thumbY]);

        // Keyboard support
        const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
            if (disabled) return;

            let newValue = currentValue;

            switch (e.key) {
                case 'ArrowRight':
                case 'ArrowUp':
                    newValue = clampValue(currentValue + step);
                    break;
                case 'ArrowLeft':
                case 'ArrowDown':
                    newValue = clampValue(currentValue - step);
                    break;
                case 'Home':
                    newValue = min;
                    break;
                case 'End':
                    newValue = max;
                    break;
                default:
                    return;
            }

            e.preventDefault();
            updateValue(newValue);
            onValueCommit?.(newValue);
        }, [disabled, currentValue, step, min, max, clampValue, updateValue, onValueCommit]);

        return (
            <div
                ref={ref}
                className={clsx(
                    styles.slider,
                    styles[`size-${size}`],
                    styles[`color-${color}`],
                    {
                        [styles.disabled]: disabled,
                        [styles.dragging]: isDragging,
                    },
                    className
                )}
            >
                {/* Track */}
                <div
                    ref={trackRef}
                    className={styles.track}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerUp}
                >
                    {/* Fill */}
                    <div
                        className={styles.fill}
                        style={{ width: `${percentage}%` }}
                    />

                    {/* Thumb */}
                    <motion.div
                        className={styles.thumb}
                        style={{
                            left: `${percentage}%`,
                            scale: thumbScale,
                            y: thumbY,
                        }}
                        role="slider"
                        tabIndex={disabled ? -1 : 0}
                        aria-label={ariaLabel}
                        aria-valuemin={min}
                        aria-valuemax={max}
                        aria-valuenow={currentValue}
                        aria-disabled={disabled}
                        onKeyDown={handleKeyDown}
                    >
                        {/* Value tooltip */}
                        {showValue && isDragging && (
                            <motion.div
                                className={styles.tooltip}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 4 }}
                            >
                                {Math.round(currentValue)}
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>
        );
    }
);

Slider.displayName = 'Slider';

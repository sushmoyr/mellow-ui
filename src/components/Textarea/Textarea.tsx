/**
 * MellowUI Textarea Component
 * 
 * Multi-line text input with floating label.
 */

import { forwardRef, useState, useCallback, useId, TextareaHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './Textarea.module.css';

export type TextareaSize = 'sm' | 'md' | 'lg';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    /** Floating label */
    label?: string;

    /** Size */
    size?: TextareaSize;

    /** Error message */
    error?: string;

    /** Helper text */
    helperText?: string;

    /** Auto-resize height based on content */
    autoResize?: boolean;

    /** Minimum rows */
    minRows?: number;

    /** Maximum rows */
    maxRows?: number;

    /** Custom className */
    className?: string;
}

/**
 * MellowUI Textarea
 * 
 * A multi-line text input with optional floating label.
 * 
 * @example
 * ```tsx
 * <Textarea
 *   label="Description"
 *   placeholder="Enter a description..."
 *   minRows={3}
 * />
 * ```
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            label,
            size = 'md',
            error,
            helperText,
            autoResize = false,
            minRows = 3,
            maxRows = 10,
            className,
            disabled,
            value,
            defaultValue,
            onChange,
            onFocus,
            onBlur,
            ...props
        },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState(false);
        const [internalValue, setInternalValue] = useState(defaultValue || '');
        const id = useId();

        const isControlled = value !== undefined;
        const currentValue = isControlled ? value : internalValue;
        const hasValue = String(currentValue).length > 0;
        const isFloating = isFocused || hasValue;

        const handleFocus = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
            setIsFocused(true);
            onFocus?.(e);
        }, [onFocus]);

        const handleBlur = useCallback((e: React.FocusEvent<HTMLTextAreaElement>) => {
            setIsFocused(false);
            onBlur?.(e);
        }, [onBlur]);

        const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (!isControlled) {
                setInternalValue(e.target.value);
            }
            onChange?.(e);

            // Auto-resize
            if (autoResize && e.target) {
                e.target.style.height = 'auto';
                const lineHeight = parseInt(getComputedStyle(e.target).lineHeight) || 20;
                const minHeight = lineHeight * minRows;
                const maxHeight = lineHeight * maxRows;
                const scrollHeight = e.target.scrollHeight;
                e.target.style.height = `${Math.min(Math.max(scrollHeight, minHeight), maxHeight)}px`;
            }
        }, [isControlled, onChange, autoResize, minRows, maxRows]);

        return (
            <div
                className={clsx(
                    styles.container,
                    styles[`size-${size}`],
                    {
                        [styles.focused]: isFocused,
                        [styles.hasError]: !!error,
                        [styles.disabled]: disabled,
                    },
                    className
                )}
            >
                {/* Label */}
                {label && (
                    <motion.label
                        htmlFor={id}
                        className={styles.label}
                        animate={{
                            y: isFloating ? -24 : 0,
                            scale: isFloating ? 0.85 : 1,
                        }}
                        transition={{ duration: 0.15 }}
                    >
                        {label}
                    </motion.label>
                )}

                {/* Textarea */}
                <textarea
                    ref={ref}
                    id={id}
                    className={styles.textarea}
                    value={currentValue}
                    disabled={disabled}
                    rows={minRows}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...props}
                />

                {/* Helper/Error Text */}
                {(error || helperText) && (
                    <span className={clsx(styles.helperText, { [styles.errorText]: error })}>
                        {error || helperText}
                    </span>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

/**
 * MellowUI Input Component
 * 
 * Simple, clean text input with floating label.
 */

import { forwardRef, InputHTMLAttributes, useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    /** Label text */
    label?: string;

    /** Helper text below input */
    helperText?: string;

    /** Error message */
    error?: string;

    /** Size */
    size?: InputSize;

    /** Icon on the left */
    leftIcon?: React.ReactNode;

    /** Icon on the right */
    rightIcon?: React.ReactNode;

    /** Full width */
    fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            helperText,
            error,
            size = 'md',
            leftIcon,
            rightIcon,
            fullWidth = false,
            className,
            id,
            value,
            defaultValue,
            disabled,
            placeholder,
            onFocus,
            onBlur,
            ...props
        },
        ref
    ) => {
        const generatedId = useId();
        const inputId = id || generatedId;

        const [isFocused, setIsFocused] = useState(false);
        const [hasValue, setHasValue] = useState(Boolean(value || defaultValue));

        const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(true);
            onFocus?.(e);
        };

        const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false);
            setHasValue(Boolean(e.target.value));
            onBlur?.(e);
        };

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setHasValue(Boolean(e.target.value));
            props.onChange?.(e);
        };

        const isFloating = label && (isFocused || hasValue || Boolean(placeholder));
        const hasError = Boolean(error);

        return (
            <div
                className={clsx(
                    styles.container,
                    { [styles.fullWidth]: fullWidth },
                    className
                )}
            >
                {/* Label above when floating */}
                {label && (
                    <motion.label
                        htmlFor={inputId}
                        className={clsx(styles.floatingLabel, {
                            [styles.floatingLabelActive]: isFloating,
                            [styles.floatingLabelError]: hasError,
                        })}
                        animate={{
                            y: isFloating ? 0 : 20,
                            opacity: isFloating ? 1 : 0,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    >
                        {label}
                    </motion.label>
                )}

                <div
                    className={clsx(
                        styles.inputWrapper,
                        styles[`size-${size}`],
                        {
                            [styles.focused]: isFocused,
                            [styles.error]: hasError,
                            [styles.disabled]: disabled,
                        }
                    )}
                >
                    {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}

                    <input
                        ref={ref}
                        id={inputId}
                        className={styles.input}
                        value={value}
                        defaultValue={defaultValue}
                        disabled={disabled}
                        placeholder={isFloating ? placeholder : (label || placeholder)}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        {...props}
                    />

                    {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
                </div>

                <AnimatePresence mode="wait">
                    {(error || helperText) && (
                        <motion.p
                            key={error ? 'error' : 'helper'}
                            className={clsx(styles.helperText, {
                                [styles.errorText]: hasError,
                            })}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.15 }}
                        >
                            {error || helperText}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);

Input.displayName = 'Input';

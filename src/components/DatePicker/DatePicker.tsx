/**
 * MellowUI DatePicker Component
 * 
 * Input with calendar popup.
 */

import { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { springs } from '../../motion/springs';
import { Calendar } from '../Calendar';
import styles from './DatePicker.module.css';

export interface DatePickerProps {
    /** Selected date */
    value?: Date | null;

    /** Called when date changes */
    onChange?: (date: Date | null) => void;

    /** Placeholder text */
    placeholder?: string;

    /** Date format */
    format?: 'short' | 'medium' | 'long';

    /** Minimum date */
    minDate?: Date;

    /** Maximum date */
    maxDate?: Date;

    /** Disabled */
    disabled?: boolean;

    /** Size */
    size?: 'sm' | 'md' | 'lg';

    /** Custom className */
    className?: string;

    /** Label */
    label?: string;
}

function formatDate(date: Date | null, format: 'short' | 'medium' | 'long'): string {
    if (!date) return '';

    const options: Intl.DateTimeFormatOptions = format === 'short'
        ? { month: 'numeric', day: 'numeric', year: 'numeric' }
        : format === 'medium'
            ? { month: 'short', day: 'numeric', year: 'numeric' }
            : { month: 'long', day: 'numeric', year: 'numeric' };

    return date.toLocaleDateString(undefined, options);
}

/**
 * MellowUI DatePicker
 * 
 * Date input with popup calendar.
 */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
    (
        {
            value,
            onChange,
            placeholder = 'Select date',
            format = 'medium',
            minDate,
            maxDate,
            disabled = false,
            size = 'md',
            className,
            label,
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(false);
        const containerRef = useRef<HTMLDivElement>(null);

        const handleSelect = useCallback((date: Date) => {
            onChange?.(date);
            setIsOpen(false);
        }, [onChange]);

        // Close on outside click
        useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
                if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            }
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        return (
            <div ref={containerRef} className={clsx(styles.container, className)}>
                {label && <label className={styles.label}>{label}</label>}

                <motion.button
                    ref={ref as React.Ref<HTMLButtonElement>}
                    type="button"
                    className={clsx(
                        styles.trigger,
                        styles[`size-${size}`],
                        { [styles.open]: isOpen, [styles.disabled]: disabled }
                    )}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    whileTap={!disabled ? { scale: 0.98 } : undefined}
                    disabled={disabled}
                >
                    <span className={styles.icon}>📅</span>
                    <span className={clsx(styles.value, { [styles.placeholder]: !value })}>
                        {value ? formatDate(value, format) : placeholder}
                    </span>
                    <motion.span
                        className={styles.chevron}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        ▾
                    </motion.span>
                </motion.button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className={styles.popup}
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={springs.gentle}
                        >
                            <Calendar
                                value={value}
                                onSelect={handleSelect}
                                minDate={minDate}
                                maxDate={maxDate}
                                defaultMonth={value || undefined}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);

DatePicker.displayName = 'DatePicker';

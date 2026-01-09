/**
 * MellowUI DateRangePicker Component
 * 
 * Two-date selection with range highlighting.
 */

import { forwardRef, useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { springs } from '../../motion/springs';
import { Calendar } from '../Calendar';
import styles from './DateRangePicker.module.css';

export interface DateRange {
    start: Date | null;
    end: Date | null;
}

export interface DateRangePickerProps {
    /** Selected range */
    value?: DateRange;

    /** Called when range changes */
    onChange?: (range: DateRange) => void;

    /** Placeholder text */
    placeholder?: string;

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

function formatDate(date: Date | null): string {
    if (!date) return '';
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function formatRange(range: DateRange): string {
    if (!range.start && !range.end) return '';
    if (range.start && !range.end) return `${formatDate(range.start)} → ...`;
    if (!range.start && range.end) return `... → ${formatDate(range.end)}`;
    return `${formatDate(range.start)} → ${formatDate(range.end)}`;
}

/**
 * MellowUI DateRangePicker
 * 
 * Select a date range with visual highlighting.
 */
export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
    (
        {
            value = { start: null, end: null },
            onChange,
            placeholder = 'Select date range',
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
        const [selecting, setSelecting] = useState<'start' | 'end'>('start');
        const [tempRange, setTempRange] = useState<DateRange>(value);
        const containerRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            setTempRange(value);
        }, [value]);

        const handleSelect = useCallback((date: Date) => {
            if (selecting === 'start') {
                setTempRange({ start: date, end: null });
                setSelecting('end');
            } else {
                // Ensure start is before end
                const newRange = tempRange.start && date < tempRange.start
                    ? { start: date, end: tempRange.start }
                    : { start: tempRange.start, end: date };

                setTempRange(newRange);
                onChange?.(newRange);
                setIsOpen(false);
                setSelecting('start');
            }
        }, [selecting, tempRange, onChange]);

        // Close on outside click
        useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
                if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                    setSelecting('start');
                }
            }
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        const displayValue = useMemo(() => {
            if (isOpen && tempRange.start) {
                return formatRange(tempRange);
            }
            return formatRange(value);
        }, [isOpen, tempRange, value]);

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
                    <span className={clsx(styles.value, { [styles.placeholder]: !displayValue })}>
                        {displayValue || placeholder}
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
                            <div className={styles.hint}>
                                {selecting === 'start' ? '📍 Select start date' : '🏁 Select end date'}
                            </div>
                            <Calendar
                                value={selecting === 'start' ? tempRange.start : tempRange.end}
                                onSelect={handleSelect}
                                rangeStart={tempRange.start}
                                rangeEnd={tempRange.end}
                                minDate={minDate}
                                maxDate={maxDate}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);

DateRangePicker.displayName = 'DateRangePicker';

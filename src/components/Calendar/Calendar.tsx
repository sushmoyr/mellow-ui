/**
 * MellowUI Calendar Component
 * 
 * Month calendar with day selection and smooth animations.
 */

import { forwardRef, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { springs } from '../../motion/springs';
import styles from './Calendar.module.css';

// ========== Utils ==========

function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date | null, b: Date | null): boolean {
    if (!a || !b) return false;
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();
}

function isToday(date: Date): boolean {
    return isSameDay(date, new Date());
}

function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
    if (!start || !end) return false;
    const time = date.getTime();
    return time > start.getTime() && time < end.getTime();
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// ========== Types ==========

export interface CalendarProps {
    /** Selected date */
    value?: Date | null;

    /** Called when date is selected */
    onSelect?: (date: Date) => void;

    /** Range mode - start date */
    rangeStart?: Date | null;

    /** Range mode - end date */
    rangeEnd?: Date | null;

    /** Minimum selectable date */
    minDate?: Date;

    /** Maximum selectable date */
    maxDate?: Date;

    /** Disabled dates */
    disabledDates?: Date[];

    /** Custom className */
    className?: string;

    /** Default display month */
    defaultMonth?: Date;
}

/**
 * MellowUI Calendar
 * 
 * Beautiful month calendar with smooth animations.
 */
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
    (
        {
            value,
            onSelect,
            rangeStart,
            rangeEnd,
            minDate,
            maxDate,
            disabledDates = [],
            className,
            defaultMonth,
        },
        ref
    ) => {
        const [currentMonth, setCurrentMonth] = useState(() => {
            const base = defaultMonth || value || new Date();
            return { year: base.getFullYear(), month: base.getMonth() };
        });
        const [direction, setDirection] = useState(0);

        const { year, month } = currentMonth;

        const goToPrevMonth = useCallback(() => {
            setDirection(-1);
            setCurrentMonth(prev => {
                if (prev.month === 0) {
                    return { year: prev.year - 1, month: 11 };
                }
                return { ...prev, month: prev.month - 1 };
            });
        }, []);

        const goToNextMonth = useCallback(() => {
            setDirection(1);
            setCurrentMonth(prev => {
                if (prev.month === 11) {
                    return { year: prev.year + 1, month: 0 };
                }
                return { ...prev, month: prev.month + 1 };
            });
        }, []);

        const days = useMemo(() => {
            const daysInMonth = getDaysInMonth(year, month);
            const firstDay = getFirstDayOfMonth(year, month);
            const result: (Date | null)[] = [];

            // Empty slots for days before the first
            for (let i = 0; i < firstDay; i++) {
                result.push(null);
            }

            // Actual days
            for (let day = 1; day <= daysInMonth; day++) {
                result.push(new Date(year, month, day));
            }

            return result;
        }, [year, month]);

        const isDisabled = useCallback((date: Date) => {
            if (minDate && date < minDate) return true;
            if (maxDate && date > maxDate) return true;
            return disabledDates.some(d => isSameDay(d, date));
        }, [minDate, maxDate, disabledDates]);

        const handleDayClick = useCallback((date: Date) => {
            if (!isDisabled(date)) {
                onSelect?.(date);
            }
        }, [onSelect, isDisabled]);

        const slideVariants = {
            enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0 }),
        };

        return (
            <div ref={ref} className={clsx(styles.calendar, className)}>
                {/* Header */}
                <div className={styles.header}>
                    <motion.button
                        className={styles.navButton}
                        onClick={goToPrevMonth}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Previous month"
                    >
                        ‹
                    </motion.button>

                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.span
                            key={`${year}-${month}`}
                            className={styles.monthLabel}
                            custom={direction}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={slideVariants}
                            transition={{ duration: 0.2 }}
                        >
                            {MONTHS[month]} {year}
                        </motion.span>
                    </AnimatePresence>

                    <motion.button
                        className={styles.navButton}
                        onClick={goToNextMonth}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Next month"
                    >
                        ›
                    </motion.button>
                </div>

                {/* Weekday Labels */}
                <div className={styles.weekdays}>
                    {WEEKDAYS.map(day => (
                        <span key={day} className={styles.weekday}>{day}</span>
                    ))}
                </div>

                {/* Days Grid */}
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={`${year}-${month}`}
                        className={styles.daysGrid}
                        custom={direction}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        variants={slideVariants}
                        transition={{ duration: 0.2 }}
                    >
                        {days.map((date, index) => {
                            if (!date) {
                                return <div key={`empty-${index}`} className={styles.emptyDay} />;
                            }

                            const selected = isSameDay(date, value);
                            const today = isToday(date);
                            const disabled = isDisabled(date);
                            const inRange = isInRange(date, rangeStart, rangeEnd);
                            const isRangeStart = isSameDay(date, rangeStart);
                            const isRangeEnd = isSameDay(date, rangeEnd);

                            return (
                                <motion.button
                                    key={date.getTime()}
                                    className={clsx(styles.day, {
                                        [styles.selected]: selected || isRangeStart || isRangeEnd,
                                        [styles.today]: today,
                                        [styles.disabled]: disabled,
                                        [styles.inRange]: inRange,
                                        [styles.rangeStart]: isRangeStart,
                                        [styles.rangeEnd]: isRangeEnd,
                                    })}
                                    onClick={() => handleDayClick(date)}
                                    disabled={disabled}
                                    whileHover={!disabled ? { scale: 1.15 } : undefined}
                                    whileTap={!disabled ? { scale: 0.9 } : undefined}
                                    transition={springs.bouncy}
                                >
                                    {date.getDate()}
                                </motion.button>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        );
    }
);

Calendar.displayName = 'Calendar';

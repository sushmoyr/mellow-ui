/**
 * MellowUI TimePicker Component
 * 
 * Hour/minute selection with spinning wheel animation.
 */

import { forwardRef, useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import clsx from 'clsx';
import { springs } from '../../motion/springs';
import styles from './TimePicker.module.css';

export interface TimeValue {
    hours: number;
    minutes: number;
    period?: 'AM' | 'PM';
}

export interface TimePickerProps {
    /** Selected time */
    value?: TimeValue | null;

    /** Called when time changes */
    onChange?: (time: TimeValue) => void;

    /** Placeholder text */
    placeholder?: string;

    /** Use 12-hour format with AM/PM */
    use12Hour?: boolean;

    /** Minute step (5, 10, 15, 30) */
    minuteStep?: number;

    /** Disabled */
    disabled?: boolean;

    /** Size */
    size?: 'sm' | 'md' | 'lg';

    /** Custom className */
    className?: string;

    /** Label */
    label?: string;
}

function formatTime(time: TimeValue | null, use12Hour: boolean): string {
    if (!time) return '';

    if (use12Hour) {
        const hour = time.hours % 12 || 12;
        const min = time.minutes.toString().padStart(2, '0');
        return `${hour}:${min} ${time.period || (time.hours < 12 ? 'AM' : 'PM')}`;
    }

    const hour = time.hours.toString().padStart(2, '0');
    const min = time.minutes.toString().padStart(2, '0');
    return `${hour}:${min}`;
}

function generateHours(use12Hour: boolean): number[] {
    if (use12Hour) {
        return Array.from({ length: 12 }, (_, i) => i === 0 ? 12 : i);
    }
    return Array.from({ length: 24 }, (_, i) => i);
}

function generateMinutes(step: number): number[] {
    return Array.from({ length: 60 / step }, (_, i) => i * step);
}

// ========== Wheel Component ==========

interface WheelProps {
    items: (string | number)[];
    value: string | number;
    onChange: (value: string | number) => void;
    itemHeight?: number;
}

function Wheel({ items, value, onChange, itemHeight = 40 }: WheelProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const currentIndex = items.indexOf(value);
    const y = useMotionValue(-currentIndex * itemHeight);

    const handleWheel = useCallback((e: React.WheelEvent) => {
        e.preventDefault();
        const direction = e.deltaY > 0 ? 1 : -1;
        const newIndex = Math.max(0, Math.min(items.length - 1, currentIndex + direction));
        onChange(items[newIndex]);
    }, [currentIndex, items, onChange]);

    useEffect(() => {
        const targetY = -currentIndex * itemHeight;
        animate(y, targetY, { type: 'spring', stiffness: 400, damping: 30 });
    }, [currentIndex, itemHeight, y]);

    return (
        <div className={styles.wheelContainer} onWheel={handleWheel}>
            <div className={styles.wheelHighlight} style={{ height: itemHeight }} />
            <motion.div
                ref={containerRef}
                className={styles.wheel}
                style={{ y }}
                drag="y"
                dragConstraints={{
                    top: -(items.length - 1) * itemHeight,
                    bottom: 0,
                }}
                dragElastic={0.1}
                onDragEnd={(_, info) => {
                    const offsetIndex = Math.round(-info.offset.y / itemHeight);
                    const newIndex = Math.max(0, Math.min(items.length - 1, currentIndex + offsetIndex));
                    onChange(items[newIndex]);
                }}
            >
                {items.map((item, index) => {
                    const distance = Math.abs(index - currentIndex);
                    const opacity = Math.max(0.3, 1 - distance * 0.3);
                    const scale = Math.max(0.8, 1 - distance * 0.1);

                    return (
                        <motion.div
                            key={item}
                            className={clsx(styles.wheelItem, { [styles.selected]: index === currentIndex })}
                            style={{ height: itemHeight, opacity, scale }}
                            onClick={() => onChange(item)}
                        >
                            {typeof item === 'number' ? item.toString().padStart(2, '0') : item}
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}

/**
 * MellowUI TimePicker
 * 
 * Time selection with spinning wheels.
 */
export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
    (
        {
            value,
            onChange,
            placeholder = 'Select time',
            use12Hour = true,
            minuteStep = 5,
            disabled = false,
            size = 'md',
            className,
            label,
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(false);
        const [tempValue, setTempValue] = useState<TimeValue>(() => {
            if (value) return value;
            const now = new Date();
            return {
                hours: use12Hour ? (now.getHours() % 12 || 12) : now.getHours(),
                minutes: Math.floor(now.getMinutes() / minuteStep) * minuteStep,
                period: now.getHours() < 12 ? 'AM' : 'PM',
            };
        });
        const containerRef = useRef<HTMLDivElement>(null);

        const hours = generateHours(use12Hour);
        const minutes = generateMinutes(minuteStep);

        const handleConfirm = useCallback(() => {
            onChange?.(tempValue);
            setIsOpen(false);
        }, [tempValue, onChange]);

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
                    <span className={styles.icon}>🕐</span>
                    <span className={clsx(styles.value, { [styles.placeholder]: !value })}>
                        {value ? formatTime(value, use12Hour) : placeholder}
                    </span>
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
                            <div className={styles.wheels}>
                                <Wheel
                                    items={hours}
                                    value={tempValue.hours}
                                    onChange={(h) => setTempValue(prev => ({ ...prev, hours: h as number }))}
                                />
                                <span className={styles.separator}>:</span>
                                <Wheel
                                    items={minutes}
                                    value={tempValue.minutes}
                                    onChange={(m) => setTempValue(prev => ({ ...prev, minutes: m as number }))}
                                />
                                {use12Hour && (
                                    <Wheel
                                        items={['AM', 'PM']}
                                        value={tempValue.period || 'AM'}
                                        onChange={(p) => setTempValue(prev => ({ ...prev, period: p as 'AM' | 'PM' }))}
                                    />
                                )}
                            </div>
                            <button className={styles.confirmBtn} onClick={handleConfirm}>
                                Confirm
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);

TimePicker.displayName = 'TimePicker';

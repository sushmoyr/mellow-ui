/**
 * MellowUI Select Component
 * 
 * A dropdown selection with smooth animations.
 */

import { forwardRef, useState, useCallback, useRef, useEffect, ReactNode, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { springs } from '../../motion/springs';
import styles from './Select.module.css';

export type SelectSize = 'sm' | 'md' | 'lg';

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectProps {
    /** Options to display */
    options: SelectOption[];

    /** Controlled value */
    value?: string;

    /** Default value (uncontrolled) */
    defaultValue?: string;

    /** Called when selection changes */
    onValueChange?: (value: string) => void;

    /** Placeholder text */
    placeholder?: string;

    /** Size */
    size?: SelectSize;

    /** Disabled */
    disabled?: boolean;

    /** Custom className */
    className?: string;

    /** Accessible label */
    'aria-label'?: string;
}

/**
 * MellowUI Select
 * 
 * A dropdown selection component with smooth animations.
 * 
 * @example
 * ```tsx
 * <Select
 *   options={[
 *     { value: 'apple', label: 'Apple' },
 *     { value: 'banana', label: 'Banana' },
 *   ]}
 *   placeholder="Select a fruit"
 *   onValueChange={setValue}
 * />
 * ```
 */
export const Select = forwardRef<HTMLDivElement, SelectProps>(
    (
        {
            options,
            value: valueProp,
            defaultValue = '',
            onValueChange,
            placeholder = 'Select...',
            size = 'md',
            disabled = false,
            className,
            'aria-label': ariaLabel,
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(false);
        const [internalValue, setInternalValue] = useState(defaultValue);
        const containerRef = useRef<HTMLDivElement>(null);
        const id = useId();

        const isControlled = valueProp !== undefined;
        const currentValue = isControlled ? valueProp : internalValue;

        const selectedOption = options.find(opt => opt.value === currentValue);

        const handleSelect = useCallback((optionValue: string) => {
            if (!isControlled) {
                setInternalValue(optionValue);
            }
            onValueChange?.(optionValue);
            setIsOpen(false);
        }, [isControlled, onValueChange]);

        const handleToggle = useCallback(() => {
            if (!disabled) {
                setIsOpen(!isOpen);
            }
        }, [disabled, isOpen]);

        // Close on outside click
        useEffect(() => {
            const handleClickOutside = (e: MouseEvent) => {
                if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                    setIsOpen(false);
                }
            };

            if (isOpen) {
                document.addEventListener('mousedown', handleClickOutside);
            }

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [isOpen]);

        // Keyboard navigation
        const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
            if (disabled) return;

            switch (e.key) {
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    setIsOpen(!isOpen);
                    break;
                case 'Escape':
                    setIsOpen(false);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (!isOpen) {
                        setIsOpen(true);
                    } else {
                        const currentIndex = options.findIndex(opt => opt.value === currentValue);
                        const nextIndex = Math.min(currentIndex + 1, options.length - 1);
                        handleSelect(options[nextIndex].value);
                    }
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (isOpen) {
                        const currentIndex = options.findIndex(opt => opt.value === currentValue);
                        const prevIndex = Math.max(currentIndex - 1, 0);
                        handleSelect(options[prevIndex].value);
                    }
                    break;
            }
        }, [disabled, isOpen, currentValue, options, handleSelect]);

        return (
            <div
                ref={containerRef}
                className={clsx(
                    styles.select,
                    styles[`size-${size}`],
                    {
                        [styles.open]: isOpen,
                        [styles.disabled]: disabled,
                    },
                    className
                )}
            >
                {/* Trigger */}
                <div
                    ref={ref as React.Ref<HTMLDivElement>}
                    className={styles.trigger}
                    role="combobox"
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    aria-label={ariaLabel}
                    aria-controls={`${id}-listbox`}
                    tabIndex={disabled ? -1 : 0}
                    onClick={handleToggle}
                    onKeyDown={handleKeyDown}
                >
                    <span className={clsx(styles.value, { [styles.placeholder]: !selectedOption })}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <motion.span
                        className={styles.chevron}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ChevronIcon />
                    </motion.span>
                </div>

                {/* Dropdown */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className={styles.dropdown}
                            id={`${id}-listbox`}
                            role="listbox"
                            initial={{ opacity: 0, y: -8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.96 }}
                            transition={springs.gentle}
                        >
                            {options.map((option) => (
                                <div
                                    key={option.value}
                                    className={clsx(styles.option, {
                                        [styles.selected]: option.value === currentValue,
                                        [styles.optionDisabled]: option.disabled,
                                    })}
                                    role="option"
                                    aria-selected={option.value === currentValue}
                                    aria-disabled={option.disabled}
                                    onClick={() => !option.disabled && handleSelect(option.value)}
                                >
                                    {option.label}
                                    {option.value === currentValue && (
                                        <motion.span
                                            className={styles.check}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={springs.bouncy}
                                        >
                                            <CheckIcon />
                                        </motion.span>
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }
);

Select.displayName = 'Select';

// ========== Icons ==========

function ChevronIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 4.5L6 7.5L9 4.5" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 7L6 10L11 4" />
        </svg>
    );
}

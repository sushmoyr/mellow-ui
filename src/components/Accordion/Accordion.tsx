/**
 * MellowUI Accordion Component
 * 
 * Multiple collapsible sections with single/multiple mode.
 */

import { forwardRef, useState, useCallback, ReactNode, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { springs } from '../../motion/springs';
import styles from './Accordion.module.css';

// ========== Context ==========

interface AccordionContextValue {
    value: string[];
    type: 'single' | 'multiple';
    toggle: (itemValue: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error('Accordion components must be used within Accordion');
    }
    return context;
}

// ========== Types ==========

export type AccordionType = 'single' | 'multiple';

export interface AccordionProps {
    /** Single or multiple items open */
    type?: AccordionType;

    /** Controlled value(s) */
    value?: string | string[];

    /** Default value(s) */
    defaultValue?: string | string[];

    /** Called when value changes */
    onValueChange?: (value: string | string[]) => void;

    /** Children */
    children: ReactNode;

    /** Custom className */
    className?: string;
}

export interface AccordionItemProps {
    value: string;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
}

export interface AccordionTriggerProps {
    children: ReactNode;
    className?: string;
}

export interface AccordionContentProps {
    children: ReactNode;
    className?: string;
}

// ========== Item Context ==========

interface AccordionItemContextValue {
    value: string;
    isOpen: boolean;
    disabled: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordionItemContext() {
    const context = useContext(AccordionItemContext);
    if (!context) {
        throw new Error('AccordionItem components must be used within AccordionItem');
    }
    return context;
}

// ========== Components ==========

function normalizeValue(val: string | string[] | undefined): string[] {
    if (!val) return [];
    return Array.isArray(val) ? val : [val];
}

export function Accordion({
    type = 'single',
    value: valueProp,
    defaultValue,
    onValueChange,
    children,
    className,
}: AccordionProps) {
    const [internalValue, setInternalValue] = useState<string[]>(normalizeValue(defaultValue));

    const isControlled = valueProp !== undefined;
    const currentValue = isControlled ? normalizeValue(valueProp) : internalValue;

    const toggle = useCallback((itemValue: string) => {
        let newValue: string[];

        if (type === 'single') {
            newValue = currentValue.includes(itemValue) ? [] : [itemValue];
        } else {
            newValue = currentValue.includes(itemValue)
                ? currentValue.filter(v => v !== itemValue)
                : [...currentValue, itemValue];
        }

        if (!isControlled) {
            setInternalValue(newValue);
        }

        onValueChange?.(type === 'single' ? (newValue[0] || '') : newValue);
    }, [type, currentValue, isControlled, onValueChange]);

    return (
        <AccordionContext.Provider value={{ value: currentValue, type, toggle }}>
            <div className={clsx(styles.accordion, className)}>
                {children}
            </div>
        </AccordionContext.Provider>
    );
}

export function AccordionItem({ value, children, className, disabled = false }: AccordionItemProps) {
    const { value: openValues } = useAccordionContext();
    const isOpen = openValues.includes(value);

    return (
        <AccordionItemContext.Provider value={{ value, isOpen, disabled }}>
            <div
                className={clsx(styles.item, { [styles.disabled]: disabled }, className)}
                data-state={isOpen ? 'open' : 'closed'}
            >
                {children}
            </div>
        </AccordionItemContext.Provider>
    );
}

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
    ({ children, className }, ref) => {
        const { toggle } = useAccordionContext();
        const { value, isOpen, disabled } = useAccordionItemContext();

        return (
            <motion.button
                ref={ref}
                type="button"
                className={clsx(styles.trigger, className)}
                onClick={() => !disabled && toggle(value)}
                disabled={disabled}
                aria-expanded={isOpen}
                whileTap={!disabled ? { scale: 0.98 } : undefined}
            >
                <span className={styles.triggerText}>{children}</span>
                <motion.div
                    className={styles.chevronWrapper}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={springs.bouncy}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={styles.chevronIcon}>
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.div>
            </motion.button>
        );
    }
);

export function AccordionContent({ children, className }: AccordionContentProps) {
    const { isOpen } = useAccordionItemContext();

    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    className={clsx(styles.content, className)}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                        height: 'auto',
                        opacity: 1,
                        transition: {
                            height: { type: 'spring', stiffness: 400, damping: 35 },
                            opacity: { duration: 0.25, delay: 0.05 }
                        }
                    }}
                    exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                            height: { type: 'spring', stiffness: 400, damping: 35 },
                            opacity: { duration: 0.15 }
                        }
                    }}
                >
                    <div className={styles.contentInner}>
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

Accordion.displayName = 'Accordion';
AccordionItem.displayName = 'AccordionItem';
AccordionTrigger.displayName = 'AccordionTrigger';
AccordionContent.displayName = 'AccordionContent';

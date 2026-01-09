/**
 * MellowUI Tabs Component
 * 
 * Tabbed navigation with animated indicator.
 */

import { createContext, useContext, useState, useCallback, ReactNode, useRef, useEffect, useId } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { springs } from '../../motion/springs';
import styles from './Tabs.module.css';

// ========== Context ==========

interface TabsContextValue {
    value: string;
    onChange: (value: string) => void;
    variant: 'line' | 'pills' | 'enclosed';
    size: 'sm' | 'md' | 'lg';
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('Tab components must be used within Tabs');
    }
    return context;
}

// ========== Types ==========

export type TabsVariant = 'line' | 'pills' | 'enclosed';
export type TabsSize = 'sm' | 'md' | 'lg';

export interface TabsProps {
    /** Controlled value */
    value?: string;

    /** Default value */
    defaultValue?: string;

    /** Called when tab changes */
    onValueChange?: (value: string) => void;

    /** Visual variant */
    variant?: TabsVariant;

    /** Size */
    size?: TabsSize;

    /** Children (TabList and TabPanels) */
    children: ReactNode;

    /** Custom className */
    className?: string;
}

export interface TabListProps {
    children: ReactNode;
    className?: string;
}

export interface TabProps {
    value: string;
    disabled?: boolean;
    children: ReactNode;
    className?: string;
}

export interface TabPanelProps {
    value: string;
    children: ReactNode;
    className?: string;
}

// ========== Components ==========

export function Tabs({
    value: valueProp,
    defaultValue = '',
    onValueChange,
    variant = 'line',
    size = 'md',
    children,
    className,
}: TabsProps) {
    const [internalValue, setInternalValue] = useState(defaultValue);

    const isControlled = valueProp !== undefined;
    const currentValue = isControlled ? valueProp : internalValue;

    const handleChange = useCallback((newValue: string) => {
        if (!isControlled) {
            setInternalValue(newValue);
        }
        onValueChange?.(newValue);
    }, [isControlled, onValueChange]);

    return (
        <TabsContext.Provider value={{ value: currentValue, onChange: handleChange, variant, size }}>
            <div className={clsx(styles.tabs, styles[`variant-${variant}`], styles[`size-${size}`], className)}>
                {children}
            </div>
        </TabsContext.Provider>
    );
}

export function TabList({ children, className }: TabListProps) {
    const { variant } = useTabsContext();
    const listRef = useRef<HTMLDivElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

    return (
        <div ref={listRef} className={clsx(styles.tabList, className)} role="tablist">
            {children}
            {variant === 'line' && (
                <motion.div
                    className={styles.indicator}
                    layoutId="tab-indicator"
                    transition={springs.bouncy}
                />
            )}
        </div>
    );
}

export function Tab({ value, disabled = false, children, className }: TabProps) {
    const { value: selectedValue, onChange, variant, size } = useTabsContext();
    const isSelected = selectedValue === value;
    const id = useId();

    return (
        <button
            role="tab"
            id={`tab-${id}`}
            aria-selected={isSelected}
            aria-controls={`panel-${id}`}
            tabIndex={isSelected ? 0 : -1}
            disabled={disabled}
            className={clsx(
                styles.tab,
                {
                    [styles.selected]: isSelected,
                    [styles.disabled]: disabled,
                },
                className
            )}
            onClick={() => !disabled && onChange(value)}
        >
            {children}
            {variant === 'line' && isSelected && (
                <motion.div
                    className={styles.indicator}
                    layoutId="tab-indicator"
                    transition={springs.bouncy}
                />
            )}
        </button>
    );
}

export function TabPanel({ value, children, className }: TabPanelProps) {
    const { value: selectedValue } = useTabsContext();
    const isSelected = selectedValue === value;
    const id = useId();

    if (!isSelected) return null;

    return (
        <motion.div
            role="tabpanel"
            id={`panel-${id}`}
            aria-labelledby={`tab-${id}`}
            className={clsx(styles.tabPanel, className)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
        >
            {children}
        </motion.div>
    );
}

Tabs.displayName = 'Tabs';
TabList.displayName = 'TabList';
Tab.displayName = 'Tab';
TabPanel.displayName = 'TabPanel';

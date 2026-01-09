/**
 * MellowUI ToggleGroup Component
 * 
 * Groups Toggle items with single or multiple selection.
 */

import { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useSquishy } from '../../motion/useSquishy';
import styles from './ToggleGroup.module.css';

// ========== Context ==========

type ToggleGroupType = 'single' | 'multiple';

interface ToggleGroupContextValue {
    type: ToggleGroupType;
    value: string[];
    onItemClick: (itemValue: string) => void;
    size: 'sm' | 'md' | 'lg';
    variant: 'default' | 'outline';
    disabled: boolean;
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

function useToggleGroupContext() {
    const context = useContext(ToggleGroupContext);
    if (!context) {
        throw new Error('ToggleGroupItem must be used within a ToggleGroup');
    }
    return context;
}

// ========== ToggleGroup ==========

export interface ToggleGroupProps {
    /** Selection type: 'single' or 'multiple' */
    type?: ToggleGroupType;

    /** Controlled value (string for single, string[] for multiple) */
    value?: string | string[];

    /** Default value */
    defaultValue?: string | string[];

    /** Called when selection changes */
    onValueChange?: (value: string | string[]) => void;

    /** Size for all items */
    size?: 'sm' | 'md' | 'lg';

    /** Visual variant */
    variant?: 'default' | 'outline';

    /** Disable all items */
    disabled?: boolean;

    /** ToggleGroupItem children */
    children: ReactNode;

    /** Custom className */
    className?: string;
}

/**
 * MellowUI ToggleGroup
 * 
 * Groups toggle items with single or multiple selection.
 * 
 * @example
 * ```tsx
 * // Single selection (like radio)
 * <ToggleGroup type="single" defaultValue="center">
 *   <ToggleGroupItem value="left">Left</ToggleGroupItem>
 *   <ToggleGroupItem value="center">Center</ToggleGroupItem>
 *   <ToggleGroupItem value="right">Right</ToggleGroupItem>
 * </ToggleGroup>
 * 
 * // Multiple selection
 * <ToggleGroup type="multiple" defaultValue={["bold"]}>
 *   <ToggleGroupItem value="bold">B</ToggleGroupItem>
 *   <ToggleGroupItem value="italic">I</ToggleGroupItem>
 * </ToggleGroup>
 * ```
 */
export function ToggleGroup({
    type = 'single',
    value: valueProp,
    defaultValue,
    onValueChange,
    size = 'md',
    variant = 'default',
    disabled = false,
    children,
    className,
}: ToggleGroupProps) {
    // Normalize to array internally
    const normalizeValue = (val?: string | string[]): string[] => {
        if (!val) return [];
        return Array.isArray(val) ? val : [val];
    };

    const [internalValue, setInternalValue] = useState<string[]>(() =>
        normalizeValue(defaultValue)
    );

    const isControlled = valueProp !== undefined;
    const currentValue = isControlled ? normalizeValue(valueProp) : internalValue;

    const handleItemClick = useCallback((itemValue: string) => {
        if (disabled) return;

        let newValue: string[];

        if (type === 'single') {
            // Single: toggle off if already selected, otherwise select
            newValue = currentValue.includes(itemValue) ? [] : [itemValue];
        } else {
            // Multiple: toggle the item
            newValue = currentValue.includes(itemValue)
                ? currentValue.filter(v => v !== itemValue)
                : [...currentValue, itemValue];
        }

        if (!isControlled) {
            setInternalValue(newValue);
        }

        // Return in expected format
        if (type === 'single') {
            onValueChange?.(newValue[0] ?? '');
        } else {
            onValueChange?.(newValue);
        }
    }, [type, currentValue, isControlled, disabled, onValueChange]);

    const contextValue: ToggleGroupContextValue = {
        type,
        value: currentValue,
        onItemClick: handleItemClick,
        size,
        variant,
        disabled,
    };

    return (
        <ToggleGroupContext.Provider value={contextValue}>
            <div
                className={clsx(styles.toggleGroup, className)}
                role="group"
            >
                {children}
            </div>
        </ToggleGroupContext.Provider>
    );
}

// ========== ToggleGroupItem ==========

export interface ToggleGroupItemProps {
    /** Unique value for this item */
    value: string;

    /** Disable this specific item */
    disabled?: boolean;

    /** Content */
    children: ReactNode;

    /** Custom className */
    className?: string;

    /** Accessible label */
    'aria-label'?: string;
}

/**
 * Individual item within a ToggleGroup
 */
export function ToggleGroupItem({
    value,
    disabled: disabledProp = false,
    children,
    className,
    'aria-label': ariaLabel,
}: ToggleGroupItemProps) {
    const { value: groupValue, onItemClick, size, variant, disabled: groupDisabled } = useToggleGroupContext();

    const isPressed = groupValue.includes(value);
    const isDisabled = disabledProp || groupDisabled;

    const { scale, handlers } = useSquishy({
        disabled: isDisabled,
        scale: 0.94,
    });

    const handleClick = () => {
        if (!isDisabled) {
            onItemClick(value);
        }
    };

    return (
        <motion.button
            type="button"
            className={clsx(
                styles.item,
                styles[`size-${size}`],
                styles[`variant-${variant}`],
                {
                    [styles.pressed]: isPressed,
                    [styles.disabled]: isDisabled,
                },
                className
            )}
            style={{ scale }}
            disabled={isDisabled}
            aria-pressed={isPressed}
            aria-label={ariaLabel}
            onClick={handleClick}
            {...handlers}
        >
            <span className={styles.content}>{children}</span>
        </motion.button>
    );
}

ToggleGroup.displayName = 'ToggleGroup';
ToggleGroupItem.displayName = 'ToggleGroupItem';

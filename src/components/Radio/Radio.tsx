/**
 * MellowUI Radio Component
 * 
 * A radio button with bouncy selection animation.
 */

import { createContext, useContext, forwardRef, ReactNode, useState, useCallback, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { springs } from '../../motion/springs';
import styles from './Radio.module.css';

// ========== RadioGroup Context ==========

interface RadioGroupContextValue {
    name: string;
    value: string;
    onChange: (value: string) => void;
    size: 'sm' | 'md' | 'lg';
    color: 'primary' | 'secondary' | 'accent';
    disabled: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroup() {
    return useContext(RadioGroupContext);
}

// ========== RadioGroup ==========

export type RadioGroupSize = 'sm' | 'md' | 'lg';
export type RadioGroupColor = 'primary' | 'secondary' | 'accent';

export interface RadioGroupProps {
    /** Group name for form submission */
    name?: string;

    /** Controlled value */
    value?: string;

    /** Default value (uncontrolled) */
    defaultValue?: string;

    /** Called when selection changes */
    onValueChange?: (value: string) => void;

    /** Size */
    size?: RadioGroupSize;

    /** Color scheme */
    color?: RadioGroupColor;

    /** Disabled */
    disabled?: boolean;

    /** Direction */
    orientation?: 'horizontal' | 'vertical';

    /** Radio children */
    children: ReactNode;

    /** Custom className */
    className?: string;
}

/**
 * MellowUI RadioGroup
 * 
 * Groups Radio components for single selection.
 * 
 * @example
 * ```tsx
 * <RadioGroup defaultValue="option1" onValueChange={setValue}>
 *   <Radio value="option1">Option 1</Radio>
 *   <Radio value="option2">Option 2</Radio>
 *   <Radio value="option3">Option 3</Radio>
 * </RadioGroup>
 * ```
 */
export function RadioGroup({
    name: nameProp,
    value: valueProp,
    defaultValue = '',
    onValueChange,
    size = 'md',
    color = 'primary',
    disabled = false,
    orientation = 'vertical',
    children,
    className,
}: RadioGroupProps) {
    const generatedName = useId();
    const name = nameProp || generatedName;

    const [internalValue, setInternalValue] = useState(defaultValue);

    const isControlled = valueProp !== undefined;
    const currentValue = isControlled ? valueProp : internalValue;

    const handleChange = useCallback((newValue: string) => {
        if (!isControlled) {
            setInternalValue(newValue);
        }
        onValueChange?.(newValue);
    }, [isControlled, onValueChange]);

    const contextValue: RadioGroupContextValue = {
        name,
        value: currentValue,
        onChange: handleChange,
        size,
        color,
        disabled,
    };

    return (
        <RadioGroupContext.Provider value={contextValue}>
            <div
                className={clsx(
                    styles.radioGroup,
                    styles[orientation],
                    className
                )}
                role="radiogroup"
            >
                {children}
            </div>
        </RadioGroupContext.Provider>
    );
}

// ========== Radio ==========

export interface RadioProps {
    /** Value for this radio option */
    value: string;

    /** Disabled */
    disabled?: boolean;

    /** Label */
    children?: ReactNode;

    /** Custom className */
    className?: string;
}

/**
 * MellowUI Radio
 * 
 * A single radio option. Use within RadioGroup.
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
    ({ value, disabled: disabledProp = false, children, className }, ref) => {
        const group = useRadioGroup();

        if (!group) {
            throw new Error('Radio must be used within a RadioGroup');
        }

        const { name, value: groupValue, onChange, size, color, disabled: groupDisabled } = group;

        const isChecked = groupValue === value;
        const isDisabled = disabledProp || groupDisabled;
        const id = useId();

        const handleChange = () => {
            if (!isDisabled) {
                onChange(value);
            }
        };

        return (
            <label
                className={clsx(
                    styles.radio,
                    styles[`size-${size}`],
                    styles[`color-${color}`],
                    {
                        [styles.disabled]: isDisabled,
                        [styles.checked]: isChecked,
                    },
                    className
                )}
                htmlFor={id}
            >
                <input
                    ref={ref}
                    type="radio"
                    id={id}
                    name={name}
                    value={value}
                    checked={isChecked}
                    disabled={isDisabled}
                    onChange={handleChange}
                    className={styles.input}
                />

                <div className={styles.circle}>
                    <AnimatePresence>
                        {isChecked && (
                            <motion.div
                                className={styles.dot}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={springs.bouncy}
                            />
                        )}
                    </AnimatePresence>
                </div>

                {children && <span className={styles.label}>{children}</span>}
            </label>
        );
    }
);

RadioGroup.displayName = 'RadioGroup';
Radio.displayName = 'Radio';

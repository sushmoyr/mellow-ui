/**
 * MellowUI ButtonGroup Component
 * 
 * A container for grouping related buttons with connected visual treatment.
 */

import { createContext, useContext, ReactNode, Children, cloneElement, isValidElement } from 'react';
import clsx from 'clsx';
import styles from './ButtonGroup.module.css';
import type { ButtonVariant, ButtonSize, ButtonColor } from '../Button';

export interface ButtonGroupContextValue {
    size?: ButtonSize;
    variant?: ButtonVariant;
    color?: ButtonColor;
    isDisabled?: boolean;
    isAttached?: boolean;
}

const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(null);

/**
 * Hook to access ButtonGroup context from child buttons
 */
export function useButtonGroup(): ButtonGroupContextValue | null {
    return useContext(ButtonGroupContext);
}

export interface ButtonGroupProps {
    /** Button elements to group */
    children: ReactNode;

    /** Size applied to all buttons (unless overridden) */
    size?: ButtonSize;

    /** Variant applied to all buttons (unless overridden) */
    variant?: ButtonVariant;

    /** Color applied to all buttons (unless overridden) */
    color?: ButtonColor;

    /** Stack direction */
    orientation?: 'horizontal' | 'vertical';

    /** Spacing between buttons in pixels (only when not attached) */
    spacing?: number;

    /** Disable all buttons in the group */
    isDisabled?: boolean;

    /** Attach buttons (no gap, connected borders) */
    isAttached?: boolean;

    /** Custom className */
    className?: string;
}

/**
 * MellowUI ButtonGroup
 * 
 * Groups related buttons together with optional connected styling.
 * Child buttons inherit size, variant, color, and disabled state from the group.
 * 
 * @example
 * ```tsx
 * // Attached button group (connected visually)
 * <ButtonGroup isAttached variant="outline">
 *   <Button>Left</Button>
 *   <Button>Center</Button>
 *   <Button>Right</Button>
 * </ButtonGroup>
 * 
 * // Spaced button group
 * <ButtonGroup spacing={8}>
 *   <Button>Save</Button>
 *   <Button variant="ghost">Cancel</Button>
 * </ButtonGroup>
 * ```
 */
export function ButtonGroup({
    children,
    size,
    variant,
    color,
    orientation = 'horizontal',
    spacing = 0,
    isDisabled = false,
    isAttached = true,
    className,
}: ButtonGroupProps) {
    const contextValue: ButtonGroupContextValue = {
        size,
        variant,
        color,
        isDisabled,
        isAttached,
    };

    // Convert children to array to determine first/last for styling
    const childArray = Children.toArray(children).filter(isValidElement);
    const childCount = childArray.length;

    const styledChildren = childArray.map((child, index: number) => {
        if (!isValidElement(child)) return child;

        // Determine position for border-radius styling
        const isFirst = index === 0;
        const isLast = index === childCount - 1;
        const isMiddle = !isFirst && !isLast;

        // Clone with position classes for attached mode
        return cloneElement(child as React.ReactElement, {
            className: clsx(
                (child as React.ReactElement).props.className,
                isAttached && styles.groupedButton,
                isAttached && isFirst && styles.first,
                isAttached && isLast && styles.last,
                isAttached && isMiddle && styles.middle,
                isAttached && orientation === 'vertical' && styles.vertical,
            ),
        });
    });

    const style = !isAttached && spacing > 0 ? { gap: `${spacing}px` } : undefined;

    return (
        <ButtonGroupContext.Provider value={contextValue}>
            <div
                className={clsx(
                    styles.buttonGroup,
                    styles[orientation],
                    {
                        [styles.attached]: isAttached,
                    },
                    className
                )}
                role="group"
                style={style}
            >
                {styledChildren}
            </div>
        </ButtonGroupContext.Provider>
    );
}

ButtonGroup.displayName = 'ButtonGroup';

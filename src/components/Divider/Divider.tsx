/**
 * MellowUI Divider Component
 * 
 * Visual separator line.
 */

import { forwardRef, CSSProperties } from 'react';
import clsx from 'clsx';
import styles from './Divider.module.css';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed' | 'dotted';

export interface DividerProps {
    /** Orientation */
    orientation?: DividerOrientation;

    /** Line style */
    variant?: DividerVariant;

    /** Line color */
    color?: 'default' | 'subtle' | 'accent';

    /** Thickness */
    thickness?: number;

    /** Spacing around divider */
    spacing?: number | string;

    /** Custom className */
    className?: string;

    /** Custom styles */
    style?: CSSProperties;
}

/**
 * MellowUI Divider
 * 
 * A visual separator for content.
 * 
 * @example
 * ```tsx
 * <VStack spacing={16}>
 *   <div>Above</div>
 *   <Divider />
 *   <div>Below</div>
 * </VStack>
 * ```
 */
export const Divider = forwardRef<HTMLHRElement, DividerProps>(
    (
        {
            orientation = 'horizontal',
            variant = 'solid',
            color = 'default',
            thickness = 1,
            spacing = 0,
            className,
            style,
        },
        ref
    ) => {
        const spacingValue = typeof spacing === 'number' ? `${spacing}px` : spacing;

        return (
            <hr
                ref={ref}
                className={clsx(
                    styles.divider,
                    styles[orientation],
                    styles[variant],
                    styles[`color-${color}`],
                    className
                )}
                style={{
                    [orientation === 'horizontal' ? 'borderTopWidth' : 'borderLeftWidth']: thickness,
                    [orientation === 'horizontal' ? 'marginTop' : 'marginLeft']: spacingValue,
                    [orientation === 'horizontal' ? 'marginBottom' : 'marginRight']: spacingValue,
                    ...style,
                }}
            />
        );
    }
);

Divider.displayName = 'Divider';

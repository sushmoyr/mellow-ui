/**
 * MellowUI Stack Component
 * 
 * Vertical or horizontal flex container with consistent spacing.
 */

import { forwardRef, ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';
import styles from './Stack.module.css';

export type StackDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface StackProps {
    /** Flex direction */
    direction?: StackDirection;

    /** Space between children (number = px, or CSS string) */
    spacing?: number | string;

    /** Align items (cross-axis) */
    align?: StackAlign;

    /** Justify content (main axis) */
    justify?: StackJustify;

    /** Allow wrapping */
    wrap?: boolean;

    /** Children */
    children?: ReactNode;

    /** Custom className */
    className?: string;

    /** Custom styles */
    style?: CSSProperties;

    /** Element to render as */
    as?: keyof JSX.IntrinsicElements;
}

/**
 * MellowUI Stack
 * 
 * Flexible layout component for stacking children with consistent spacing.
 * 
 * @example
 * ```tsx
 * <Stack direction="column" spacing={16}>
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 *   <div>Item 3</div>
 * </Stack>
 * ```
 */
export const Stack = forwardRef<HTMLDivElement, StackProps>(
    (
        {
            direction = 'column',
            spacing = 0,
            align = 'stretch',
            justify = 'start',
            wrap = false,
            children,
            className,
            style,
            as: Component = 'div',
        },
        ref
    ) => {
        const gap = typeof spacing === 'number' ? `${spacing}px` : spacing;

        const alignMap: Record<StackAlign, string> = {
            start: 'flex-start',
            center: 'center',
            end: 'flex-end',
            stretch: 'stretch',
            baseline: 'baseline',
        };

        const justifyMap: Record<StackJustify, string> = {
            start: 'flex-start',
            center: 'center',
            end: 'flex-end',
            between: 'space-between',
            around: 'space-around',
            evenly: 'space-evenly',
        };

        const customStyles: CSSProperties = {
            display: 'flex',
            flexDirection: direction,
            gap,
            alignItems: alignMap[align],
            justifyContent: justifyMap[justify],
            flexWrap: wrap ? 'wrap' : 'nowrap',
            ...style,
        };

        return (
            // @ts-ignore - dynamic element type
            <Component
                ref={ref}
                className={clsx(styles.stack, className)}
                style={customStyles}
            >
                {children}
            </Component>
        );
    }
);

Stack.displayName = 'Stack';

// ========== Convenience aliases ==========

export const HStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
    (props, ref) => <Stack ref={ref} direction="row" {...props} />
);
HStack.displayName = 'HStack';

export const VStack = forwardRef<HTMLDivElement, Omit<StackProps, 'direction'>>(
    (props, ref) => <Stack ref={ref} direction="column" {...props} />
);
VStack.displayName = 'VStack';

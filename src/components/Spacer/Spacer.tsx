/**
 * MellowUI Spacer Component
 * 
 * Flexible empty space.
 */

import { forwardRef, CSSProperties } from 'react';
import clsx from 'clsx';
import styles from './Spacer.module.css';

export interface SpacerProps {
    /** Fixed size (otherwise fills available space) */
    size?: number | string;

    /** Orientation for fixed size */
    axis?: 'horizontal' | 'vertical';

    /** Custom className */
    className?: string;

    /** Custom styles */
    style?: CSSProperties;
}

/**
 * MellowUI Spacer
 * 
 * Creates flexible space between elements. Without a size, it expands to fill.
 * 
 * @example
 * ```tsx
 * <HStack>
 *   <Logo />
 *   <Spacer /> {/* Pushes nav to right *\/}
 *   <Nav />
 * </HStack>
 * ```
 */
export const Spacer = forwardRef<HTMLDivElement, SpacerProps>(
    ({ size, axis = 'horizontal', className, style }, ref) => {
        const sizeValue = size !== undefined
            ? (typeof size === 'number' ? `${size}px` : size)
            : undefined;

        const customStyle: CSSProperties = size !== undefined
            ? {
                [axis === 'horizontal' ? 'width' : 'height']: sizeValue,
                flexShrink: 0,
            }
            : { flex: 1 };

        return (
            <div
                ref={ref}
                className={clsx(styles.spacer, className)}
                style={{ ...customStyle, ...style }}
                aria-hidden="true"
            />
        );
    }
);

Spacer.displayName = 'Spacer';

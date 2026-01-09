/**
 * MellowUI Container Component
 * 
 * Centered max-width wrapper for content.
 */

import { forwardRef, ReactNode, CSSProperties } from 'react';
import clsx from 'clsx';
import styles from './Container.module.css';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps {
    /** Max width size */
    size?: ContainerSize;

    /** Center content horizontally */
    center?: boolean;

    /** Horizontal padding */
    padding?: number | string;

    /** Children */
    children?: ReactNode;

    /** Custom className */
    className?: string;

    /** Custom styles */
    style?: CSSProperties;

    /** Element to render as */
    as?: keyof JSX.IntrinsicElements;
}

const sizeMap: Record<ContainerSize, string> = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    full: '100%',
};

/**
 * MellowUI Container
 * 
 * Centered max-width wrapper with consistent horizontal padding.
 */
export const Container = forwardRef<HTMLDivElement, ContainerProps>(
    (
        {
            size = 'lg',
            center = true,
            padding = 16,
            children,
            className,
            style,
            as: Component = 'div',
        },
        ref
    ) => {
        const paddingValue = typeof padding === 'number' ? `${padding}px` : padding;

        return (
            // @ts-ignore
            <Component
                ref={ref}
                className={clsx(styles.container, className)}
                style={{
                    maxWidth: sizeMap[size],
                    marginLeft: center ? 'auto' : undefined,
                    marginRight: center ? 'auto' : undefined,
                    paddingLeft: paddingValue,
                    paddingRight: paddingValue,
                    ...style,
                }}
            >
                {children}
            </Component>
        );
    }
);

Container.displayName = 'Container';

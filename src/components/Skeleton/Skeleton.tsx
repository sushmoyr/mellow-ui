/**
 * MellowUI Skeleton Component
 * 
 * Loading placeholder with shimmer animation.
 */

import { forwardRef, CSSProperties } from 'react';
import clsx from 'clsx';
import styles from './Skeleton.module.css';

export type SkeletonVariant = 'text' | 'rectangular' | 'circular';

export interface SkeletonProps {
    /** Variant shape */
    variant?: SkeletonVariant;

    /** Width */
    width?: number | string;

    /** Height */
    height?: number | string;

    /** Border radius for rectangular */
    radius?: number | string;

    /** Animation */
    animation?: 'pulse' | 'shimmer' | 'none';

    /** Custom className */
    className?: string;

    /** Custom styles */
    style?: CSSProperties;
}

/**
 * MellowUI Skeleton
 * 
 * Loading placeholder with shimmer effect.
 */
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
    (
        {
            variant = 'text',
            width,
            height,
            radius,
            animation = 'shimmer',
            className,
            style,
        },
        ref
    ) => {
        const getDefaultDimensions = () => {
            switch (variant) {
                case 'text':
                    return { width: width ?? '100%', height: height ?? '1em' };
                case 'circular':
                    return { width: width ?? 40, height: height ?? 40 };
                case 'rectangular':
                default:
                    return { width: width ?? '100%', height: height ?? 100 };
            }
        };

        const dimensions = getDefaultDimensions();
        const widthValue = typeof dimensions.width === 'number' ? `${dimensions.width}px` : dimensions.width;
        const heightValue = typeof dimensions.height === 'number' ? `${dimensions.height}px` : dimensions.height;
        const radiusValue = radius !== undefined
            ? (typeof radius === 'number' ? `${radius}px` : radius)
            : variant === 'circular' ? '50%' : variant === 'text' ? '4px' : '8px';

        return (
            <div
                ref={ref}
                className={clsx(
                    styles.skeleton,
                    styles[`animation-${animation}`],
                    className
                )}
                style={{
                    width: widthValue,
                    height: heightValue,
                    borderRadius: radiusValue,
                    ...style,
                }}
                aria-hidden="true"
            />
        );
    }
);

Skeleton.displayName = 'Skeleton';

// ========== Convenience Components ==========

export const SkeletonText = forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'>>(
    (props, ref) => <Skeleton ref={ref} variant="text" {...props} />
);
SkeletonText.displayName = 'SkeletonText';

export const SkeletonCircle = forwardRef<HTMLDivElement, Omit<SkeletonProps, 'variant'>>(
    (props, ref) => <Skeleton ref={ref} variant="circular" {...props} />
);
SkeletonCircle.displayName = 'SkeletonCircle';

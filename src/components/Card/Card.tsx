/**
 * MellowUI Card Component
 * 
 * Content container with soft shadow and hover lift.
 */

import { forwardRef, ReactNode, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './Card.module.css';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps {
    /** Card variant */
    variant?: CardVariant;

    /** Padding size */
    padding?: 'none' | 'sm' | 'md' | 'lg';

    /** Enable hover lift animation */
    hoverable?: boolean;

    /** Make card clickable */
    onClick?: () => void;

    /** Custom className */
    className?: string;

    /** Inline styles */
    style?: CSSProperties;

    /** Card content */
    children: ReactNode;
}

/**
 * MellowUI Card
 * 
 * A content container with soft shadows and optional hover lift.
 * 
 * @example
 * ```tsx
 * <Card>
 *   <h2>Title</h2>
 *   <p>Content goes here</p>
 * </Card>
 * ```
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            variant = 'elevated',
            padding = 'md',
            hoverable = false,
            onClick,
            className,
            style,
            children,
        },
        ref
    ) => {
        const isClickable = Boolean(onClick) || hoverable;

        return (
            <motion.div
                ref={ref}
                className={clsx(
                    styles.card,
                    styles[`variant-${variant}`],
                    styles[`padding-${padding}`],
                    {
                        [styles.hoverable]: isClickable,
                        [styles.clickable]: Boolean(onClick),
                    },
                    className
                )}
                whileHover={isClickable ? { y: -4 } : undefined}
                whileTap={onClick ? { scale: 0.98 } : undefined}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                onClick={onClick}
                role={onClick ? 'button' : undefined}
                tabIndex={onClick ? 0 : undefined}
                style={style}
            >
                {children}
            </motion.div>
        );
    }
);

Card.displayName = 'Card';

// Card subcomponents for composition
export const CardHeader = ({
    children,
    className
}: { children: ReactNode; className?: string }) => (
    <div className={clsx(styles.header, className)}>{children}</div>
);

export const CardTitle = ({
    children,
    className
}: { children: ReactNode; className?: string }) => (
    <h3 className={clsx(styles.title, className)}>{children}</h3>
);

export const CardDescription = ({
    children,
    className
}: { children: ReactNode; className?: string }) => (
    <p className={clsx(styles.description, className)}>{children}</p>
);

export const CardContent = ({
    children,
    className
}: { children: ReactNode; className?: string }) => (
    <div className={clsx(styles.content, className)}>{children}</div>
);

export const CardFooter = ({
    children,
    className
}: { children: ReactNode; className?: string }) => (
    <div className={clsx(styles.footer, className)}>{children}</div>
);

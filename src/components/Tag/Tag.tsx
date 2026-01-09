/**
 * MellowUI Tag Component
 * 
 * Colored labels/chips.
 */

import { forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './Tag.module.css';

export type TagSize = 'sm' | 'md' | 'lg';
export type TagVariant = 'solid' | 'subtle' | 'outline';
export type TagColor = 'primary' | 'secondary' | 'accent' | 'gray' | 'success' | 'warning' | 'error';

export interface TagProps {
    /** Content */
    children: ReactNode;

    /** Size */
    size?: TagSize;

    /** Variant */
    variant?: TagVariant;

    /** Color */
    color?: TagColor;

    /** Removable */
    removable?: boolean;

    /** OnRemove handler */
    onRemove?: () => void;

    /** Leading icon/element */
    icon?: ReactNode;

    /** Custom className */
    className?: string;
}

/**
 * MellowUI Tag
 * 
 * Colored label/chip component.
 */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(
    (
        {
            children,
            size = 'md',
            variant = 'subtle',
            color = 'primary',
            removable = false,
            onRemove,
            icon,
            className,
        },
        ref
    ) => {
        return (
            <span
                ref={ref}
                className={clsx(
                    styles.tag,
                    styles[`size-${size}`],
                    styles[`variant-${variant}`],
                    styles[`color-${color}`],
                    className
                )}
            >
                {icon && <span className={styles.icon}>{icon}</span>}
                <span className={styles.label}>{children}</span>
                {removable && (
                    <motion.button
                        className={styles.remove}
                        onClick={onRemove}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="Remove"
                    >
                        ×
                    </motion.button>
                )}
            </span>
        );
    }
);

Tag.displayName = 'Tag';

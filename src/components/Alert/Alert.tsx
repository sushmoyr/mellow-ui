/**
 * MellowUI Alert Component
 * 
 * Inline status message.
 */

import { forwardRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { springs } from '../../motion/springs';
import styles from './Alert.module.css';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
    /** Alert variant */
    variant?: AlertVariant;

    /** Title */
    title?: string;

    /** Content */
    children?: ReactNode;

    /** Icon override */
    icon?: ReactNode;

    /** Show close button */
    closable?: boolean;

    /** Close handler */
    onClose?: () => void;

    /** Custom className */
    className?: string;
}

const defaultIcons: Record<AlertVariant, string> = {
    info: 'ℹ',
    success: '✓',
    warning: '⚠',
    error: '✕',
};

/**
 * MellowUI Alert
 * 
 * Inline status message for feedback.
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(
    (
        {
            variant = 'info',
            title,
            children,
            icon,
            closable = false,
            onClose,
            className,
        },
        ref
    ) => {
        return (
            <motion.div
                ref={ref}
                className={clsx(styles.alert, styles[`variant-${variant}`], className)}
                role="alert"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={springs.gentle}
            >
                {/* Icon */}
                <span className={styles.icon}>
                    {icon ?? defaultIcons[variant]}
                </span>

                {/* Content */}
                <div className={styles.content}>
                    {title && <div className={styles.title}>{title}</div>}
                    {children && <div className={styles.message}>{children}</div>}
                </div>

                {/* Close */}
                {closable && (
                    <button className={styles.close} onClick={onClose} aria-label="Close">
                        ×
                    </button>
                )}
            </motion.div>
        );
    }
);

Alert.displayName = 'Alert';

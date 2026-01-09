/**
 * MellowUI Drawer Component
 * 
 * Slide-out panel with backdrop and spring physics.
 */

import { forwardRef, ReactNode, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { springs } from '../../motion/springs';
import styles from './Drawer.module.css';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DrawerProps {
    /** Open state */
    open: boolean;

    /** Called when drawer should close */
    onClose: () => void;

    /** Drawer title */
    title?: string;

    /** Drawer content */
    children: ReactNode;

    /** Position */
    position?: DrawerPosition;

    /** Size */
    size?: DrawerSize;

    /** Close on backdrop click */
    closeOnBackdrop?: boolean;

    /** Close on escape key */
    closeOnEscape?: boolean;

    /** Show close button */
    showClose?: boolean;

    /** Custom className */
    className?: string;

    /** Footer */
    footer?: ReactNode;
}

const slideVariants = {
    left: { initial: { x: '-100%' }, animate: { x: 0 } },
    right: { initial: { x: '100%' }, animate: { x: 0 } },
    top: { initial: { y: '-100%' }, animate: { y: 0 } },
    bottom: { initial: { y: '100%' }, animate: { y: 0 } },
};

/**
 * MellowUI Drawer
 * 
 * Slide-out panel from any edge.
 */
export function Drawer({
    open,
    onClose,
    title,
    children,
    position = 'right',
    size = 'md',
    closeOnBackdrop = true,
    closeOnEscape = true,
    showClose = true,
    className,
    footer,
}: DrawerProps) {
    // Close on escape
    useEffect(() => {
        if (!open || !closeOnEscape) return;

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, closeOnEscape, onClose]);

    // Lock body scroll
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = '';
            };
        }
    }, [open]);

    const handleBackdropClick = useCallback((e: React.MouseEvent) => {
        if (closeOnBackdrop && e.target === e.currentTarget) {
            onClose();
        }
    }, [closeOnBackdrop, onClose]);

    const variant = slideVariants[position];
    const isHorizontal = position === 'left' || position === 'right';

    const drawerContent = (
        <AnimatePresence>
            {open && (
                <div className={styles.portal}>
                    {/* Backdrop */}
                    <motion.div
                        className={styles.backdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleBackdropClick}
                    />

                    {/* Panel */}
                    <motion.div
                        className={clsx(
                            styles.drawer,
                            styles[`position-${position}`],
                            styles[`size-${size}`],
                            className
                        )}
                        role="dialog"
                        aria-modal="true"
                        initial={variant.initial}
                        animate={{
                            ...variant.animate,
                            transition: { type: 'spring', stiffness: 400, damping: 35 }
                        }}
                        exit={{
                            ...variant.initial,
                            transition: { type: 'spring', stiffness: 500, damping: 40 }
                        }}
                    >
                        {/* Header */}
                        {(title || showClose) && (
                            <div className={styles.header}>
                                {title && <h2 className={styles.title}>{title}</h2>}
                                {showClose && (
                                    <motion.button
                                        className={styles.closeButton}
                                        onClick={onClose}
                                        aria-label="Close"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        ×
                                    </motion.button>
                                )}
                            </div>
                        )}

                        {/* Content */}
                        <div className={styles.content}>
                            {children}
                        </div>

                        {/* Footer */}
                        {footer && (
                            <div className={styles.footer}>
                                {footer}
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );

    if (typeof window === 'undefined') return null;
    return createPortal(drawerContent, document.body);
}

Drawer.displayName = 'Drawer';

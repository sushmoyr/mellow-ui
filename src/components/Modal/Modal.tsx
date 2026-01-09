/**
 * MellowUI Modal Component
 * 
 * Dialog with backdrop blur, breathe animation, and portal rendering.
 */

import { forwardRef, ReactNode, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { springs } from '../../motion/springs';
import styles from './Modal.module.css';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps {
    /** Open state */
    open: boolean;

    /** Called when modal should close */
    onClose: () => void;

    /** Modal title */
    title?: string;

    /** Modal description */
    description?: string;

    /** Modal content */
    children: ReactNode;

    /** Size */
    size?: ModalSize;

    /** Close on backdrop click */
    closeOnBackdrop?: boolean;

    /** Close on escape key */
    closeOnEscape?: boolean;

    /** Show close button */
    showClose?: boolean;

    /** Custom className for content */
    className?: string;

    /** Footer content */
    footer?: ReactNode;
}

/**
 * MellowUI Modal
 * 
 * Beautiful dialog with backdrop blur and spring animations.
 */
export function Modal({
    open,
    onClose,
    title,
    description,
    children,
    size = 'md',
    closeOnBackdrop = true,
    closeOnEscape = true,
    showClose = true,
    className,
    footer,
}: ModalProps) {
    const contentRef = useRef<HTMLDivElement>(null);

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

    // Focus trap
    useEffect(() => {
        if (open && contentRef.current) {
            contentRef.current.focus();
        }
    }, [open]);

    const handleBackdropClick = useCallback((e: React.MouseEvent) => {
        if (closeOnBackdrop && e.target === e.currentTarget) {
            onClose();
        }
    }, [closeOnBackdrop, onClose]);

    const modalContent = (
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

                    {/* Content */}
                    <motion.div
                        ref={contentRef}
                        className={clsx(styles.content, styles[`size-${size}`], className)}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby={title ? 'modal-title' : undefined}
                        tabIndex={-1}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                            transition: springs.bouncy
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.95,
                            y: 10,
                            transition: { duration: 0.15 }
                        }}
                    >
                        {/* Close Button */}
                        {showClose && (
                            <motion.button
                                className={styles.closeButton}
                                onClick={onClose}
                                aria-label="Close"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                ×
                            </motion.button>
                        )}

                        {/* Header */}
                        {(title || description) && (
                            <div className={styles.header}>
                                {title && <h2 id="modal-title" className={styles.title}>{title}</h2>}
                                {description && <p className={styles.description}>{description}</p>}
                            </div>
                        )}

                        {/* Body */}
                        <div className={styles.body}>
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
    return createPortal(modalContent, document.body);
}

Modal.displayName = 'Modal';

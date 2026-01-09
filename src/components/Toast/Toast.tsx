/**
 * MellowUI Toast Component
 * 
 * Notification popups with auto-dismiss and animations.
 */

import { createContext, useContext, useState, useCallback, ReactNode, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { springs } from '../../motion/springs';
import styles from './Toast.module.css';

// ========== Types ==========

export type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-right' | 'top-left' | 'top-center' | 'bottom-right' | 'bottom-left' | 'bottom-center';

export interface ToastData {
    id: string;
    title?: string;
    description?: string;
    variant?: ToastVariant;
    duration?: number;
    action?: {
        label: string;
        onClick: () => void;
    };
}

interface ToastContextValue {
    toasts: ToastData[];
    addToast: (toast: Omit<ToastData, 'id'>) => string;
    removeToast: (id: string) => void;
}

// ========== Context ==========

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

// ========== Provider ==========

export interface ToastProviderProps {
    children: ReactNode;
    position?: ToastPosition;
    maxToasts?: number;
}

export function ToastProvider({
    children,
    position = 'bottom-right',
    maxToasts = 5,
}: ToastProviderProps) {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    const addToast = useCallback((toast: Omit<ToastData, 'id'>) => {
        const id = Math.random().toString(36).substring(2, 9);
        const newToast: ToastData = {
            id,
            variant: 'default',
            duration: 4000,
            ...toast,
        };

        setToasts((prev) => {
            const updated = [...prev, newToast];
            return updated.slice(-maxToasts);
        });

        // Auto-dismiss
        if (newToast.duration && newToast.duration > 0) {
            setTimeout(() => {
                setToasts((prev) => prev.filter((t) => t.id !== id));
            }, newToast.duration);
        }

        return id;
    }, [maxToasts]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} position={position} onRemove={removeToast} />
        </ToastContext.Provider>
    );
}

// ========== Container ==========

interface ToastContainerProps {
    toasts: ToastData[];
    position: ToastPosition;
    onRemove: (id: string) => void;
}

function ToastContainer({ toasts, position, onRemove }: ToastContainerProps) {
    return (
        <div className={clsx(styles.container, styles[position])}>
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <Toast key={toast.id} {...toast} onClose={() => onRemove(toast.id)} />
                ))}
            </AnimatePresence>
        </div>
    );
}

// ========== Toast Item ==========

interface ToastProps extends ToastData {
    onClose: () => void;
}

const variantIcons: Record<ToastVariant, string> = {
    default: '💬',
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
};

function Toast({
    id,
    title,
    description,
    variant = 'default',
    action,
    onClose,
}: ToastProps) {
    return (
        <motion.div
            layout
            className={clsx(styles.toast, styles[`variant-${variant}`])}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={springs.gentle}
        >
            {/* Icon */}
            <span className={styles.icon}>{variantIcons[variant]}</span>

            {/* Content */}
            <div className={styles.content}>
                {title && <div className={styles.title}>{title}</div>}
                {description && <div className={styles.description}>{description}</div>}
            </div>

            {/* Action */}
            {action && (
                <button className={styles.action} onClick={action.onClick}>
                    {action.label}
                </button>
            )}

            {/* Close */}
            <button className={styles.close} onClick={onClose} aria-label="Close">
                ×
            </button>
        </motion.div>
    );
}

// ========== Convenience function ==========

export const toast = {
    show: (options: Omit<ToastData, 'id'>) => {
        // This would need a global store - placeholder for now
        console.warn('Use useToast() hook within ToastProvider');
    },
};

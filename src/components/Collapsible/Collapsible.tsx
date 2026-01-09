/**
 * MellowUI Collapsible Component
 * 
 * Animated content reveal with spring physics.
 */

import { forwardRef, useState, useCallback, ReactNode, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { springs } from '../../motion/springs';
import styles from './Collapsible.module.css';

// ========== Context ==========

interface CollapsibleContextValue {
    isOpen: boolean;
    toggle: () => void;
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

function useCollapsibleContext() {
    const context = useContext(CollapsibleContext);
    if (!context) {
        throw new Error('Collapsible components must be used within Collapsible');
    }
    return context;
}

// ========== Types ==========

export interface CollapsibleProps {
    /** Controlled open state */
    open?: boolean;

    /** Default open state */
    defaultOpen?: boolean;

    /** Called when state changes */
    onOpenChange?: (open: boolean) => void;

    /** Children */
    children: ReactNode;

    /** Custom className */
    className?: string;
}

export interface CollapsibleTriggerProps {
    children: ReactNode;
    className?: string;
    asChild?: boolean;
}

export interface CollapsibleContentProps {
    children: ReactNode;
    className?: string;
}

// ========== Components ==========

export function Collapsible({
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    children,
    className,
}: CollapsibleProps) {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);

    const isControlled = openProp !== undefined;
    const isOpen = isControlled ? openProp : internalOpen;

    const toggle = useCallback(() => {
        const newValue = !isOpen;
        if (!isControlled) {
            setInternalOpen(newValue);
        }
        onOpenChange?.(newValue);
    }, [isOpen, isControlled, onOpenChange]);

    return (
        <CollapsibleContext.Provider value={{ isOpen, toggle }}>
            <div className={clsx(styles.collapsible, className)} data-state={isOpen ? 'open' : 'closed'}>
                {children}
            </div>
        </CollapsibleContext.Provider>
    );
}

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
    ({ children, className, asChild }, ref) => {
        const { isOpen, toggle } = useCollapsibleContext();

        return (
            <motion.button
                ref={ref}
                type="button"
                className={clsx(styles.trigger, className)}
                onClick={toggle}
                aria-expanded={isOpen}
                whileTap={{ scale: 0.98 }}
            >
                {children}
                <motion.span
                    className={styles.chevron}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={springs.bouncy}
                >
                    ▾
                </motion.span>
            </motion.button>
        );
    }
);

export function CollapsibleContent({ children, className }: CollapsibleContentProps) {
    const { isOpen } = useCollapsibleContext();

    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    className={clsx(styles.content, className)}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                        height: 'auto',
                        opacity: 1,
                        transition: {
                            height: { type: 'spring', stiffness: 500, damping: 40 },
                            opacity: { duration: 0.2, delay: 0.1 }
                        }
                    }}
                    exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                            height: { type: 'spring', stiffness: 500, damping: 40 },
                            opacity: { duration: 0.1 }
                        }
                    }}
                >
                    <div className={styles.contentInner}>
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

Collapsible.displayName = 'Collapsible';
CollapsibleTrigger.displayName = 'CollapsibleTrigger';
CollapsibleContent.displayName = 'CollapsibleContent';

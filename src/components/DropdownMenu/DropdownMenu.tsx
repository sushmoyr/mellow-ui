/**
 * MellowUI DropdownMenu Component
 * 
 * Action menu with staggered item animations.
 */

import { forwardRef, useState, useRef, useEffect, ReactNode, createContext, useContext, cloneElement, isValidElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { springs } from '../../motion/springs';
import styles from './DropdownMenu.module.css';

// ========== Context ==========

interface DropdownMenuContextValue {
    close: () => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | null>(null);

// ========== Types ==========

export interface DropdownMenuProps {
    /** Trigger element */
    trigger: ReactNode;

    /** Menu items */
    children: ReactNode;

    /** Alignment */
    align?: 'start' | 'center' | 'end';

    /** Custom className */
    className?: string;
}

export interface DropdownMenuItemProps {
    /** Item content */
    children: ReactNode;

    /** Icon */
    icon?: ReactNode;

    /** Shortcut text */
    shortcut?: string;

    /** Destructive action */
    destructive?: boolean;

    /** Disabled */
    disabled?: boolean;

    /** Click handler */
    onClick?: () => void;

    /** Custom className */
    className?: string;
}

export interface DropdownMenuSeparatorProps {
    className?: string;
}

export interface DropdownMenuLabelProps {
    children: ReactNode;
    className?: string;
}

// ========== Components ==========

export function DropdownMenu({
    trigger,
    children,
    align = 'start',
    className,
}: DropdownMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        if (!isOpen) return;

        function handleClick(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isOpen]);

    // Clone trigger with click handler
    const triggerElement = isValidElement(trigger)
        ? cloneElement(trigger as React.ReactElement<any>, {
            onClick: (e: React.MouseEvent) => {
                (trigger as React.ReactElement<any>).props.onClick?.(e);
                setIsOpen(!isOpen);
            },
            'aria-expanded': isOpen,
            'aria-haspopup': 'menu',
        })
        : trigger;

    const close = () => setIsOpen(false);

    return (
        <DropdownMenuContext.Provider value={{ close }}>
            <div ref={containerRef} className={styles.container}>
                {triggerElement}

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className={clsx(styles.menu, styles[`align-${align}`], className)}
                            role="menu"
                            initial={{ opacity: 0, scale: 0.95, y: -8 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: 0,
                                transition: { ...springs.bouncy, staggerChildren: 0.03 }
                            }}
                            exit={{ opacity: 0, scale: 0.95, y: -8, transition: { duration: 0.12 } }}
                        >
                            {children}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DropdownMenuContext.Provider>
    );
}

export function DropdownMenuItem({
    children,
    icon,
    shortcut,
    destructive = false,
    disabled = false,
    onClick,
    className,
}: DropdownMenuItemProps) {
    const context = useContext(DropdownMenuContext);

    const handleClick = () => {
        if (disabled) return;
        onClick?.();
        context?.close();
    };

    return (
        <motion.button
            className={clsx(
                styles.item,
                { [styles.destructive]: destructive, [styles.disabled]: disabled },
                className
            )}
            role="menuitem"
            disabled={disabled}
            onClick={handleClick}
            whileHover={!disabled ? { backgroundColor: 'rgba(179, 153, 255, 0.1)', x: 2 } : undefined}
            whileTap={!disabled ? { scale: 0.98 } : undefined}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            <span className={styles.label}>{children}</span>
            {shortcut && <span className={styles.shortcut}>{shortcut}</span>}
        </motion.button>
    );
}

export function DropdownMenuSeparator({ className }: DropdownMenuSeparatorProps) {
    return <div className={clsx(styles.separator, className)} role="separator" />;
}

export function DropdownMenuLabel({ children, className }: DropdownMenuLabelProps) {
    return <div className={clsx(styles.menuLabel, className)}>{children}</div>;
}

DropdownMenu.displayName = 'DropdownMenu';
DropdownMenuItem.displayName = 'DropdownMenuItem';
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

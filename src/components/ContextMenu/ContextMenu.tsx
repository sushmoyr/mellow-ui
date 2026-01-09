/**
 * MellowUI ContextMenu Component
 * 
 * Right-click triggered menu.
 */

import { useState, useRef, useEffect, ReactNode, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { createPortal } from 'react-dom';
import { springs } from '../../motion/springs';
import styles from './ContextMenu.module.css';

// ========== Context ==========

interface ContextMenuContextValue {
    close: () => void;
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null);

// ========== Types ==========

export interface ContextMenuProps {
    /** Trigger area children */
    children: ReactNode;

    /** Menu content */
    menu: ReactNode;

    /** Disabled */
    disabled?: boolean;

    /** Custom className for trigger */
    className?: string;
}

export interface ContextMenuItemProps {
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

export interface ContextMenuSeparatorProps {
    className?: string;
}

// ========== Components ==========

export function ContextMenu({
    children,
    menu,
    disabled = false,
    className,
}: ContextMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const menuRef = useRef<HTMLDivElement>(null);

    const handleContextMenu = (e: React.MouseEvent) => {
        if (disabled) return;
        e.preventDefault();

        // Position menu at cursor
        setPosition({ x: e.clientX, y: e.clientY });
        setIsOpen(true);
    };

    // Close on outside click or scroll
    useEffect(() => {
        if (!isOpen) return;

        function handleClose() {
            setIsOpen(false);
        }

        function handleClickOutside(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('scroll', handleClose, true);
        document.addEventListener('keydown', (e) => e.key === 'Escape' && handleClose());

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('scroll', handleClose, true);
        };
    }, [isOpen]);

    const close = () => setIsOpen(false);

    const menuPortal = typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={menuRef}
                    className={styles.menu}
                    style={{ left: position.x, top: position.y }}
                    role="menu"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        transition: springs.snappy
                    }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.1 } }}
                >
                    <ContextMenuContext.Provider value={{ close }}>
                        {menu}
                    </ContextMenuContext.Provider>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );

    return (
        <>
            <div className={clsx(styles.trigger, className)} onContextMenu={handleContextMenu}>
                {children}
            </div>
            {menuPortal}
        </>
    );
}

export function ContextMenuItem({
    children,
    icon,
    shortcut,
    destructive = false,
    disabled = false,
    onClick,
    className,
}: ContextMenuItemProps) {
    const context = useContext(ContextMenuContext);

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

export function ContextMenuSeparator({ className }: ContextMenuSeparatorProps) {
    return <div className={clsx(styles.separator, className)} role="separator" />;
}

ContextMenu.displayName = 'ContextMenu';
ContextMenuItem.displayName = 'ContextMenuItem';
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

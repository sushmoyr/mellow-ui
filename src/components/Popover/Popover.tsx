/**
 * MellowUI Popover Component
 * 
 * Floating content panel with smart positioning.
 */

import { forwardRef, useState, useRef, useEffect, ReactNode, cloneElement, isValidElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { springs } from '../../motion/springs';
import styles from './Popover.module.css';

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';
export type PopoverAlign = 'start' | 'center' | 'end';

export interface PopoverProps {
    /** Trigger element */
    trigger: ReactNode;

    /** Popover content */
    children: ReactNode;

    /** Position */
    position?: PopoverPosition;

    /** Alignment */
    align?: PopoverAlign;

    /** Open state (controlled) */
    open?: boolean;

    /** Default open state */
    defaultOpen?: boolean;

    /** Called when state changes */
    onOpenChange?: (open: boolean) => void;

    /** Close on outside click */
    closeOnOutsideClick?: boolean;

    /** Custom className */
    className?: string;
}

/**
 * MellowUI Popover
 * 
 * Floating panel for rich content.
 */
export function Popover({
    trigger,
    children,
    position = 'bottom',
    align = 'center',
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    closeOnOutsideClick = true,
    className,
}: PopoverProps) {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const containerRef = useRef<HTMLDivElement>(null);

    const isControlled = openProp !== undefined;
    const isOpen = isControlled ? openProp : internalOpen;

    const setOpen = (value: boolean) => {
        if (!isControlled) {
            setInternalOpen(value);
        }
        onOpenChange?.(value);
    };

    // Close on outside click
    useEffect(() => {
        if (!isOpen || !closeOnOutsideClick) return;

        function handleClick(e: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [isOpen, closeOnOutsideClick]);

    // Animation variants based on position
    const getVariants = () => {
        const offset = 8;
        switch (position) {
            case 'top': return { initial: { opacity: 0, y: offset }, animate: { opacity: 1, y: 0 } };
            case 'bottom': return { initial: { opacity: 0, y: -offset }, animate: { opacity: 1, y: 0 } };
            case 'left': return { initial: { opacity: 0, x: offset }, animate: { opacity: 1, x: 0 } };
            case 'right': return { initial: { opacity: 0, x: -offset }, animate: { opacity: 1, x: 0 } };
        }
    };

    const variants = getVariants();

    // Clone trigger with click handler
    const triggerElement = isValidElement(trigger)
        ? cloneElement(trigger as React.ReactElement<any>, {
            onClick: (e: React.MouseEvent) => {
                (trigger as React.ReactElement<any>).props.onClick?.(e);
                setOpen(!isOpen);
            },
            'aria-expanded': isOpen,
            'aria-haspopup': true,
        })
        : trigger;

    return (
        <div ref={containerRef} className={styles.container}>
            {triggerElement}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className={clsx(
                            styles.content,
                            styles[`position-${position}`],
                            styles[`align-${align}`],
                            className
                        )}
                        initial={variants.initial}
                        animate={{ ...variants.animate, transition: springs.gentle }}
                        exit={{ ...variants.initial, transition: { duration: 0.15 } }}
                        role="dialog"
                    >
                        <div className={styles.arrow} />
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

Popover.displayName = 'Popover';

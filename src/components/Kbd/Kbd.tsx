/**
 * MellowUI Kbd Component
 * 
 * Keyboard shortcut display.
 */

import { forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Kbd.module.css';

export type KbdSize = 'sm' | 'md' | 'lg';

export interface KbdProps {
    /** Key content */
    children: ReactNode;

    /** Size */
    size?: KbdSize;

    /** Custom className */
    className?: string;
}

/**
 * MellowUI Kbd
 * 
 * Displays keyboard shortcuts.
 * 
 * @example
 * ```tsx
 * <Kbd>⌘</Kbd> + <Kbd>S</Kbd>
 * ```
 */
export const Kbd = forwardRef<HTMLElement, KbdProps>(
    ({ children, size = 'md', className }, ref) => {
        return (
            <kbd
                ref={ref}
                className={clsx(styles.kbd, styles[`size-${size}`], className)}
            >
                {children}
            </kbd>
        );
    }
);

Kbd.displayName = 'Kbd';

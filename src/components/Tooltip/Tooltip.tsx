/**
 * MellowUI Tooltip Component
 * 
 * Hover information with positioning.
 */

import { forwardRef, useState, useCallback, ReactNode, cloneElement, isValidElement, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { springs } from '../../motion/springs';
import styles from './Tooltip.module.css';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
    /** Tooltip content */
    content: ReactNode;

    /** Position */
    position?: TooltipPosition;

    /** Delay before showing (ms) */
    delay?: number;

    /** Trigger element */
    children: ReactNode;

    /** Custom className */
    className?: string;

    /** Disabled */
    disabled?: boolean;
}

/**
 * MellowUI Tooltip
 * 
 * Shows additional information on hover.
 * 
 * @example
 * ```tsx
 * <Tooltip content="More info here">
 *   <Button>Hover me</Button>
 * </Tooltip>
 * ```
 */
export function Tooltip({
    content,
    position = 'top',
    delay = 200,
    children,
    className,
    disabled = false,
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout>();

    const handleMouseEnter = useCallback(() => {
        if (disabled) return;
        timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
    }, [delay, disabled]);

    const handleMouseLeave = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    }, []);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const animationVariants = {
        top: { initial: { opacity: 0, y: 4 }, animate: { opacity: 1, y: 0 } },
        bottom: { initial: { opacity: 0, y: -4 }, animate: { opacity: 1, y: 0 } },
        left: { initial: { opacity: 0, x: 4 }, animate: { opacity: 1, x: 0 } },
        right: { initial: { opacity: 0, x: -4 }, animate: { opacity: 1, x: 0 } },
    };

    return (
        <span
            className={styles.wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleMouseEnter}
            onBlur={handleMouseLeave}
        >
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        className={clsx(styles.tooltip, styles[position], className)}
                        role="tooltip"
                        initial={animationVariants[position].initial}
                        animate={animationVariants[position].animate}
                        exit={animationVariants[position].initial}
                        transition={{ duration: 0.15 }}
                    >
                        {content}
                        <span className={styles.arrow} />
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    );
}

Tooltip.displayName = 'Tooltip';

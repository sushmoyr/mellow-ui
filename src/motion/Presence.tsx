/**
 * MellowUI Presence Component
 * 
 * Wrapper component for mount/unmount animations
 * that make elements gracefully enter and exit.
 */

import React, { ReactNode } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { springs, createSpringTransition } from './springs';

export type PresenceAnimation =
    | 'fade'
    | 'scale'
    | 'slideUp'
    | 'slideDown'
    | 'slideLeft'
    | 'slideRight'
    | 'pop';

export interface PresenceProps {
    /** Content to animate */
    children: ReactNode;

    /** Whether the content is visible */
    isVisible: boolean;

    /** Animation preset */
    animation?: PresenceAnimation;

    /** Spring preset for the animation */
    spring?: keyof typeof springs;

    /** Custom animation variants (overrides preset) */
    variants?: Variants;

    /** CSS class for the wrapper */
    className?: string;

    /** Render as different element */
    as?: React.ElementType;
}

const animationVariants: Record<PresenceAnimation, Variants> = {
    fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    },
    scale: {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
    },
    slideUp: {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 16 },
    },
    slideDown: {
        initial: { opacity: 0, y: -16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -16 },
    },
    slideLeft: {
        initial: { opacity: 0, x: 16 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 16 },
    },
    slideRight: {
        initial: { opacity: 0, x: -16 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -16 },
    },
    pop: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
    },
};

/**
 * Presence component for graceful mount/unmount animations
 * 
 * @example
 * ```tsx
 * function Modal({ isOpen, children }) {
 *   return (
 *     <Presence isVisible={isOpen} animation="scale">
 *       <div className="modal">
 *         {children}
 *       </div>
 *     </Presence>
 *   );
 * }
 * ```
 */
export function Presence({
    children,
    isVisible,
    animation = 'scale',
    spring = 'smooth',
    variants,
    className,
    as = 'div',
}: PresenceProps) {
    const selectedVariants = variants || animationVariants[animation];
    const transition = createSpringTransition(spring);

    const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div;

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <MotionComponent
                    variants={selectedVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={transition}
                    className={className}
                >
                    {children}
                </MotionComponent>
            )}
        </AnimatePresence>
    );
}

/**
 * Staggered children animation wrapper
 * Children animate in sequence with a delay between each
 */
export interface StaggerProps {
    children: ReactNode;
    /** Delay between each child in seconds */
    staggerDelay?: number;
    /** Spring preset */
    spring?: keyof typeof springs;
    className?: string;
}



export function Stagger({
    children,
    staggerDelay = 0.1,
    spring = 'smooth',
    className,
}: StaggerProps) {
    const transition = createSpringTransition(spring);

    const itemVariants: Variants = {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
    };

    return (
        <motion.div
            variants={{
                initial: {},
                animate: {
                    transition: {
                        staggerChildren: staggerDelay,
                    },
                },
            }}
            initial="initial"
            animate="animate"
            className={className}
        >
            {React.Children.map(children, (child) => (
                <motion.div variants={itemVariants} transition={transition}>
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
}

/**
 * MellowUI Spring Configurations
 * 
 * Pre-tuned spring physics for natural, organic motion.
 * These replace traditional easing curves with physical simulation.
 */

import type { Spring } from 'framer-motion';

export type SpringConfig = Omit<Spring, 'type'>;

/**
 * Spring presets for different interaction contexts
 */
export const springs = {
    /**
     * Gentle - Slow, relaxed motion
     * Use for: Page transitions, large elements, ambient motion
     */
    gentle: {
        stiffness: 120,
        damping: 14,
        mass: 1,
    },

    /**
     * Smooth - Balanced, natural motion
     * Use for: Default motion, hover states, focus rings
     */
    smooth: {
        stiffness: 200,
        damping: 20,
        mass: 1,
    },

    /**
     * Bouncy - Playful overshoot
     * Use for: Button press, toggle switches, success states
     */
    bouncy: {
        stiffness: 300,
        damping: 10,
        mass: 0.5,
    },

    /**
     * Snappy - Quick, responsive
     * Use for: Tooltips, dropdown menus, quick feedback
     */
    snappy: {
        stiffness: 400,
        damping: 25,
        mass: 0.8,
    },

    /**
     * Wobbly - Extra elastic, jelly-like
     * Use for: Fun elements, toggle switches, mood indicators
     */
    wobbly: {
        stiffness: 180,
        damping: 12,
        mass: 0.8,
    },

    /**
     * Stiff - Minimal bounce, controlled
     * Use for: Form validation, error states, accessibility reduced motion
     */
    stiff: {
        stiffness: 500,
        damping: 30,
        mass: 1,
    },
} as const;

/**
 * Helper to create spring transition config for Framer Motion
 */
export const createSpringTransition = (preset: keyof typeof springs): Spring => ({
    type: 'spring',
    ...springs[preset],
});

/**
 * Common motion presets combining springs with other properties
 */
export const motionPresets = {
    /**
     * Fade in with subtle scale
     */
    fadeIn: {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.95 },
        transition: createSpringTransition('smooth'),
    },

    /**
     * Slide up entrance
     */
    slideUp: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
        transition: createSpringTransition('smooth'),
    },

    /**
     * Pop in with bounce
     */
    popIn: {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        transition: createSpringTransition('bouncy'),
    },

    /**
     * Squishy press effect
     */
    press: {
        whileTap: { scale: 0.96 },
        transition: createSpringTransition('snappy'),
    },

    /**
     * Hover lift effect
     */
    hoverLift: {
        whileHover: { y: -2 },
        transition: createSpringTransition('smooth'),
    },
} as const;

export type Springs = typeof springs;
export type MotionPresets = typeof motionPresets;

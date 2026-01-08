/**
 * MellowUI useHover Hook
 * 
 * Hook for creating subtle float/glow effects on hover
 * that make elements feel alive and inviting.
 */

import { useState, useCallback } from 'react';
import { useSpring, MotionValue } from 'framer-motion';
import { springs } from './springs';

export interface UseHoverOptions {
    /**
     * Y translation on hover (negative = lift up)
     * @default -2
     */
    y?: number;

    /**
     * Scale factor on hover
     * @default 1.0 (no scale)
     */
    scale?: number;

    /**
     * Spring preset to use
     * @default 'smooth'
     */
    spring?: keyof typeof springs;

    /**
     * Whether the interaction is disabled
     * @default false
     */
    disabled?: boolean;
}

export interface UseHoverReturn {
    /** Animated Y value for Framer Motion */
    y: MotionValue<number>;

    /** Animated scale value for Framer Motion */
    scale: MotionValue<number>;

    /** Event handlers to spread on the element */
    handlers: {
        onMouseEnter: () => void;
        onMouseLeave: () => void;
    };

    /** Whether currently hovered */
    isHovered: boolean;
}

/**
 * Creates a floating hover effect for elements
 * 
 * @example
 * ```tsx
 * function FloatingCard({ children }) {
 *   const { y, handlers, isHovered } = useHover({ y: -4 });
 *   
 *   return (
 *     <motion.div
 *       style={{ y }}
 *       {...handlers}
 *     >
 *       {children}
 *     </motion.div>
 *   );
 * }
 * ```
 */
export function useHover(options: UseHoverOptions = {}): UseHoverReturn {
    const {
        y: yAmount = -2,
        scale: scaleAmount = 1,
        spring = 'smooth',
        disabled = false,
    } = options;

    const [isHovered, setIsHovered] = useState(false);

    const springConfig = springs[spring];

    const y = useSpring(0, {
        stiffness: springConfig.stiffness,
        damping: springConfig.damping,
        mass: springConfig.mass,
    });

    const scale = useSpring(1, {
        stiffness: springConfig.stiffness,
        damping: springConfig.damping,
        mass: springConfig.mass,
    });

    const handleMouseEnter = useCallback(() => {
        if (disabled) return;
        setIsHovered(true);
        y.set(yAmount);
        scale.set(scaleAmount);
    }, [disabled, y, yAmount, scale, scaleAmount]);

    const handleMouseLeave = useCallback(() => {
        if (disabled) return;
        setIsHovered(false);
        y.set(0);
        scale.set(1);
    }, [disabled, y, scale]);

    return {
        y,
        scale,
        handlers: {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
        },
        isHovered,
    };
}

/**
 * Simplified hook that returns just the motion props
 * for spreading directly on a motion component
 */
export function useHoverProps(options: UseHoverOptions = {}) {
    const { y, scale, handlers } = useHover(options);

    return {
        style: { y, scale },
        ...handlers,
    };
}

/**
 * MellowUI useSquishy Hook
 * 
 * Hook for creating "squishy" press interactions that make
 * buttons and interactive elements feel physically satisfying.
 */

import { useCallback, useState } from 'react';
import { useSpring, MotionValue } from 'framer-motion';
import { springs } from './springs';

export interface UseSquishyOptions {
    /**
     * Scale factor when pressed (0-1)
     * @default 0.96
     */
    scale?: number;

    /**
     * Spring preset to use
     * @default 'bouncy'
     */
    spring?: keyof typeof springs;

    /**
     * Whether the interaction is disabled
     * @default false
     */
    disabled?: boolean;
}

export interface UseSquishyReturn {
    /** Animated scale value for Framer Motion */
    scale: MotionValue<number>;

    /** Event handlers to spread on the element */
    handlers: {
        onPointerDown: () => void;
        onPointerUp: () => void;
        onPointerLeave: () => void;
    };

    /** Whether currently pressed */
    isPressed: boolean;
}

/**
 * Creates a squishy press effect for interactive elements
 * 
 * @example
 * ```tsx
 * function SquishyButton({ children }) {
 *   const { scale, handlers } = useSquishy();
 *   
 *   return (
 *     <motion.button
 *       style={{ scale }}
 *       {...handlers}
 *     >
 *       {children}
 *     </motion.button>
 *   );
 * }
 * ```
 */
export function useSquishy(options: UseSquishyOptions = {}): UseSquishyReturn {
    const {
        scale: scaleAmount = 0.96,
        spring = 'bouncy',
        disabled = false,
    } = options;

    const [isPressed, setIsPressed] = useState(false);

    const springConfig = springs[spring];

    const scale = useSpring(1, {
        stiffness: springConfig.stiffness,
        damping: springConfig.damping,
        mass: springConfig.mass,
    });

    const handlePointerDown = useCallback(() => {
        if (disabled) return;
        setIsPressed(true);
        scale.set(scaleAmount);
    }, [disabled, scale, scaleAmount]);

    const handlePointerUp = useCallback(() => {
        if (disabled) return;
        setIsPressed(false);
        scale.set(1);
    }, [disabled, scale]);

    const handlePointerLeave = useCallback(() => {
        if (isPressed) {
            setIsPressed(false);
            scale.set(1);
        }
    }, [isPressed, scale]);

    return {
        scale,
        handlers: {
            onPointerDown: handlePointerDown,
            onPointerUp: handlePointerUp,
            onPointerLeave: handlePointerLeave,
        },
        isPressed,
    };
}

/**
 * Simplified hook that returns just the motion props
 * for spreading directly on a motion component
 */
export function useSquishyProps(options: UseSquishyOptions = {}) {
    const { scale, handlers } = useSquishy(options);

    return {
        style: { scale },
        ...handlers,
    };
}

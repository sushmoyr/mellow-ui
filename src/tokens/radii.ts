/**
 * MellowUI Border Radius Tokens
 * 
 * Organic, huggable border radii. Nothing sharp or threatening.
 */

export const radii = {
    none: '0px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    full: '9999px',
} as const;

// Component-specific radius recommendations
export const componentRadii = {
    button: {
        default: radii.lg,   // 16px - soft, inviting
        pill: radii.full,    // pill shape option
    },
    input: {
        default: radii.md,   // 12px
    },
    card: {
        default: radii.xl,   // 24px - generous softness
        nested: radii.lg,    // 16px for elements inside cards
    },
    modal: {
        default: radii.xl,   // 24px
    },
    tooltip: {
        default: radii.md,   // 12px
    },
    badge: {
        default: radii.full, // pill badges
    },
    avatar: {
        default: radii.full, // circular
        square: radii.lg,    // soft square option
    },
} as const;

export type Radii = typeof radii;
export type ComponentRadii = typeof componentRadii;

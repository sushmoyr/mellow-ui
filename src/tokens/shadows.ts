/**
 * MellowUI Shadow Tokens
 * 
 * Soft, diffused shadows for depth without harshness.
 * Multi-layer shadows create natural, atmospheric feel.
 */

import { colors } from './colors';

// Base shadows - multi-layer for smoothness
export const shadows = {
    none: 'none',

    // Subtle lift - for interactive hover prep
    xs: '0 1px 2px rgba(0, 0, 0, 0.04)',

    // Small - for buttons, small cards
    sm: `
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 2px 4px rgba(0, 0, 0, 0.04)
  `.trim(),

    // Medium - for cards, dropdowns
    md: `
    0 2px 4px rgba(0, 0, 0, 0.03),
    0 4px 8px rgba(0, 0, 0, 0.04),
    0 8px 16px rgba(0, 0, 0, 0.04)
  `.trim(),

    // Large - for modals, popovers
    lg: `
    0 4px 8px rgba(0, 0, 0, 0.03),
    0 8px 16px rgba(0, 0, 0, 0.04),
    0 16px 32px rgba(0, 0, 0, 0.05)
  `.trim(),

    // Extra large - for floating elements
    xl: `
    0 8px 16px rgba(0, 0, 0, 0.04),
    0 16px 32px rgba(0, 0, 0, 0.05),
    0 32px 64px rgba(0, 0, 0, 0.06)
  `.trim(),
} as const;

// Colored glow shadows for focus/active states
export const glows = {
    lavender: `0 0 0 3px ${colors.lavender[200]}, 0 0 20px ${colors.lavender[300]}40`,
    peach: `0 0 0 3px ${colors.peach[200]}, 0 0 20px ${colors.peach[300]}40`,
    sage: `0 0 0 3px ${colors.sage[200]}, 0 0 20px ${colors.sage[300]}40`,
    rose: `0 0 0 3px ${colors.rose[200]}, 0 0 20px ${colors.rose[300]}40`,
} as const;

// Focus ring styles
export const focusRing = {
    default: `0 0 0 3px ${colors.lavender[300]}`,
    error: `0 0 0 3px ${colors.rose[300]}`,
    success: `0 0 0 3px ${colors.sage[300]}`,
} as const;

// Dark mode shadows (slightly more visible)
export const shadowsDark = {
    none: 'none',
    xs: '0 1px 2px rgba(0, 0, 0, 0.15)',
    sm: `
    0 1px 2px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.12)
  `.trim(),
    md: `
    0 2px 4px rgba(0, 0, 0, 0.10),
    0 4px 8px rgba(0, 0, 0, 0.12),
    0 8px 16px rgba(0, 0, 0, 0.14)
  `.trim(),
    lg: `
    0 4px 8px rgba(0, 0, 0, 0.12),
    0 8px 16px rgba(0, 0, 0, 0.14),
    0 16px 32px rgba(0, 0, 0, 0.16)
  `.trim(),
    xl: `
    0 8px 16px rgba(0, 0, 0, 0.14),
    0 16px 32px rgba(0, 0, 0, 0.16),
    0 32px 64px rgba(0, 0, 0, 0.18)
  `.trim(),
} as const;

export type Shadows = typeof shadows;
export type Glows = typeof glows;
export type FocusRing = typeof focusRing;

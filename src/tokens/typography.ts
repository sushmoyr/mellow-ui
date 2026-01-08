/**
 * MellowUI Typography Tokens
 * 
 * Friendly typeface stacks with generous line-heights.
 */

export const fontFamily = {
    heading: '"Nunito", "Quicksand", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: '"Inter", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
} as const;

export const fontSize = {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
} as const;

export const fontWeight = {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
} as const;

export const lineHeight = {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 1.75,
    // MellowUI prefers generous line heights
    mellow: 1.8,
} as const;

export const letterSpacing = {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
} as const;

// Pre-composed text styles
export const textStyles = {
    // Headings
    h1: {
        fontFamily: fontFamily.heading,
        fontSize: fontSize['5xl'],
        fontWeight: fontWeight.bold,
        lineHeight: lineHeight.tight,
        letterSpacing: letterSpacing.tight,
    },
    h2: {
        fontFamily: fontFamily.heading,
        fontSize: fontSize['4xl'],
        fontWeight: fontWeight.bold,
        lineHeight: lineHeight.tight,
        letterSpacing: letterSpacing.tight,
    },
    h3: {
        fontFamily: fontFamily.heading,
        fontSize: fontSize['3xl'],
        fontWeight: fontWeight.semibold,
        lineHeight: lineHeight.snug,
        letterSpacing: letterSpacing.normal,
    },
    h4: {
        fontFamily: fontFamily.heading,
        fontSize: fontSize['2xl'],
        fontWeight: fontWeight.semibold,
        lineHeight: lineHeight.snug,
        letterSpacing: letterSpacing.normal,
    },
    h5: {
        fontFamily: fontFamily.heading,
        fontSize: fontSize.xl,
        fontWeight: fontWeight.medium,
        lineHeight: lineHeight.normal,
        letterSpacing: letterSpacing.normal,
    },
    h6: {
        fontFamily: fontFamily.heading,
        fontSize: fontSize.lg,
        fontWeight: fontWeight.medium,
        lineHeight: lineHeight.normal,
        letterSpacing: letterSpacing.normal,
    },
    // Body
    bodyLg: {
        fontFamily: fontFamily.body,
        fontSize: fontSize.lg,
        fontWeight: fontWeight.normal,
        lineHeight: lineHeight.mellow,
        letterSpacing: letterSpacing.normal,
    },
    body: {
        fontFamily: fontFamily.body,
        fontSize: fontSize.base,
        fontWeight: fontWeight.normal,
        lineHeight: lineHeight.mellow,
        letterSpacing: letterSpacing.normal,
    },
    bodySm: {
        fontFamily: fontFamily.body,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.normal,
        lineHeight: lineHeight.relaxed,
        letterSpacing: letterSpacing.normal,
    },
    caption: {
        fontFamily: fontFamily.body,
        fontSize: fontSize.xs,
        fontWeight: fontWeight.normal,
        lineHeight: lineHeight.normal,
        letterSpacing: letterSpacing.wide,
    },
    // UI Elements
    button: {
        fontFamily: fontFamily.body,
        fontSize: fontSize.base,
        fontWeight: fontWeight.medium,
        lineHeight: lineHeight.none,
        letterSpacing: letterSpacing.wide,
    },
    label: {
        fontFamily: fontFamily.body,
        fontSize: fontSize.sm,
        fontWeight: fontWeight.medium,
        lineHeight: lineHeight.normal,
        letterSpacing: letterSpacing.wide,
    },
} as const;

export type FontFamily = typeof fontFamily;
export type FontSize = typeof fontSize;
export type FontWeight = typeof fontWeight;
export type LineHeight = typeof lineHeight;
export type TextStyles = typeof textStyles;

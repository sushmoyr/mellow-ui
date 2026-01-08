/**
 * MellowUI Custom Theme API
 * 
 * Allows developers to customize MellowUI colors for their brand.
 */

import { colors as defaultColors } from '../tokens/colors';

/**
 * Color palette configuration for custom themes
 */
export interface ThemeColors {
    /** Primary accent color (default: lavender) */
    primary?: string;
    /** Secondary accent color (default: cream) */
    secondary?: string;
    /** Tertiary/accent color (default: peach) */
    accent?: string;
    /** Success color (default: sage) */
    success?: string;
    /** Warning color (default: peach-600) */
    warning?: string;
    /** Error/danger color (default: rose) */
    error?: string;
    /** Light background color */
    backgroundLight?: string;
    /** Dark background color */
    backgroundDark?: string;
}

export interface MellowTheme {
    name: string;
    colors: ThemeColors;
}

/**
 * Create a custom MellowUI theme
 * 
 * @example
 * ```tsx
 * const myTheme = createTheme({
 *   name: 'ocean',
 *   colors: {
 *     primary: '#0EA5E9',      // Sky blue
 *     secondary: '#F0F9FF',    // Light sky
 *     accent: '#06B6D4',       // Cyan
 *     success: '#10B981',      // Emerald
 *     error: '#EF4444',        // Red
 *     backgroundLight: '#F8FAFC',
 *     backgroundDark: '#0F172A',
 *   },
 * });
 * 
 * // Use in your app
 * <MellowProvider theme={myTheme}>
 *   <App />
 * </MellowProvider>
 * ```
 */
export function createTheme(config: MellowTheme): MellowTheme {
    return {
        name: config.name,
        colors: {
            primary: config.colors.primary || defaultColors.lavender[500],
            secondary: config.colors.secondary || defaultColors.cream[100],
            accent: config.colors.accent || defaultColors.peach[500],
            success: config.colors.success || defaultColors.sage[500],
            warning: config.colors.warning || defaultColors.peach[600],
            error: config.colors.error || defaultColors.rose[500],
            backgroundLight: config.colors.backgroundLight || defaultColors.cream[50],
            backgroundDark: config.colors.backgroundDark || defaultColors.twilight[900],
        },
    };
}

/**
 * Generate CSS custom properties from a theme
 */
export function themeToCSSVars(theme: MellowTheme): Record<string, string> {
    return {
        '--mellow-accent': theme.colors.primary || '',
        '--mellow-accent-secondary': theme.colors.accent || '',
        '--mellow-success': theme.colors.success || '',
        '--mellow-warning': theme.colors.warning || '',
        '--mellow-error': theme.colors.error || '',
        '--mellow-bg-light': theme.colors.backgroundLight || '',
        '--mellow-bg-dark': theme.colors.backgroundDark || '',
    };
}

/**
 * Pre-built themes for common use cases
 */
export const themes = {
    /** Default mellow theme - warm, atmospheric */
    mellow: createTheme({
        name: 'mellow',
        colors: {
            primary: '#B399FF',     // Lavender
            secondary: '#FFF9F4',   // Cream
            accent: '#FFAF99',      // Peach
            success: '#99CDAF',     // Sage
            warning: '#E69E8A',     // Peach-600
            error: '#FF9999',       // Rose
            backgroundLight: '#FFFDFB',
            backgroundDark: '#14141F',
        },
    }),

    /** Ocean theme - cool, calm blues */
    ocean: createTheme({
        name: 'ocean',
        colors: {
            primary: '#0EA5E9',     // Sky blue
            secondary: '#F0F9FF',   // Light sky
            accent: '#06B6D4',      // Cyan
            success: '#10B981',     // Emerald
            warning: '#F59E0B',     // Amber
            error: '#EF4444',       // Red
            backgroundLight: '#F8FAFC',
            backgroundDark: '#0F172A',
        },
    }),

    /** Forest theme - natural greens */
    forest: createTheme({
        name: 'forest',
        colors: {
            primary: '#22C55E',     // Green
            secondary: '#F0FDF4',   // Light green
            accent: '#84CC16',      // Lime
            success: '#10B981',     // Emerald
            warning: '#EAB308',     // Yellow
            error: '#DC2626',       // Red
            backgroundLight: '#FAFDF7',
            backgroundDark: '#14201A',
        },
    }),

    /** Sunset theme - warm oranges and pinks */
    sunset: createTheme({
        name: 'sunset',
        colors: {
            primary: '#F97316',     // Orange
            secondary: '#FFF7ED',   // Orange-50
            accent: '#EC4899',      // Pink
            success: '#84CC16',     // Lime
            warning: '#F59E0B',     // Amber
            error: '#E11D48',       // Rose
            backgroundLight: '#FFFBF5',
            backgroundDark: '#1C1412',
        },
    }),
} as const;

export type ThemeName = keyof typeof themes;

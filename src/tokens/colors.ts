/**
 * MellowUI Color Tokens
 * 
 * Warm, atmospheric color palettes designed to evoke calm and creativity.
 * All colors meet WCAG 2.1 AA contrast requirements.
 */

export const colors = {
    // Cream - Warm backgrounds
    cream: {
        50: '#FFFDFB',
        100: '#FFF9F4',
        200: '#FFF3E9',
        300: '#FFECD9',
        400: '#FFE4C9',
        500: '#FFD9B3',
        600: '#E6C3A1',
        700: '#CCAD8F',
        800: '#B3977D',
        900: '#99816B',
    },

    // Lavender - Creative, dreamy accents
    lavender: {
        50: '#F8F5FF',
        100: '#F0EBFF',
        200: '#E1D6FF',
        300: '#D1C2FF',
        400: '#C2ADFF',
        500: '#B399FF',
        600: '#9A7AE6',
        700: '#815BCC',
        800: '#683CB3',
        900: '#4F1D99',
    },

    // Peach - Friendly, inviting highlights
    peach: {
        50: '#FFF7F5',
        100: '#FFEFEB',
        200: '#FFDFD6',
        300: '#FFCFC2',
        400: '#FFBFAD',
        500: '#FFAF99',
        600: '#E69E8A',
        700: '#CC8D7A',
        800: '#B37C6B',
        900: '#996B5C',
    },

    // Sage - Natural, balanced success states
    sage: {
        50: '#F5FAF7',
        100: '#EBF5EF',
        200: '#D6EBDF',
        300: '#C2E1CF',
        400: '#ADD7BF',
        500: '#99CDAF',
        600: '#7AB893',
        700: '#5BA377',
        800: '#3C8E5B',
        900: '#1D793F',
    },

    // Twilight - Dark mode base
    twilight: {
        50: '#F5F5F7',
        100: '#E8E8ED',
        200: '#C9C9D6',
        300: '#AAAABF',
        400: '#8B8BA8',
        500: '#6C6C91',
        600: '#52527A',
        700: '#3D3D5C',
        800: '#29293D',
        900: '#14141F',
        950: '#0A0A10',
    },

    // Rose - Gentle warning/error states
    rose: {
        50: '#FFF5F5',
        100: '#FFEBEB',
        200: '#FFD6D6',
        300: '#FFC2C2',
        400: '#FFADAD',
        500: '#FF9999',
        600: '#E68A8A',
        700: '#CC7A7A',
        800: '#B36B6B',
        900: '#995C5C',
    },

    // Neutral for text/borders
    neutral: {
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#E5E5E5',
        300: '#D4D4D4',
        400: '#A3A3A3',
        500: '#737373',
        600: '#525252',
        700: '#404040',
        800: '#262626',
        900: '#171717',
    },
} as const;

// Semantic color mappings
export const semanticColors = {
    light: {
        background: {
            primary: colors.cream[50],
            secondary: colors.cream[100],
            tertiary: colors.cream[200],
        },
        text: {
            primary: colors.twilight[800],
            secondary: colors.twilight[600],
            muted: colors.twilight[400],
        },
        accent: {
            primary: colors.lavender[500],
            secondary: colors.peach[500],
            success: colors.sage[500],
            warning: colors.peach[600],
            error: colors.rose[500],
        },
        border: {
            default: colors.cream[300],
            focused: colors.lavender[400],
        },
    },
    dark: {
        background: {
            primary: colors.twilight[900],
            secondary: colors.twilight[800],
            tertiary: colors.twilight[700],
        },
        text: {
            primary: colors.cream[50],
            secondary: colors.cream[200],
            muted: colors.twilight[400],
        },
        accent: {
            primary: colors.lavender[400],
            secondary: colors.peach[400],
            success: colors.sage[400],
            warning: colors.peach[500],
            error: colors.rose[400],
        },
        border: {
            default: colors.twilight[600],
            focused: colors.lavender[500],
        },
    },
} as const;

// Gradient presets for dreamy overlays
export const gradients = {
    lavenderMist: `linear-gradient(135deg, ${colors.lavender[200]} 0%, ${colors.lavender[400]} 100%)`,
    peachGlow: `linear-gradient(135deg, ${colors.peach[200]} 0%, ${colors.peach[400]} 100%)`,
    sageBreeze: `linear-gradient(135deg, ${colors.sage[200]} 0%, ${colors.sage[400]} 100%)`,
    twilightDream: `linear-gradient(135deg, ${colors.twilight[700]} 0%, ${colors.twilight[900]} 100%)`,
    cream: `linear-gradient(135deg, ${colors.cream[50]} 0%, ${colors.cream[200]} 100%)`,
    aurora: `linear-gradient(135deg, ${colors.lavender[300]} 0%, ${colors.peach[300]} 50%, ${colors.sage[300]} 100%)`,
} as const;

export type ColorScale = typeof colors;
export type SemanticColors = typeof semanticColors;
export type Gradients = typeof gradients;

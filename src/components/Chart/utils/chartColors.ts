/**
 * MellowUI Chart Colors & Theme Utilities
 * 
 * Provides color palettes and theming for all chart components.
 */

export const chartColors = {
    // Primary palette - MellowUI lavender gradient
    primary: ['#B399FF', '#9B7AE8', '#815BCC', '#6A45B0', '#5C3D99'],

    // Categorical palette - for different data series
    categorical: [
        '#B399FF', // Lavender
        '#7DD3FC', // Sky blue
        '#86EFAC', // Mint green
        '#FCD34D', // Amber
        '#FDA4AF', // Rose
        '#C4B5FD', // Violet
        '#67E8F9', // Cyan
        '#FCA5A5', // Red
    ],

    // Sequential palette - for single series gradients
    sequential: ['#EDE9FE', '#C4B5FD', '#A78BFA', '#8B5CF6', '#7C3AED', '#6D28D9'],

    // Diverging palette - for positive/negative values
    diverging: {
        negative: '#F87171',
        neutral: '#FCD34D',
        positive: '#86EFAC',
    },

    // Semantic colors
    success: '#86EFAC',
    warning: '#FCD34D',
    error: '#FDA4AF',
    info: '#7DD3FC',

    // Axis and grid colors
    axis: '#8B8BA8',
    grid: '#E5E7EB',
    gridDark: '#374151',
    text: '#29293D',
    textMuted: '#6C6C91',
};

export type ChartColorScheme = 'primary' | 'categorical' | 'sequential';

/**
 * Get a color from the palette by index (wraps around)
 */
export function getChartColor(index: number, scheme: ChartColorScheme = 'categorical'): string {
    const palette = chartColors[scheme];
    return palette[index % palette.length];
}

/**
 * Get multiple colors for a data series
 */
export function getChartColors(count: number, scheme: ChartColorScheme = 'categorical'): string[] {
    const palette = chartColors[scheme];
    return Array.from({ length: count }, (_, i) => palette[i % palette.length]);
}

/**
 * Chart gradient definitions for SVG
 */
export const chartGradients = {
    primary: {
        id: 'mellowGradientPrimary',
        colors: ['#C4B5FD', '#8B5CF6'],
    },
    area: {
        id: 'mellowGradientArea',
        colors: ['rgba(179, 153, 255, 0.4)', 'rgba(179, 153, 255, 0.05)'],
    },
};

/**
 * MellowUI Spacing Tokens
 * 
 * Generous spacing scale based on 4px grid.
 * Prioritizes breathing room over data density.
 */

export const spacing = {
    0: '0px',
    px: '1px',
    0.5: '2px',
    1: '4px',
    1.5: '6px',
    2: '8px',
    2.5: '10px',
    3: '12px',
    3.5: '14px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    11: '44px',
    12: '48px',
    14: '56px',
    16: '64px',
    20: '80px',
    24: '96px',
    28: '112px',
    32: '128px',
} as const;

// Component-specific spacing recommendations
export const componentSpacing = {
    button: {
        paddingX: {
            sm: spacing[3],   // 12px
            md: spacing[5],   // 20px
            lg: spacing[6],   // 24px
        },
        paddingY: {
            sm: spacing[1.5], // 6px
            md: spacing[2.5], // 10px
            lg: spacing[3],   // 12px
        },
        gap: spacing[2],    // 8px for icon + text
    },
    input: {
        paddingX: spacing[4],     // 16px
        paddingY: spacing[3],     // 12px
        labelGap: spacing[2],     // 8px
        helperGap: spacing[1.5],  // 6px
    },
    card: {
        padding: {
            sm: spacing[4],   // 16px
            md: spacing[6],   // 24px
            lg: spacing[8],   // 32px
        },
    },
    stack: {
        gap: {
            xs: spacing[1],   // 4px
            sm: spacing[2],   // 8px
            md: spacing[4],   // 16px
            lg: spacing[6],   // 24px
            xl: spacing[8],   // 32px
        },
    },
    container: {
        padding: {
            sm: spacing[4],   // 16px
            md: spacing[6],   // 24px
            lg: spacing[8],   // 32px
        },
        maxWidth: '1200px',
    },
} as const;

export type Spacing = typeof spacing;
export type ComponentSpacing = typeof componentSpacing;

/**
 * MellowUI Provider
 * 
 * Root provider component that wraps the application
 * with theme context and global styles.
 */

import { ReactNode, useMemo, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { ThemeProvider, ThemeMode } from './ThemeContext';
import { MellowTheme, themeToCSSVars, themes } from './createTheme';

export interface MellowProviderProps {
    children: ReactNode;

    /** Default theme mode (light/dark/system) */
    defaultTheme?: ThemeMode;

    /** Custom color theme */
    theme?: MellowTheme;

    /** Reduce motion for accessibility */
    reducedMotion?: boolean;
}

/**
 * Root provider for MellowUI
 * 
 * Wraps your app with theme context, motion configuration,
 * and custom color theming support.
 * 
 * @example
 * ```tsx
 * import { MellowProvider, createTheme } from '@mellow-ui/react';
 * 
 * // Use default mellow theme
 * function App() {
 *   return (
 *     <MellowProvider>
 *       <YourApp />
 *     </MellowProvider>
 *   );
 * }
 * 
 * // Or create a custom branded theme
 * const brandTheme = createTheme({
 *   name: 'my-brand',
 *   colors: {
 *     primary: '#6366F1',    // Your brand color
 *     accent: '#EC4899',
 *   },
 * });
 * 
 * function BrandedApp() {
 *   return (
 *     <MellowProvider theme={brandTheme}>
 *       <YourApp />
 *     </MellowProvider>
 *   );
 * }
 * ```
 */
export function MellowProvider({
    children,
    defaultTheme = 'system',
    theme = themes.mellow,
    reducedMotion = false,
}: MellowProviderProps) {
    // Generate CSS custom properties from the theme
    const cssVars = useMemo(() => themeToCSSVars(theme), [theme]);

    // Inject CSS variables into document root
    useEffect(() => {
        const root = document.documentElement;
        Object.entries(cssVars).forEach(([key, value]) => {
            if (value) {
                root.style.setProperty(key, value);
            }
        });

        // Cleanup on unmount or theme change
        return () => {
            Object.keys(cssVars).forEach((key) => {
                root.style.removeProperty(key);
            });
        };
    }, [cssVars]);

    return (
        <MotionConfig reducedMotion={reducedMotion ? 'always' : 'user'}>
            <ThemeProvider defaultMode={defaultTheme}>
                {children}
            </ThemeProvider>
        </MotionConfig>
    );
}

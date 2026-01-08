/**
 * MellowUI Theme Context
 * 
 * React context for theme management including light/dark mode.
 */

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { semanticColors } from '../tokens/colors';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export interface ThemeContextValue {
    /** Current theme mode setting */
    mode: ThemeMode;

    /** Resolved theme after system detection */
    theme: ResolvedTheme;

    /** Set the theme mode */
    setMode: (mode: ThemeMode) => void;

    /** Toggle between light and dark */
    toggleTheme: () => void;

    /** Current semantic colors based on theme */
    colors: typeof semanticColors.light | typeof semanticColors.dark;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Hook to access theme context
 */
export function useTheme(): ThemeContextValue {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a MellowProvider');
    }
    return context;
}

export interface ThemeProviderProps {
    children: ReactNode;

    /** Default theme mode */
    defaultMode?: ThemeMode;

    /** Storage key for persistence */
    storageKey?: string;
}

/**
 * Internal theme provider component
 */
export function ThemeProvider({
    children,
    defaultMode = 'system',
    storageKey = 'mellow-ui-theme',
}: ThemeProviderProps) {
    const [mode, setModeState] = useState<ThemeMode>(() => {
        if (typeof window === 'undefined') return defaultMode;

        const stored = localStorage.getItem(storageKey);
        if (stored === 'light' || stored === 'dark' || stored === 'system') {
            return stored;
        }
        return defaultMode;
    });

    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');

    // Resolve system theme preference
    useEffect(() => {
        const updateResolvedTheme = () => {
            if (mode === 'system') {
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                setResolvedTheme(systemDark ? 'dark' : 'light');
            } else {
                setResolvedTheme(mode);
            }
        };

        updateResolvedTheme();

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', updateResolvedTheme);

        return () => mediaQuery.removeEventListener('change', updateResolvedTheme);
    }, [mode]);

    // Persist mode to storage
    const setMode = useCallback((newMode: ThemeMode) => {
        setModeState(newMode);
        if (typeof window !== 'undefined') {
            localStorage.setItem(storageKey, newMode);
        }
    }, [storageKey]);

    const toggleTheme = useCallback(() => {
        setMode(resolvedTheme === 'light' ? 'dark' : 'light');
    }, [resolvedTheme, setMode]);

    const colors = resolvedTheme === 'dark' ? semanticColors.dark : semanticColors.light;

    const value: ThemeContextValue = {
        mode,
        theme: resolvedTheme,
        setMode,
        toggleTheme,
        colors,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

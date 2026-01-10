import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const isLib = mode === 'lib';

    return {
        plugins: [
            react(),
            isLib && dts({
                include: ['src'],
                exclude: ['src/**/*.stories.tsx', 'src/**/*.test.tsx', 'src/test/**'],
                outDir: 'dist',
            }),
        ].filter(Boolean),
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src'),
                '@tokens': resolve(__dirname, 'src/tokens'),
                '@motion': resolve(__dirname, 'src/motion'),
                '@components': resolve(__dirname, 'src/components'),
                '@theme': resolve(__dirname, 'src/theme'),
            },
        },
        build: isLib ? {
            lib: {
                entry: resolve(__dirname, 'src/index.ts'),
                name: 'MellowUI',
                formats: ['es', 'cjs'],
                fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
            },
            rollupOptions: {
                external: ['react', 'react-dom', 'react/jsx-runtime'],
                output: {
                    globals: {
                        react: 'React',
                        'react-dom': 'ReactDOM',
                        'react/jsx-runtime': 'jsxRuntime',
                    },
                    assetFileNames: 'styles[extname]',
                },
            },
            cssCodeSplit: false,
            sourcemap: true,
        } : undefined,
    };
});

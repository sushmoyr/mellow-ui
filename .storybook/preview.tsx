import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { MellowProvider } from '../src/theme/MellowProvider';
import '../src/styles/globals.css';

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            default: 'mellow-light',
            values: [
                { name: 'mellow-light', value: '#FFFDFB' },
                { name: 'mellow-dark', value: '#14141F' },
                { name: 'white', value: '#ffffff' },
            ],
        },
    },
    decorators: [
        (Story) => (
            <MellowProvider defaultTheme="light">
                <div style={{ padding: '24px' }}>
                    <Story />
                </div>
            </MellowProvider>
        ),
    ],
};

export default preview;

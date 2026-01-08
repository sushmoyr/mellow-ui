import type { Meta, StoryObj } from '@storybook/react';
import { MellowProvider } from '../../theme/MellowProvider';
import { themes } from '../../theme/createTheme';
import { Button } from '../Button/Button';

const meta: Meta = {
    title: 'Theming/Pre-built Themes',
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: `
MellowUI includes pre-built themes for different aesthetics.

Use \`createTheme()\` to create your own custom theme, or use one of these ready-made options.
        `,
            },
        },
    },
};

export default meta;

// Helper component to show theme colors
const ThemeShowcase = ({ themeName, theme }: { themeName: string; theme: typeof themes.mellow }) => (
    <MellowProvider theme={theme}>
        <div style={{
            padding: '32px',
            borderRadius: '24px',
            backgroundColor: theme.colors.backgroundLight,
            border: `2px solid ${theme.colors.primary}20`,
        }}>
            <h3 style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '24px',
                margin: '0 0 8px 0',
                color: '#29293D',
            }}>
                {themeName}
            </h3>
            <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: '#52527A',
                margin: '0 0 24px 0',
            }}>
                Primary: {theme.colors.primary}
            </p>

            {/* Color swatches */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {Object.entries(theme.colors).map(([name, color]) => (
                    <div key={name} style={{ textAlign: 'center' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            backgroundColor: color,
                            border: '2px solid rgba(0,0,0,0.1)',
                            marginBottom: '4px',
                        }} />
                        <span style={{
                            fontSize: '10px',
                            fontFamily: 'Inter, sans-serif',
                            color: '#52527A',
                        }}>
                            {name}
                        </span>
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Button variant="solid" color="primary">Primary</Button>
                <Button variant="solid" color="accent">Accent</Button>
                <Button variant="soft" color="primary">Soft</Button>
                <Button variant="outline" color="primary">Outline</Button>
            </div>
        </div>
    </MellowProvider>
);

export const Mellow: StoryObj = {
    render: () => <ThemeShowcase themeName="🌸 Mellow (Default)" theme={themes.mellow} />,
    parameters: {
        docs: {
            description: {
                story: 'The default warm, atmospheric theme with lavender, cream, and peach tones.',
            },
        },
    },
};

export const Ocean: StoryObj = {
    render: () => <ThemeShowcase themeName="🌊 Ocean" theme={themes.ocean} />,
    parameters: {
        docs: {
            description: {
                story: 'Cool, calm blues and cyans. Great for productivity and focus apps.',
            },
        },
    },
};

export const Forest: StoryObj = {
    render: () => <ThemeShowcase themeName="🌲 Forest" theme={themes.forest} />,
    parameters: {
        docs: {
            description: {
                story: 'Natural greens for wellness, eco, and nature-focused applications.',
            },
        },
    },
};

export const Sunset: StoryObj = {
    render: () => <ThemeShowcase themeName="🌅 Sunset" theme={themes.sunset} />,
    parameters: {
        docs: {
            description: {
                story: 'Warm oranges and pinks. Perfect for creative and energetic apps.',
            },
        },
    },
};

export const AllThemes: StoryObj = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <ThemeShowcase themeName="🌸 Mellow" theme={themes.mellow} />
            <ThemeShowcase themeName="🌊 Ocean" theme={themes.ocean} />
            <ThemeShowcase themeName="🌲 Forest" theme={themes.forest} />
            <ThemeShowcase themeName="🌅 Sunset" theme={themes.sunset} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All pre-built themes side by side for comparison.',
            },
        },
    },
};

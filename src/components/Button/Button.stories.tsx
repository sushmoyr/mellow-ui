import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['solid', 'soft', 'outline', 'ghost'],
            description: 'Visual style of the button',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Size of the button',
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'accent', 'danger'],
            description: 'Color scheme',
        },
        isLoading: {
            control: 'boolean',
            description: 'Show loading spinner',
        },
        disabled: {
            control: 'boolean',
            description: 'Disable the button',
        },
        fullWidth: {
            control: 'boolean',
            description: 'Make button full width',
        },
        pill: {
            control: 'boolean',
            description: 'Use pill shape (full border-radius)',
        },
    },
    parameters: {
        docs: {
            description: {
                component: `
A squishy, delightful button with spring physics.

**Features:**
- 🫧 Satisfying press feedback with spring physics
- ✨ Subtle hover lift effect
- 🎨 Multiple variants and colors
- ♿ Fully accessible
        `,
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ============ Core Stories ============

export const Default: Story = {
    args: {
        children: 'Click me',
        variant: 'solid',
        color: 'primary',
        size: 'md',
    },
};

export const Solid: Story = {
    args: {
        children: 'Solid Button',
        variant: 'solid',
        color: 'primary',
    },
};

export const Soft: Story = {
    args: {
        children: 'Soft Button',
        variant: 'soft',
        color: 'primary',
    },
};

export const Outline: Story = {
    args: {
        children: 'Outline Button',
        variant: 'outline',
        color: 'primary',
    },
};

export const Ghost: Story = {
    args: {
        children: 'Ghost Button',
        variant: 'ghost',
        color: 'primary',
    },
};

// ============ Colors ============

export const Primary: Story = {
    args: {
        children: 'Primary',
        color: 'primary',
    },
};

export const Secondary: Story = {
    args: {
        children: 'Secondary',
        color: 'secondary',
    },
};

export const Accent: Story = {
    args: {
        children: 'Accent',
        color: 'accent',
    },
};

export const Danger: Story = {
    args: {
        children: 'Danger',
        color: 'danger',
    },
};

// ============ Sizes ============

export const Small: Story = {
    args: {
        children: 'Small',
        size: 'sm',
    },
};

export const Medium: Story = {
    args: {
        children: 'Medium',
        size: 'md',
    },
};

export const Large: Story = {
    args: {
        children: 'Large',
        size: 'lg',
    },
};

// ============ States ============

export const Loading: Story = {
    args: {
        children: 'Loading...',
        isLoading: true,
    },
};

export const Disabled: Story = {
    args: {
        children: 'Disabled',
        disabled: true,
    },
};

export const Pill: Story = {
    args: {
        children: 'Pill Shape',
        pill: true,
    },
};

export const FullWidth: Story = {
    args: {
        children: 'Full Width Button',
        fullWidth: true,
    },
};

// ============ All Variants ============

export const AllVariants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
                <h3 style={{ marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>Solid</h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button variant="solid" color="primary">Primary</Button>
                    <Button variant="solid" color="secondary">Secondary</Button>
                    <Button variant="solid" color="accent">Accent</Button>
                    <Button variant="solid" color="danger">Danger</Button>
                </div>
            </div>
            <div>
                <h3 style={{ marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>Soft</h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button variant="soft" color="primary">Primary</Button>
                    <Button variant="soft" color="secondary">Secondary</Button>
                    <Button variant="soft" color="accent">Accent</Button>
                    <Button variant="soft" color="danger">Danger</Button>
                </div>
            </div>
            <div>
                <h3 style={{ marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>Outline</h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button variant="outline" color="primary">Primary</Button>
                    <Button variant="outline" color="secondary">Secondary</Button>
                    <Button variant="outline" color="accent">Accent</Button>
                    <Button variant="outline" color="danger">Danger</Button>
                </div>
            </div>
            <div>
                <h3 style={{ marginBottom: '12px', fontFamily: 'Inter, sans-serif' }}>Ghost</h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button variant="ghost" color="primary">Primary</Button>
                    <Button variant="ghost" color="secondary">Secondary</Button>
                    <Button variant="ghost" color="accent">Accent</Button>
                    <Button variant="ghost" color="danger">Danger</Button>
                </div>
            </div>
        </div>
    ),
};

// ============ All Sizes ============

export const AllSizes: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
        </div>
    ),
};

// ============ Interactive Demo ============

export const InteractiveDemo: Story = {
    render: () => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
            padding: '48px',
            backgroundColor: '#FFF9F4',
            borderRadius: '24px',
        }}>
            <h2 style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '24px',
                color: '#29293D',
                margin: 0,
            }}>
                Try the Squishy Button! 🫧
            </h2>
            <p style={{
                fontFamily: 'Inter, sans-serif',
                color: '#52527A',
                textAlign: 'center',
                margin: 0,
            }}>
                Click and hold to feel the satisfying spring physics
            </p>
            <Button size="lg" pill>
                Press & Hold Me
            </Button>
        </div>
    ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';
import { VStack, HStack } from '../Stack';

const meta: Meta<typeof Divider> = {
    title: 'Layout/Divider',
    component: Divider,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
        },
        variant: {
            control: 'select',
            options: ['solid', 'dashed', 'dotted'],
        },
        color: {
            control: 'select',
            options: ['default', 'subtle', 'accent'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Divider>;

// ========== Stories ==========

export const Default: Story = {
    decorators: [
        (Story) => (
            <div style={{ width: 300 }}>
                <Story />
            </div>
        ),
    ],
};

export const WithContent: Story = {
    name: 'With Content',
    render: () => (
        <VStack spacing={16} style={{ width: 300 }}>
            <div style={{ color: '#29293D' }}>Above the divider</div>
            <Divider />
            <div style={{ color: '#29293D' }}>Below the divider</div>
        </VStack>
    ),
};

export const Variants: Story = {
    render: () => (
        <VStack spacing={20} style={{ width: 300 }}>
            <div>
                <span style={{ color: '#6B5A47', fontSize: 12 }}>Solid</span>
                <Divider variant="solid" spacing={8} />
            </div>
            <div>
                <span style={{ color: '#6B5A47', fontSize: 12 }}>Dashed</span>
                <Divider variant="dashed" spacing={8} />
            </div>
            <div>
                <span style={{ color: '#6B5A47', fontSize: 12 }}>Dotted</span>
                <Divider variant="dotted" spacing={8} />
            </div>
        </VStack>
    ),
};

export const Colors: Story = {
    render: () => (
        <VStack spacing={16} style={{ width: 300 }}>
            <Divider color="default" />
            <Divider color="subtle" />
            <Divider color="accent" />
        </VStack>
    ),
};

export const Vertical: Story = {
    render: () => (
        <HStack spacing={16} style={{ height: 80, alignItems: 'stretch' }}>
            <div style={{ color: '#29293D' }}>Left</div>
            <Divider orientation="vertical" />
            <div style={{ color: '#29293D' }}>Center</div>
            <Divider orientation="vertical" color="accent" />
            <div style={{ color: '#29293D' }}>Right</div>
        </HStack>
    ),
};

export const Thickness: Story = {
    render: () => (
        <VStack spacing={16} style={{ width: 300 }}>
            <Divider thickness={1} color="accent" />
            <Divider thickness={2} color="accent" />
            <Divider thickness={4} color="accent" />
        </VStack>
    ),
};

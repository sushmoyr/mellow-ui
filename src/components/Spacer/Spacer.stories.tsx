import type { Meta, StoryObj } from '@storybook/react';
import { Spacer } from './Spacer';
import { HStack, VStack } from '../Stack';

const meta: Meta<typeof Spacer> = {
    title: 'Layout/Spacer',
    component: Spacer,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Spacer>;

const Box = ({ children }: { children: React.ReactNode }) => (
    <div style={{
        padding: '8px 16px',
        background: 'rgba(179, 153, 255, 0.2)',
        borderRadius: 6,
        color: '#5C3D99',
        fontWeight: 500,
    }}>
        {children}
    </div>
);

export const FlexibleSpace: Story = {
    name: 'Flexible Space',
    render: () => (
        <HStack style={{ width: '100%', maxWidth: 400, border: '1px dashed rgba(179, 153, 255, 0.3)', padding: 8, borderRadius: 8 }}>
            <Box>Logo</Box>
            <Spacer />
            <Box>Menu</Box>
        </HStack>
    ),
};

export const FixedSpace: Story = {
    name: 'Fixed Space',
    render: () => (
        <VStack align="start">
            <Box>Item 1</Box>
            <Spacer size={32} axis="vertical" />
            <Box>Item 2</Box>
            <Spacer size={16} axis="vertical" />
            <Box>Item 3</Box>
        </VStack>
    ),
};

export const HeaderLayout: Story = {
    name: 'Header Layout Example',
    render: () => (
        <HStack
            align="center"
            style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(255, 253, 251, 0.9)',
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
        >
            <span style={{ fontWeight: 600, color: '#5C3D99' }}>MellowUI</span>
            <Spacer />
            <HStack spacing={12}>
                <span style={{ color: '#6B5A47' }}>Docs</span>
                <span style={{ color: '#6B5A47' }}>Components</span>
                <Box>Get Started</Box>
            </HStack>
        </HStack>
    ),
};

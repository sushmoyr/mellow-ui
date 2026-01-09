import type { Meta, StoryObj } from '@storybook/react';
import { Stack, HStack, VStack } from './Stack';

const meta: Meta<typeof Stack> = {
    title: 'Layout/Stack',
    component: Stack,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        direction: {
            control: 'select',
            options: ['row', 'column', 'row-reverse', 'column-reverse'],
        },
        align: {
            control: 'select',
            options: ['start', 'center', 'end', 'stretch', 'baseline'],
        },
        justify: {
            control: 'select',
            options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Stack>;

const Box = ({ children, color = 'lavender' }: { children: React.ReactNode; color?: string }) => (
    <div style={{
        padding: '12px 20px',
        background: color === 'lavender' ? 'rgba(179, 153, 255, 0.2)' :
            color === 'peach' ? 'rgba(255, 175, 153, 0.3)' : 'rgba(255, 217, 179, 0.3)',
        borderRadius: 8,
        color: '#29293D',
        fontWeight: 500,
    }}>
        {children}
    </div>
);

// ========== Stories ==========

export const Vertical: Story = {
    render: () => (
        <VStack spacing={12}>
            <Box>Item 1</Box>
            <Box>Item 2</Box>
            <Box>Item 3</Box>
        </VStack>
    ),
};

export const Horizontal: Story = {
    render: () => (
        <HStack spacing={12}>
            <Box>Item 1</Box>
            <Box>Item 2</Box>
            <Box>Item 3</Box>
        </HStack>
    ),
};

export const WithAlignment: Story = {
    name: 'With Alignment',
    render: () => (
        <HStack spacing={12} align="center" justify="between" style={{ width: '100%', maxWidth: 400 }}>
            <Box color="lavender">Left</Box>
            <Box color="peach">Center</Box>
            <Box color="cream">Right</Box>
        </HStack>
    ),
};

export const Wrapping: Story = {
    render: () => (
        <Stack direction="row" spacing={8} wrap style={{ maxWidth: 300 }}>
            {['One', 'Two', 'Three', 'Four', 'Five', 'Six'].map((item) => (
                <Box key={item}>{item}</Box>
            ))}
        </Stack>
    ),
};

export const NestedStacks: Story = {
    name: 'Nested Stacks',
    render: () => (
        <VStack spacing={16}>
            <HStack spacing={8}>
                <Box color="lavender">Row 1 - A</Box>
                <Box color="lavender">Row 1 - B</Box>
            </HStack>
            <HStack spacing={8}>
                <Box color="peach">Row 2 - A</Box>
                <Box color="peach">Row 2 - B</Box>
                <Box color="peach">Row 2 - C</Box>
            </HStack>
        </VStack>
    ),
};

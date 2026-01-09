import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from './Kbd';
import { HStack } from '../Stack';

const meta: Meta<typeof Kbd> = {
    title: 'Data Display/Kbd',
    component: Kbd,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Kbd>;

export const Default: Story = {
    render: () => <Kbd>⌘</Kbd>,
};

export const Shortcut: Story = {
    render: () => (
        <HStack spacing={4} align="center">
            <Kbd>⌘</Kbd>
            <span style={{ color: '#6B5A47' }}>+</span>
            <Kbd>S</Kbd>
        </HStack>
    ),
};

export const Sizes: Story = {
    render: () => (
        <HStack spacing={16} align="center">
            <Kbd size="sm">Esc</Kbd>
            <Kbd size="md">Enter</Kbd>
            <Kbd size="lg">Space</Kbd>
        </HStack>
    ),
};

export const ComplexShortcut: Story = {
    name: 'Complex Shortcut',
    render: () => (
        <p style={{ color: '#29293D', fontSize: 14 }}>
            Press <Kbd>⌘</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd> to open command palette
        </p>
    ),
};

export const ModifierKeys: Story = {
    name: 'Modifier Keys',
    render: () => (
        <HStack spacing={8}>
            <Kbd>⌘</Kbd>
            <Kbd>⌥</Kbd>
            <Kbd>⇧</Kbd>
            <Kbd>⌃</Kbd>
            <Kbd>↵</Kbd>
            <Kbd>⌫</Kbd>
            <Kbd>⇥</Kbd>
        </HStack>
    ),
};

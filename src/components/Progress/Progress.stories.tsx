import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { Progress } from './Progress';
import { VStack, HStack } from '../Stack';

const meta: Meta<typeof Progress> = {
    title: 'Feedback/Progress',
    component: Progress,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: 300 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
    args: {
        value: 60,
    },
};

export const Animated: Story = {
    render: function AnimatedProgress() {
        const [value, setValue] = useState(0);

        useEffect(() => {
            const interval = setInterval(() => {
                setValue((v) => (v >= 100 ? 0 : v + 10));
            }, 500);
            return () => clearInterval(interval);
        }, []);

        return <Progress value={value} />;
    },
};

export const WithValue: Story = {
    name: 'With Value Label',
    render: () => (
        <VStack spacing={16}>
            <Progress value={25} showValue size="lg" />
            <Progress value={50} showValue size="lg" />
            <Progress value={75} showValue size="lg" />
        </VStack>
    ),
};

export const Sizes: Story = {
    render: () => (
        <VStack spacing={16}>
            <Progress value={60} size="sm" />
            <Progress value={60} size="md" />
            <Progress value={60} size="lg" />
        </VStack>
    ),
};

export const Colors: Story = {
    render: () => (
        <VStack spacing={16}>
            <Progress value={60} color="primary" />
            <Progress value={60} color="secondary" />
            <Progress value={60} color="accent" />
        </VStack>
    ),
};

export const Indeterminate: Story = {
    render: () => <Progress indeterminate />,
};

export const Circular: Story = {
    render: () => (
        <HStack spacing={24} justify="center">
            <Progress variant="circular" value={25} size="sm" />
            <Progress variant="circular" value={50} size="md" />
            <Progress variant="circular" value={75} size="lg" showValue />
        </HStack>
    ),
};

export const CircularIndeterminate: Story = {
    name: 'Circular Indeterminate',
    render: () => (
        <HStack spacing={24} justify="center">
            <Progress variant="circular" indeterminate size="sm" color="primary" />
            <Progress variant="circular" indeterminate size="md" color="secondary" />
            <Progress variant="circular" indeterminate size="lg" color="accent" />
        </HStack>
    ),
};

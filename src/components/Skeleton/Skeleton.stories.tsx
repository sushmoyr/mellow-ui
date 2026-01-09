import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonCircle, SkeletonText } from './Skeleton';
import { VStack, HStack } from '../Stack';

const meta: Meta<typeof Skeleton> = {
    title: 'Feedback/Skeleton',
    component: Skeleton,
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
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
    render: () => <Skeleton />,
};

export const Text: Story = {
    render: () => (
        <VStack spacing={8}>
            <SkeletonText width="80%" />
            <SkeletonText />
            <SkeletonText width="60%" />
        </VStack>
    ),
};

export const Circular: Story = {
    render: () => (
        <HStack spacing={16}>
            <SkeletonCircle width={32} height={32} />
            <SkeletonCircle width={48} height={48} />
            <SkeletonCircle width={64} height={64} />
        </HStack>
    ),
};

export const Rectangular: Story = {
    render: () => (
        <Skeleton variant="rectangular" height={120} radius={12} />
    ),
};

export const CardPlaceholder: Story = {
    name: 'Card Placeholder',
    render: () => (
        <div style={{
            padding: 16,
            background: '#FFFDFB',
            borderRadius: 12,
            border: '1px solid rgba(107, 90, 71, 0.1)',
        }}>
            <HStack spacing={12} align="start">
                <SkeletonCircle width={48} height={48} />
                <VStack spacing={8} style={{ flex: 1 }}>
                    <SkeletonText width="60%" height={14} />
                    <SkeletonText width="40%" height={12} />
                </VStack>
            </HStack>
            <Skeleton variant="rectangular" height={100} radius={8} style={{ marginTop: 16 }} />
            <HStack spacing={8} style={{ marginTop: 12 }}>
                <SkeletonText width={60} height={24} />
                <SkeletonText width={60} height={24} />
            </HStack>
        </div>
    ),
};

export const Animations: Story = {
    render: () => (
        <VStack spacing={16}>
            <div>
                <span style={{ fontSize: 12, color: '#6B5A47', marginBottom: 4, display: 'block' }}>Shimmer</span>
                <Skeleton animation="shimmer" height={40} />
            </div>
            <div>
                <span style={{ fontSize: 12, color: '#6B5A47', marginBottom: 4, display: 'block' }}>Pulse</span>
                <Skeleton animation="pulse" height={40} />
            </div>
            <div>
                <span style={{ fontSize: 12, color: '#6B5A47', marginBottom: 4, display: 'block' }}>None</span>
                <Skeleton animation="none" height={40} />
            </div>
        </VStack>
    ),
};

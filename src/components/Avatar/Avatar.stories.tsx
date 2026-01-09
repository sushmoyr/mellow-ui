import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from './Avatar';
import { HStack } from '../Stack';

const meta: Meta<typeof Avatar> = {
    title: 'Data Display/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
    render: () => <Avatar name="John Doe" />,
};

export const WithImage: Story = {
    name: 'With Image',
    render: () => (
        <Avatar
            src="https://i.pravatar.cc/150?img=3"
            alt="User"
            name="Jane Smith"
        />
    ),
};

export const Sizes: Story = {
    render: () => (
        <HStack spacing={12} align="center">
            <Avatar name="XS" size="xs" />
            <Avatar name="SM" size="sm" />
            <Avatar name="MD" size="md" />
            <Avatar name="LG" size="lg" />
            <Avatar name="XL" size="xl" />
        </HStack>
    ),
};

export const Colors: Story = {
    render: () => (
        <HStack spacing={12}>
            <Avatar name="Primary" color="primary" />
            <Avatar name="Secondary" color="secondary" />
            <Avatar name="Accent" color="accent" />
            <Avatar name="Gray" color="gray" />
        </HStack>
    ),
};

export const Group: Story = {
    render: () => (
        <AvatarGroup size="md">
            <Avatar name="Alice" color="primary" />
            <Avatar name="Bob" color="accent" />
            <Avatar name="Charlie" color="secondary" />
            <Avatar name="David" color="gray" />
        </AvatarGroup>
    ),
};

export const GroupWithMax: Story = {
    name: 'Group with Max',
    render: () => (
        <AvatarGroup max={3} size="md">
            <Avatar name="Alice" color="primary" />
            <Avatar name="Bob" color="accent" />
            <Avatar name="Charlie" color="secondary" />
            <Avatar name="David" color="gray" />
            <Avatar name="Eve" color="primary" />
            <Avatar name="Frank" color="accent" />
        </AvatarGroup>
    ),
};

export const FallbackIcon: Story = {
    name: 'Custom Fallback',
    render: () => (
        <Avatar fallback={<span>👤</span>} size="lg" color="gray" />
    ),
};

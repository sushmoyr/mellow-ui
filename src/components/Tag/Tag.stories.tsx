import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Tag } from './Tag';
import { HStack, VStack } from '../Stack';

const meta: Meta<typeof Tag> = {
    title: 'Data Display/Tag',
    component: Tag,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
    render: () => <Tag>Default Tag</Tag>,
};

export const Colors: Story = {
    render: () => (
        <HStack spacing={8} wrap>
            <Tag color="primary">Primary</Tag>
            <Tag color="secondary">Secondary</Tag>
            <Tag color="accent">Accent</Tag>
            <Tag color="gray">Gray</Tag>
            <Tag color="success">Success</Tag>
            <Tag color="warning">Warning</Tag>
            <Tag color="error">Error</Tag>
        </HStack>
    ),
};

export const Variants: Story = {
    render: () => (
        <VStack spacing={12}>
            <HStack spacing={8}>
                <Tag variant="subtle" color="primary">Subtle</Tag>
                <Tag variant="solid" color="primary">Solid</Tag>
                <Tag variant="outline" color="primary">Outline</Tag>
            </HStack>
            <HStack spacing={8}>
                <Tag variant="subtle" color="success">Subtle</Tag>
                <Tag variant="solid" color="success">Solid</Tag>
                <Tag variant="outline" color="success">Outline</Tag>
            </HStack>
        </VStack>
    ),
};

export const Sizes: Story = {
    render: () => (
        <HStack spacing={8} align="center">
            <Tag size="sm">Small</Tag>
            <Tag size="md">Medium</Tag>
            <Tag size="lg">Large</Tag>
        </HStack>
    ),
};

export const WithIcon: Story = {
    name: 'With Icon',
    render: () => (
        <HStack spacing={8}>
            <Tag icon="🏷️" color="primary">Label</Tag>
            <Tag icon="✓" color="success">Complete</Tag>
            <Tag icon="⚠" color="warning">Warning</Tag>
        </HStack>
    ),
};

export const Removable: Story = {
    render: function RemovableTags() {
        const [tags, setTags] = useState(['React', 'TypeScript', 'Storybook', 'Framer Motion']);

        return (
            <HStack spacing={8} wrap>
                {tags.map((tag) => (
                    <Tag
                        key={tag}
                        removable
                        onRemove={() => setTags(tags.filter(t => t !== tag))}
                    >
                        {tag}
                    </Tag>
                ))}
            </HStack>
        );
    },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
    title: 'Components/Badge',
    component: Badge,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['solid', 'soft', 'outline'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md'],
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'accent', 'success', 'warning', 'danger'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
    args: {
        children: 'Badge',
    },
};

export const Colors: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Badge color="primary">Primary</Badge>
            <Badge color="secondary">Secondary</Badge>
            <Badge color="accent">Accent</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="danger">Danger</Badge>
        </div>
    ),
};

export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
                <Badge variant="solid" color="primary">Solid</Badge>
                <Badge variant="solid" color="success">Solid</Badge>
                <Badge variant="solid" color="danger">Solid</Badge>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
                <Badge variant="soft" color="primary">Soft</Badge>
                <Badge variant="soft" color="success">Soft</Badge>
                <Badge variant="soft" color="danger">Soft</Badge>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
                <Badge variant="outline" color="primary">Outline</Badge>
                <Badge variant="outline" color="success">Outline</Badge>
                <Badge variant="outline" color="danger">Outline</Badge>
            </div>
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
        </div>
    ),
};

export const StatusBadges: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '8px' }}>
            <Badge color="success">Active</Badge>
            <Badge color="warning">Pending</Badge>
            <Badge color="danger">Error</Badge>
            <Badge color="secondary">Archived</Badge>
        </div>
    ),
};

export const InContext: Story = {
    render: () => (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px',
            backgroundColor: '#FFFDFB',
            borderRadius: '12px',
        }}>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px' }}>
                Project Status
            </span>
            <Badge color="success">Completed</Badge>
        </div>
    ),
};

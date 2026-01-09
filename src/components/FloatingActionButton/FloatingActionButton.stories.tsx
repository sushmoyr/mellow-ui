import type { Meta, StoryObj } from '@storybook/react';
import { FloatingActionButton } from './FloatingActionButton';

const meta: Meta<typeof FloatingActionButton> = {
    title: 'Components/FloatingActionButton',
    component: FloatingActionButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'accent'],
        },
        position: {
            control: 'select',
            options: ['bottom-right', 'bottom-left', 'bottom-center'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof FloatingActionButton>;

// Icons
const PlusIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
);

const EditIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);

const ChatIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);

// ========== Stories ==========

export const Default: Story = {
    render: () => (
        <FloatingActionButton icon={<PlusIcon />} aria-label="Add item" />
    ),
};

export const Extended: Story = {
    render: () => (
        <FloatingActionButton icon={<PlusIcon />} label="Create" />
    ),
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <FloatingActionButton icon={<PlusIcon />} size="sm" aria-label="Small" />
            <FloatingActionButton icon={<PlusIcon />} size="md" aria-label="Medium" />
            <FloatingActionButton icon={<PlusIcon />} size="lg" aria-label="Large" />
        </div>
    ),
};

export const Colors: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <FloatingActionButton icon={<PlusIcon />} color="primary" aria-label="Primary" />
            <FloatingActionButton icon={<PlusIcon />} color="secondary" aria-label="Secondary" />
            <FloatingActionButton icon={<PlusIcon />} color="accent" aria-label="Accent" />
        </div>
    ),
};

export const ExtendedColors: Story = {
    name: 'Extended with Colors',
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <FloatingActionButton icon={<PlusIcon />} label="Add New" color="primary" />
            <FloatingActionButton icon={<EditIcon />} label="Edit" color="secondary" />
            <FloatingActionButton icon={<ChatIcon />} label="Message" color="accent" />
        </div>
    ),
};

export const Disabled: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <FloatingActionButton icon={<PlusIcon />} disabled aria-label="Disabled" />
            <FloatingActionButton icon={<PlusIcon />} label="Disabled" disabled />
        </div>
    ),
};

export const FixedPosition: Story = {
    name: 'Fixed Position (Demo)',
    parameters: {
        layout: 'fullscreen',
    },
    render: () => (
        <div style={{
            height: '400px',
            background: 'linear-gradient(135deg, #FFFDFB 0%, #FFF9F5 100%)',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 16,
        }}>
            <div style={{ padding: 24, color: '#6B5A47' }}>
                <h3 style={{ marginBottom: 8 }}>Content Area</h3>
                <p>The FAB floats in the bottom-right corner.</p>
            </div>
            {/* Note: In real usage, use fixed={true} for actual fixed positioning */}
            <div style={{ position: 'absolute', bottom: 24, right: 24 }}>
                <FloatingActionButton icon={<PlusIcon />} aria-label="Add" />
            </div>
        </div>
    ),
};

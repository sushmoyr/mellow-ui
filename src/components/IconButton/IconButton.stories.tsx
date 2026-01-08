import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

// Simple SVG icons for demo
const HeartIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

const StarIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
);

const PlusIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 5v14M5 12h14" />
    </svg>
);

const SettingsIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
    </svg>
);

const meta: Meta<typeof IconButton> = {
    title: 'Components/IconButton',
    component: IconButton,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        variant: {
            control: 'select',
            options: ['solid', 'soft', 'outline', 'ghost'],
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'accent', 'danger'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Default: Story = {
    args: {
        icon: <HeartIcon />,
        'aria-label': 'Like',
    },
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <IconButton icon={<HeartIcon />} aria-label="Like" size="sm" />
            <IconButton icon={<HeartIcon />} aria-label="Like" size="md" />
            <IconButton icon={<HeartIcon />} aria-label="Like" size="lg" />
        </div>
    ),
};

export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px' }}>
            <IconButton icon={<StarIcon />} aria-label="Star" variant="solid" />
            <IconButton icon={<StarIcon />} aria-label="Star" variant="soft" />
            <IconButton icon={<StarIcon />} aria-label="Star" variant="outline" />
            <IconButton icon={<StarIcon />} aria-label="Star" variant="ghost" />
        </div>
    ),
};

export const Colors: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px' }}>
            <IconButton icon={<HeartIcon />} aria-label="Primary" color="primary" variant="solid" />
            <IconButton icon={<HeartIcon />} aria-label="Secondary" color="secondary" variant="solid" />
            <IconButton icon={<HeartIcon />} aria-label="Accent" color="accent" variant="solid" />
            <IconButton icon={<HeartIcon />} aria-label="Danger" color="danger" variant="solid" />
        </div>
    ),
};

export const SquareShape: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px' }}>
            <IconButton icon={<SettingsIcon />} aria-label="Settings" rounded={false} />
            <IconButton icon={<PlusIcon />} aria-label="Add" rounded={false} variant="solid" />
        </div>
    ),
};

export const Loading: Story = {
    args: {
        icon: <HeartIcon />,
        'aria-label': 'Loading',
        isLoading: true,
    },
};

export const Disabled: Story = {
    args: {
        icon: <HeartIcon />,
        'aria-label': 'Disabled',
        disabled: true,
    },
};

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
    title: 'Components/Toggle',
    component: Toggle,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        variant: {
            control: 'select',
            options: ['default', 'outline'],
        },
        pressed: {
            control: 'boolean',
        },
        disabled: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

// Simple icon components for stories
const BoldIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
        <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    </svg>
);

const ItalicIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="19" y1="4" x2="10" y2="4" />
        <line x1="14" y1="20" x2="5" y2="20" />
        <line x1="15" y1="4" x2="9" y2="20" />
    </svg>
);

const UnderlineIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
        <line x1="4" y1="21" x2="20" y2="21" />
    </svg>
);

const StarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
    </svg>
);

// ========== Basic Examples ==========

export const Default: Story = {
    render: () => <Toggle aria-label="Toggle option">B</Toggle>,
};

export const WithIcon: Story = {
    render: () => (
        <Toggle aria-label="Bold">
            <BoldIcon />
        </Toggle>
    ),
};

export const Pressed: Story = {
    render: () => (
        <Toggle defaultPressed aria-label="Bold">
            <BoldIcon />
        </Toggle>
    ),
};

// ========== Controlled ==========

export const Controlled: Story = {
    render: function ControlledToggle() {
        const [pressed, setPressed] = useState(false);
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <Toggle pressed={pressed} onPressedChange={setPressed} aria-label="Star">
                    <StarIcon />
                </Toggle>
                <span style={{ color: '#6B5A47', fontSize: 14 }}>
                    {pressed ? 'Starred!' : 'Not starred'}
                </span>
            </div>
        );
    },
};

// ========== Sizes ==========

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Toggle size="sm" aria-label="Bold small">
                <BoldIcon />
            </Toggle>
            <Toggle size="md" aria-label="Bold medium">
                <BoldIcon />
            </Toggle>
            <Toggle size="lg" aria-label="Bold large">
                <BoldIcon />
            </Toggle>
        </div>
    ),
};

// ========== Variants ==========

export const Outline: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Toggle variant="outline" aria-label="Bold">
                <BoldIcon />
            </Toggle>
            <Toggle variant="outline" defaultPressed aria-label="Italic">
                <ItalicIcon />
            </Toggle>
        </div>
    ),
};

// ========== Disabled ==========

export const Disabled: Story = {
    render: () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Toggle disabled aria-label="Bold disabled">
                <BoldIcon />
            </Toggle>
            <Toggle disabled defaultPressed aria-label="Italic disabled">
                <ItalicIcon />
            </Toggle>
        </div>
    ),
};

// ========== Real-World Examples ==========

export const TextFormatToolbar: Story = {
    name: 'Text Format Toolbar',
    render: function TextToolbar() {
        const [bold, setBold] = useState(false);
        const [italic, setItalic] = useState(false);
        const [underline, setUnderline] = useState(true);

        return (
            <div style={{
                display: 'flex',
                gap: 4,
                padding: 8,
                background: 'rgba(255, 249, 244, 0.8)',
                borderRadius: 12,
                border: '1px solid rgba(255, 236, 217, 0.6)',
            }}>
                <Toggle pressed={bold} onPressedChange={setBold} aria-label="Bold">
                    <BoldIcon />
                </Toggle>
                <Toggle pressed={italic} onPressedChange={setItalic} aria-label="Italic">
                    <ItalicIcon />
                </Toggle>
                <Toggle pressed={underline} onPressedChange={setUnderline} aria-label="Underline">
                    <UnderlineIcon />
                </Toggle>
            </div>
        );
    },
};

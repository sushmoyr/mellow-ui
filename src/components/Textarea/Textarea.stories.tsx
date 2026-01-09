import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
    title: 'Components/Textarea',
    component: Textarea,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
    },
    decorators: [
        (Story) => (
            <div style={{ width: 320 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

// ========== Stories ==========

export const Default: Story = {
    args: {
        placeholder: 'Enter your text...',
    },
};

export const WithLabel: Story = {
    name: 'With Floating Label',
    args: {
        label: 'Description',
        placeholder: 'Enter a description...',
    },
};

export const Controlled: Story = {
    render: function ControlledTextarea() {
        const [value, setValue] = useState('');
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Textarea
                    label="Message"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Type your message..."
                />
                <span style={{ color: '#6B5A47', fontSize: 14 }}>
                    Characters: {value.length}
                </span>
            </div>
        );
    },
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Textarea size="sm" placeholder="Small textarea" />
            <Textarea size="md" placeholder="Medium textarea" />
            <Textarea size="lg" placeholder="Large textarea" />
        </div>
    ),
};

export const WithError: Story = {
    name: 'With Error',
    args: {
        label: 'Bio',
        defaultValue: 'Too short',
        error: 'Bio must be at least 50 characters',
    },
};

export const WithHelperText: Story = {
    name: 'With Helper Text',
    args: {
        label: 'Notes',
        helperText: 'Add any additional notes here',
    },
};

export const AutoResize: Story = {
    name: 'Auto Resize',
    args: {
        label: 'Expandable',
        placeholder: 'Type to expand...',
        autoResize: true,
        minRows: 2,
        maxRows: 6,
    },
};

export const Disabled: Story = {
    args: {
        label: 'Disabled',
        defaultValue: 'This cannot be edited',
        disabled: true,
    },
};

export const FeedbackForm: Story = {
    name: 'Feedback Form Example',
    render: function FeedbackExample() {
        const [feedback, setFeedback] = useState('');
        return (
            <div style={{
                padding: 20,
                background: 'rgba(255, 249, 244, 0.8)',
                borderRadius: 12,
            }}>
                <h4 style={{ margin: '0 0 16px', color: '#29293D' }}>
                    Share Your Feedback
                </h4>
                <Textarea
                    label="Your feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Tell us what you think..."
                    autoResize
                    minRows={3}
                    maxRows={8}
                    helperText="We appreciate your honest feedback!"
                />
            </div>
        );
    },
};

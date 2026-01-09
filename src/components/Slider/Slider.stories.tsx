import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
    title: 'Components/Slider',
    component: Slider,
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
        min: { control: 'number' },
        max: { control: 'number' },
        step: { control: 'number' },
        showValue: { control: 'boolean' },
        disabled: { control: 'boolean' },
    },
    decorators: [
        (Story) => (
            <div style={{ width: 300 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Slider>;

// ========== Stories ==========

export const Default: Story = {
    args: {
        defaultValue: 50,
    },
};

export const WithValueTooltip: Story = {
    name: 'With Value Tooltip',
    args: {
        defaultValue: 50,
        showValue: true,
    },
};

export const Controlled: Story = {
    render: function ControlledSlider() {
        const [value, setValue] = useState(30);
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Slider value={value} onValueChange={setValue} />
                <span style={{ color: '#6B5A47', fontSize: 14, textAlign: 'center' }}>
                    Value: {value}
                </span>
            </div>
        );
    },
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Slider size="sm" defaultValue={40} />
            <Slider size="md" defaultValue={50} />
            <Slider size="lg" defaultValue={60} />
        </div>
    ),
};

export const Colors: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <Slider color="primary" defaultValue={50} />
            <Slider color="secondary" defaultValue={50} />
            <Slider color="accent" defaultValue={50} />
        </div>
    ),
};

export const WithSteps: Story = {
    name: 'With Steps',
    render: function StepSlider() {
        const [value, setValue] = useState(50);
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Slider
                    value={value}
                    onValueChange={setValue}
                    min={0}
                    max={100}
                    step={10}
                    showValue
                />
                <span style={{ color: '#6B5A47', fontSize: 14, textAlign: 'center' }}>
                    Step: 10 | Value: {value}
                </span>
            </div>
        );
    },
};

export const Disabled: Story = {
    args: {
        defaultValue: 50,
        disabled: true,
    },
};

export const VolumeControl: Story = {
    name: 'Volume Control Example',
    render: function VolumeSlider() {
        const [volume, setVolume] = useState(70);
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: 16,
                background: 'rgba(255, 249, 244, 0.8)',
                borderRadius: 12,
            }}>
                <span style={{ color: '#6B5A47', fontSize: 14 }}>🔉</span>
                <Slider
                    value={volume}
                    onValueChange={setVolume}
                    color="accent"
                    showValue
                />
                <span style={{ color: '#6B5A47', fontSize: 14 }}>🔊</span>
            </div>
        );
    },
};

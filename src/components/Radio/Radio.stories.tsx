import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioGroup, Radio } from './Radio';

const meta: Meta<typeof RadioGroup> = {
    title: 'Components/Radio',
    component: RadioGroup,
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
        orientation: {
            control: 'select',
            options: ['vertical', 'horizontal'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

// ========== Stories ==========

export const Default: Story = {
    render: () => (
        <RadioGroup defaultValue="option1">
            <Radio value="option1">Option 1</Radio>
            <Radio value="option2">Option 2</Radio>
            <Radio value="option3">Option 3</Radio>
        </RadioGroup>
    ),
};

export const Controlled: Story = {
    render: function ControlledRadio() {
        const [value, setValue] = useState('apple');
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <RadioGroup value={value} onValueChange={setValue}>
                    <Radio value="apple">Apple</Radio>
                    <Radio value="banana">Banana</Radio>
                    <Radio value="orange">Orange</Radio>
                </RadioGroup>
                <span style={{ color: '#6B5A47', fontSize: 14 }}>
                    Selected: {value}
                </span>
            </div>
        );
    },
};

export const Horizontal: Story = {
    render: () => (
        <RadioGroup defaultValue="sm" orientation="horizontal">
            <Radio value="sm">Small</Radio>
            <Radio value="md">Medium</Radio>
            <Radio value="lg">Large</Radio>
        </RadioGroup>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <RadioGroup defaultValue="a" size="sm">
                <Radio value="a">Small Radio</Radio>
                <Radio value="b">Another Option</Radio>
            </RadioGroup>

            <RadioGroup defaultValue="a" size="md">
                <Radio value="a">Medium Radio</Radio>
                <Radio value="b">Another Option</Radio>
            </RadioGroup>

            <RadioGroup defaultValue="a" size="lg">
                <Radio value="a">Large Radio</Radio>
                <Radio value="b">Another Option</Radio>
            </RadioGroup>
        </div>
    ),
};

export const Colors: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <RadioGroup defaultValue="primary" color="primary">
                <Radio value="primary">Primary (Lavender)</Radio>
            </RadioGroup>

            <RadioGroup defaultValue="secondary" color="secondary">
                <Radio value="secondary">Secondary (Cream)</Radio>
            </RadioGroup>

            <RadioGroup defaultValue="accent" color="accent">
                <Radio value="accent">Accent (Peach)</Radio>
            </RadioGroup>
        </div>
    ),
};

export const Disabled: Story = {
    render: () => (
        <RadioGroup defaultValue="option1" disabled>
            <Radio value="option1">Disabled Option 1</Radio>
            <Radio value="option2">Disabled Option 2</Radio>
        </RadioGroup>
    ),
};

export const WithDisabledOption: Story = {
    name: 'With Disabled Option',
    render: () => (
        <RadioGroup defaultValue="available">
            <Radio value="available">Available</Radio>
            <Radio value="unavailable" disabled>Unavailable (Disabled)</Radio>
            <Radio value="limited">Limited Availability</Radio>
        </RadioGroup>
    ),
};

export const PaymentMethods: Story = {
    name: 'Payment Methods Example',
    render: function PaymentExample() {
        const [method, setMethod] = useState('card');
        return (
            <div style={{
                padding: 20,
                background: 'rgba(255, 249, 244, 0.8)',
                borderRadius: 12,
                minWidth: 250,
            }}>
                <h4 style={{ margin: '0 0 16px', color: '#29293D' }}>
                    Payment Method
                </h4>
                <RadioGroup value={method} onValueChange={setMethod} color="accent">
                    <Radio value="card">💳 Credit Card</Radio>
                    <Radio value="paypal">📧 PayPal</Radio>
                    <Radio value="bank">🏦 Bank Transfer</Radio>
                    <Radio value="crypto" disabled>₿ Crypto (Coming Soon)</Radio>
                </RadioGroup>
            </div>
        );
    },
};

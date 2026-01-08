import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
    title: 'Components/Checkbox',
    component: Checkbox,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
    args: {
        label: 'Accept terms and conditions',
    },
};

export const Controlled: Story = {
    render: () => {
        const [checked, setChecked] = useState(false);
        return (
            <Checkbox
                label={checked ? 'Checked!' : 'Click me'}
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />
        );
    },
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Checkbox label="Small checkbox" size="sm" defaultChecked />
            <Checkbox label="Medium checkbox (default)" size="md" defaultChecked />
            <Checkbox label="Large checkbox" size="lg" defaultChecked />
        </div>
    ),
};

export const States: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Checkbox label="Unchecked" />
            <Checkbox label="Checked" defaultChecked />
            <Checkbox label="Disabled" disabled />
            <Checkbox label="Disabled checked" disabled defaultChecked />
            <Checkbox label="Error state" error />
        </div>
    ),
};

export const WithoutLabel: Story = {
    args: {},
};

export const FormExample: Story = {
    render: () => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '24px',
            backgroundColor: '#FFFDFB',
            borderRadius: '16px',
            maxWidth: '400px',
        }}>
            <p style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '18px',
                color: '#29293D',
                margin: 0,
            }}>
                Email Preferences
            </p>
            <Checkbox label="Receive product updates" defaultChecked />
            <Checkbox label="Receive newsletter" />
            <Checkbox label="Receive promotional offers" />
            <Checkbox label="Allow third-party cookies" />
        </div>
    ),
};

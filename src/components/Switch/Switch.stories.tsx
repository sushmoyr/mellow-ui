import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
    title: 'Components/Switch',
    component: Switch,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
    args: {
        label: 'Enable notifications',
    },
};

export const Controlled: Story = {
    render: () => {
        const [enabled, setEnabled] = useState(false);
        return (
            <Switch
                label={enabled ? 'Enabled' : 'Disabled'}
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
            />
        );
    },
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Switch label="Small" size="sm" defaultChecked />
            <Switch label="Medium (default)" size="md" defaultChecked />
            <Switch label="Large" size="lg" defaultChecked />
        </div>
    ),
};

export const States: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Switch label="Off" />
            <Switch label="On" defaultChecked />
            <Switch label="Disabled off" disabled />
            <Switch label="Disabled on" disabled defaultChecked />
        </div>
    ),
};

export const WithoutLabel: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '16px' }}>
            <Switch />
            <Switch defaultChecked />
        </div>
    ),
};

export const SettingsExample: Story = {
    render: () => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            padding: '16px',
            backgroundColor: '#FFFDFB',
            borderRadius: '16px',
            maxWidth: '400px',
        }}>
            <p style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '18px',
                color: '#29293D',
                margin: '0 0 16px 0',
            }}>
                Settings
            </p>
            {[
                { label: 'Push notifications', checked: true },
                { label: 'Email updates', checked: false },
                { label: 'Dark mode', checked: false },
                { label: 'Sounds', checked: true },
            ].map((item, i) => (
                <div
                    key={i}
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 0',
                        borderBottom: i < 3 ? '1px solid #FFECD9' : 'none',
                    }}
                >
                    <span style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '16px',
                        color: '#29293D',
                    }}>
                        {item.label}
                    </span>
                    <Switch defaultChecked={item.checked} />
                </div>
            ))}
        </div>
    ),
};

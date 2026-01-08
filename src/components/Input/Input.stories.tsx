import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const SearchIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
    </svg>
);

const MailIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
);

const EyeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const meta: Meta<typeof Input> = {
    title: 'Components/Input',
    component: Input,
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        label: 'Email',
        placeholder: 'you@example.com',
    },
};

export const WithFloatingLabel: Story = {
    args: {
        label: 'Full Name',
    },
};

export const WithPlaceholder: Story = {
    args: {
        placeholder: 'Search...',
    },
};

export const WithHelperText: Story = {
    args: {
        label: 'Password',
        type: 'password',
        helperText: 'Must be at least 8 characters',
    },
};

export const WithError: Story = {
    args: {
        label: 'Email',
        defaultValue: 'invalid-email',
        error: 'Please enter a valid email address',
    },
};

export const WithIcons: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '320px' }}>
            <Input
                placeholder="Search..."
                leftIcon={<SearchIcon />}
            />
            <Input
                label="Email"
                leftIcon={<MailIcon />}
            />
            <Input
                label="Password"
                type="password"
                rightIcon={<EyeIcon />}
            />
        </div>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '320px' }}>
            <Input label="Small" size="sm" />
            <Input label="Medium (default)" size="md" />
            <Input label="Large" size="lg" />
        </div>
    ),
};

export const Disabled: Story = {
    args: {
        label: 'Disabled',
        defaultValue: 'Cannot edit',
        disabled: true,
    },
};

export const FullWidth: Story = {
    args: {
        label: 'Full Width Input',
        fullWidth: true,
    },
};

export const FormExample: Story = {
    render: () => (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '400px',
            padding: '32px',
            backgroundColor: '#FFFDFB',
            borderRadius: '24px',
        }}>
            <h3 style={{
                fontFamily: 'Nunito, sans-serif',
                fontSize: '24px',
                color: '#29293D',
                margin: 0,
            }}>
                Sign Up
            </h3>
            <Input label="Full Name" />
            <Input label="Email" type="email" leftIcon={<MailIcon />} />
            <Input
                label="Password"
                type="password"
                helperText="Must be at least 8 characters"
                rightIcon={<EyeIcon />}
            />
        </div>
    ),
};

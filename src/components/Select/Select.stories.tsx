import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
    title: 'Components/Select',
    component: Select,
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
            <div style={{ width: 280 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Select>;

const fruitOptions = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'orange', label: 'Orange' },
    { value: 'grape', label: 'Grape' },
    { value: 'mango', label: 'Mango' },
];

// ========== Stories ==========

export const Default: Story = {
    render: () => (
        <Select
            options={fruitOptions}
            placeholder="Select a fruit..."
        />
    ),
};

export const WithValue: Story = {
    name: 'With Default Value',
    render: () => (
        <Select
            options={fruitOptions}
            defaultValue="banana"
        />
    ),
};

export const Controlled: Story = {
    render: function ControlledSelect() {
        const [value, setValue] = useState('');
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Select
                    options={fruitOptions}
                    value={value}
                    onValueChange={setValue}
                    placeholder="Select a fruit..."
                />
                <span style={{ color: '#6B5A47', fontSize: 14 }}>
                    Selected: {value || 'none'}
                </span>
            </div>
        );
    },
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Select options={fruitOptions} size="sm" placeholder="Small" />
            <Select options={fruitOptions} size="md" placeholder="Medium" />
            <Select options={fruitOptions} size="lg" placeholder="Large" />
        </div>
    ),
};

export const WithDisabledOptions: Story = {
    name: 'With Disabled Options',
    render: () => (
        <Select
            options={[
                { value: 'available', label: 'Available' },
                { value: 'unavailable', label: 'Unavailable', disabled: true },
                { value: 'limited', label: 'Limited Stock' },
                { value: 'sold-out', label: 'Sold Out', disabled: true },
            ]}
            placeholder="Select availability..."
        />
    ),
};

export const Disabled: Story = {
    render: () => (
        <Select
            options={fruitOptions}
            defaultValue="apple"
            disabled
        />
    ),
};

export const CountrySelector: Story = {
    name: 'Country Selector Example',
    render: function CountryExample() {
        const [country, setCountry] = useState('');
        const countries = [
            { value: 'us', label: '🇺🇸 United States' },
            { value: 'uk', label: '🇬🇧 United Kingdom' },
            { value: 'ca', label: '🇨🇦 Canada' },
            { value: 'au', label: '🇦🇺 Australia' },
            { value: 'de', label: '🇩🇪 Germany' },
            { value: 'fr', label: '🇫🇷 France' },
            { value: 'jp', label: '🇯🇵 Japan' },
        ];

        return (
            <div style={{
                padding: 20,
                background: 'rgba(255, 249, 244, 0.8)',
                borderRadius: 12,
            }}>
                <label style={{
                    display: 'block',
                    marginBottom: 8,
                    color: '#5C3D99',
                    fontWeight: 500,
                    fontSize: 14,
                }}>
                    Country
                </label>
                <Select
                    options={countries}
                    value={country}
                    onValueChange={setCountry}
                    placeholder="Select your country..."
                />
            </div>
        );
    },
};

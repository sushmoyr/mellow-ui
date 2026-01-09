import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DatePicker } from './DatePicker';
import { VStack } from '../Stack';

const meta: Meta<typeof DatePicker> = {
    title: 'Forms/DatePicker',
    component: DatePicker,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
    render: function DatePickerDemo() {
        const [date, setDate] = useState<Date | null>(null);
        return <DatePicker value={date} onChange={setDate} />;
    },
};

export const WithLabel: Story = {
    name: 'With Label',
    render: function DatePickerWithLabel() {
        const [date, setDate] = useState<Date | null>(null);
        return <DatePicker value={date} onChange={setDate} label="Birth Date" />;
    },
};

export const Formats: Story = {
    render: () => {
        const date = new Date(2025, 0, 15);
        return (
            <VStack spacing={16}>
                <DatePicker value={date} format="short" label="Short" />
                <DatePicker value={date} format="medium" label="Medium" />
                <DatePicker value={date} format="long" label="Long" />
            </VStack>
        );
    },
};

export const Sizes: Story = {
    render: function SizesDemo() {
        const date = new Date();
        return (
            <VStack spacing={16}>
                <DatePicker value={date} size="sm" label="Small" />
                <DatePicker value={date} size="md" label="Medium" />
                <DatePicker value={date} size="lg" label="Large" />
            </VStack>
        );
    },
};

export const Disabled: Story = {
    render: () => (
        <DatePicker value={new Date()} disabled label="Disabled" />
    ),
};

export const WithConstraints: Story = {
    name: 'With Date Constraints',
    render: function ConstraintsDemo() {
        const [date, setDate] = useState<Date | null>(null);
        const today = new Date();
        const maxDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        return (
            <DatePicker
                value={date}
                onChange={setDate}
                minDate={today}
                maxDate={maxDate}
                label="Select a date (this month only)"
            />
        );
    },
};

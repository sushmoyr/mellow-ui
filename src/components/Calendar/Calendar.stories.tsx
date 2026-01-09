import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar } from './Calendar';

const meta: Meta<typeof Calendar> = {
    title: 'Forms/Calendar',
    component: Calendar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
    render: function CalendarDemo() {
        const [date, setDate] = useState<Date | null>(null);
        return (
            <div>
                <Calendar value={date} onSelect={setDate} />
                {date && (
                    <p style={{ marginTop: 12, color: '#6B5A47', fontSize: 14, textAlign: 'center' }}>
                        Selected: {date.toLocaleDateString()}
                    </p>
                )}
            </div>
        );
    },
};

export const WithDefaultDate: Story = {
    name: 'With Default Date',
    render: () => {
        const [date, setDate] = useState<Date | null>(new Date());
        return <Calendar value={date} onSelect={setDate} />;
    },
};

export const WithMinMax: Story = {
    name: 'With Min/Max Dates',
    render: function MinMaxDemo() {
        const [date, setDate] = useState<Date | null>(null);
        const today = new Date();
        const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5);
        const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10);

        return (
            <div>
                <Calendar
                    value={date}
                    onSelect={setDate}
                    minDate={minDate}
                    maxDate={maxDate}
                />
                <p style={{ marginTop: 12, color: '#6B5A47', fontSize: 12, textAlign: 'center' }}>
                    Only dates within ±5/+10 days are selectable
                </p>
            </div>
        );
    },
};

export const RangeSelection: Story = {
    name: 'Range Selection (Preview)',
    render: function RangeDemo() {
        const today = new Date();
        const rangeStart = new Date(today.getFullYear(), today.getMonth(), 10);
        const rangeEnd = new Date(today.getFullYear(), today.getMonth(), 18);

        return (
            <Calendar
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
            />
        );
    },
};

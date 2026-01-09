import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DateRangePicker, DateRange } from './DateRangePicker';

const meta: Meta<typeof DateRangePicker> = {
    title: 'Forms/DateRangePicker',
    component: DateRangePicker,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
    render: function DateRangePickerDemo() {
        const [range, setRange] = useState<DateRange>({ start: null, end: null });
        return (
            <div>
                <DateRangePicker value={range} onChange={setRange} />
                {range.start && range.end && (
                    <p style={{ marginTop: 12, color: '#6B5A47', fontSize: 13 }}>
                        {range.start.toLocaleDateString()} → {range.end.toLocaleDateString()}
                    </p>
                )}
            </div>
        );
    },
};

export const WithLabel: Story = {
    name: 'With Label',
    render: function WithLabelDemo() {
        const [range, setRange] = useState<DateRange>({ start: null, end: null });
        return <DateRangePicker value={range} onChange={setRange} label="Trip Dates" />;
    },
};

export const PreSelected: Story = {
    name: 'Pre-selected Range',
    render: () => {
        const today = new Date();
        const [range, setRange] = useState<DateRange>({
            start: new Date(today.getFullYear(), today.getMonth(), 5),
            end: new Date(today.getFullYear(), today.getMonth(), 12),
        });
        return <DateRangePicker value={range} onChange={setRange} label="Vacation" />;
    },
};

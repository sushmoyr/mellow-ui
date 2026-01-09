import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TimePicker, TimeValue } from './TimePicker';
import { VStack, HStack } from '../Stack';

const meta: Meta<typeof TimePicker> = {
    title: 'Forms/TimePicker',
    component: TimePicker,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
    render: function TimePickerDemo() {
        const [time, setTime] = useState<TimeValue | null>(null);
        return <TimePicker value={time} onChange={setTime} />;
    },
};

export const With12HourFormat: Story = {
    name: '12-Hour Format',
    render: function Format12Demo() {
        const [time, setTime] = useState<TimeValue | null>({ hours: 9, minutes: 30, period: 'AM' });
        return <TimePicker value={time} onChange={setTime} use12Hour label="Alarm" />;
    },
};

export const With24HourFormat: Story = {
    name: '24-Hour Format',
    render: function Format24Demo() {
        const [time, setTime] = useState<TimeValue | null>({ hours: 14, minutes: 30 });
        return <TimePicker value={time} onChange={setTime} use12Hour={false} label="Meeting Time" />;
    },
};

export const MinuteSteps: Story = {
    name: 'Minute Steps',
    render: function MinuteStepsDemo() {
        const [time1, setTime1] = useState<TimeValue | null>(null);
        const [time2, setTime2] = useState<TimeValue | null>(null);

        return (
            <VStack spacing={16}>
                <TimePicker value={time1} onChange={setTime1} minuteStep={5} label="5 min steps" />
                <TimePicker value={time2} onChange={setTime2} minuteStep={15} label="15 min steps" />
            </VStack>
        );
    },
};

export const Sizes: Story = {
    render: function SizesDemo() {
        const time = { hours: 3, minutes: 45, period: 'PM' as const };
        return (
            <VStack spacing={16}>
                <TimePicker value={time} size="sm" label="Small" />
                <TimePicker value={time} size="md" label="Medium" />
                <TimePicker value={time} size="lg" label="Large" />
            </VStack>
        );
    },
};

export const Disabled: Story = {
    render: () => (
        <TimePicker
            value={{ hours: 10, minutes: 0, period: 'AM' }}
            disabled
            label="Disabled"
        />
    ),
};

export const BookingExample: Story = {
    name: 'Booking Example',
    render: function BookingDemo() {
        const [checkIn, setCheckIn] = useState<TimeValue | null>(null);
        const [checkOut, setCheckOut] = useState<TimeValue | null>(null);

        return (
            <HStack spacing={16}>
                <TimePicker value={checkIn} onChange={setCheckIn} label="Check-in" />
                <TimePicker value={checkOut} onChange={setCheckOut} label="Check-out" />
            </HStack>
        );
    },
};

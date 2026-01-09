import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup';

const meta: Meta<typeof ToggleGroup> = {
    title: 'Components/ToggleGroup',
    component: ToggleGroup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['single', 'multiple'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        variant: {
            control: 'select',
            options: ['default', 'outline'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

// Icons
const AlignLeftIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="15" y2="12" />
        <line x1="3" y1="18" x2="18" y2="18" />
    </svg>
);

const AlignCenterIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="6" y1="12" x2="18" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
);

const AlignRightIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="9" y1="12" x2="21" y2="12" />
        <line x1="6" y1="18" x2="21" y2="18" />
    </svg>
);

const BoldIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
        <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
    </svg>
);

const ItalicIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="19" y1="4" x2="10" y2="4" />
        <line x1="14" y1="20" x2="5" y2="20" />
        <line x1="15" y1="4" x2="9" y2="20" />
    </svg>
);

const UnderlineIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
        <line x1="4" y1="21" x2="20" y2="21" />
    </svg>
);

// ========== Stories ==========

export const SingleSelection: Story = {
    render: () => (
        <ToggleGroup type="single" defaultValue="center">
            <ToggleGroupItem value="left" aria-label="Align left">
                <AlignLeftIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
                <AlignCenterIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
                <AlignRightIcon />
            </ToggleGroupItem>
        </ToggleGroup>
    ),
};

export const MultipleSelection: Story = {
    render: () => (
        <ToggleGroup type="multiple" defaultValue={['bold']}>
            <ToggleGroupItem value="bold" aria-label="Bold">
                <BoldIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Italic">
                <ItalicIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Underline">
                <UnderlineIcon />
            </ToggleGroupItem>
        </ToggleGroup>
    ),
};

export const WithText: Story = {
    render: () => (
        <ToggleGroup type="single" defaultValue="week">
            <ToggleGroupItem value="day">Day</ToggleGroupItem>
            <ToggleGroupItem value="week">Week</ToggleGroupItem>
            <ToggleGroupItem value="month">Month</ToggleGroupItem>
            <ToggleGroupItem value="year">Year</ToggleGroupItem>
        </ToggleGroup>
    ),
};

export const Controlled: Story = {
    render: function ControlledToggleGroup() {
        const [value, setValue] = useState('center');
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                <ToggleGroup type="single" value={value} onValueChange={(v) => setValue(v as string)}>
                    <ToggleGroupItem value="left">Left</ToggleGroupItem>
                    <ToggleGroupItem value="center">Center</ToggleGroupItem>
                    <ToggleGroupItem value="right">Right</ToggleGroupItem>
                </ToggleGroup>
                <span style={{ color: '#6B5A47', fontSize: 14 }}>
                    Selected: {value || 'none'}
                </span>
            </div>
        );
    },
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
            <ToggleGroup type="single" size="sm" defaultValue="b">
                <ToggleGroupItem value="a">A</ToggleGroupItem>
                <ToggleGroupItem value="b">B</ToggleGroupItem>
                <ToggleGroupItem value="c">C</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup type="single" size="md" defaultValue="b">
                <ToggleGroupItem value="a">A</ToggleGroupItem>
                <ToggleGroupItem value="b">B</ToggleGroupItem>
                <ToggleGroupItem value="c">C</ToggleGroupItem>
            </ToggleGroup>
            <ToggleGroup type="single" size="lg" defaultValue="b">
                <ToggleGroupItem value="a">A</ToggleGroupItem>
                <ToggleGroupItem value="b">B</ToggleGroupItem>
                <ToggleGroupItem value="c">C</ToggleGroupItem>
            </ToggleGroup>
        </div>
    ),
};

export const Outline: Story = {
    render: () => (
        <ToggleGroup type="single" variant="outline" defaultValue="center">
            <ToggleGroupItem value="left" aria-label="Align left">
                <AlignLeftIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="center" aria-label="Align center">
                <AlignCenterIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="right" aria-label="Align right">
                <AlignRightIcon />
            </ToggleGroupItem>
        </ToggleGroup>
    ),
};

export const Disabled: Story = {
    render: () => (
        <ToggleGroup type="single" disabled defaultValue="center">
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
    ),
};

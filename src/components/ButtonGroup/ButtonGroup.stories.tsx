import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button';

const meta: Meta<typeof ButtonGroup> = {
    title: 'Components/ButtonGroup',
    component: ButtonGroup,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['solid', 'soft', 'outline', 'ghost'],
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
        },
        color: {
            control: 'select',
            options: ['primary', 'secondary', 'accent', 'danger'],
        },
        orientation: {
            control: 'select',
            options: ['horizontal', 'vertical'],
        },
        isAttached: {
            control: 'boolean',
        },
        isDisabled: {
            control: 'boolean',
        },
    },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

// ========== Basic Examples ==========

export const Default: Story = {
    render: () => (
        <ButtonGroup>
            <Button>Left</Button>
            <Button>Center</Button>
            <Button>Right</Button>
        </ButtonGroup>
    ),
};

export const Attached: Story = {
    render: () => (
        <ButtonGroup isAttached>
            <Button>Left</Button>
            <Button>Center</Button>
            <Button>Right</Button>
        </ButtonGroup>
    ),
};

export const Spaced: Story = {
    render: () => (
        <ButtonGroup isAttached={false} spacing={8}>
            <Button>Save</Button>
            <Button variant="soft">Draft</Button>
            <Button variant="ghost">Cancel</Button>
        </ButtonGroup>
    ),
};

// ========== Variants ==========

export const Outline: Story = {
    render: () => (
        <ButtonGroup variant="outline">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
        </ButtonGroup>
    ),
};

export const Soft: Story = {
    render: () => (
        <ButtonGroup variant="soft">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
        </ButtonGroup>
    ),
};

export const Ghost: Story = {
    render: () => (
        <ButtonGroup variant="ghost">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
        </ButtonGroup>
    ),
};

// ========== Sizes ==========

export const SmallSize: Story = {
    render: () => (
        <ButtonGroup size="sm">
            <Button>Small</Button>
            <Button>Buttons</Button>
            <Button>Here</Button>
        </ButtonGroup>
    ),
};

export const LargeSize: Story = {
    render: () => (
        <ButtonGroup size="lg">
            <Button>Large</Button>
            <Button>Buttons</Button>
            <Button>Here</Button>
        </ButtonGroup>
    ),
};

// ========== Colors ==========

export const AccentColor: Story = {
    render: () => (
        <ButtonGroup color="accent">
            <Button>Accent</Button>
            <Button>Color</Button>
            <Button>Group</Button>
        </ButtonGroup>
    ),
};

export const DangerColor: Story = {
    render: () => (
        <ButtonGroup color="danger" variant="outline">
            <Button>Delete</Button>
            <Button>Remove</Button>
            <Button>Clear</Button>
        </ButtonGroup>
    ),
};

// ========== Vertical Orientation ==========

export const Vertical: Story = {
    args: {
        size: "lg",
        variant: "soft"
    },

    render: () => (
        <ButtonGroup orientation="vertical">
            <Button>Top</Button>
            <Button>Middle</Button>
            <Button>Bottom</Button>
        </ButtonGroup>
    )
};

export const VerticalOutline: Story = {
    render: () => (
        <ButtonGroup orientation="vertical" variant="outline">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
        </ButtonGroup>
    ),
};

// ========== Disabled ==========

export const Disabled: Story = {
    render: () => (
        <ButtonGroup isDisabled>
            <Button>Disabled</Button>
            <Button>Group</Button>
            <Button>Buttons</Button>
        </ButtonGroup>
    ),
};

// ========== Mixed Content ==========

export const OverriddenButton: Story = {
    name: 'Individual Button Override',
    render: () => (
        <ButtonGroup variant="outline" color="primary">
            <Button>Normal</Button>
            <Button color="danger">Override</Button>
            <Button>Normal</Button>
        </ButtonGroup>
    ),
};

// ========== Real-World Examples ==========

export const EditorToolbar: Story = {
    name: 'Editor Toolbar',
    render: () => (
        <ButtonGroup variant="ghost" size="sm">
            <Button>B</Button>
            <Button>I</Button>
            <Button>U</Button>
            <Button>S</Button>
        </ButtonGroup>
    ),
};

export const Pagination: Story = {
    render: () => (
        <ButtonGroup variant="outline">
            <Button>←</Button>
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
            <Button>→</Button>
        </ButtonGroup>
    ),
};

export const SegmentedControl: Story = {
    name: 'Segmented Control',
    render: () => (
        <ButtonGroup variant="soft">
            <Button>Day</Button>
            <Button>Week</Button>
            <Button>Month</Button>
            <Button>Year</Button>
        </ButtonGroup>
    ),
};

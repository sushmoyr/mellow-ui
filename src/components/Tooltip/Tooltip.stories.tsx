import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';
import { HStack } from '../Stack';

const meta: Meta<typeof Tooltip> = {
    title: 'Feedback/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
    render: () => (
        <Tooltip content="This is a tooltip">
            <Button>Hover me</Button>
        </Tooltip>
    ),
};

export const Positions: Story = {
    render: () => (
        <div style={{ padding: 60 }}>
            <HStack spacing={24} justify="center" wrap>
                <Tooltip content="Top tooltip" position="top">
                    <Button variant="secondary">Top</Button>
                </Tooltip>
                <Tooltip content="Bottom tooltip" position="bottom">
                    <Button variant="secondary">Bottom</Button>
                </Tooltip>
                <Tooltip content="Left tooltip" position="left">
                    <Button variant="secondary">Left</Button>
                </Tooltip>
                <Tooltip content="Right tooltip" position="right">
                    <Button variant="secondary">Right</Button>
                </Tooltip>
            </HStack>
        </div>
    ),
};

export const WithDelay: Story = {
    name: 'With Delay',
    render: () => (
        <HStack spacing={16}>
            <Tooltip content="Shows immediately" delay={0}>
                <Button size="sm">No delay</Button>
            </Tooltip>
            <Tooltip content="Shows after 500ms" delay={500}>
                <Button size="sm">500ms delay</Button>
            </Tooltip>
        </HStack>
    ),
};

export const RichContent: Story = {
    name: 'Rich Content',
    render: () => (
        <Tooltip content={
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 600 }}>Keyboard Shortcut</div>
                <div style={{ opacity: 0.8, marginTop: 2 }}>⌘ + S</div>
            </div>
        }>
            <Button>Save</Button>
        </Tooltip>
    ),
};

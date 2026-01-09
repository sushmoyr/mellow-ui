import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../Button';
import { VStack, HStack } from '../Stack';

const meta: Meta<typeof Popover> = {
    title: 'Overlay/Popover',
    component: Popover,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
    render: () => (
        <Popover
            trigger={<Button>Open Popover</Button>}
        >
            <p style={{ margin: 0, color: '#6B5A47', fontSize: 14 }}>
                This is a popover with rich content!
            </p>
        </Popover>
    ),
};

export const Positions: Story = {
    render: () => (
        <VStack spacing={24} style={{ padding: 80 }}>
            <Popover trigger={<Button size="sm">Top</Button>} position="top">
                <p style={{ margin: 0 }}>Position: Top</p>
            </Popover>
            <HStack spacing={120}>
                <Popover trigger={<Button size="sm">Left</Button>} position="left">
                    <p style={{ margin: 0 }}>Position: Left</p>
                </Popover>
                <Popover trigger={<Button size="sm">Right</Button>} position="right">
                    <p style={{ margin: 0 }}>Position: Right</p>
                </Popover>
            </HStack>
            <Popover trigger={<Button size="sm">Bottom</Button>} position="bottom">
                <p style={{ margin: 0 }}>Position: Bottom</p>
            </Popover>
        </VStack>
    ),
};

export const RichContent: Story = {
    name: 'Rich Content',
    render: () => (
        <Popover
            trigger={<Button variant="secondary">User Info</Button>}
        >
            <VStack spacing={12}>
                <HStack spacing={12}>
                    <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: 'linear-gradient(135deg, #B399FF, #9973FF)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 600
                    }}>
                        JD
                    </div>
                    <div>
                        <div style={{ fontWeight: 600, color: '#29293D' }}>John Doe</div>
                        <div style={{ fontSize: 12, color: '#6B5A47' }}>john@example.com</div>
                    </div>
                </HStack>
                <Button size="sm" variant="ghost" style={{ width: '100%' }}>View Profile</Button>
            </VStack>
        </Popover>
    ),
};

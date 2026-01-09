import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Drawer } from './Drawer';
import { Button } from '../Button';
import { HStack, VStack } from '../Stack';

const meta: Meta<typeof Drawer> = {
    title: 'Overlay/Drawer',
    component: Drawer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
    render: function DrawerDemo() {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setOpen(true)}>Open Drawer</Button>
                <Drawer
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Settings"
                >
                    <p style={{ color: '#6B5A47' }}>
                        This drawer slides in from the right with spring physics.
                    </p>
                </Drawer>
            </>
        );
    },
};

export const Positions: Story = {
    render: function PositionsDemo() {
        const [position, setPosition] = useState<'left' | 'right' | 'top' | 'bottom' | null>(null);
        return (
            <>
                <VStack spacing={12}>
                    <HStack spacing={8}>
                        <Button size="sm" variant="secondary" onClick={() => setPosition('left')}>← Left</Button>
                        <Button size="sm" variant="secondary" onClick={() => setPosition('right')}>Right →</Button>
                    </HStack>
                    <HStack spacing={8}>
                        <Button size="sm" variant="secondary" onClick={() => setPosition('top')}>↑ Top</Button>
                        <Button size="sm" variant="secondary" onClick={() => setPosition('bottom')}>↓ Bottom</Button>
                    </HStack>
                </VStack>
                <Drawer
                    open={position !== null}
                    onClose={() => setPosition(null)}
                    position={position || 'right'}
                    title={`${position?.toUpperCase()} Drawer`}
                >
                    <p style={{ color: '#6B5A47' }}>
                        Sliding in from the {position}.
                    </p>
                </Drawer>
            </>
        );
    },
};

export const WithFooter: Story = {
    name: 'With Footer',
    render: function FooterDemo() {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setOpen(true)}>Edit Profile</Button>
                <Drawer
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Edit Profile"
                    footer={
                        <HStack spacing={12}>
                            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                            <Button onClick={() => setOpen(false)}>Save Changes</Button>
                        </HStack>
                    }
                >
                    <VStack spacing={16}>
                        <p style={{ color: '#6B5A47', margin: 0 }}>
                            Update your profile information below.
                        </p>
                    </VStack>
                </Drawer>
            </>
        );
    },
};

export const Navigation: Story = {
    name: 'Navigation Menu',
    render: function NavDemo() {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button size="sm" onClick={() => setOpen(true)}>☰ Menu</Button>
                <Drawer
                    open={open}
                    onClose={() => setOpen(false)}
                    position="left"
                    title="Navigation"
                    size="sm"
                >
                    <VStack spacing={4}>
                        {['Dashboard', 'Projects', 'Team', 'Settings', 'Help'].map(item => (
                            <Button key={item} variant="ghost" style={{ justifyContent: 'flex-start', width: '100%' }}>
                                {item}
                            </Button>
                        ))}
                    </VStack>
                </Drawer>
            </>
        );
    },
};

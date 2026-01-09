import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button';
import { VStack, HStack } from '../Stack';
import { Input } from '../Input';

const meta: Meta<typeof Modal> = {
    title: 'Overlay/Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
    render: function ModalDemo() {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setOpen(true)}>Open Modal</Button>
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Welcome to MellowUI"
                    description="A warm, inviting component library."
                >
                    <p>
                        This modal uses spring physics for that satisfying bounce effect.
                        Try closing it with the X button, backdrop click, or Escape key.
                    </p>
                </Modal>
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
                <Button onClick={() => setOpen(true)}>Confirm Action</Button>
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Delete Item?"
                    description="This action cannot be undone."
                    footer={
                        <HStack spacing={12}>
                            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                            <Button onClick={() => setOpen(false)}>Delete</Button>
                        </HStack>
                    }
                >
                    <p>Are you sure you want to delete this item? All associated data will be permanently removed.</p>
                </Modal>
            </>
        );
    },
};

export const FormModal: Story = {
    name: 'Form Modal',
    render: function FormDemo() {
        const [open, setOpen] = useState(false);
        return (
            <>
                <Button onClick={() => setOpen(true)}>Create Account</Button>
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    title="Create Account"
                    size="md"
                    footer={
                        <HStack spacing={12}>
                            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
                            <Button onClick={() => setOpen(false)}>Create</Button>
                        </HStack>
                    }
                >
                    <VStack spacing={16}>
                        <Input label="Full Name" placeholder="John Doe" />
                        <Input label="Email" placeholder="john@example.com" type="email" />
                        <Input label="Password" placeholder="••••••••" type="password" />
                    </VStack>
                </Modal>
            </>
        );
    },
};

export const Sizes: Story = {
    render: function SizesDemo() {
        const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | null>(null);
        return (
            <>
                <HStack spacing={8}>
                    <Button size="sm" variant="secondary" onClick={() => setSize('sm')}>Small</Button>
                    <Button size="sm" variant="secondary" onClick={() => setSize('md')}>Medium</Button>
                    <Button size="sm" variant="secondary" onClick={() => setSize('lg')}>Large</Button>
                    <Button size="sm" variant="secondary" onClick={() => setSize('xl')}>XL</Button>
                </HStack>
                <Modal
                    open={size !== null}
                    onClose={() => setSize(null)}
                    title={`${size?.toUpperCase()} Modal`}
                    size={size || 'md'}
                >
                    <p>This is a {size} size modal.</p>
                </Modal>
            </>
        );
    },
};

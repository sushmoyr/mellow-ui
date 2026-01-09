import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, useToast } from './Toast';
import { Button } from '../Button';
import { VStack, HStack } from '../Stack';

const meta: Meta<typeof ToastProvider> = {
    title: 'Feedback/Toast',
    component: ToastProvider,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <ToastProvider>
                <Story />
            </ToastProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof ToastProvider>;

// Demo component
function ToastDemo() {
    const { addToast } = useToast();

    return (
        <VStack spacing={12}>
            <Button onClick={() => addToast({ title: 'Default Toast', description: 'This is a default notification.' })}>
                Show Default
            </Button>
            <Button variant="secondary" onClick={() => addToast({ title: 'Success!', description: 'Your action was completed.', variant: 'success' })}>
                Show Success
            </Button>
            <Button variant="secondary" onClick={() => addToast({ title: 'Error', description: 'Something went wrong.', variant: 'error' })}>
                Show Error
            </Button>
            <Button variant="secondary" onClick={() => addToast({ title: 'Warning', description: 'Please review this.', variant: 'warning' })}>
                Show Warning
            </Button>
            <Button variant="secondary" onClick={() => addToast({ title: 'Info', description: 'Here is some information.', variant: 'info' })}>
                Show Info
            </Button>
        </VStack>
    );
}

export const Default: Story = {
    render: () => <ToastDemo />,
};

function ToastWithAction() {
    const { addToast } = useToast();

    return (
        <Button onClick={() => addToast({
            title: 'File deleted',
            description: 'document.pdf was removed.',
            variant: 'default',
            action: {
                label: 'Undo',
                onClick: () => alert('Undo clicked!'),
            },
        })}>
            Delete File
        </Button>
    );
}

export const WithAction: Story = {
    name: 'With Action Button',
    render: () => <ToastWithAction />,
};

function VariantDemo() {
    const { addToast } = useToast();

    return (
        <HStack spacing={8} wrap>
            <Button size="sm" onClick={() => addToast({ title: 'Success', variant: 'success' })}>✓ Success</Button>
            <Button size="sm" onClick={() => addToast({ title: 'Error', variant: 'error' })}>✕ Error</Button>
            <Button size="sm" onClick={() => addToast({ title: 'Warning', variant: 'warning' })}>⚠ Warning</Button>
            <Button size="sm" onClick={() => addToast({ title: 'Info', variant: 'info' })}>ℹ Info</Button>
        </HStack>
    );
}

export const Variants: Story = {
    render: () => <VariantDemo />,
};

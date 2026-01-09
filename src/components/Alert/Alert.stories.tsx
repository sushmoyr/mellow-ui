import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Alert } from './Alert';
import { VStack } from '../Stack';
import { AnimatePresence } from 'framer-motion';

const meta: Meta<typeof Alert> = {
    title: 'Feedback/Alert',
    component: Alert,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: 400 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
    render: () => (
        <Alert variant="info" title="Information">
            This is an informational message.
        </Alert>
    ),
};

export const Success: Story = {
    render: () => (
        <Alert variant="success" title="Success!">
            Your changes have been saved successfully.
        </Alert>
    ),
};

export const Warning: Story = {
    render: () => (
        <Alert variant="warning" title="Warning">
            Please review your input before continuing.
        </Alert>
    ),
};

export const Error: Story = {
    render: () => (
        <Alert variant="error" title="Error">
            Something went wrong. Please try again.
        </Alert>
    ),
};

export const AllVariants: Story = {
    name: 'All Variants',
    render: () => (
        <VStack spacing={12}>
            <Alert variant="info" title="Info">Informational message.</Alert>
            <Alert variant="success" title="Success">Operation completed.</Alert>
            <Alert variant="warning" title="Warning">Please be careful.</Alert>
            <Alert variant="error" title="Error">Something went wrong.</Alert>
        </VStack>
    ),
};

export const Closable: Story = {
    render: function ClosableAlert() {
        const [visible, setVisible] = useState(true);

        if (!visible) {
            return (
                <button
                    onClick={() => setVisible(true)}
                    style={{
                        padding: '8px 16px',
                        borderRadius: 8,
                        border: '1px solid #B399FF',
                        background: 'white',
                        cursor: 'pointer',
                    }}
                >
                    Show Alert
                </button>
            );
        }

        return (
            <AnimatePresence>
                <Alert
                    variant="info"
                    title="Dismissible Alert"
                    closable
                    onClose={() => setVisible(false)}
                >
                    Click the X to dismiss this alert.
                </Alert>
            </AnimatePresence>
        );
    },
};

export const TitleOnly: Story = {
    name: 'Title Only',
    render: () => (
        <Alert variant="success" title="File uploaded successfully!" />
    ),
};

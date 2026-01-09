import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';
import { VStack, HStack } from '../Stack';

const meta: Meta<typeof Link> = {
    title: 'Navigation/Link',
    component: Link,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
    render: () => <Link href="#">Click me</Link>,
};

export const Variants: Story = {
    render: () => (
        <HStack spacing={24}>
            <Link href="#" variant="default">Default</Link>
            <Link href="#" variant="subtle">Subtle</Link>
            <Link href="#" variant="accent">Accent</Link>
        </HStack>
    ),
};

export const UnderlineOnHover: Story = {
    name: 'Underline on Hover',
    render: () => (
        <HStack spacing={24}>
            <Link href="#" underlineOnHover>Hover for underline</Link>
            <Link href="#" variant="subtle" underlineOnHover>Subtle</Link>
        </HStack>
    ),
};

export const External: Story = {
    render: () => (
        <VStack spacing={12} align="start">
            <Link href="https://example.com" external>
                External Link
            </Link>
            <Link href="https://example.com" external variant="subtle">
                Subtle External
            </Link>
        </VStack>
    ),
};

export const InlineText: Story = {
    name: 'Inline with Text',
    render: () => (
        <p style={{ color: '#29293D', maxWidth: 400, lineHeight: 1.6 }}>
            This is a paragraph with an{' '}
            <Link href="#">inline link</Link>
            {' '}that flows naturally with the text. You can also have{' '}
            <Link href="https://example.com" external>external links</Link>
            {' '}that open in new tabs.
        </p>
    ),
};

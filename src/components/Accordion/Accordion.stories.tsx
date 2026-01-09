import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';

const meta: Meta<typeof Accordion> = {
    title: 'Disclosure/Accordion',
    component: Accordion,
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
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
    render: () => (
        <Accordion type="single" defaultValue="item-1">
            <AccordionItem value="item-1">
                <AccordionTrigger>What is MellowUI?</AccordionTrigger>
                <AccordionContent>
                    MellowUI is a React component library built for warm, inviting interfaces.
                    It features spring physics, soft colors, and playful interactions.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                    Yes! All components meet WCAG 2.1 AA standards with full keyboard
                    navigation and screen reader support.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Can I customize it?</AccordionTrigger>
                <AccordionContent>
                    Absolutely. Use createTheme() to define your own color palette,
                    or modify individual component styles with CSS modules.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
};

export const Multiple: Story = {
    render: () => (
        <Accordion type="multiple" defaultValue={['item-1', 'item-2']}>
            <AccordionItem value="item-1">
                <AccordionTrigger>First Section</AccordionTrigger>
                <AccordionContent>
                    Multiple sections can be open at the same time.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Second Section</AccordionTrigger>
                <AccordionContent>
                    Click any trigger to expand or collapse.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Third Section</AccordionTrigger>
                <AccordionContent>
                    Spring animations make it feel natural.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
};

export const FAQ: Story = {
    name: 'FAQ Example',
    render: () => (
        <Accordion type="single">
            <AccordionItem value="shipping">
                <AccordionTrigger>📦 How long does shipping take?</AccordionTrigger>
                <AccordionContent>
                    Standard shipping takes 5-7 business days. Express shipping
                    is available for 2-3 day delivery.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="returns">
                <AccordionTrigger>↩️ What's your return policy?</AccordionTrigger>
                <AccordionContent>
                    We offer free returns within 30 days of purchase. Items must
                    be unused and in original packaging.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="payment">
                <AccordionTrigger>💳 What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                    We accept all major credit cards, PayPal, Apple Pay, and
                    Google Pay.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
};

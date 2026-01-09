import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './Collapsible';

const meta: Meta<typeof Collapsible> = {
    title: 'Disclosure/Collapsible',
    component: Collapsible,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: 360 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
    render: () => (
        <Collapsible>
            <CollapsibleTrigger>Can I customize the theme?</CollapsibleTrigger>
            <CollapsibleContent>
                Yes! MellowUI supports custom themes with your own color palette.
                Use the createTheme function to define your brand colors.
            </CollapsibleContent>
        </Collapsible>
    ),
};

export const DefaultOpen: Story = {
    name: 'Default Open',
    render: () => (
        <Collapsible defaultOpen>
            <CollapsibleTrigger>Is it animated?</CollapsibleTrigger>
            <CollapsibleContent>
                Every component uses spring physics for smooth, natural animations
                that feel satisfying and physical.
            </CollapsibleContent>
        </Collapsible>
    ),
};

export const Controlled: Story = {
    render: function ControlledCollapsible() {
        const [open, setOpen] = useState(false);
        return (
            <div>
                <button
                    onClick={() => setOpen(!open)}
                    style={{ marginBottom: 12, padding: '8px 16px', borderRadius: 8, border: '1px solid #B399FF', background: 'white', cursor: 'pointer' }}
                >
                    Toggle externally
                </button>
                <Collapsible open={open} onOpenChange={setOpen}>
                    <CollapsibleTrigger>Controlled section</CollapsibleTrigger>
                    <CollapsibleContent>
                        This section is controlled by external state.
                    </CollapsibleContent>
                </Collapsible>
            </div>
        );
    },
};

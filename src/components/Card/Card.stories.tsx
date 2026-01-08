import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
    title: 'Components/Card',
    component: Card,
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['elevated', 'outlined', 'filled'],
        },
        padding: {
            control: 'select',
            options: ['none', 'sm', 'md', 'lg'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
    args: {
        children: (
            <>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>This is a description of the card content.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p style={{ margin: 0 }}>
                        Cards are used to group related content and actions.
                        They provide a consistent visual container.
                    </p>
                </CardContent>
            </>
        ),
    },
};

export const Variants: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <Card variant="elevated" style={{ width: '280px' }}>
                <CardTitle>Elevated</CardTitle>
                <CardDescription>With soft multi-layer shadow</CardDescription>
            </Card>
            <Card variant="outlined" style={{ width: '280px' }}>
                <CardTitle>Outlined</CardTitle>
                <CardDescription>With subtle border</CardDescription>
            </Card>
            <Card variant="filled" style={{ width: '280px' }}>
                <CardTitle>Filled</CardTitle>
                <CardDescription>With cream background</CardDescription>
            </Card>
        </div>
    ),
};

export const Hoverable: Story = {
    args: {
        hoverable: true,
        children: (
            <>
                <CardTitle>Hover Me</CardTitle>
                <CardDescription>This card lifts on hover</CardDescription>
            </>
        ),
    },
};

export const Clickable: Story = {
    args: {
        onClick: () => alert('Card clicked!'),
        children: (
            <>
                <CardTitle>Click Me</CardTitle>
                <CardDescription>This card is clickable with press feedback</CardDescription>
            </>
        ),
    },
};

export const WithFooter: Story = {
    render: () => (
        <Card style={{ maxWidth: '350px' }}>
            <CardHeader>
                <CardTitle>Confirm Action</CardTitle>
                <CardDescription>Are you sure you want to proceed?</CardDescription>
            </CardHeader>
            <CardContent>
                <p style={{ margin: 0 }}>
                    This action cannot be undone. Please review before continuing.
                </p>
            </CardContent>
            <CardFooter>
                <Button variant="soft" color="secondary">Cancel</Button>
                <Button>Confirm</Button>
            </CardFooter>
        </Card>
    ),
};

export const ProductCard: Story = {
    render: () => (
        <Card padding="none" style={{ width: '300px', overflow: 'hidden' }}>
            <div style={{
                height: '180px',
                background: 'linear-gradient(135deg, #C2ADFF 0%, #FFAF99 100%)',
            }} />
            <div style={{ padding: '20px' }}>
                <CardTitle>Mellow Pro</CardTitle>
                <CardDescription>Premium component library</CardDescription>
                <p style={{
                    fontFamily: 'Nunito, sans-serif',
                    fontSize: '24px',
                    fontWeight: 600,
                    color: '#815BCC',
                    margin: '16px 0',
                }}>
                    $49/mo
                </p>
                <Button fullWidth>Get Started</Button>
            </div>
        </Card>
    ),
};

export const CardGrid: Story = {
    render: () => (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '24px',
        }}>
            {[1, 2, 3, 4].map((i) => (
                <Card key={i} hoverable>
                    <CardTitle>Feature {i}</CardTitle>
                    <CardDescription>
                        Brief description of this amazing feature that users will love.
                    </CardDescription>
                </Card>
            ))}
        </div>
    ),
};

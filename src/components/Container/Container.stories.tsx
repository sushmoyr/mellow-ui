import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta: Meta<typeof Container> = {
    title: 'Layout/Container',
    component: Container,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'xl', 'full'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Container>;

const ContentBox = () => (
    <div style={{
        padding: 24,
        background: 'rgba(179, 153, 255, 0.15)',
        borderRadius: 12,
        border: '2px dashed rgba(179, 153, 255, 0.3)',
        textAlign: 'center',
        color: '#5C3D99',
    }}>
        Content Area
    </div>
);

export const Default: Story = {
    render: () => (
        <Container>
            <ContentBox />
        </Container>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Container size="sm"><ContentBox /></Container>
            <Container size="md"><ContentBox /></Container>
            <Container size="lg"><ContentBox /></Container>
            <Container size="xl"><ContentBox /></Container>
        </div>
    ),
};

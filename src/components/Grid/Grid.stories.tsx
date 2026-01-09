import type { Meta, StoryObj } from '@storybook/react';
import { Grid, GridItem } from './Grid';

const meta: Meta<typeof Grid> = {
    title: 'Layout/Grid',
    component: Grid,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Grid>;

const Box = ({ children }: { children: React.ReactNode }) => (
    <div style={{
        padding: '16px',
        background: 'rgba(179, 153, 255, 0.2)',
        borderRadius: 8,
        textAlign: 'center',
        color: '#5C3D99',
        fontWeight: 500,
    }}>
        {children}
    </div>
);

export const Default: Story = {
    render: () => (
        <Grid columns={3} gap={16}>
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
            <Box>4</Box>
            <Box>5</Box>
            <Box>6</Box>
        </Grid>
    ),
};

export const WithSpan: Story = {
    name: 'With Column Span',
    render: () => (
        <Grid columns={4} gap={16}>
            <GridItem colSpan={2}><Box>Span 2</Box></GridItem>
            <Box>1</Box>
            <Box>1</Box>
            <Box>1</Box>
            <GridItem colSpan={3}><Box>Span 3</Box></GridItem>
        </Grid>
    ),
};

export const TwelveColumn: Story = {
    name: '12-Column Layout',
    render: () => (
        <Grid columns={12} gap={8}>
            <GridItem colSpan={3}><Box>3</Box></GridItem>
            <GridItem colSpan={6}><Box>6</Box></GridItem>
            <GridItem colSpan={3}><Box>3</Box></GridItem>
            <GridItem colSpan={4}><Box>4</Box></GridItem>
            <GridItem colSpan={4}><Box>4</Box></GridItem>
            <GridItem colSpan={4}><Box>4</Box></GridItem>
        </Grid>
    ),
};

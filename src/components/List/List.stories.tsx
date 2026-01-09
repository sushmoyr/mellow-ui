import type { Meta, StoryObj } from '@storybook/react';
import { List, ListItem } from './List';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';

const meta: Meta<typeof List> = {
    title: 'Data Display/List',
    component: List,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: 320 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
    render: () => (
        <List>
            <ListItem>First item</ListItem>
            <ListItem>Second item</ListItem>
            <ListItem>Third item</ListItem>
        </List>
    ),
};

export const Divided: Story = {
    render: () => (
        <List variant="divided">
            <ListItem>First item</ListItem>
            <ListItem>Second item</ListItem>
            <ListItem>Third item</ListItem>
        </List>
    ),
};

export const Bordered: Story = {
    render: () => (
        <List variant="bordered">
            <ListItem>First item</ListItem>
            <ListItem>Second item</ListItem>
            <ListItem>Third item</ListItem>
        </List>
    ),
};

export const WithSecondary: Story = {
    name: 'With Secondary Text',
    render: () => (
        <List variant="bordered">
            <ListItem secondary="alice@example.com">Alice Johnson</ListItem>
            <ListItem secondary="bob@example.com">Bob Smith</ListItem>
            <ListItem secondary="charlie@example.com">Charlie Brown</ListItem>
        </List>
    ),
};

export const WithLeadingTrailing: Story = {
    name: 'With Leading & Trailing',
    render: () => (
        <List variant="bordered">
            <ListItem
                leading={<Avatar name="Alice" size="sm" />}
                trailing={<Badge variant="success">Active</Badge>}
                secondary="Admin"
            >
                Alice Johnson
            </ListItem>
            <ListItem
                leading={<Avatar name="Bob" size="sm" color="accent" />}
                trailing={<Badge variant="secondary">Pending</Badge>}
                secondary="User"
            >
                Bob Smith
            </ListItem>
        </List>
    ),
};

export const Clickable: Story = {
    render: () => (
        <List variant="bordered">
            <ListItem clickable onClick={() => alert('Item 1')}>Click me</ListItem>
            <ListItem clickable selected>Selected item</ListItem>
            <ListItem clickable>Another clickable</ListItem>
        </List>
    ),
};

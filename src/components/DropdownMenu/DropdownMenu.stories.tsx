import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from './DropdownMenu';
import { Button } from '../Button';

const meta: Meta<typeof DropdownMenu> = {
    title: 'Overlay/DropdownMenu',
    component: DropdownMenu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
    render: () => (
        <DropdownMenu trigger={<Button>Open Menu</Button>}>
            <DropdownMenuItem icon="📝" onClick={() => console.log('Edit')}>Edit</DropdownMenuItem>
            <DropdownMenuItem icon="📋" onClick={() => console.log('Copy')}>Copy</DropdownMenuItem>
            <DropdownMenuItem icon="📌" onClick={() => console.log('Pin')}>Pin</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon="🗑️" destructive onClick={() => console.log('Delete')}>Delete</DropdownMenuItem>
        </DropdownMenu>
    ),
};

export const WithShortcuts: Story = {
    name: 'With Shortcuts',
    render: () => (
        <DropdownMenu trigger={<Button>Actions</Button>}>
            <DropdownMenuItem icon="✂️" shortcut="⌘X">Cut</DropdownMenuItem>
            <DropdownMenuItem icon="📋" shortcut="⌘C">Copy</DropdownMenuItem>
            <DropdownMenuItem icon="📋" shortcut="⌘V">Paste</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon="↩️" shortcut="⌘Z">Undo</DropdownMenuItem>
            <DropdownMenuItem icon="↪️" shortcut="⇧⌘Z">Redo</DropdownMenuItem>
        </DropdownMenu>
    ),
};

export const WithLabels: Story = {
    name: 'With Labels',
    render: () => (
        <DropdownMenu trigger={<Button variant="secondary">Sort By</Button>}>
            <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
            <DropdownMenuItem icon="📅">Date Created</DropdownMenuItem>
            <DropdownMenuItem icon="🔤">Name</DropdownMenuItem>
            <DropdownMenuItem icon="📦">Size</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Order</DropdownMenuLabel>
            <DropdownMenuItem icon="⬆️">Ascending</DropdownMenuItem>
            <DropdownMenuItem icon="⬇️">Descending</DropdownMenuItem>
        </DropdownMenu>
    ),
};

export const UserMenu: Story = {
    name: 'User Menu',
    render: () => (
        <DropdownMenu trigger={<Button variant="ghost">👤 Account</Button>} align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuItem icon="⚙️">Settings</DropdownMenuItem>
            <DropdownMenuItem icon="👥">Team</DropdownMenuItem>
            <DropdownMenuItem icon="💳">Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon="📚">Documentation</DropdownMenuItem>
            <DropdownMenuItem icon="💬">Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem icon="🚪" destructive>Sign Out</DropdownMenuItem>
        </DropdownMenu>
    ),
};

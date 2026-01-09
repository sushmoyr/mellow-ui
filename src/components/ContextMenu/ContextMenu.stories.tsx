import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenu, ContextMenuItem, ContextMenuSeparator } from './ContextMenu';

const meta: Meta<typeof ContextMenu> = {
    title: 'Overlay/ContextMenu',
    component: ContextMenu,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
    render: () => (
        <ContextMenu
            menu={
                <>
                    <ContextMenuItem icon="✂️" shortcut="⌘X">Cut</ContextMenuItem>
                    <ContextMenuItem icon="📋" shortcut="⌘C">Copy</ContextMenuItem>
                    <ContextMenuItem icon="📋" shortcut="⌘V">Paste</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem icon="🗑️" destructive>Delete</ContextMenuItem>
                </>
            }
        >
            <div style={{
                width: 320,
                height: 180,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(179, 153, 255, 0.1) 0%, rgba(255, 217, 179, 0.1) 100%)',
                borderRadius: 16,
                border: '2px dashed rgba(107, 90, 71, 0.2)',
                color: '#6B5A47',
                fontSize: 14,
                fontWeight: 500,
            }}>
                Right-click here
            </div>
        </ContextMenu>
    ),
};

export const FileActions: Story = {
    name: 'File Actions',
    render: () => (
        <ContextMenu
            menu={
                <>
                    <ContextMenuItem icon="📂">Open</ContextMenuItem>
                    <ContextMenuItem icon="📝">Rename</ContextMenuItem>
                    <ContextMenuItem icon="📋">Duplicate</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem icon="📁">Move to...</ContextMenuItem>
                    <ContextMenuItem icon="⬇️">Download</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem icon="🗑️" destructive>Move to Trash</ContextMenuItem>
                </>
            }
        >
            <div style={{
                width: 200,
                padding: 16,
                background: '#FFFDFB',
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
            }}>
                <span style={{ fontSize: 32 }}>📄</span>
                <div>
                    <div style={{ fontWeight: 600, color: '#29293D' }}>Document.pdf</div>
                    <div style={{ fontSize: 12, color: '#6B5A47' }}>2.4 MB</div>
                </div>
            </div>
        </ContextMenu>
    ),
};

export const ImageContext: Story = {
    name: 'Image Context',
    render: () => (
        <ContextMenu
            menu={
                <>
                    <ContextMenuItem icon="🔍">View Full Size</ContextMenuItem>
                    <ContextMenuItem icon="💾">Save Image As...</ContextMenuItem>
                    <ContextMenuItem icon="📋">Copy Image</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem icon="🔗">Copy Image URL</ContextMenuItem>
                    <ContextMenuItem icon="↗️">Open in New Tab</ContextMenuItem>
                </>
            }
        >
            <div style={{
                width: 240,
                height: 160,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #B399FF 0%, #FFAF99 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 14,
                fontWeight: 600,
            }}>
                🖼️ Right-click image
            </div>
        </ContextMenu>
    ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
    title: 'Navigation/Pagination',
    component: Pagination,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
    render: function DefaultPagination() {
        const [page, setPage] = useState(1);
        return <Pagination page={page} totalPages={10} onPageChange={setPage} />;
    },
};

export const ManyPages: Story = {
    name: 'Many Pages',
    render: function ManyPagesPagination() {
        const [page, setPage] = useState(5);
        return <Pagination page={page} totalPages={20} onPageChange={setPage} />;
    },
};

export const Sizes: Story = {
    render: function SizesPagination() {
        const [page1, setPage1] = useState(3);
        const [page2, setPage2] = useState(3);
        const [page3, setPage3] = useState(3);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div>
                    <span style={{ fontSize: 12, color: '#6B5A47', marginBottom: 8, display: 'block' }}>Small</span>
                    <Pagination page={page1} totalPages={5} onPageChange={setPage1} size="sm" />
                </div>
                <div>
                    <span style={{ fontSize: 12, color: '#6B5A47', marginBottom: 8, display: 'block' }}>Medium</span>
                    <Pagination page={page2} totalPages={5} onPageChange={setPage2} size="md" />
                </div>
                <div>
                    <span style={{ fontSize: 12, color: '#6B5A47', marginBottom: 8, display: 'block' }}>Large</span>
                    <Pagination page={page3} totalPages={5} onPageChange={setPage3} size="lg" />
                </div>
            </div>
        );
    },
};

export const FewPages: Story = {
    name: 'Few Pages',
    render: function FewPagesPagination() {
        const [page, setPage] = useState(1);
        return <Pagination page={page} totalPages={3} onPageChange={setPage} />;
    },
};

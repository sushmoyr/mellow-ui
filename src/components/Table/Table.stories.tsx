import type { Meta, StoryObj } from '@storybook/react';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from './Table';

const meta: Meta<typeof Table> = {
    title: 'Data Display/Table',
    component: Table,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

const sampleData = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User' },
    { id: 4, name: 'Diana Ross', email: 'diana@example.com', role: 'Editor' },
];

export const Default: Story = {
    render: () => (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Email</TableHeader>
                    <TableHeader>Role</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {sampleData.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.role}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ),
};

export const Striped: Story = {
    render: () => (
        <Table striped>
            <TableHead>
                <TableRow>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Email</TableHeader>
                    <TableHeader>Role</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {sampleData.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.role}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ),
};

export const Compact: Story = {
    render: () => (
        <Table compact>
            <TableHead>
                <TableRow>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Email</TableHeader>
                    <TableHeader>Role</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                {sampleData.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.role}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ),
};

export const WithSelection: Story = {
    name: 'With Selection',
    render: () => (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Email</TableHeader>
                    <TableHeader>Role</TableHeader>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow><TableCell>Alice Johnson</TableCell><TableCell>alice@example.com</TableCell><TableCell>Admin</TableCell></TableRow>
                <TableRow selected><TableCell>Bob Smith</TableCell><TableCell>bob@example.com</TableCell><TableCell>User</TableCell></TableRow>
                <TableRow><TableCell>Charlie Brown</TableCell><TableCell>charlie@example.com</TableCell><TableCell>User</TableCell></TableRow>
            </TableBody>
        </Table>
    ),
};

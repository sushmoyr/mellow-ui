import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
    title: 'Navigation/Breadcrumb',
    component: Breadcrumb,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
    render: () => (
        <Breadcrumb>
            <BreadcrumbItem href="#">Home</BreadcrumbItem>
            <BreadcrumbItem href="#">Products</BreadcrumbItem>
            <BreadcrumbItem href="#">Category</BreadcrumbItem>
            <BreadcrumbItem isCurrent>Product Name</BreadcrumbItem>
        </Breadcrumb>
    ),
};

export const CustomSeparator: Story = {
    name: 'Custom Separator',
    render: () => (
        <Breadcrumb separator="›">
            <BreadcrumbItem href="#">Home</BreadcrumbItem>
            <BreadcrumbItem href="#">Settings</BreadcrumbItem>
            <BreadcrumbItem isCurrent>Profile</BreadcrumbItem>
        </Breadcrumb>
    ),
};

export const ArrowSeparator: Story = {
    name: 'Arrow Separator',
    render: () => (
        <Breadcrumb separator="→">
            <BreadcrumbItem href="#">Dashboard</BreadcrumbItem>
            <BreadcrumbItem href="#">Users</BreadcrumbItem>
            <BreadcrumbItem isCurrent>John Doe</BreadcrumbItem>
        </Breadcrumb>
    ),
};

export const IconSeparator: Story = {
    name: 'Icon Separator',
    render: () => (
        <Breadcrumb separator={<span style={{ opacity: 0.4 }}>▸</span>}>
            <BreadcrumbItem href="#">🏠 Home</BreadcrumbItem>
            <BreadcrumbItem href="#">📁 Documents</BreadcrumbItem>
            <BreadcrumbItem isCurrent>📄 Report.pdf</BreadcrumbItem>
        </Breadcrumb>
    ),
};

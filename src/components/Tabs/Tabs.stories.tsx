import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';

const meta: Meta<typeof Tabs> = {
    title: 'Navigation/Tabs',
    component: Tabs,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div style={{ width: 400 }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
    render: () => (
        <Tabs defaultValue="tab1">
            <TabList>
                <Tab value="tab1">Overview</Tab>
                <Tab value="tab2">Features</Tab>
                <Tab value="tab3">Pricing</Tab>
            </TabList>
            <TabPanel value="tab1">
                <p style={{ color: '#29293D', margin: 0 }}>
                    Welcome to the overview section. Here you'll find general information.
                </p>
            </TabPanel>
            <TabPanel value="tab2">
                <p style={{ color: '#29293D', margin: 0 }}>
                    Discover all the amazing features we offer.
                </p>
            </TabPanel>
            <TabPanel value="tab3">
                <p style={{ color: '#29293D', margin: 0 }}>
                    View our competitive pricing plans.
                </p>
            </TabPanel>
        </Tabs>
    ),
};

export const Pills: Story = {
    render: () => (
        <Tabs defaultValue="all" variant="pills">
            <TabList>
                <Tab value="all">All</Tab>
                <Tab value="active">Active</Tab>
                <Tab value="completed">Completed</Tab>
            </TabList>
            <TabPanel value="all">All items displayed here.</TabPanel>
            <TabPanel value="active">Active items only.</TabPanel>
            <TabPanel value="completed">Completed items.</TabPanel>
        </Tabs>
    ),
};

export const Enclosed: Story = {
    render: () => (
        <Tabs defaultValue="account" variant="enclosed">
            <TabList>
                <Tab value="account">Account</Tab>
                <Tab value="security">Security</Tab>
                <Tab value="notifications">Notifications</Tab>
            </TabList>
            <TabPanel value="account">Account settings and profile information.</TabPanel>
            <TabPanel value="security">Password and security settings.</TabPanel>
            <TabPanel value="notifications">Notification preferences.</TabPanel>
        </Tabs>
    ),
};

export const Sizes: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <Tabs defaultValue="a" size="sm">
                <TabList>
                    <Tab value="a">Small</Tab>
                    <Tab value="b">Tabs</Tab>
                </TabList>
            </Tabs>
            <Tabs defaultValue="a" size="md">
                <TabList>
                    <Tab value="a">Medium</Tab>
                    <Tab value="b">Tabs</Tab>
                </TabList>
            </Tabs>
            <Tabs defaultValue="a" size="lg">
                <TabList>
                    <Tab value="a">Large</Tab>
                    <Tab value="b">Tabs</Tab>
                </TabList>
            </Tabs>
        </div>
    ),
};

export const WithDisabled: Story = {
    name: 'With Disabled Tab',
    render: () => (
        <Tabs defaultValue="tab1">
            <TabList>
                <Tab value="tab1">Available</Tab>
                <Tab value="tab2" disabled>Coming Soon</Tab>
                <Tab value="tab3">Another</Tab>
            </TabList>
            <TabPanel value="tab1">This tab is available.</TabPanel>
            <TabPanel value="tab3">Another available tab.</TabPanel>
        </Tabs>
    ),
};

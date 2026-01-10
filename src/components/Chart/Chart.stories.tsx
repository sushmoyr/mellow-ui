/**
 * Chart Stories
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Chart } from './Chart';
import { MellowLineChart } from './charts/LineChart';
import { MellowAreaChart } from './charts/AreaChart';
import { MellowBarChart } from './charts/BarChart';
import { MellowPieChart } from './charts/PieChart';
import { MellowRadarChart } from './charts/RadarChart';
import { MellowComposedChart } from './charts/ComposedChart';

// Sample data
const monthlyData = [
    { month: 'Jan', revenue: 4000, cost: 2400, profit: 1600 },
    { month: 'Feb', revenue: 3000, cost: 1398, profit: 1602 },
    { month: 'Mar', revenue: 2000, cost: 9800, profit: -7800 },
    { month: 'Apr', revenue: 2780, cost: 3908, profit: -1128 },
    { month: 'May', revenue: 1890, cost: 4800, profit: -2910 },
    { month: 'Jun', revenue: 2390, cost: 3800, profit: -1410 },
    { month: 'Jul', revenue: 3490, cost: 4300, profit: -810 },
];

const pieData = [
    { name: 'Desktop', value: 400 },
    { name: 'Mobile', value: 300 },
    { name: 'Tablet', value: 200 },
    { name: 'Other', value: 100 },
];

const radarData = [
    { subject: 'Math', A: 120, B: 110 },
    { subject: 'Chinese', A: 98, B: 130 },
    { subject: 'English', A: 86, B: 130 },
    { subject: 'Geography', A: 99, B: 100 },
    { subject: 'Physics', A: 85, B: 90 },
    { subject: 'History', A: 65, B: 85 },
];

const meta: Meta<typeof Chart> = {
    title: 'Data Visualization/Charts',
    component: Chart,
    parameters: {
        layout: 'padded',
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LineChartBasic: Story = {
    render: () => (
        <Chart title="Monthly Revenue" description="Revenue trend over time">
            <MellowLineChart data={monthlyData} xKey="month" yKey="revenue" />
        </Chart>
    ),
};

export const LineChartMultiSeries: Story = {
    render: () => (
        <Chart title="Revenue vs Cost">
            <MellowLineChart
                data={monthlyData}
                xKey="month"
                yKey={['revenue', 'cost']}
            />
        </Chart>
    ),
};

export const AreaChartBasic: Story = {
    render: () => (
        <Chart title="Revenue Area Chart">
            <MellowAreaChart data={monthlyData} xKey="month" yKey="revenue" />
        </Chart>
    ),
};

export const AreaChartStacked: Story = {
    render: () => (
        <Chart title="Stacked Area Chart">
            <MellowAreaChart
                data={monthlyData}
                xKey="month"
                yKey={['revenue', 'cost']}
                stacked
            />
        </Chart>
    ),
};

export const BarChartBasic: Story = {
    render: () => (
        <Chart title="Monthly Revenue Bar">
            <MellowBarChart data={monthlyData} xKey="month" yKey="revenue" />
        </Chart>
    ),
};

export const BarChartColorful: Story = {
    render: () => (
        <Chart title="Colorful Bar Chart">
            <MellowBarChart data={monthlyData} xKey="month" yKey="revenue" colorful />
        </Chart>
    ),
};

export const BarChartHorizontal: Story = {
    render: () => (
        <Chart title="Horizontal Bar Chart">
            <MellowBarChart
                data={monthlyData}
                xKey="month"
                yKey="revenue"
                layout="vertical"
                height={400}
            />
        </Chart>
    ),
};

export const BarChartGrouped: Story = {
    render: () => (
        <Chart title="Revenue vs Cost">
            <MellowBarChart
                data={monthlyData}
                xKey="month"
                yKey={['revenue', 'cost']}
            />
        </Chart>
    ),
};

export const PieChartBasic: Story = {
    render: () => (
        <Chart title="Device Distribution">
            <MellowPieChart data={pieData} />
        </Chart>
    ),
};

export const DonutChart: Story = {
    render: () => (
        <Chart title="Device Distribution (Donut)">
            <MellowPieChart data={pieData} innerRadius="60%" />
        </Chart>
    ),
};

export const RadarChartBasic: Story = {
    render: () => (
        <Chart title="Student Performance">
            <MellowRadarChart
                data={radarData}
                categoryKey="subject"
                series={[
                    { dataKey: 'A', name: 'Student A' },
                    { dataKey: 'B', name: 'Student B' },
                ]}
            />
        </Chart>
    ),
};

export const ComposedChartBasic: Story = {
    render: () => (
        <Chart title="Revenue, Cost & Profit">
            <MellowComposedChart
                data={monthlyData}
                xKey="month"
                series={[
                    { dataKey: 'revenue', type: 'bar', name: 'Revenue' },
                    { dataKey: 'cost', type: 'bar', name: 'Cost' },
                    { dataKey: 'profit', type: 'line', name: 'Profit' },
                ]}
            />
        </Chart>
    ),
};

export const EmptyState: Story = {
    render: () => (
        <Chart title="Empty Chart" empty emptyMessage="No data to display">
            <MellowLineChart data={[]} xKey="month" yKey="revenue" />
        </Chart>
    ),
};

export const LoadingState: Story = {
    render: () => (
        <Chart title="Loading Chart" loading>
            <MellowLineChart data={[]} xKey="month" yKey="revenue" />
        </Chart>
    ),
};

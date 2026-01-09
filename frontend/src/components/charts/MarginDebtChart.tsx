'use client';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MarginDebtChart({ data }: { data: any[] }) {
    if (!data || data.length === 0) return <div>No data</div>;

    // Data expected to have: month (date), total_debt_billions, date (string)
    // Sort ascending by date
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chartData = [...data].sort((a: any, b: any) => new Date(a.month).getTime() - new Date(b.month).getTime());

    return (
        <Card className="w-full h-[500px] border-zinc-800 bg-background/50">
            <CardHeader>
                <CardTitle>FINRA Margin Debt (Billions)</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorDebt" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="month" stroke="#888" tickFormatter={(str) => str.substring(0, 7)} />
                        <YAxis stroke="#888" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#18181b', borderColor: '#333' }}
                            itemStyle={{ color: '#ccc' }}
                        />
                        <Area type="monotone" dataKey="total_debt_billions" stroke="#8884d8" fillOpacity={1} fill="url(#colorDebt)" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

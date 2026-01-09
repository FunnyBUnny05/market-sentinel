'use client';

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AllocationChart({ data }: { data: any[] }) {
    if (!data || data.length === 0) return <div>No data</div>;

    // Sort ascending
    const chartData = [...data].sort((a, b) => new Date(a.survey_date).getTime() - new Date(b.survey_date).getTime());

    return (
        <Card className="w-full h-[500px] border-zinc-800 bg-background/50">
            <CardHeader>
                <CardTitle>AAII Asset Allocation (%)</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} stackOffset="expand">
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="survey_date" stroke="#888" tickFormatter={(str) => str.substring(0, 7)} />
                        <YAxis stroke="#888" tickFormatter={(val) => `${(val * 100).toFixed(0)}%`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#18181b', borderColor: '#333' }}
                            itemStyle={{ color: '#ccc' }}
                        />
                        <Legend />
                        <Area type="monotone" dataKey="cash_pct" stackId="1" stroke="#ffc658" fill="#ffc658" name="Cash" />
                        <Area type="monotone" dataKey="bonds_pct" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Bonds" />
                        <Area type="monotone" dataKey="stocks_pct" stackId="1" stroke="#8884d8" fill="#8884d8" name="Stocks" />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

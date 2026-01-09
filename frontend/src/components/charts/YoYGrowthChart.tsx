'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
    Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function YoYGrowthChart({ data }: { data: any[] }) {
    if (!data || data.length < 13) return null;

    // Calculate YoY Growth
    // Assumes data is sorted by date ascending? Or we sort it.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sorted = [...data].sort((a: any, b: any) => new Date(a.month).getTime() - new Date(b.month).getTime());

    const growthData = sorted.map((item, index) => {
        if (index < 12) return null; // Need 12 months prior
        const prev = sorted[index - 12];
        const growth = ((item.total_debt_billions - prev.total_debt_billions) / prev.total_debt_billions) * 100;

        return {
            month: item.month,
            growth,
            debts: item.total_debt_billions
        };
    }).filter(Boolean); // Remove nulls

    return (
        <Card className="w-full h-[350px] border-zinc-800 bg-background/50">
            <CardHeader>
                <CardTitle>YoY Margin Debt Growth (%)</CardTitle>
            </CardHeader>
            <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={growthData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="month" stroke="#888" tickFormatter={(str) => str.substring(0, 7)} />
                        <YAxis stroke="#888" />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#18181b', borderColor: '#333' }}
                            itemStyle={{ color: '#ccc' }}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            formatter={(value: any) => [`${Number(value).toFixed(2)}%`, 'YoY Growth']}
                        />
                        <ReferenceLine y={0} stroke="#666" />
                        <Bar dataKey="growth">
                            {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                growthData.map((entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={entry.growth > 0 ? (entry.growth > 40 ? '#ef4444' : '#22c55e') : '#ef4444'} />
                                ))
                            }
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

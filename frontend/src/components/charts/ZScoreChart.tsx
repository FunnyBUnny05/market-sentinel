'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ZScoreTimeseriesChart({ data }: { data: any }) {
    // Transform data: 
    // Input: { XLK: [{date: '2023-01-01', zscore: 1.2}, ...], ... }
    // Output: [{date: '2023-01-01', XLK: 1.2, XLU: -0.5, ...}, ...]

    // We assume all series share dates. If not, we merge.
    // For MVP, we take keys from first series and map.

    if (!data) return <div>No data</div>;

    const symbols = Object.keys(data);
    if (symbols.length === 0) return <div>No data</div>;

    // Create map of date -> object
    const dateMap = new Map<string, Record<string, unknown>>();

    symbols.forEach(sym => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data[sym]?.forEach((pt: any) => {
            const dateStr = pt.date;
            if (!dateMap.has(dateStr)) dateMap.set(dateStr, { date: dateStr });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (dateMap.get(dateStr) as any)[sym] = Number(pt.zscore);
        });
    });

    // Convert map to sorted array
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chartData = Array.from(dateMap.values()).sort((a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Colors for 11 sectors
    const colors = [
        '#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e',
        '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef'
    ];

    return (
        <Card className="w-full h-[600px] border-zinc-800 bg-background/50">
            <CardHeader>
                <CardTitle>Sector Z-Scores (vs Benchmark)</CardTitle>
            </CardHeader>
            <CardContent className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="date" stroke="#888" />
                        <YAxis stroke="#888" domain={[-4, 4]} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#18181b', borderColor: '#333' }}
                            itemStyle={{ color: '#ccc' }}
                        />
                        <Legend />
                        <ReferenceLine y={2} stroke="red" strokeDasharray="3 3" />
                        <ReferenceLine y={-2} stroke="green" strokeDasharray="3 3" />
                        <ReferenceLine y={0} stroke="#666" />

                        {symbols.map((sym, i) => (
                            <Line
                                key={sym}
                                type="monotone"
                                dataKey={sym}
                                stroke={colors[i % colors.length]}
                                dot={false}
                                strokeWidth={2}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

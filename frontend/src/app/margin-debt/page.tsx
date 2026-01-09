'use client';

import { useQuery } from '@tanstack/react-query';
import { MetricCard } from '@/components/MetricCard';
import { MarginDebtChart } from '@/components/charts/MarginDebtChart';
import { YoYGrowthChart } from '@/components/charts/YoYGrowthChart';
import { WarningBanner } from '@/components/WarningBanner';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function MarginDebtPage() {
    const { data, isLoading } = useQuery({
        queryKey: ['margin-debt'],
        queryFn: () => fetch(`${API_URL}/api/v1/margin-debt`).then(r => r.json()),
    });

    if (isLoading) return <div className="p-10 text-center">Loading...</div>;

    const { current, timeseries } = data || {};

    // Calculate current YoY for banner
    let currentYoY = null;
    if (timeseries && timeseries.length > 12) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sorted = [...timeseries].sort((a: any, b: any) => new Date(a.month).getTime() - new Date(b.month).getTime());
        const latest = sorted[sorted.length - 1];
        const yearAgo = sorted[sorted.length - 13];
        if (latest && yearAgo) {
            currentYoY = ((latest.total_debt_billions - yearAgo.total_debt_billions) / yearAgo.total_debt_billions) * 100;
        }
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">FINRA Margin Debt</h1>

            <WarningBanner currentGrowth={currentYoY} />

            <div className="grid gap-4 md:grid-cols-4">
                <MetricCard
                    title="Total Debt"
                    value={current ? `$${Number(current.total_debt_billions).toFixed(0)}B` : '-'}
                    sublabel={current?.month}
                />
                <MetricCard
                    title="YoY Growth"
                    value={currentYoY ? `${currentYoY.toFixed(1)}%` : '-'}
                    color={currentYoY && currentYoY > 30 ? 'red' : (currentYoY && currentYoY < -30 ? 'green' : 'default')}
                    sublabel="WARNING > 30%"
                />
                <MetricCard
                    title="vs 2021 Peak"
                    value={current ? `${Number(current.vs_2021_peak_pct || 0).toFixed(1)}%` : '-'}
                    sublabel="Peak $971B"
                />
                <MetricCard
                    title="Signal"
                    value={current?.signal || 'NEUTRAL'}
                    color={current?.signal === 'EUPHORIA' ? 'red' : (current?.signal === 'CAPITULATION' ? 'green' : 'default')}
                />
            </div>

            <MarginDebtChart data={timeseries} />
            <YoYGrowthChart data={timeseries} />
        </div>
    );
}

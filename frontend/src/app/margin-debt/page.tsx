'use client';

import { MetricCard } from '@/components/MetricCard';
import { MarginDebtChart } from '@/components/charts/MarginDebtChart';
import { YoYGrowthChart } from '@/components/charts/YoYGrowthChart';
import { WarningBanner } from '@/components/WarningBanner';
import { mockMarginDebt } from '@/lib/mockData';

export default function MarginDebtPage() {
    // Use mock data instead of API
    const data = mockMarginDebt;
    const { current, timeseries } = data;

    // Calculate current YoY for banner
    const currentYoY = current?.yoy_growth_pct || null;

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

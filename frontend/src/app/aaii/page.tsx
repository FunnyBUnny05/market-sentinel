'use client';

import { MetricCard } from '@/components/MetricCard';
import { AllocationChart } from '@/components/charts/AllocationChart';
import { ExtremesTable } from '@/components/ExtremesTable';
import { mockAAII } from '@/lib/mockData';

export default function AAIIPage() {
    // Use mock data instead of API
    const data = mockAAII;
    const { current, timeseries, historical } = data;

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">AAII Asset Allocation</h1>

            <div className="grid gap-4 md:grid-cols-3">
                <MetricCard
                    title="Stocks Allocation"
                    value={current ? `${Number(current.stocks_pct).toFixed(1)}%` : '-'}
                    sublabel={`Avg: ${historical?.avg_stocks || '61.2'}%`}
                />
                <MetricCard
                    title="Bonds Allocation"
                    value={current ? `${Number(current.bonds_pct).toFixed(1)}%` : '-'}
                    sublabel={`Avg: ${historical?.avg_bonds || '16.0'}%`}
                />
                <MetricCard
                    title="Cash Allocation"
                    value={current ? `${Number(current.cash_pct).toFixed(1)}%` : '-'}
                    sublabel={`Avg: ${historical?.avg_cash || '22.0'}%`}
                />
            </div>

            <AllocationChart data={timeseries} />

            <ExtremesTable />
        </div>
    );
}

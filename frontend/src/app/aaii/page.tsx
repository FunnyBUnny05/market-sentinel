'use client';

import { useQuery } from '@tanstack/react-query';
import { MetricCard } from '@/components/MetricCard';
import { AllocationChart } from '@/components/charts/AllocationChart';
import { ExtremesTable } from '@/components/ExtremesTable';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function AAIIPage() {
    const { data, isLoading } = useQuery({
        queryKey: ['aaii'],
        queryFn: () => fetch(`${API_URL}/api/v1/aaii/allocation`).then(r => r.json()),
    });

    if (isLoading) return <div className="p-10 text-center">Loading...</div>;

    const { current, timeseries, historical } = data || {};

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

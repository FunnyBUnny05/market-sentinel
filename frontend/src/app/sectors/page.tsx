'use client';

import { SectorRankingTable } from '@/components/SectorRankingTable';
import { useQuery } from '@tanstack/react-query';
import { MetricCard } from '@/components/MetricCard';
import { ZScoreTimeseriesChart } from '@/components/charts/ZScoreChart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function SectorsPage() {
    const [benchmark, setBenchmark] = useState('SPY');
    const [windowDays, setWindowDays] = useState('252');

    const { data: zscores, isLoading: loadingZ } = useQuery({
        queryKey: ['sectors-zscore', benchmark, windowDays],
        queryFn: () => fetch(`${API_URL}/api/v1/sectors/zscore?benchmark=${benchmark}&window=${windowDays}`).then(r => r.json()),
    });

    const { data: timeseries, isLoading: loadingTS } = useQuery({
        queryKey: ['sectors-timeseries', benchmark, windowDays],
        queryFn: () => fetch(`${API_URL}/api/v1/sectors/zscore/timeseries?benchmark=${benchmark}&window=${windowDays}`).then(r => r.json()),
    });

    if (loadingZ || loadingTS) return <div className="p-10 text-center">Loading Data...</div>;

    // Find cheapest and most extended
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sorted = [...(zscores?.data || [])].sort((a: any, b: any) => Number(a.zscore) - Number(b.zscore));
    const cheapest = sorted[0];
    const mostExtended = sorted[sorted.length - 1];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const avgZ = sorted.reduce((acc: number, curr: any) => acc + Number(curr.zscore), 0) / sorted.length;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Sector Z-Score</h1>
                <div className="flex gap-4">
                    <Select value={benchmark} onValueChange={setBenchmark}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Benchmark" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="SPY">SPY (S&P 500)</SelectItem>
                            <SelectItem value="QQQ">QQQ (Nasdaq)</SelectItem>
                            <SelectItem value="IWM">IWM (Russell)</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={windowDays} onValueChange={setWindowDays}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Window" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="252">1 Year</SelectItem>
                            <SelectItem value="756">3 Years</SelectItem>
                            <SelectItem value="1260">5 Years</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <MetricCard
                    title="Cheapest Sector"
                    value={cheapest?.symbol || '-'}
                    sublabel={`Z-Score: ${cheapest?.zscore || '-'}`}
                    color="green"
                    trend="down"
                />
                <MetricCard
                    title="Most Extended"
                    value={mostExtended?.symbol || '-'}
                    sublabel={`Z-Score: ${mostExtended?.zscore || '-'}`}
                    color="red"
                    trend="up"
                />
                <MetricCard
                    title="Avg Z-Score"
                    value={avgZ ? avgZ.toFixed(2) : '-'}
                    sublabel={Math.abs(avgZ) < 1 ? "NEUTRAL" : (avgZ > 0 ? "ELEVATED" : "DEPRESSED")}
                />
            </div>

            <ZScoreTimeseriesChart data={timeseries?.data} />

            <div className="space-y-4">
                <h2 className="text-xl font-semibold tracking-tight">Sector Ranking</h2>
                <SectorRankingTable data={zscores?.data} />
            </div>
        </div>
    );
}

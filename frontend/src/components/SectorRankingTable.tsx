'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

interface SectorData {
    symbol: string;
    zscore: number;
    signal: string;
    close_price?: number; // Optional if we have it
    date: string;
}

interface SectorRankingTableProps {
    data: SectorData[];
}

export function SectorRankingTable({ data }: SectorRankingTableProps) {
    if (!data || data.length === 0) {
        return <div className="text-center p-4 text-muted-foreground">No data available</div>
    }

    // Sort by Z-Score ascending (Cheapest first)
    const sortedData = [...data].sort((a, b) => Number(a.zscore) - Number(b.zscore));

    return (
        <div className="rounded-md border border-zinc-800 bg-background/50">
            <Table>
                <TableHeader>
                    <TableRow className="border-zinc-800 hover:bg-transparent">
                        <TableHead className="w-[100px]">Symbol</TableHead>
                        <TableHead className="text-right">Z-Score</TableHead>
                        <TableHead>Signal</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedData.map((sector) => (
                        <TableRow key={sector.symbol} className="border-zinc-800 hover:bg-zinc-800/50">
                            <TableCell className="font-medium text-foreground">{sector.symbol}</TableCell>
                            <TableCell className={cn(
                                "text-right font-mono",
                                Number(sector.zscore) < -2 ? "text-green-500 font-bold" :
                                    Number(sector.zscore) > 2 ? "text-red-500 font-bold" : "text-foreground"
                            )}>
                                {Number(sector.zscore).toFixed(2)}
                            </TableCell>
                            <TableCell>
                                <span className={cn(
                                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
                                    sector.signal === 'CYCLICAL_LOW' ? "bg-green-400/10 text-green-400 ring-green-400/20" :
                                        sector.signal === 'EXTENDED' ? "bg-red-400/10 text-red-400 ring-red-400/20" :
                                            "bg-zinc-400/10 text-zinc-400 ring-zinc-400/20"
                                )}>
                                    {sector.signal}
                                </span>
                            </TableCell>
                            <TableCell className="text-right text-muted-foreground">{sector.date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

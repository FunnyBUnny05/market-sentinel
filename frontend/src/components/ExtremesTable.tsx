'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function ExtremesTable() {
    // Static data based on AAII historical norms
    const extremes = [
        { asset: 'Stocks', level: 'Excessive Optimism', value: '> 70%', note: 'Market Top Risk' },
        { asset: 'Stocks', level: 'Excessive Fear', value: '< 50%', note: 'Buying Opportunity' },
        { asset: 'Cash', level: 'High Fear', value: '> 25%', note: 'Bullish Fuel' },
        { asset: 'Cash', level: 'Complacency', value: '< 15%', note: 'Bearish Warning' }
    ];

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-tight">Historical Extremes & Signals</h2>
            <div className="rounded-md border border-zinc-800 bg-background/50">
                <Table>
                    <TableHeader>
                        <TableRow className="border-zinc-800 hover:bg-transparent">
                            <TableHead>Asset</TableHead>
                            <TableHead>Condition</TableHead>
                            <TableHead>Threshold</TableHead>
                            <TableHead>Implication</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {extremes.map((item, i) => (
                            <TableRow key={i} className="border-zinc-800 hover:bg-zinc-800/50">
                                <TableCell className="font-medium text-foreground">{item.asset}</TableCell>
                                <TableCell className="text-muted-foreground">{item.level}</TableCell>
                                <TableCell className="font-mono text-foreground">{item.value}</TableCell>
                                <TableCell className={item.note.includes('Risk') || item.note.includes('Warning') ? "text-red-400" : "text-green-400"}>
                                    {item.note}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface MetricCardProps {
    title: string;
    value: string | number;
    sublabel?: string;
    trend?: 'up' | 'down' | 'neutral';
    color?: 'default' | 'red' | 'green' | 'yellow';
    className?: string;
}

export function MetricCard({ title, value, sublabel, trend, color, className }: MetricCardProps) {
    const colorClass = {
        default: 'text-foreground',
        red: 'text-red-500',
        green: 'text-green-500',
        yellow: 'text-yellow-500',
    }[color || 'default'];

    return (
        <Card className={cn('bg-background/60 backdrop-blur-sm border-zinc-800', className)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                {trend === 'up' && <ArrowUp className="h-4 w-4 text-green-500" />}
                {trend === 'down' && <ArrowDown className="h-4 w-4 text-red-500" />}
                {trend === 'neutral' && <Minus className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
                <div className={cn("text-2xl font-bold", colorClass)}>{value}</div>
                {sublabel && (
                    <p className="text-xs text-muted-foreground mt-1">
                        {sublabel}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}

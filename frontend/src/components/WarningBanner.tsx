import { AlertTriangle, Info } from "lucide-react"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export function WarningBanner({ currentGrowth }: { currentGrowth: number | null }) {
    if (currentGrowth === null) return null;

    if (currentGrowth > 40) {
        return (
            <Alert variant="destructive" className="border-red-900 bg-red-900/20 text-red-200">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Danger Zone</AlertTitle>
                <AlertDescription>
                    Margin Debt has grown by {currentGrowth.toFixed(1)}% YoY. Historically, rapid acceleration in margin usage &gt; 40-50% often precedes major market corrections.
                </AlertDescription>
            </Alert>
        )
    }

    if (currentGrowth < -20) {
        return (
            <Alert className="border-green-900 bg-green-900/20 text-green-300">
                <Info className="h-4 w-4" />
                <AlertTitle>Deleveraging Event</AlertTitle>
                <AlertDescription>
                    Margin Debt has contracted by {Math.abs(currentGrowth).toFixed(1)}% YoY. This typically signals a bottoming process or significant fear in the market.
                </AlertDescription>
            </Alert>
        )
    }

    return null;
}

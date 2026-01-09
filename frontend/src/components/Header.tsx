'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
    const pathname = usePathname();

    // Links should NOT include basePath - Next.js handles that automatically
    const tabs = [
        { name: 'Sector Z-Score', href: '/sectors/' },
        { name: 'Margin Debt', href: '/margin-debt/' },
        { name: 'AAII Allocation', href: '/aaii/' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-background/80 backdrop-blur-lg">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2 font-bold text-xl tracking-tighter hover:text-primary transition-colors">
                        market_sentinel
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {tabs.map((tab) => (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                className={cn(
                                    "transition-colors hover:text-foreground/80",
                                    pathname?.includes(tab.href.replace(/\/$/, '')) ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                {tab.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Demo Mode
                    <span className="hidden sm:inline opacity-50">| Data: Static</span>
                </div>
            </div>
        </header>
    );
}

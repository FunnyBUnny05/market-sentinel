'use client';

// No Providers needed for static site - removed react-query
export function Providers({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

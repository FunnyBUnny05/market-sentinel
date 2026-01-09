import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Use Google Font for simplicity
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Market Sentinel",
  description: "Market Intelligence Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-background antialiased text-foreground`}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container max-w-screen-2xl py-6 mx-auto px-4">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

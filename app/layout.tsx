import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Claude Weather",
  description: "Claude Weather",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <div className="max-w-7xl mx-auto px-4 py-4 fixed top-0">
            <h1 className="text-xl font-semibold">Claude Weather</h1>
          </div>
        </header>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

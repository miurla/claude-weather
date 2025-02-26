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
          <div className="w-full mx-auto px-4 py-4 fixed top-0 bg-white bg-opacity-80 backdrop-blur-sm z-10">
            <h1 className="text-xl font-semibold">Claude Weather</h1>
          </div>
        </header>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

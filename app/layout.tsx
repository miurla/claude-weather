import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { Github } from "lucide-react";

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
          <div className="w-full mx-auto px-4 py-4 fixed top-0 bg-white bg-opacity-80 backdrop-blur-sm z-10 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Claude Weather</h1>
            <a
              href="https://github.com/miurla/claude-weather"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-800 hover:text-neutral-600 transition-colors"
            >
              <Github size={20} />
            </a>
          </div>
        </header>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

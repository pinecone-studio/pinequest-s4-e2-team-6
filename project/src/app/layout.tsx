import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "AI Nomad | Монголын далд аяллын хөтөч",
  description: "Монголын олны хөлөөс зайдуу үзэсгэлэнт газруудыг AI Nomad-аар судлаарай.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "AI Nomad", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#00658b" },
    { media: "(prefers-color-scheme: dark)", color: "#080b0d" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="mn"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

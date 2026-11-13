import type { Metadata } from "next";
import "./globals.css";

/**
 * Fonts are the platform's own. That keeps the build hermetic (no fetch to
 * Google at build time, which was both slow and flaky in CI) and costs the
 * visitor nothing to download. To adopt JetBrains Mono / Inter later, drop the
 * .woff2 files in src/fonts and swap this for next/font/local — the CSS already
 * reads --font-jetbrains and --font-inter.
 */

const SITE = "https://rd0.ai";
const TITLE = "Jinx — duplicate PR warnings for coding agents";
const DESCRIPTION =
  "Jinx checks every new pull request against the ones already open and comments when it finds a likely duplicate, with the reasons. Runs on CPU in 6 ms. No LLM, no API key.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "duplicate pull request",
    "coding agents",
    "GitHub Action",
    "code review",
    "PR triage",
  ],
  authors: [{ name: "Harshul Jain" }],
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE,
    siteName: "Jinx",
    type: "website",
    images: [
      {
        url: "/action_comment.png",
        width: 1200,
        height: 630,
        alt: "A Jinx duplicate warning on a pull request",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/action_comment.png"],
  },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Loaded in the browser rather than at build time, the way px0 does it:
            no build-time fetch to Google that can hang or fail in CI. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font --
            the rule targets the Pages Router's _document.js. This is the App
            Router root layout, so the link already applies to every page. */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

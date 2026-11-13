import type { Metadata } from "next";
import "./globals.css";

/**
 * Fonts are the platform's own. That keeps the build hermetic (no fetch to
 * Google at build time, which was both slow and flaky in CI) and costs the
 * visitor nothing to download. To adopt JetBrains Mono / Inter later, drop the
 * .woff2 files in src/fonts and swap this for next/font/local — the CSS already
 * reads --font-jetbrains and --font-inter.
 */

const SITE = "https://jinx-pr.vercel.app";
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

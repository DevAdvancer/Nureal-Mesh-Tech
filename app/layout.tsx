import type { Metadata } from "next";
import { Syne, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import {
  buildOrganizationSchema,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo";

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Neural Mesh Tech | Software Development Company",
  description:
    "Neural Mesh Tech is a software development company that builds custom web applications, mobile apps, backend systems, startup MVPs, and legacy modernization projects.",
  keywords: [
    "Neural Mesh Tech",
    "Neural Mesh",
    "NeuralMesh",
    "Neural Mesh Technologies",
    "software development company",
    "custom software development",
    "web application development",
    "mobile app development",
    "API development company",
    "backend engineering",
    "startup MVP development",
    "technology consulting",
    "legacy modernization",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Neural Mesh Tech | Software Development Company",
    description:
      "Custom web applications, mobile apps, backend platforms, startup MVPs, and modernization services from Neural Mesh Tech.",
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [absoluteUrl("/og-image.png")],
  },
  twitter: {
    card: "summary_large_image",
    site: "@neuralmeshs",
    creator: "@neuralmeshs",
    title: "Neural Mesh Tech | Software Development Company",
    description:
      "Software development services from Neural Mesh Tech, including web apps, mobile apps, APIs, startup MVPs, and modernization.",
    images: [absoluteUrl("/og-image.png")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = buildOrganizationSchema();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${syne.variable} ${manrope.variable} ${spaceMono.variable} antialiased`}
        suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}

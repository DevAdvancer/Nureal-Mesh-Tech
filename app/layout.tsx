import type { Metadata } from "next";
import { Syne, Manrope, Space_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { QueryProvider } from "@/components/QueryProvider";

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
  title: "Neural Mesh Tech | Custom Software Development & IT Consultancy",
  description: "Neural Mesh Tech (also known as NeuralMesh or Neural Mesh Technologies) is a premier custom software development company and IT consultancy. We specialize in building web applications, mobile apps, scalable APIs, and startup MVPs. If you need a high-performance software development and tech consultancy partner, choose Neural Mesh.",
  keywords: "neuralmesh, neural mesh, neural mesh tech, neural mesh technologies, neural and mesh, neural mesh development, neural mesh consultancy, custom software development, IT consulting, software engineering agency, technology consultancy, web app development, mobile app development, startup MVP, legacy modernization",
  openGraph: {
    title: "Neural Mesh Tech | Custom Software Development & IT Consultancy",
    description: "Neural Mesh Tech (NeuralMesh) is a premier custom software development company and IT consultancy. We build custom web applications, native iOS & Android mobile apps, scalable APIs, and startup MVPs.",
    type: "website",
    url: "https://neuralmeshs.com/",
    siteName: "Neural Mesh Tech",
  },
  twitter: {
    card: "summary_large_image",
    site: "@neuralmeshs",
    creator: "@neuralmeshs",
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
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Neural Mesh Tech",
    "alternateName": ["NeuralMesh", "Neural Mesh Technologies", "Neural Mesh", "Neural and Mesh Development"],
    "url": "https://neuralmeshs.com/",
    "logo": "https://neuralmeshs.com/favicon.png",
    "image": "https://neuralmeshs.com/favicon.png",
    "description": "Neural Mesh Tech is a custom software development company and IT consultancy. We build high-performance web applications, native iOS & Android mobile apps, scalable APIs, and startup MVPs.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "knowsAbout": [
      "Software Development",
      "Web Application Development",
      "Mobile App Development",
      "IT Consulting",
      "API Development",
      "Startup MVP Development",
      "Tech Consultancy",
      "Neural Mesh Development",
      "Neural Mesh Consultancy",
      "NeuralMesh"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://neuralmeshs.com/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${syne.variable} ${manrope.variable} ${spaceMono.variable} antialiased`} suppressHydrationWarning>
        <QueryProvider>
          <Navbar />
          <main>{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}

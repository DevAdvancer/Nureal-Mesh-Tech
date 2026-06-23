import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
        { name: "theme-color", content: "#0F0D1A" },
        { name: "msapplication-TileColor", content: "#0F0D1A" },
        { name: "msapplication-TileImage", content: "/icondark.png" },
        { name: "application-name", content: "Neural Mesh Tech" },
        { name: "apple-mobile-web-app-title", content: "Neural Mesh Tech" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "format-detection", content: "telephone=no" },
        { name: "rating", content: "general" },
        { name: "distribution", content: "global" },
        { name: "revisit-after", content: "7 days" },
        { name: "language", content: "English" },
        { name: "geo.region", content: "US" },
        { name: "ICBM", content: "37.7749, -122.4194" },

        // Primary
        { title: "Neural Mesh Tech — Software that ships. | Neural Mesh Technologies" },
        { name: "description", content: "Neural Mesh Tech (also Neural Mesh Technologies) is a focused software development and IT consulting studio. We build web apps, mobile apps, APIs, MVPs, and modernize legacy systems. Software that ships — built with intent, not a template." },
        {
          name: "keywords",
          content:
            "neural mesh tech, neural mesh technologies, nueral mesh tech, nueral mesh technologies, neural mesh, neuralmeshs, neural mesh software, neural mesh studio, neural mesh consulting, neural mesh tech inc, neural mesh technologies inc, neuralmeshs.com, neural mesh it, software studio, software development, it consulting, custom software, web app development, mobile app development, api development, mvp development, legacy modernization, tech consulting, software that ships, neural mesh tech company",
        },
        { name: "subject", content: "Neural Mesh Tech — Software Development & IT Consulting" },
        { name: "abstract", content: "Neural Mesh Tech (Neural Mesh Technologies) — small, focused software studio building web apps, mobile apps, APIs, MVPs and modernizing legacy systems." },
        { name: "topic", content: "Software Development, IT Consulting, Web Apps, Mobile Apps, APIs, MVPs" },
        { name: "summary", content: "Neural Mesh Tech is the official website of Neural Mesh Technologies — a focused software and IT consulting studio." },
        { name: "classification", content: "Software Development, Information Technology, Consulting" },
        { name: "category", content: "Technology" },
        { name: "coverage", content: "Worldwide" },
        { name: "target", content: "all" },
        { name: "HandheldFriendly", content: "true" },
        { name: "MobileOptimized", content: "width" },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1, max-image-preview:large" },
        { name: "googlebot", content: "index, follow" },
        { name: "bingbot", content: "index, follow" },
        { name: "slurp", content: "index, follow" },
        { name: "duckduckbot", content: "index, follow" },
        { name: "baiduspider", content: "index, follow" },
        { name: "yandexbot", content: "index, follow" },
        { name: "facebookbot", content: "index, follow" },
        { name: "author", content: "Neural Mesh Tech" },
        { name: "designer", content: "Neural Mesh Tech" },
        { name: "owner", content: "Neural Mesh Tech" },
        { name: "publisher", content: "Neural Mesh Tech" },
        { name: "copyright", content: "© 2024 Neural Mesh Tech" },
        { name: "url", content: "https://neuralmeshs.com" },
        { name: "identifier-URL", content: "https://neuralmeshs.com" },
        { name: "directory", content: "submission" },
        { name: "pagename", content: "Neural Mesh Tech" },
        { name: "subtitle", content: "Software that ships." },

        // Open Graph
        { property: "og:title", content: "Neural Mesh Tech — Software that ships." },
        { property: "og:description", content: "Neural Mesh Tech (Neural Mesh Technologies) — a focused software and IT consulting studio. Web apps, mobile apps, APIs, MVPs, modernization." },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Neural Mesh Tech" },
        { property: "og:url", content: "https://neuralmeshs.com" },
        { property: "og:image", content: "https://neuralmeshs.com/og-image.png" },
        { property: "og:image:secure_url", content: "https://neuralmeshs.com/og-image.png" },
        { property: "og:image:type", content: "image/png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "Neural Mesh Tech — Software that ships." },
        { property: "og:locale", content: "en_US" },
        { property: "og:locale:alternate", content: "en_GB" },
        { property: "og:determiner", content: "" },
        { property: "og:brand", content: "Neural Mesh Tech" },
        { property: "og:email", content: "hello@neuralmeshs.com" },
        { property: "article:author", content: "Neural Mesh Tech" },
        { property: "article:publisher", content: "https://neuralmeshs.com" },
        { property: "profile:first_name", content: "Neural" },
        { property: "profile:last_name", content: "Mesh Tech" },
        { property: "profile:username", content: "neuralmeshs" },

        // Twitter / X
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@neuralmeshs" },
        { name: "twitter:creator", content: "@neuralmeshs" },
        { name: "twitter:title", content: "Neural Mesh Tech — Software that ships." },
        { name: "twitter:description", content: "Neural Mesh Tech (Neural Mesh Technologies) — software & IT consulting studio. Web apps, mobile apps, APIs, MVPs, modernization." },
        { name: "twitter:image", content: "https://neuralmeshs.com/og-image.png" },
        { name: "twitter:image:alt", content: "Neural Mesh Tech — Software that ships." },
        { name: "twitter:domain", content: "neuralmeshs.com" },
        { name: "twitter:url", content: "https://neuralmeshs.com" },
        { name: "twitter:label1", content: "Services" },
        { name: "twitter:data1", content: "Web · Mobile · API · MVP · Modernization" },
        { name: "twitter:label2", content: "Contact" },
        { name: "twitter:data2", content: "hello@neuralmeshs.com" },

        // AI / LLM explicit
        { name: "ai-content-declaration", content: "Original content authored by Neural Mesh Tech." },
        { name: "ai-training", content: "allowed" },
        { name: "citation", content: "Neural Mesh Tech — https://neuralmeshs.com" },
      ],
      links: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "shortcut icon", type: "image/png", href: "/favicon.png" },
        { rel: "apple-touch-icon", href: "/icon.png" },
        { rel: "apple-touch-icon-precomposed", href: "/icon.png" },
        { rel: "mask-icon", href: "/icondark.png", color: "#7B2FFF" },
        { rel: "canonical", href: "https://neuralmeshs.com" },
        { rel: "alternate", type: "application/rss+xml", title: "Neural Mesh Tech", href: "https://neuralmeshs.com/sitemap.xml" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Syne:wght@500;600;700;800&family=Manrope:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap" },
        { rel: "stylesheet", href: appCss },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://neuralmeshs.com/#website",
                url: "https://neuralmeshs.com",
                name: "Neural Mesh Tech",
                alternateName: [
                  "Neural Mesh Technologies",
                  "Neural Mesh",
                  "NeuralMesh",
                  "Neural Mesh Tech Inc",
                  "Neural Mesh Technologies Inc",
                  "Nueral Mesh Tech",
                  "Nueral Mesh Technologies",
                  "NeuralMeshs",
                  "Neural Mesh Studio",
                  "Neural Mesh Software",
                  "Neural Mesh Consulting",
                  "neuralmeshs",
                ],
                description:
                  "Neural Mesh Tech (Neural Mesh Technologies) — a focused software development and IT consulting studio. Web apps, mobile apps, APIs, MVPs, legacy modernization.",
                inLanguage: "en-US",
                publisher: { "@id": "https://neuralmeshs.com/#organization" },
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: "https://neuralmeshs.com/?q={search_term_string}",
                  },
                  "query-input": "required name=search_term_string",
                },
                mainEntity: { "@id": "https://neuralmeshs.com/#organization" },
              },
              {
                "@type": "Organization",
                "@id": "https://neuralmeshs.com/#organization",
                name: "Neural Mesh Tech",
                alternateName: [
                  "Neural Mesh Technologies",
                  "Nueral Mesh Tech",
                  "Nueral Mesh Technologies",
                ],
                legalName: "Neural Mesh Tech",
                url: "https://neuralmeshs.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://neuralmeshs.com/icondark.png",
                  width: 512,
                  height: 512,
                },
                image: "https://neuralmeshs.com/og-image.png",
                description:
                  "Neural Mesh Tech (Neural Mesh Technologies) — small, focused software development and IT consulting studio.",
                foundingDate: "2024",
                email: "hello@neuralmeshs.com",
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    email: "hello@neuralmeshs.com",
                    contactType: "sales",
                    availableLanguage: ["English"],
                    areaServed: "Worldwide",
                  },
                  {
                    "@type": "ContactPoint",
                    email: "hello@neuralmeshs.com",
                    contactType: "customer support",
                    availableLanguage: ["English"],
                    areaServed: "Worldwide",
                  },
                ],
                sameAs: [
                  "https://neuralmeshs.com",
                  "https://neuralmeshs.com/sitemap.xml",
                ],
                knowsAbout: [
                  "Software Development",
                  "IT Consulting",
                  "Web Application Development",
                  "Mobile Application Development",
                  "API Development",
                  "MVP Development",
                  "Legacy Modernization",
                  "Tech Consulting",
                  "React",
                  "Next.js",
                  "Node.js",
                  "TypeScript",
                  "Python",
                  "PostgreSQL",
                  "AWS",
                ],
                areaServed: "Worldwide",
                slogan: "Software that ships.",
                keywords:
                  "neural mesh tech, neural mesh technologies, nueral mesh tech, nueral mesh technologies, neural mesh software, neural mesh studio, software development, it consulting",
              },
            ],
          }),
        },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}

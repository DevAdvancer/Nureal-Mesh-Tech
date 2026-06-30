import { NextResponse } from "next/server";
import { PROJECTS } from "@/data/projects";

const BASE_URL = "https://neuralmeshs.com";

export async function GET() {
  const today = new Date().toISOString().split("T")[0];
  const entries = [
    { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
    ...PROJECTS.map((p) => ({
      path: `/work/${p.slug}`,
      changefreq: "monthly" as const,
      priority: "0.8",
      lastmod: today,
    })),
  ];

  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

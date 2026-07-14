import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";
import { SERVICE_PAGES } from "@/data/services";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_PAGES.map((service) => ({
    url: `${SITE_URL}/services/${service.slug}`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${SITE_URL}/work/${project.slug}`,
    lastModified: today,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...serviceRoutes, ...projectRoutes];
}

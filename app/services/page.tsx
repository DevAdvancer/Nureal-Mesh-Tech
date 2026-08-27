import type { Metadata } from "next";
import Link from "next/link";
import { SERVICE_PAGES } from "@/data/services";
import { SITE_NAME, absoluteUrl, buildBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Software Development Services | ${SITE_NAME}`,
  description:
    "Explore Neural Mesh Tech services, including custom web application development, mobile app development, API engineering, startup MVPs, technology consulting, and legacy modernization.",
  alternates: {
    canonical: "/services",
  },
  keywords: [
    "Neural Mesh Tech services",
    "software development services",
    "custom software development company",
    "web application development",
    "mobile app development",
    "API development company",
    "startup MVP development",
    "technology consulting",
    "legacy modernization",
  ],
  openGraph: {
    title: `Software Development Services | ${SITE_NAME}`,
    description:
      "Custom web applications, mobile apps, backend engineering, startup MVPs, consulting, and modernization services from Neural Mesh Tech.",
    url: absoluteUrl("/services"),
    type: "website",
    images: [absoluteUrl("/icon.png")],
  },
  twitter: {
    card: "summary",
    title: `Software Development Services | ${SITE_NAME}`,
    description:
      "See the software development services Neural Mesh Tech provides for startups and established teams.",
    images: [absoluteUrl("/icon.png")],
  },
};

export default function ServicesPage() {
  const schemas = [
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]),
  ];

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "#F5F1EA", color: "#1C1A26" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <section
        className="pt-36 pb-20 md:pt-44 md:pb-28"
        style={{ backgroundColor: "#0F0D1A", color: "#EEE9FF" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="eyebrow text-coral mb-4">
            SOFTWARE DEVELOPMENT SERVICES
          </div>
          <h1
            className="font-display font-extrabold leading-[0.98] mb-6"
            style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
            What Neural Mesh Tech builds.
          </h1>
          <p
            className="font-body text-near-white/70 max-w-3xl"
            style={{ fontSize: 18, lineHeight: 1.75 }}>
            Neural Mesh Tech is a software development company for startups and
            established teams that need dependable product delivery. We build
            custom web applications, mobile apps, backend systems, startup MVPs,
            consulting roadmaps, and modernization programs.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid gap-5 md:grid-cols-2">
          {SERVICE_PAGES.map((service) => (
            <article
              key={service.slug}
              className="rounded-2xl bg-white p-8 shadow-[0_20px_50px_-30px_rgba(28,26,38,0.35)]">
              <div className="eyebrow text-violet mb-4">
                {service.shortLabel}
              </div>
              <h2 className="font-display font-bold text-[30px] leading-tight mb-4">
                {service.title}
              </h2>
              <p className="font-body text-[#1C1A26]/75 text-[16px] leading-7 mb-6">
                {service.intro}
              </p>
              <ul className="space-y-3 mb-8">
                {service.deliverables.slice(0, 3).map((item) => (
                  <li
                    key={item}
                    className="font-body text-[15px] text-[#1C1A26]/75 leading-7">
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/services/${service.slug}`}
                className="btn-violet inline-flex">
                Explore service
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        className="py-20 md:py-24"
        style={{ backgroundColor: "#1C1A26", color: "#EEE9FF" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="eyebrow text-amber mb-4">WHY COMPANIES HIRE US</div>
          <h2
            className="font-display font-bold leading-tight mb-8"
            style={{ fontSize: "clamp(32px, 5vw, 48px)" }}>
            One team for product thinking and engineering delivery.
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              "We scope for business outcomes, not feature inflation.",
              "We deliver production-ready software, not throwaway prototypes.",
              "We keep architecture, code quality, and handover in view from day one.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl bg-[#2A2740] p-6 text-near-white/75 leading-7">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

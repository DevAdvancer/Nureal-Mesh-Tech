import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import { SERVICE_PAGES, getServicePage } from "@/data/services";
import {
  SITE_NAME,
  absoluteUrl,
  buildBreadcrumbSchema,
  buildFaqSchema,
} from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICE_PAGES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    return {
      title: `Services | ${SITE_NAME}`,
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    keywords: [
      `Neural Mesh Tech ${service.shortLabel}`,
      service.title,
      "software development company",
      "custom software development",
    ],
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: absoluteUrl(`/services/${service.slug}`),
      type: "website",
      images: [absoluteUrl("/icon.png")],
    },
    twitter: {
      card: "summary",
      title: service.metaTitle,
      description: service.metaDescription,
      images: [absoluteUrl("/icon.png")],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    notFound();
  }

  const relatedProjects = PROJECTS.filter((project) =>
    service.projectServices.includes(project.service),
  ).slice(0, 3);

  const schemas = [
    buildBreadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
      { name: service.title, path: `/services/${service.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      provider: {
        "@type": "ProfessionalService",
        name: SITE_NAME,
        url: absoluteUrl("/"),
      },
      serviceType: service.title,
      description: service.metaDescription,
      url: absoluteUrl(`/services/${service.slug}`),
      areaServed: "Worldwide",
    },
    buildFaqSchema(service.faqs),
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
          <Link
            href="/services"
            className="eyebrow text-coral hover:text-amber inline-block mb-8">
            ← Back to services
          </Link>
          <div className="eyebrow text-amber mb-4">{service.shortLabel}</div>
          <h1
            className="font-display font-extrabold leading-[0.98] mb-6"
            style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
            {service.title}
          </h1>
          <p
            className="font-body text-near-white/70 max-w-3xl"
            style={{ fontSize: 18, lineHeight: 1.75 }}>
            {service.intro}
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="eyebrow text-violet mb-4">
              WHAT THIS SERVICE COVERS
            </div>
            <h2 className="font-display font-bold text-[34px] leading-tight mb-6">
              Built for teams that need software to move the business forward.
            </h2>
            <p className="font-body text-[#1C1A26]/75 text-[17px] leading-8 mb-8">
              {service.summary}
            </p>
            <ul className="space-y-4">
              {service.outcomes.map((item) => (
                <li
                  key={item}
                  className="font-body text-[16px] text-[#1C1A26]/78 leading-8">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <aside className="rounded-2xl bg-white p-8 shadow-[0_20px_50px_-30px_rgba(28,26,38,0.35)]">
            <div className="eyebrow text-coral mb-4">DELIVERABLES</div>
            <ul className="space-y-3 mb-8">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="font-body text-[15px] text-[#1C1A26]/75 leading-7">
                  {item}
                </li>
              ))}
            </ul>
            <div className="eyebrow text-violet mb-4">COMMON FIT</div>
            <div className="flex flex-wrap gap-2">
              {service.industries.map((industry) => (
                <span
                  key={industry}
                  className="font-mono text-[11px] uppercase tracking-[0.15em] rounded-full border border-[#1C1A26]/15 px-3 py-2 text-[#1C1A26]/70">
                  {industry}
                </span>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section
        className="py-20 md:py-24"
        style={{ backgroundColor: "#1C1A26", color: "#EEE9FF" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between gap-6 mb-10">
            <div>
              <div className="eyebrow text-amber mb-4">RELATED WORK</div>
              <h2 className="font-display font-bold text-[34px] leading-tight">
                Relevant case studies from Neural Mesh Tech.
              </h2>
            </div>
            <Link href="/#work" className="eyebrow text-coral hover:text-amber">
              See all work →
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {relatedProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="rounded-2xl bg-[#2A2740] p-7 transition-all hover:-translate-y-1">
                <div className="eyebrow text-coral mb-3">{project.tag}</div>
                <h3 className="font-display font-semibold text-[24px] text-near-white mb-3">
                  {project.name}
                </h3>
                <p className="font-body text-near-white/68 text-[15px] leading-7">
                  {project.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="eyebrow text-violet mb-4">FAQ</div>
          <h2 className="font-display font-bold text-[34px] leading-tight mb-8">
            Common questions about this service.
          </h2>
          <div className="space-y-5">
            {service.faqs.map((faq) => (
              <article
                key={faq.question}
                className="rounded-2xl bg-white p-7 shadow-[0_20px_50px_-30px_rgba(28,26,38,0.35)]">
                <h3 className="font-display font-semibold text-[22px] mb-3">
                  {faq.question}
                </h3>
                <p className="font-body text-[16px] text-[#1C1A26]/75 leading-8">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20"
        style={{ backgroundColor: "#0F0D1A", color: "#EEE9FF" }}>
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <h2
            className="font-display font-bold mb-6"
            style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            Need this kind of build for your company?
          </h2>
          <p className="font-body text-near-white/70 text-[17px] leading-8 mb-8">
            Tell us what you are building and we will help you shape the right
            delivery plan.
          </p>
          <Link href="/#contact" className="btn-violet">
            Start a conversation
          </Link>
        </div>
      </section>
    </div>
  );
}

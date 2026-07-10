export const SITE_NAME = "Neural Mesh Tech";
export const SITE_URL = "https://www.neuralmeshs.com";
export const SITE_EMAIL = "hello@neuralmeshs.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const HOME_FAQS = [
  {
    question: "What does Neural Mesh Tech do?",
    answer:
      "Neural Mesh Tech is a software development company that designs and builds custom web applications, mobile apps, backend systems, startup MVPs, and modernization projects for growing businesses.",
  },
  {
    question: "Who does Neural Mesh Tech work with?",
    answer:
      "We work with startups, established businesses, and internal product teams that need a reliable partner for product strategy, software engineering, and delivery.",
  },
  {
    question: "Can Neural Mesh Tech build both frontend and backend systems?",
    answer:
      "Yes. We handle end-to-end software delivery, including product planning, UX direction, frontend development, backend architecture, APIs, cloud deployment, and handover documentation.",
  },
  {
    question: "Does Neural Mesh Tech help with existing software products?",
    answer:
      "Yes. In addition to new product builds, we help teams modernize legacy systems, improve performance, refactor codebases, and add new product capabilities without disrupting operations.",
  },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildFaqSchema(
  faqs: ReadonlyArray<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildOrganizationSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: [
        "Neural Mesh",
        "NeuralMesh",
        "Neural Mesh Technologies",
      ],
      url: SITE_URL,
      email: SITE_EMAIL,
      image: DEFAULT_OG_IMAGE,
      logo: absoluteUrl("/favicon.png"),
      description:
        "Neural Mesh Tech is a software development company that builds custom web applications, mobile apps, backend platforms, startup MVPs, and legacy modernization projects.",
      areaServed: "Worldwide",
      knowsAbout: [
        "Custom software development",
        "Web application development",
        "Mobile app development",
        "API development",
        "Backend engineering",
        "Startup MVP development",
        "Technology consulting",
        "Legacy modernization",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software development services",
        itemListElement: [
          "Custom web application development",
          "Mobile app development",
          "API and backend engineering",
          "Startup MVP development",
          "Technology consulting",
          "Legacy modernization",
        ].map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
          },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
  ];
}

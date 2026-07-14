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
      "@type": ["Organization", "ProfessionalService"],
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: [
        "Neural Mesh",
        "NeuralMesh",
        "Neural Mesh Technologies",
        "Neural Mesh Studio",
        "neuralmeshs",
      ],
      slogan: "Software that ships.",
      url: SITE_URL,
      email: SITE_EMAIL,
      foundingDate: "2024",
      priceRange: "$$$",
      image: DEFAULT_OG_IMAGE,
      logo: absoluteUrl("/favicon.png"),
      description:
        "Neural Mesh Tech is a software development company and technical consulting studio that designs and builds custom web applications, mobile apps, backend systems, startup MVPs, and modernizes legacy architectures.",
      areaServed: "Worldwide",
      sameAs: [
        "https://twitter.com/neuralmeshs",
        "https://x.com/neuralmeshs",
        "https://github.com/neuralmeshs",
        "https://www.linkedin.com/company/neuralmeshtech",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: SITE_EMAIL,
          contactType: "customer support",
          availableLanguage: ["English"],
        },
      ],
      knowsAbout: [
        "Custom software development",
        "Web application development",
        "Mobile app development",
        "API development",
        "Backend engineering",
        "Startup MVP development",
        "Technology consulting",
        "Legacy modernization",
        "React",
        "Next.js",
        "TypeScript",
        "Python",
        "Node.js",
        "PostgreSQL",
        "React Native",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Software development services",
        itemListElement: [
          {
            name: "Custom Web Application Development",
            url: `${SITE_URL}/services/web-application-development`,
            description:
              "End-to-end custom web applications, SaaS dashboards, and workflow tools built with React, Next.js, TypeScript, and Node.js.",
          },
          {
            name: "Mobile App Development",
            url: `${SITE_URL}/services/mobile-app-development`,
            description:
              "Native and cross-platform iOS and Android mobile apps built with React Native, Swift, and Kotlin, featuring offline-first capabilities.",
          },
          {
            name: "API & Backend Engineering",
            url: `${SITE_URL}/services/api-backend-development`,
            description:
              "High-performance REST APIs, GraphQL endpoints, data pipelines, and scalable cloud architectures in Python, Node.js, and PostgreSQL.",
          },
          {
            name: "Startup MVP Development",
            url: `${SITE_URL}/services/startup-mvp-development`,
            description:
              "Rapid full-stack prototyping and launch-ready MVPs built around core validation hypotheses in weeks, not months.",
          },
          {
            name: "Technology Consulting",
            url: `${SITE_URL}/services/technology-consulting`,
            description:
              "Practical technical direction, architecture reviews, code audits, and product scaling guidance for growing companies.",
          },
          {
            name: "Legacy Modernization",
            url: `${SITE_URL}/services/legacy-modernization`,
            description:
              "Controlled strangler-fig system refactoring, safe cloud migrations, code cleanup, and architecture improvements without business disruption.",
          },
        ].map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: service.description,
            url: service.url,
            provider: {
              "@id": `${SITE_URL}/#organization`,
            },
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
      description:
        "Neural Mesh Tech — Custom software development studio specializing in web applications, mobile apps, APIs, startup MVPs, and modernization.",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ];
}

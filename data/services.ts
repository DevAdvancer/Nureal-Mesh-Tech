import type { ServiceType } from "@/data/projects";

export interface ServicePage {
  slug: string;
  shortLabel: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  intro: string;
  outcomes: string[];
  deliverables: string[];
  industries: string[];
  faqs: { question: string; answer: string }[];
  projectServices: ServiceType[];
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "web-application-development",
    shortLabel: "Web Apps",
    title: "Custom Web Application Development",
    metaTitle:
      "Custom Web Application Development | Neural Mesh Tech",
    metaDescription:
      "Neural Mesh Tech designs and builds custom web applications for startups and growing teams. We deliver product strategy, frontend, backend, APIs, and deployment.",
    summary:
      "Custom web application development for teams that need fast, reliable, and scalable software.",
    intro:
      "We build web applications that handle real operations, internal workflows, customer dashboards, and revenue-generating products. Neural Mesh Tech combines product thinking, frontend delivery, backend engineering, and deployment so teams can move from idea to production without juggling multiple vendors.",
    outcomes: [
      "Product dashboards and internal tools that replace spreadsheet-heavy workflows.",
      "Customer-facing SaaS platforms with secure authentication, billing, and analytics.",
      "Performance-focused Next.js and React applications that stay maintainable as the product grows.",
    ],
    deliverables: [
      "Product scoping and technical architecture",
      "UI implementation and component systems",
      "Backend APIs, databases, and integrations",
      "Deployment, monitoring, and handover documentation",
    ],
    industries: ["Logistics", "SaaS", "Operations", "Internal tooling"],
    faqs: [
      {
        question: "What kinds of web applications does Neural Mesh Tech build?",
        answer:
          "We build internal dashboards, SaaS products, portals, workflow tools, analytics interfaces, and customer-facing web platforms.",
      },
      {
        question: "Can you handle both frontend and backend web development?",
        answer:
          "Yes. We deliver the full web application stack, including frontend, backend, APIs, data models, deployment, and documentation.",
      },
    ],
    projectServices: ["Web"],
  },
  {
    slug: "mobile-app-development",
    shortLabel: "Mobile Apps",
    title: "Mobile App Development",
    metaTitle: "Mobile App Development | Neural Mesh Tech",
    metaDescription:
      "Neural Mesh Tech builds mobile apps for iOS and Android, including offline-first apps, field team tools, and product-focused mobile experiences.",
    summary:
      "Mobile app development for iOS and Android with product thinking, clean delivery, and scalable backend support.",
    intro:
      "We design and build mobile applications that work in real-world conditions. That includes offline-first workflows, API integrations, battery-aware behavior, and interfaces that make sense for teams on the move.",
    outcomes: [
      "iOS and Android apps built for field teams, customer experiences, and operational workflows.",
      "Offline-first sync flows for unreliable network environments.",
      "Mobile products backed by clean APIs and dashboards for internal teams.",
    ],
    deliverables: [
      "Mobile product scoping and technical planning",
      "Native or cross-platform app development",
      "API integration and backend support",
      "Release preparation, QA, and iteration planning",
    ],
    industries: ["Logistics", "Field operations", "Delivery", "Startups"],
    faqs: [
      {
        question: "Does Neural Mesh Tech build for both iOS and Android?",
        answer:
          "Yes. We help teams choose the right approach for the product, including native delivery where needed and cross-platform delivery where it makes sense.",
      },
      {
        question: "Can you build mobile apps that work offline?",
        answer:
          "Yes. We have experience with offline-first mobile products, local storage, sync workflows, and performance optimization for field use.",
      },
    ],
    projectServices: ["Mobile"],
  },
  {
    slug: "api-backend-development",
    shortLabel: "APIs",
    title: "API and Backend Development",
    metaTitle: "API and Backend Development | Neural Mesh Tech",
    metaDescription:
      "Neural Mesh Tech builds fast, documented APIs and backend platforms for web apps, mobile apps, analytics products, and operational systems.",
    summary:
      "Backend engineering and API development for products that need performance, scalability, and clean integration points.",
    intro:
      "We build backend systems that do the hard work quietly: handling data, integrations, business logic, performance, and reliability. Whether you need a new API, a stronger architecture, or a better data flow, we design backend systems that support real product growth.",
    outcomes: [
      "REST APIs and backend services that are well-documented and easy to extend.",
      "Scalable data pipelines for analytics, operations, and product events.",
      "Cloud-ready architectures built for performance, observability, and maintainability.",
    ],
    deliverables: [
      "API design and backend architecture",
      "Database and data pipeline design",
      "Authentication, permissions, and integrations",
      "Testing, documentation, and deployment support",
    ],
    industries: ["E-commerce", "Analytics", "SaaS", "Operations"],
    faqs: [
      {
        question: "Can Neural Mesh Tech build APIs for both web and mobile apps?",
        answer:
          "Yes. We regularly build backend systems that support both web products and mobile applications from the same service layer.",
      },
      {
        question: "Do you help with API performance and scaling issues?",
        answer:
          "Yes. We help teams redesign bottlenecks, improve database access patterns, scale event handling, and make backend systems more reliable under load.",
      },
    ],
    projectServices: ["API"],
  },
  {
    slug: "startup-mvp-development",
    shortLabel: "Startup MVPs",
    title: "Startup MVP Development",
    metaTitle: "Startup MVP Development | Neural Mesh Tech",
    metaDescription:
      "Neural Mesh Tech helps founders launch startup MVPs quickly with focused scope, product validation, full-stack delivery, and clear next steps.",
    summary:
      "Startup MVP development for founders who need to validate quickly and learn from real users.",
    intro:
      "We help startups turn early concepts into working products without wasting time on bloated v1 scope. Neural Mesh Tech focuses on the smallest product that can prove the idea, support early revenue, and create useful learning for the next stage.",
    outcomes: [
      "Launch-ready MVPs built around the riskiest assumptions first.",
      "Tight scopes that prioritize learning, adoption, and early revenue.",
      "Full-stack delivery that gives founders one accountable technical partner.",
    ],
    deliverables: [
      "MVP scoping and feature prioritization",
      "Product design and full-stack engineering",
      "Payments, onboarding, and admin workflows",
      "Launch support and post-launch roadmap guidance",
    ],
    industries: ["B2B SaaS", "Early-stage startups", "Founders", "New products"],
    faqs: [
      {
        question: "How does Neural Mesh Tech approach startup MVP scope?",
        answer:
          "We focus on the smallest version of the product that validates demand, supports usable workflows, and creates strong feedback loops from real users.",
      },
      {
        question: "Can you help after the MVP launches?",
        answer:
          "Yes. We help founders prioritize post-launch improvements, add features, stabilize infrastructure, and prepare for the next stage of growth.",
      },
    ],
    projectServices: ["MVP"],
  },
  {
    slug: "technology-consulting",
    shortLabel: "Consulting",
    title: "Technology Consulting",
    metaTitle: "Technology Consulting | Neural Mesh Tech",
    metaDescription:
      "Neural Mesh Tech provides technology consulting for product strategy, architecture decisions, delivery planning, code reviews, and modernization roadmaps.",
    summary:
      "Technology consulting for teams that need practical guidance on product, architecture, delivery, and engineering decisions.",
    intro:
      "Not every team needs a large agency retainer. Sometimes you need sharp technical guidance, honest tradeoff analysis, and a clear path forward. We help founders and product teams make better software decisions before expensive mistakes pile up.",
    outcomes: [
      "Architecture and delivery plans grounded in business goals.",
      "Code and product reviews that identify risk before it slows growth.",
      "Technical decisions explained in plain language for founders and operators.",
    ],
    deliverables: [
      "Architecture reviews and solution planning",
      "Product and delivery strategy sessions",
      "Code review and implementation guidance",
      "Modernization and scaling recommendations",
    ],
    industries: ["Startups", "Product teams", "SMBs", "Internal platforms"],
    faqs: [
      {
        question: "What does Neural Mesh Tech include in consulting engagements?",
        answer:
          "Typical consulting work includes architecture reviews, technical planning, code review, delivery guidance, and practical recommendations for what to build next.",
      },
      {
        question: "Do you only consult or can you also implement?",
        answer:
          "We can do both. Many teams start with consulting and then bring us in to deliver the work once the direction is clear.",
      },
    ],
    projectServices: ["Web", "API", "MVP", "Modernization"],
  },
  {
    slug: "legacy-modernization",
    shortLabel: "Modernization",
    title: "Legacy Modernization",
    metaTitle: "Legacy Modernization Services | Neural Mesh Tech",
    metaDescription:
      "Neural Mesh Tech helps teams modernize legacy software, migrate systems safely, improve maintainability, and reduce risk without disrupting operations.",
    summary:
      "Legacy modernization services for teams that need safer migrations, cleaner architecture, and better maintainability.",
    intro:
      "Old software often carries critical business operations, which means replacing it carelessly creates real risk. We help teams modernize legacy systems in controlled stages, improve architecture, reduce technical debt, and keep the business running while the platform improves.",
    outcomes: [
      "Safer migrations from aging systems to modern stacks.",
      "Parallel rollout strategies that reduce downtime and release risk.",
      "Documentation and handover that help in-house teams own the new system.",
    ],
    deliverables: [
      "Migration planning and architecture design",
      "Incremental rollout and fallback strategies",
      "Refactoring, service extraction, and documentation",
      "Team onboarding and long-term maintainability improvements",
    ],
    industries: ["Healthcare", "Operations", "Internal systems", "Long-lived platforms"],
    faqs: [
      {
        question: "Can Neural Mesh Tech modernize software without shutting it down?",
        answer:
          "Yes. We plan migrations carefully, often using incremental rollout strategies so the existing system can keep serving the business during the transition.",
      },
      {
        question: "Do you help document legacy systems during modernization?",
        answer:
          "Yes. Documentation is a key part of reducing long-term risk, especially when the original system has little or outdated documentation.",
      },
    ],
    projectServices: ["Modernization"],
  },
];

export function getServicePage(slug: string) {
  return SERVICE_PAGES.find((service) => service.slug === slug);
}

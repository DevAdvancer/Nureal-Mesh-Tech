export type ServiceType = "Web" | "Mobile" | "API" | "MVP" | "Modernization";

export interface Project {
  slug: string;
  name: string;
  tag: string;
  service: ServiceType;
  desc: string;
  grad: string;
  featured?: boolean;
  client: string;
  year: string;
  duration: string;
  role: string;
  stack: string[];
  hero: { headline: string; sub: string };
  challenge: string;
  approach: string[];
  outcome: string;
  metrics: { label: string; value: string }[];
  gallery: { grad: string; caption: string }[];
}

export const PROJECTS: Project[] = [
  {
    slug: "flowdesk",
    name: "FlowDesk",
    tag: "WEB APP",
    service: "Web",
    desc: "Internal dashboard for a logistics company moving 4M shipments a year.",
    grad: "linear-gradient(135deg, #7B2FFF 0%, #FF4D6D 100%)",
    featured: true,
    client: "Confidential — logistics, EU",
    year: "2024",
    duration: "5 months",
    role: "Design, frontend, backend, infra",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "AWS"],
    hero: {
      headline: "An ops dashboard people actually open in the morning.",
      sub: "We replaced a spreadsheet-and-email workflow with a single tool the entire dispatch floor now runs on.",
    },
    challenge:
      "Dispatchers were juggling six tabs, two CRMs, and a shared inbox. Errors compounded across shifts and nobody trusted the numbers on the wall display.",
    approach: [
      "Shadowed dispatchers for a week before writing a line of code.",
      "Built a real-time shipment table with optimistic updates and conflict resolution.",
      "Migrated three legacy data sources behind a single read API.",
      "Shipped weekly behind a feature flag so the floor could opt-in team by team.",
    ],
    outcome:
      "By month four the spreadsheet was gone. Average time to resolve a stuck shipment dropped from 38 minutes to under 9. The night shift now closes their day in one tool.",
    metrics: [
      { label: "Faster issue resolution", value: "76%" },
      { label: "Daily active users", value: "240+" },
      { label: "Tabs replaced", value: "6 → 1" },
    ],
    gallery: [
      { grad: "linear-gradient(135deg, #7B2FFF 0%, #FF4D6D 100%)", caption: "Live shipment board" },
      { grad: "linear-gradient(135deg, #FF4D6D 0%, #FFB830 100%)", caption: "Exception triage view" },
      { grad: "linear-gradient(135deg, #FFB830 0%, #7B2FFF 100%)", caption: "Carrier performance report" },
    ],
  },
  {
    slug: "trackmate",
    name: "TrackMate",
    tag: "MOBILE",
    service: "Mobile",
    desc: "Field tracking app for delivery teams. Offline-first, battery-friendly.",
    grad: "linear-gradient(135deg, #FF4D6D 0%, #FFB830 100%)",
    client: "Regional courier network",
    year: "2024",
    duration: "3 months",
    role: "Mobile app, sync engine",
    stack: ["React Native", "SQLite", "Kotlin", "Swift", "FastAPI"],
    hero: {
      headline: "A delivery app that works where signal doesn't.",
      sub: "Built for drivers who spend half their day in basements and underground loading bays.",
    },
    challenge:
      "The previous app drained a phone battery by lunch and lost stops the moment a driver went offline. Drivers stopped using it and went back to paper.",
    approach: [
      "Designed a queue-based sync engine that writes locally first, reconciles later.",
      "Cut GPS polling by 80% using motion sensors to wake the radio only when needed.",
      "Rebuilt the route screen for one-hand use in gloves.",
    ],
    outcome:
      "Drivers stopped going back to the dispatcher to confirm stops. Battery lasts a 10-hour shift with charge to spare.",
    metrics: [
      { label: "Battery use reduction", value: "62%" },
      { label: "Stops lost to sync", value: "0" },
      { label: "App store rating", value: "4.8" },
    ],
    gallery: [
      { grad: "linear-gradient(135deg, #FF4D6D 0%, #FFB830 100%)", caption: "Route screen" },
      { grad: "linear-gradient(135deg, #FFB830 0%, #B8F2C8 100%)", caption: "Offline proof of delivery" },
      { grad: "linear-gradient(135deg, #B8F2C8 0%, #FF4D6D 100%)", caption: "Driver day summary" },
    ],
  },
  {
    slug: "datapulse",
    name: "DataPulse",
    tag: "API BUILD",
    service: "API",
    desc: "Real-time analytics API for an e-commerce brand pushing 80k events/min.",
    grad: "linear-gradient(135deg, #FFB830 0%, #B8F2C8 100%)",
    client: "DTC fashion brand",
    year: "2023",
    duration: "10 weeks",
    role: "Backend architecture, API design",
    stack: ["Python", "FastAPI", "ClickHouse", "Kafka", "Docker"],
    hero: {
      headline: "An analytics API that doesn't fall over on Black Friday.",
      sub: "From a Postgres table that timed out at 5k events/min to a streaming pipeline handling 80k.",
    },
    challenge:
      "Their dashboard query took 14 seconds at peak. Marketing couldn't trust the numbers because half the events were dropped under load.",
    approach: [
      "Moved hot writes to Kafka, cold storage to ClickHouse.",
      "Designed a versioned, documented REST API the frontend team could test against locally.",
      "Wrote a load test that replays a real Black Friday hour, ran it nightly in CI.",
    ],
    outcome:
      "Dashboard responds in under 200ms at 16x the previous load. The first Black Friday on the new pipeline had zero pages.",
    metrics: [
      { label: "Peak throughput", value: "80k/min" },
      { label: "Dashboard p95", value: "180ms" },
      { label: "Pages on launch", value: "0" },
    ],
    gallery: [
      { grad: "linear-gradient(135deg, #FFB830 0%, #B8F2C8 100%)", caption: "Pipeline architecture" },
      { grad: "linear-gradient(135deg, #B8F2C8 0%, #7B2FFF 100%)", caption: "API reference docs" },
      { grad: "linear-gradient(135deg, #7B2FFF 0%, #FFB830 100%)", caption: "Load test report" },
    ],
  },
  {
    slug: "launchkit",
    name: "LaunchKit",
    tag: "MVP",
    service: "MVP",
    desc: "MVP for a B2B SaaS startup. Zero to live, paying users in six weeks.",
    grad: "linear-gradient(135deg, #B8F2C8 0%, #7B2FFF 100%)",
    client: "Seed-stage SaaS, US",
    year: "2024",
    duration: "6 weeks",
    role: "Product, design, full stack",
    stack: ["Next.js", "TypeScript", "Postgres", "Stripe"],
    hero: {
      headline: "From founder deck to paying customer in 42 days.",
      sub: "A scoped MVP built to validate the riskiest assumption first, not to look impressive.",
    },
    challenge:
      "The founder had a deck, three letters of intent, and a runway clock ticking. Every week without a real product was a week not learning.",
    approach: [
      "Cut the v1 scope by half in the kickoff call. Nobody fought us on it later.",
      "Shipped a hosted prototype in week two so the founder could demo it.",
      "Wired up Stripe and a manual ops backend so the team could close deals before automating.",
    ],
    outcome:
      "Three paying customers by week six. The product roadmap is now informed by usage instead of guesses.",
    metrics: [
      { label: "Time to first revenue", value: "42 days" },
      { label: "Original scope shipped", value: "55%" },
      { label: "Paying customers at launch", value: "3" },
    ],
    gallery: [
      { grad: "linear-gradient(135deg, #B8F2C8 0%, #7B2FFF 100%)", caption: "Onboarding flow" },
      { grad: "linear-gradient(135deg, #7B2FFF 0%, #FF4D6D 100%)", caption: "Workspace view" },
      { grad: "linear-gradient(135deg, #FF4D6D 0%, #B8F2C8 100%)", caption: "Billing portal" },
    ],
  },
  {
    slug: "legacybridge",
    name: "LegacyBridge",
    tag: "MODERNIZATION",
    service: "Modernization",
    desc: "Migrated a ten-year-old PHP system to Node without a single downtime window.",
    grad: "linear-gradient(135deg, #7B2FFF 0%, #FFB830 100%)",
    client: "Healthcare scheduling vendor",
    year: "2023",
    duration: "8 months",
    role: "Architecture, migration, mentoring",
    stack: ["Node.js", "TypeScript", "PostgreSQL", "PHP (read)", "Terraform"],
    hero: {
      headline: "A ten-year-old system, rebuilt without ever taking it offline.",
      sub: "Strangler-fig migration done patiently, one endpoint at a time, with the old system as the source of truth until the last week.",
    },
    challenge:
      "The PHP monolith had nobody left who fully understood it. Every change was risky. But it ran 24/7 hospital scheduling — there was no maintenance window to ever take.",
    approach: [
      "Stood up a Node service behind a routing proxy. Old paths fell through to PHP.",
      "Migrated read endpoints first, ran both systems in parallel for two months and compared responses.",
      "Wrote the documentation the original team never had — and trained their two new engineers as we went.",
    ],
    outcome:
      "Eight months in, the PHP container was decommissioned with no scheduled downtime. The client's in-house team now owns the new stack.",
    metrics: [
      { label: "Scheduled downtime", value: "0 min" },
      { label: "Response parity tests", value: "12k+" },
      { label: "In-house engineers onboarded", value: "2" },
    ],
    gallery: [
      { grad: "linear-gradient(135deg, #7B2FFF 0%, #FFB830 100%)", caption: "Strangler routing layer" },
      { grad: "linear-gradient(135deg, #FFB830 0%, #FF4D6D 100%)", caption: "Parity test dashboard" },
      { grad: "linear-gradient(135deg, #FF4D6D 0%, #7B2FFF 100%)", caption: "New admin console" },
    ],
  },
];

export const SERVICE_FILTERS: ("All" | ServiceType)[] = [
  "All",
  "Web",
  "Mobile",
  "API",
  "MVP",
  "Modernization",
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

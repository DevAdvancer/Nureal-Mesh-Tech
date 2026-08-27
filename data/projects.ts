import type { GalleryKind } from "@/components/project-visuals/gallery-scenes";

export type ServiceType = "Web" | "Mobile" | "API" | "MVP" | "Modernization";

// Per-project "impact report" data. `trend` marks whether the KPI movement is
// good ("up") or bad ("down") — used only for the colored delta chip, not the
// arithmetic sign. Charts render via recharts in <ProjectReport />.
export type ReportChart =
  | { kind: "bar"; title: string; unit?: string; data: { name: string; value: number }[] }
  | {
      kind: "area";
      title: string;
      unit?: string;
      data: { name: string; a: number; b?: number }[];
      seriesLabels?: [string, string?];
    }
  | { kind: "donut"; title: string; unit?: string; data: { name: string; value: number }[] };

export interface ProjectReport {
  headline: string;
  summary: string;
  kpis: { label: string; value: string; delta?: string; trend?: "up" | "down" }[];
  charts: ReportChart[];
}

export interface Project {
  slug: string;
  name: string;
  tag: string;
  service: ServiceType;
  sector: string;
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
  gallery: { grad: string; caption: string; kind?: GalleryKind; image?: string }[];
  image?: string;
  report?: ProjectReport;
}

export const PROJECTS: Project[] = [
  {
    slug: "flowdesk",
    image: "/images/projects/flowdesk/hero.jpg",
    name: "FlowDesk",
    tag: "WEB APP",
    service: "Web",
    sector: "Logistics",
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
      { grad: "linear-gradient(135deg, #7B2FFF 0%, #FF4D6D 100%)", caption: "Live shipment board", kind: "board" , image: "/images/projects/flowdesk/gallery-1.jpg" },
      { grad: "linear-gradient(135deg, #FF4D6D 0%, #FFB830 100%)", caption: "Exception triage view", kind: "queue" , image: "/images/projects/flowdesk/gallery-2.jpg" },
      { grad: "linear-gradient(135deg, #FFB830 0%, #7B2FFF 100%)", caption: "Carrier performance report", kind: "barReport" , image: "/images/projects/flowdesk/gallery-3.jpg" },
    ],
    report: {
      headline: "Six months on the dispatch floor, measured",
      summary:
        "Rollout ran team-by-team behind a feature flag. Here is what moved once the spreadsheet was retired.",
      kpis: [
        { label: "Avg. resolution time", value: "9 min", delta: "from 38 min", trend: "up" },
        { label: "Daily active users", value: "240+", delta: "+240", trend: "up" },
        { label: "Tools per dispatcher", value: "1", delta: "was 6", trend: "up" },
        { label: "Night-shift close time", value: "-64%", delta: "faster", trend: "up" },
      ],
      charts: [
        {
          kind: "area",
          title: "Avg. time to resolve a stuck shipment",
          unit: "min",
          seriesLabels: ["Resolution time"],
          data: [
            { name: "Jan", a: 38 },
            { name: "Feb", a: 34 },
            { name: "Mar", a: 27 },
            { name: "Apr", a: 18 },
            { name: "May", a: 12 },
            { name: "Jun", a: 9 },
          ],
        },
        {
          kind: "bar",
          title: "Daily active users by month",
          unit: "users",
          data: [
            { name: "Jan", value: 22 },
            { name: "Feb", value: 68 },
            { name: "Mar", value: 135 },
            { name: "Apr", value: 188 },
            { name: "May", value: 221 },
            { name: "Jun", value: 244 },
          ],
        },
        {
          kind: "donut",
          title: "Where dispatcher time goes now",
          unit: "%",
          data: [
            { name: "Live board", value: 52 },
            { name: "Exceptions", value: 28 },
            { name: "Reports", value: 20 },
          ],
        },
      ],
    },
  },
  {
    slug: "trackmate",
    image: "/images/projects/trackmate/hero.jpg",
    name: "TrackMate",
    tag: "MOBILE",
    service: "Mobile",
    sector: "Courier & delivery",
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
      { grad: "linear-gradient(135deg, #FF4D6D 0%, #FFB830 100%)", caption: "Route screen", kind: "mobileMap" , image: "/images/projects/trackmate/gallery-1.jpg" },
      { grad: "linear-gradient(135deg, #FFB830 0%, #B8F2C8 100%)", caption: "Offline proof of delivery", kind: "signature" , image: "/images/projects/trackmate/gallery-2.jpg" },
      { grad: "linear-gradient(135deg, #B8F2C8 0%, #FF4D6D 100%)", caption: "Driver day summary", kind: "mobileStats" , image: "/images/projects/trackmate/gallery-3.jpg" },
    ],
    report: {
      headline: "What offline-first did to a 10-hour shift",
      summary:
        "Measured across a 40-driver pilot over eight weeks against the app it replaced.",
      kpis: [
        { label: "Battery used per shift", value: "-62%", delta: "10h+ uptime", trend: "up" },
        { label: "Stops lost to sync", value: "0", delta: "was ~7/day", trend: "up" },
        { label: "App store rating", value: "4.8", delta: "from 2.9", trend: "up" },
        { label: "GPS polls per hour", value: "-80%", delta: "motion-gated", trend: "up" },
      ],
      charts: [
        {
          kind: "area",
          title: "Battery remaining across a shift",
          unit: "%",
          seriesLabels: ["TrackMate", "Old app"],
          data: [
            { name: "8am", a: 100, b: 100 },
            { name: "10am", a: 88, b: 72 },
            { name: "12pm", a: 74, b: 41 },
            { name: "2pm", a: 61, b: 18 },
            { name: "4pm", a: 47, b: 4 },
            { name: "6pm", a: 34, b: 0 },
          ],
        },
        {
          kind: "bar",
          title: "Stops lost to sync failures per week",
          unit: "stops",
          data: [
            { name: "W1", value: 31 },
            { name: "W3", value: 12 },
            { name: "W5", value: 3 },
            { name: "W8", value: 0 },
          ],
        },
      ],
    },
  },
  {
    slug: "datapulse",
    image: "/images/projects/datapulse/hero.jpg",
    name: "DataPulse",
    tag: "API BUILD",
    service: "API",
    sector: "E-commerce",
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
      { grad: "linear-gradient(135deg, #FFB830 0%, #B8F2C8 100%)", caption: "Pipeline architecture", kind: "pipeline" , image: "/images/projects/datapulse/gallery-1.jpg" },
      { grad: "linear-gradient(135deg, #B8F2C8 0%, #7B2FFF 100%)", caption: "API reference docs", kind: "docs" , image: "/images/projects/datapulse/gallery-2.jpg" },
      { grad: "linear-gradient(135deg, #7B2FFF 0%, #FFB830 100%)", caption: "Load test report", kind: "areaChart" , image: "/images/projects/datapulse/gallery-3.jpg" },
    ],
    report: {
      headline: "Throughput and latency under real load",
      summary:
        "Numbers pulled from the nightly Black-Friday replay test and the first live peak event.",
      kpis: [
        { label: "Peak throughput", value: "80k/min", delta: "16× prior", trend: "up" },
        { label: "Dashboard p95", value: "180ms", delta: "from 14s", trend: "up" },
        { label: "Events dropped", value: "0%", delta: "was ~48%", trend: "up" },
        { label: "Pages on launch", value: "0", trend: "up" },
      ],
      charts: [
        {
          kind: "area",
          title: "Dashboard p95 latency vs. ingest rate",
          unit: "ms",
          seriesLabels: ["p95 latency"],
          data: [
            { name: "5k", a: 14000 },
            { name: "20k", a: 900 },
            { name: "40k", a: 320 },
            { name: "60k", a: 210 },
            { name: "80k", a: 180 },
          ],
        },
        {
          kind: "bar",
          title: "Events ingested per minute (thousands)",
          unit: "k/min",
          data: [
            { name: "Old", value: 5 },
            { name: "v1", value: 42 },
            { name: "v2", value: 66 },
            { name: "Peak", value: 80 },
          ],
        },
        {
          kind: "donut",
          title: "Pipeline latency budget",
          unit: "ms",
          data: [
            { name: "Ingest", value: 40 },
            { name: "Query", value: 95 },
            { name: "Serialize", value: 45 },
          ],
        },
      ],
    },
  },
  {
    slug: "launchkit",
    image: "/images/projects/launchkit/hero.jpg",
    name: "LaunchKit",
    tag: "MVP",
    service: "MVP",
    sector: "B2B SaaS",
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
      { grad: "linear-gradient(135deg, #B8F2C8 0%, #7B2FFF 100%)", caption: "Onboarding flow", kind: "steps" , image: "/images/projects/launchkit/gallery-1.jpg" },
      { grad: "linear-gradient(135deg, #7B2FFF 0%, #FF4D6D 100%)", caption: "Workspace view", kind: "dashboard" , image: "/images/projects/launchkit/gallery-2.jpg" },
      { grad: "linear-gradient(135deg, #FF4D6D 0%, #B8F2C8 100%)", caption: "Billing portal", kind: "billing" , image: "/images/projects/launchkit/gallery-3.jpg" },
    ],
    report: {
      headline: "The 42 days from kickoff to revenue",
      summary:
        "A weekly view of what shipped and when the first dollars landed.",
      kpis: [
        { label: "Time to first revenue", value: "42 days", trend: "up" },
        { label: "v1 scope shipped", value: "55%", delta: "cut by half", trend: "up" },
        { label: "Paying customers", value: "3", delta: "by week 6", trend: "up" },
        { label: "Weekly demos", value: "6", delta: "from week 2", trend: "up" },
      ],
      charts: [
        {
          kind: "area",
          title: "Cumulative signed customers",
          unit: "customers",
          seriesLabels: ["Signed"],
          data: [
            { name: "W1", a: 0 },
            { name: "W2", a: 0 },
            { name: "W3", a: 1 },
            { name: "W4", a: 1 },
            { name: "W5", a: 2 },
            { name: "W6", a: 3 },
          ],
        },
        {
          kind: "donut",
          title: "Where the 6 weeks went",
          unit: "%",
          data: [
            { name: "Core flow", value: 45 },
            { name: "Billing", value: 25 },
            { name: "Onboarding", value: 18 },
            { name: "Ops backend", value: 12 },
          ],
        },
      ],
    },
  },
  {
    slug: "legacybridge",
    image: "/images/projects/legacybridge/hero.jpg",
    name: "LegacyBridge",
    tag: "MODERNIZATION",
    service: "Modernization",
    sector: "Healthcare",
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
      { grad: "linear-gradient(135deg, #7B2FFF 0%, #FFB830 100%)", caption: "Strangler routing layer", kind: "pipeline" , image: "/images/projects/legacybridge/gallery-1.jpg" },
      { grad: "linear-gradient(135deg, #FFB830 0%, #FF4D6D 100%)", caption: "Parity test dashboard", kind: "checks" , image: "/images/projects/legacybridge/gallery-2.jpg" },
      { grad: "linear-gradient(135deg, #FF4D6D 0%, #7B2FFF 100%)", caption: "New admin console", kind: "dashboard" , image: "/images/projects/legacybridge/gallery-3.jpg" },
    ],
    report: {
      headline: "Cutover, one endpoint at a time",
      summary:
        "Traffic shifted from PHP to Node gradually while parity tests guarded every route.",
      kpis: [
        { label: "Scheduled downtime", value: "0 min", trend: "up" },
        { label: "Parity tests run", value: "12k+", delta: "nightly", trend: "up" },
        { label: "Endpoints migrated", value: "100%", delta: "over 8 mo", trend: "up" },
        { label: "In-house owners", value: "2", delta: "onboarded", trend: "up" },
      ],
      charts: [
        {
          kind: "area",
          title: "Share of traffic served by the new stack",
          unit: "%",
          seriesLabels: ["Node", "PHP"],
          data: [
            { name: "M1", a: 5, b: 95 },
            { name: "M2", a: 18, b: 82 },
            { name: "M4", a: 47, b: 53 },
            { name: "M6", a: 78, b: 22 },
            { name: "M8", a: 100, b: 0 },
          ],
        },
        {
          kind: "bar",
          title: "Endpoints cut over per month",
          unit: "endpoints",
          data: [
            { name: "M1", value: 6 },
            { name: "M2", value: 11 },
            { name: "M4", value: 19 },
            { name: "M6", value: 23 },
            { name: "M8", value: 14 },
          ],
        },
      ],
    },
  },
  {
    slug: "ledgerlink",
    image: "/images/projects/ledgerlink/hero.jpg",
    name: "LedgerLink",
    tag: "API BUILD",
    service: "API",
    sector: "Fintech & payments",
    desc: "Reconciliation engine matching 2M daily transactions across five payment rails.",
    grad: "linear-gradient(135deg, #7B2FFF 0%, #B8F2C8 100%)",
    client: "Payments platform, Series B",
    year: "2025",
    duration: "4 months",
    role: "Backend architecture, matching engine, API",
    stack: ["Go", "PostgreSQL", "Kafka", "gRPC", "Terraform"],
    hero: {
      headline: "The reconciliation that used to take a team all week.",
      sub: "An automated matching engine that closes the books on 2M daily transactions before the finance team logs in.",
    },
    challenge:
      "Finance reconciled five payment processors by hand in spreadsheets. A single mismatch could take days to trace, and month-end close routinely slipped.",
    approach: [
      "Modeled every rail's settlement format behind one normalized transaction schema.",
      "Built a deterministic matching engine with a confidence-scored fallback for fuzzy matches.",
      "Exposed a documented API and an exceptions queue so analysts only touch the true outliers.",
    ],
    outcome:
      "Auto-match now clears 99.4% of transactions untouched. Month-end close dropped from nine days to one, and every unmatched item has a traceable reason.",
    metrics: [
      { label: "Auto-match rate", value: "99.4%" },
      { label: "Month-end close", value: "9d → 1d" },
      { label: "Daily transactions", value: "2M" },
    ],
    gallery: [
      { grad: "linear-gradient(135deg, #7B2FFF 0%, #B8F2C8 100%)", caption: "Matching engine flow", kind: "matchFlow" , image: "/images/projects/ledgerlink/gallery-1.jpg" },
      { grad: "linear-gradient(135deg, #B8F2C8 0%, #FFB830 100%)", caption: "Exceptions queue", kind: "queue" , image: "/images/projects/ledgerlink/gallery-2.jpg" },
      { grad: "linear-gradient(135deg, #FFB830 0%, #7B2FFF 100%)", caption: "Settlement API docs", kind: "docs" , image: "/images/projects/ledgerlink/gallery-3.jpg" },
    ],
    report: {
      headline: "How the books close now",
      summary:
        "Reconciliation quality and speed across the first quarter on the new engine.",
      kpis: [
        { label: "Auto-match rate", value: "99.4%", delta: "was 71%", trend: "up" },
        { label: "Month-end close", value: "1 day", delta: "from 9 days", trend: "up" },
        { label: "Manual exceptions", value: "-93%", delta: "per day", trend: "up" },
        { label: "Match latency p95", value: "40ms", trend: "up" },
      ],
      charts: [
        {
          kind: "donut",
          title: "How 2M daily transactions clear",
          unit: "%",
          data: [
            { name: "Exact match", value: 91 },
            { name: "Fuzzy match", value: 8 },
            { name: "Manual review", value: 1 },
          ],
        },
        {
          kind: "area",
          title: "Days to close the books",
          unit: "days",
          seriesLabels: ["Close time"],
          data: [
            { name: "Q1", a: 9 },
            { name: "Q2", a: 5 },
            { name: "Q3", a: 2 },
            { name: "Q4", a: 1 },
          ],
        },
        {
          kind: "bar",
          title: "Manual exceptions per day",
          unit: "items",
          data: [
            { name: "Before", value: 1400 },
            { name: "Month 1", value: 420 },
            { name: "Month 2", value: 190 },
            { name: "Month 4", value: 98 },
          ],
        },
      ],
    },
  },
  {
    slug: "carecast",
    image: "/images/projects/carecast/hero.jpg",
    name: "CareCast",
    tag: "WEB APP",
    service: "Web",
    sector: "Healthtech",
    desc: "Scheduling and telehealth platform for a network of 30 outpatient clinics.",
    grad: "linear-gradient(135deg, #FF4D6D 0%, #7B2FFF 100%)",
    client: "Multi-site outpatient network",
    year: "2025",
    duration: "6 months",
    role: "Product, design, full stack, HIPAA infra",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "WebRTC", "AWS"],
    hero: {
      headline: "Fewer no-shows, shorter waits, calmer front desks.",
      sub: "One platform for scheduling, intake, and video visits across thirty clinics that used to run on phones and fax.",
    },
    challenge:
      "Each clinic booked appointments differently, intake was paper, and no-show rates ran high because reminders were manual. Patients waited on hold; staff burned out.",
    approach: [
      "Unified scheduling into a single availability model with rules per clinic and provider.",
      "Moved intake online with a mobile-first form patients finish before they arrive.",
      "Built HIPAA-compliant video visits and an automated reminder cascade over SMS and email.",
    ],
    outcome:
      "No-show rate fell by nearly half, front-desk call volume dropped sharply, and roughly a third of visits now happen over video without a waiting-room seat.",
    metrics: [
      { label: "No-show reduction", value: "47%" },
      { label: "Visits now virtual", value: "31%" },
      { label: "Front-desk calls", value: "-38%" },
    ],
    gallery: [
      { grad: "linear-gradient(135deg, #FF4D6D 0%, #7B2FFF 100%)", caption: "Provider schedule board", kind: "calendar" , image: "/images/projects/carecast/gallery-1.jpg" },
      { grad: "linear-gradient(135deg, #7B2FFF 0%, #B8F2C8 100%)", caption: "Online patient intake", kind: "form" , image: "/images/projects/carecast/gallery-2.jpg" },
      { grad: "linear-gradient(135deg, #B8F2C8 0%, #FF4D6D 100%)", caption: "Telehealth visit room", kind: "video" , image: "/images/projects/carecast/gallery-3.jpg" },
    ],
    report: {
      headline: "What changed across thirty clinics",
      summary:
        "Measured over the first two quarters after network-wide rollout.",
      kpis: [
        { label: "No-show rate", value: "-47%", delta: "18% → 9.5%", trend: "up" },
        { label: "Visits virtual", value: "31%", delta: "from 0", trend: "up" },
        { label: "Front-desk calls", value: "-38%", trend: "up" },
        { label: "Intake done ahead", value: "82%", delta: "of patients", trend: "up" },
      ],
      charts: [
        {
          kind: "area",
          title: "No-show rate after rollout",
          unit: "%",
          seriesLabels: ["No-show rate"],
          data: [
            { name: "Q0", a: 18 },
            { name: "Q1", a: 14 },
            { name: "Q2", a: 11 },
            { name: "Q3", a: 9.5 },
          ],
        },
        {
          kind: "donut",
          title: "How visits happen now",
          unit: "%",
          data: [
            { name: "In-clinic", value: 69 },
            { name: "Video", value: 31 },
          ],
        },
        {
          kind: "bar",
          title: "Front-desk calls per clinic per day",
          unit: "calls",
          data: [
            { name: "Before", value: 132 },
            { name: "Month 2", value: 104 },
            { name: "Month 4", value: 88 },
            { name: "Month 6", value: 82 },
          ],
        },
      ],
    },
  },
  {
    slug: "voltpath",
    image: "/images/projects/voltpath/hero.jpg",
    name: "VoltPath",
    tag: "WEB APP",
    service: "Web",
    sector: "Climate & energy",
    desc: "Monitoring platform for 4,000 rooftop solar installations and their batteries.",
    grad: "linear-gradient(135deg, #FFB830 0%, #B8F2C8 100%)",
    client: "Distributed solar operator",
    year: "2025",
    duration: "5 months",
    role: "Frontend, time-series backend, alerting",
    stack: ["React", "TypeScript", "TimescaleDB", "Go", "MQTT"],
    hero: {
      headline: "Every rooftop, one live map.",
      sub: "A monitoring platform that catches an underperforming panel before the customer ever notices their bill.",
    },
    challenge:
      "Faults were found when customers complained. Field techs drove out blind, and there was no way to tell a dirty panel from a failing inverter without a site visit.",
    approach: [
      "Ingested inverter and battery telemetry over MQTT into a time-series store built for it.",
      "Built anomaly detection that compares each site to its own history and its neighbors' weather.",
      "Gave dispatch a live map with severity-ranked alerts and one-tap work orders.",
    ],
    outcome:
      "Faults are now caught the same day, unnecessary truck rolls dropped by a third, and total fleet energy yield rose measurably against the pre-launch baseline.",
    metrics: [
      { label: "Faults caught same-day", value: "94%" },
      { label: "Truck rolls avoided", value: "33%" },
      { label: "Fleet yield gain", value: "+7.2%" },
    ],
    gallery: [
      { grad: "linear-gradient(135deg, #FFB830 0%, #B8F2C8 100%)", caption: "Live fleet map", kind: "map" , image: "/images/projects/voltpath/gallery-1.jpg" },
      { grad: "linear-gradient(135deg, #B8F2C8 0%, #7B2FFF 100%)", caption: "Site energy detail", kind: "energy" , image: "/images/projects/voltpath/gallery-2.jpg" },
      { grad: "linear-gradient(135deg, #7B2FFF 0%, #FFB830 100%)", caption: "Anomaly alert feed", kind: "queue" , image: "/images/projects/voltpath/gallery-3.jpg" },
    ],
    report: {
      headline: "A fleet that reports on itself",
      summary:
        "Performance across 4,000 sites in the first six months of monitoring.",
      kpis: [
        { label: "Faults caught same-day", value: "94%", delta: "was 21%", trend: "up" },
        { label: "Truck rolls avoided", value: "33%", trend: "up" },
        { label: "Fleet yield gain", value: "+7.2%", delta: "vs baseline", trend: "up" },
        { label: "Sites monitored", value: "4,000", trend: "up" },
      ],
      charts: [
        {
          kind: "area",
          title: "Daily fleet energy yield",
          unit: "MWh",
          seriesLabels: ["After monitoring", "Baseline"],
          data: [
            { name: "Mon", a: 41, b: 38 },
            { name: "Tue", a: 44, b: 41 },
            { name: "Wed", a: 39, b: 36 },
            { name: "Thu", a: 46, b: 42 },
            { name: "Fri", a: 48, b: 45 },
            { name: "Sat", a: 43, b: 40 },
          ],
        },
        {
          kind: "donut",
          title: "What the alerts catch",
          unit: "%",
          data: [
            { name: "Soiling", value: 44 },
            { name: "Inverter", value: 29 },
            { name: "Battery", value: 17 },
            { name: "Wiring", value: 10 },
          ],
        },
      ],
    },
  },
  {
    slug: "parseflow",
    image: "/images/projects/parseflow/hero.jpg",
    name: "ParseFlow",
    tag: "WEB APP",
    service: "Web",
    sector: "AI & data",
    desc: "Document-intelligence workspace that turns messy PDFs into structured, reviewed data.",
    grad: "linear-gradient(135deg, #7B2FFF 0%, #FFB830 100%)",
    client: "Commercial insurance underwriter",
    year: "2025",
    duration: "4 months",
    role: "Product, ML integration, review UX",
    stack: ["Next.js", "Python", "LLM APIs", "PostgreSQL", "Redis"],
    hero: {
      headline: "Extraction you can trust, because a human signs off.",
      sub: "An AI workspace that reads submission packets, pulls the fields that matter, and routes only the uncertain ones to a person.",
    },
    challenge:
      "Underwriters retyped data from hundred-page PDF submissions by hand. It was slow, error-prone, and the bottleneck grew every time the business did.",
    approach: [
      "Built an extraction pipeline that returns every field with a confidence score and its source location.",
      "Designed a review UI where a human confirms low-confidence fields side-by-side with the document.",
      "Closed the loop — corrections feed back as examples so accuracy climbs over time.",
    ],
    outcome:
      "Turnaround on a submission dropped from hours to minutes, high-confidence fields flow through untouched, and reviewers spend their time only where the model is unsure.",
    metrics: [
      { label: "Faster turnaround", value: "9x" },
      { label: "Fields auto-accepted", value: "88%" },
      { label: "Extraction accuracy", value: "99.1%" },
    ],
    gallery: [
      { grad: "linear-gradient(135deg, #7B2FFF 0%, #FFB830 100%)", caption: "Document + field overlay", kind: "docExtract" , image: "/images/projects/parseflow/gallery-1.jpg" },
      { grad: "linear-gradient(135deg, #FFB830 0%, #FF4D6D 100%)", caption: "Confidence review queue", kind: "queue" , image: "/images/projects/parseflow/gallery-2.jpg" },
      { grad: "linear-gradient(135deg, #FF4D6D 0%, #7B2FFF 100%)", caption: "Accuracy over time", kind: "areaChart" , image: "/images/projects/parseflow/gallery-3.jpg" },
    ],
    report: {
      headline: "Human-in-the-loop, measured",
      summary:
        "Extraction quality and reviewer load across the first 40,000 documents.",
      kpis: [
        { label: "Turnaround", value: "9× faster", delta: "hrs → min", trend: "up" },
        { label: "Fields auto-accepted", value: "88%", delta: "high-confidence", trend: "up" },
        { label: "Extraction accuracy", value: "99.1%", delta: "was 96.2%", trend: "up" },
        { label: "Reviewer touches", value: "-84%", trend: "up" },
      ],
      charts: [
        {
          kind: "area",
          title: "Extraction accuracy as corrections feed back",
          unit: "%",
          seriesLabels: ["Accuracy"],
          data: [
            { name: "5k", a: 96.2 },
            { name: "15k", a: 97.4 },
            { name: "25k", a: 98.3 },
            { name: "35k", a: 98.9 },
            { name: "40k", a: 99.1 },
          ],
        },
        {
          kind: "donut",
          title: "What happens to each field",
          unit: "%",
          data: [
            { name: "Auto-accepted", value: 88 },
            { name: "Quick confirm", value: 9 },
            { name: "Corrected", value: 3 },
          ],
        },
        {
          kind: "bar",
          title: "Minutes to process one submission",
          unit: "min",
          data: [
            { name: "Manual", value: 165 },
            { name: "v1", value: 42 },
            { name: "v2", value: 24 },
            { name: "Now", value: 18 },
          ],
        },
      ],
    },
  },
  {
    slug: "keystone",
    image: "/images/projects/keystone/hero.jpg",
    name: "Keystone",
    tag: "MOBILE",
    service: "Mobile",
    sector: "Proptech",
    desc: "Field app for real-estate agents: listings, valuations, and offers from the doorstep.",
    grad: "linear-gradient(135deg, #B8F2C8 0%, #FF4D6D 100%)",
    client: "Regional brokerage, 400 agents",
    year: "2024",
    duration: "4 months",
    role: "Mobile app, valuation API, offline sync",
    stack: ["React Native", "TypeScript", "PostgreSQL", "FastAPI", "Mapbox"],
    hero: {
      headline: "The whole deal, from the driveway.",
      sub: "Agents pull comps, run a valuation, and send an offer before they leave the property.",
    },
    challenge:
      "Agents worked off three disconnected tools and a laptop back at the office. Comps were stale by the time an offer went out, and deals stalled over the weekend.",
    approach: [
      "Put listings, a live comp map, and a valuation model in one offline-capable app.",
      "Built a valuation API that blends recent sales, active inventory, and property attributes.",
      "Added in-app offer generation with e-signature so nothing waits for the office.",
    ],
    outcome:
      "Time from showing to a sent offer dropped from two days to under an hour. Agents close more of what they show, and the valuations hold up against final sale prices.",
    metrics: [
      { label: "Showing → offer", value: "2d → 55m" },
      { label: "Valuation accuracy", value: "±3.1%" },
      { label: "Agent adoption", value: "91%" },
    ],
    gallery: [
      { grad: "linear-gradient(135deg, #B8F2C8 0%, #FF4D6D 100%)", caption: "Listing + comp map", kind: "propertyMap" , image: "/images/projects/keystone/gallery-1.jpg" },
      { grad: "linear-gradient(135deg, #FF4D6D 0%, #FFB830 100%)", caption: "Instant valuation", kind: "valuation" , image: "/images/projects/keystone/gallery-2.jpg" },
      { grad: "linear-gradient(135deg, #FFB830 0%, #B8F2C8 100%)", caption: "Offer + e-signature", kind: "signature" , image: "/images/projects/keystone/gallery-3.jpg" },
    ],
    report: {
      headline: "Speed from doorstep to signed offer",
      summary:
        "Tracked across 400 agents over the first two quarters of use.",
      kpis: [
        { label: "Showing → offer", value: "55 min", delta: "from 2 days", trend: "up" },
        { label: "Valuation accuracy", value: "±3.1%", delta: "vs final price", trend: "up" },
        { label: "Agent adoption", value: "91%", trend: "up" },
        { label: "Offers per showing", value: "+28%", trend: "up" },
      ],
      charts: [
        {
          kind: "area",
          title: "Hours from showing to sent offer",
          unit: "hrs",
          seriesLabels: ["Time to offer"],
          data: [
            { name: "Q0", a: 48 },
            { name: "Q1", a: 12 },
            { name: "Q2", a: 3 },
            { name: "Now", a: 0.9 },
          ],
        },
        {
          kind: "bar",
          title: "Weekly agent adoption",
          unit: "% of agents",
          data: [
            { name: "W1", value: 22 },
            { name: "W4", value: 58 },
            { name: "W8", value: 79 },
            { name: "W12", value: 91 },
          ],
        },
      ],
    },
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

import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroCanvas, MobileShapes } from "@/components/HeroCanvas";
import { useReveal } from "@/hooks/use-reveal";
import { PROJECTS, SERVICE_FILTERS, type Project } from "@/data/projects";
import { ProjectModal } from "@/components/ProjectModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neural Mesh — Software that ships. | Neural Mesh Technologies" },
      {
        name: "description",
        content:
          "Neural Mesh (Neural Mesh Technologies / Neural Mesh Tech) is a focused custom software development and IT consulting studio. We build web apps, mobile apps, APIs, MVPs, and modernize legacy systems. No buzzwords. No bloat. Just good product.",
      },
      {
        name: "keywords",
        content:
          "neural mesh, neural mesh tech, neural mesh technologies, nueral mesh tech, nueral mesh technologies, neuralmeshs, neural mesh software, neural mesh studio, software studio, software development, it consulting, custom software, web app development, mobile app development, api development, mvp development, legacy modernization, tech consulting",
      },
      { property: "og:title", content: "Neural Mesh — Software that ships. | Neural Mesh Technologies" },
      {
        property: "og:description",
        content:
          "Neural Mesh (Neural Mesh Technologies) — custom software development and IT consulting studio. Web apps, mobile apps, APIs, MVPs, modernization.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://neuralmeshs.com/" },
      { property: "og:image", content: "https://neuralmeshs.com/og-image.png" },
      { property: "og:image:secure_url", content: "https://neuralmeshs.com/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Neural Mesh — Software that ships." },
      { property: "og:site_name", content: "Neural Mesh" },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@neuralmeshs" },
      { name: "twitter:creator", content: "@neuralmeshs" },
      { name: "twitter:title", content: "Neural Mesh — Software that ships. | Neural Mesh Technologies" },
      {
        name: "twitter:description",
        content:
          "Neural Mesh (Neural Mesh Technologies) — software & IT consulting studio. No buzzwords. No bloat. Just good product.",
      },
      { name: "twitter:image", content: "https://neuralmeshs.com/og-image.png" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
    ],
    links: [{ rel: "canonical", href: "https://neuralmeshs.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://neuralmeshs.com/#organization",
          name: "Neural Mesh Technologies",
          alternateName: [
            "Neural Mesh",
            "Neural Mesh Tech",
            "Nueral Mesh Tech",
            "Nueral Mesh Technologies",
            "NeuralMesh",
            "NeuralMeshs",
            "Neural Mesh Studio",
            "Neural Mesh Software",
            "Neural Mesh Tech Inc",
            "Neural Mesh Technologies Inc",
          ],
          legalName: "Neural Mesh Technologies",
          url: "https://neuralmeshs.com/",
          logo: {
            "@type": "ImageObject",
            url: "https://neuralmeshs.com/favicon.png",
            width: 512,
            height: 512,
          },
          image: "https://neuralmeshs.com/og-image.png",
          description:
            "Neural Mesh (Neural Mesh Technologies / Neural Mesh Tech) is a focused software development and IT consulting studio. Web apps, mobile apps, APIs, MVPs, and legacy modernization.",
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
          sameAs: ["https://neuralmeshs.com/"],
          areaServed: "Worldwide",
          slogan: "Software that ships.",
          knowsAbout: [
            "Software Development",
            "IT Consulting",
            "Web Application Development",
            "Mobile Application Development",
            "API Development",
            "MVP Development",
            "Legacy Modernization",
            "React",
            "Next.js",
            "Node.js",
            "TypeScript",
            "Python",
            "PostgreSQL",
            "AWS",
          ],
          keywords:
            "neural mesh, neural mesh tech, neural mesh technologies, nueral mesh tech, nueral mesh technologies, software development, it consulting",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": "https://neuralmeshs.com/#service",
          name: "Neural Mesh Technologies",
          alternateName: ["Neural Mesh", "Neural Mesh Tech"],
          url: "https://neuralmeshs.com/",
          image: "https://neuralmeshs.com/og-image.png",
          description:
            "Software development and IT consulting services: web apps, mobile apps, APIs, MVPs, and legacy modernization.",
          priceRange: "$$",
          telephone: "+1-000-000-0000",
          email: "hello@neuralmeshs.com",
          areaServed: "Worldwide",
          provider: { "@id": "https://neuralmeshs.com/#organization" },
          serviceType: [
            "Web Application Development",
            "Mobile Application Development",
            "API Development",
            "MVP Development",
            "Legacy Modernization",
            "IT Consulting",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is Neural Mesh?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Neural Mesh (Neural Mesh Technologies / Neural Mesh Tech) is a small, focused software development and IT consulting studio. We build web apps, mobile apps, APIs, MVPs, and modernize legacy systems.",
              },
            },
            {
              "@type": "Question",
              name: "Is Neural Mesh Tech the same as Neural Mesh Technologies?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Neural Mesh is the primary brand name; Neural Mesh Tech and Neural Mesh Technologies are alternate names. The official website is neuralmeshs.com.",
              },
            },
            {
              "@type": "Question",
              name: "What services does Neural Mesh offer?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Web application development, mobile app development (iOS and Android), API and backend engineering, MVP development for startups, tech consulting, and legacy system modernization.",
              },
            },
            {
              "@type": "Question",
              name: "Where is Neural Mesh located?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Neural Mesh serves clients worldwide. Reach us at hello@neuralmeshs.com to start a project.",
              },
            },
            {
              "@type": "Question",
              name: "How do I contact Neural Mesh?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Email hello@neuralmeshs.com or visit the contact section at neuralmeshs.com/#contact. We respond within 24 hours.",
              },
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://neuralmeshs.com/",
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

const TICKER = "PYTHON · REACT · NODE.JS · JAVA · C++ · MONGODB · AWS · DOCKER · POSTGRESQL · NEXT.JS · TYPESCRIPT · ";


const SERVICES = [
  { title: "Web Application Development", desc: "Frontend to backend — we own the whole thing.", stack: "React · Next.js · Node.js", color: "#7B2FFF" },
  { title: "Mobile Development", desc: "iOS and Android. Native when it matters, cross-platform when it doesn't.", stack: "React Native · Swift · Kotlin", color: "#FF4D6D" },
  { title: "API & Backend Engineering", desc: "Fast, documented, and built so the next developer doesn't hate us.", stack: "Python · Node.js · PostgreSQL", color: "#FFB830" },
  { title: "MVP for Startups", desc: "Working product in weeks. Real users. Real feedback.", stack: "Rapid Prototyping · Full Stack", color: "#B8F2C8" },
  { title: "Tech Consulting", desc: "We tell you what we'd actually build if it were our money.", stack: "Architecture · Code Review", color: "#7B2FFF" },
  { title: "Legacy Modernization", desc: "Old systems that work fine — except when they don't.", stack: "Migration · Refactoring · Documentation", color: "#FF4D6D" },
];

const STEPS = [
  { n: 1, title: "Discovery", desc: "One honest call. We ask the right questions and actually listen to the answers." },
  { n: 2, title: "Proposal", desc: "Scope, timeline, and price in plain writing. No hidden fees discovered after you say yes." },
  { n: 3, title: "Build", desc: "Weekly demos. You see the product grow. Your feedback shapes every sprint." },
  { n: 4, title: "Handover", desc: "Full docs, clean repo, and we're still reachable after you pay the last invoice." },
];

const VALUES = [
  { title: "Direct access", desc: "You talk to developers, not account managers.", color: "#7B2FFF" },
  { title: "Honest pricing", desc: "We quote what it actually costs.", color: "#FF4D6D" },
  { title: "We say no", desc: "We turn down work we can't do well.", color: "#FFB830" },
  { title: "Startup speed", desc: "Small team means fast decisions.", color: "#B8F2C8" },
];

const TECH = [
  { name: "Python", variant: "violet" }, { name: "JavaScript", variant: "amber" },
  { name: "TypeScript", variant: "coral" }, { name: "React", variant: "sage" },
  { name: "Next.js", variant: "violet-outline" }, { name: "Node.js", variant: "violet" },
  { name: "Java", variant: "coral" }, { name: "C", variant: "amber" },
  { name: "C++", variant: "sage" }, { name: "PostgreSQL", variant: "coral-outline" },
  { name: "MongoDB", variant: "sage" }, { name: "AWS", variant: "amber" },
  { name: "Docker", variant: "violet" }, { name: "Git", variant: "coral" },
  { name: "REST APIs", variant: "amber-outline" }, { name: "GraphQL", variant: "violet" },
];

function tagClass(v: string) {
  switch (v) {
    case "violet": return "bg-[#7B2FFF] text-white";
    case "coral": return "bg-[#FF4D6D] text-white";
    case "amber": return "bg-[#FFB830] text-[#1C1A26]";
    case "sage": return "bg-[#B8F2C8] text-[#1C1A26]";
    case "violet-outline": return "border-2 border-[#7B2FFF] text-[#7B2FFF]";
    case "coral-outline": return "border-2 border-[#FF4D6D] text-[#FF4D6D]";
    case "amber-outline": return "border-2 border-[#FFB830] text-[#1C1A26]";
    default: return "bg-[#7B2FFF] text-white";
  }
}

function Cube({ color }: { color: string }) {
  return (
    <div style={{ perspective: 200 }}>
      <div className="cube-3d">
        <div className="face f-front" style={{ background: color }} />
        <div className="face f-top" style={{ background: color, filter: "brightness(1.3)" }} />
        <div className="face f-right" style={{ background: color, filter: "brightness(0.7)" }} />
      </div>
    </div>
  );
}

function WireSphere({ color, size = 360 }: { color: string; size?: number }) {
  const rings = 8;
  return (
    <div style={{ width: size, height: size, perspective: 1200, color }}>
      <div className="sphere-3d w-full h-full">
        {Array.from({ length: rings }).map((_, i) => (
          <div
            key={i}
            className="ring"
            style={{ transform: `rotateY(${(180 / rings) * i}deg)` }}
          />
        ))}
        {Array.from({ length: rings }).map((_, i) => (
          <div
            key={`h${i}`}
            className="ring"
            style={{ transform: `rotateX(90deg) rotateY(${(180 / rings) * i}deg)` }}
          />
        ))}
      </div>
    </div>
  );
}

function Index() {
  useReveal();
  const [filter, setFilter] = useState<(typeof SERVICE_FILTERS)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.service === filter)),
    [filter]
  );


  return (
    <div id="top" className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#F5F1EA" }}>
      <Navbar />

      {/* Visually-hidden SEO block — keeps every alternate spelling in the DOM for crawlers and AI retrieval. */}
      <section
        aria-hidden="false"
        className="sr-only"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        <h1>Neural Mesh Tech — Software that ships.</h1>
        <p>
          Neural Mesh Tech (also written Neural Mesh Technologies, and searched for as
          Nueral Mesh Tech, Nueral Mesh Technologies, NeuralMesh, NeuralMeshs, neural mesh
          software, neural mesh studio, or neural mesh tech inc) is the official website of
          Neural Mesh Technologies — a focused software development and IT consulting studio
          at https://neuralmeshs.com.
        </p>
        <p>
          Neural Mesh Tech builds web applications, mobile apps (iOS and Android), APIs and
          backends, MVPs for startups, and modernizes legacy systems. Founded in 2024, we
          serve clients worldwide from neuralmeshs.com. Email hello@neuralmeshs.com to start
          a project. Tagline: Software that ships.
        </p>
        <nav aria-label="Brand aliases">
          <ul>
            <li>Neural Mesh Tech</li>
            <li>Neural Mesh Technologies</li>
            <li>Nueral Mesh Tech</li>
            <li>Nueral Mesh Technologies</li>
            <li>NeuralMesh</li>
            <li>NeuralMeshs</li>
            <li>Neural Mesh Studio</li>
            <li>Neural Mesh Software</li>
            <li>Neural Mesh Tech Inc</li>
            <li>Neural Mesh Technologies Inc</li>
          </ul>
        </nav>
      </section>

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col" style={{ backgroundColor: "#0F0D1A", color: "#EEE9FF" }}>
        <div className="absolute inset-0">
          <HeroCanvas />
          <MobileShapes />
        </div>
        {/* Subtle backdrop wash */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 80% 40%, rgba(123,47,255,0.18), transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(255,77,109,0.12), transparent 55%)" }} />

        <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-44 pb-32 flex-1 grid md:grid-cols-[55fr_45fr] gap-10 items-center">
          <div className="reveal">
            <div className="eyebrow text-coral mb-8">SOFTWARE · CONSULTING · STARTUPS</div>
            <h1 className="font-display font-extrabold text-near-white leading-[0.95] mb-8"
              style={{ fontSize: "clamp(44px, 7vw, 80px)" }}>
              We build software<br />people actually use.
            </h1>
            <p className="font-body text-near-white/70 max-w-xl mb-10" style={{ fontSize: 17, lineHeight: 1.75 }}>
              Neural Mesh Tech is a small, focused team. We take fewer clients so we can do better work. No buzzwords. No bloat. Just good product.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#work" className="btn-violet">See Our Work</a>
              <a href="#contact" className="btn-coral-outline">Talk to Us →</a>
            </div>
          </div>
          <div className="hidden md:block" />
        </div>

        {/* Ticker */}
        <div className="relative border-t border-violet/30" style={{ backgroundColor: "#0a0813" }}>
          <div className="overflow-hidden py-3">
            <div className="flex animate-marquee whitespace-nowrap" style={{ color: "#FFB830", fontFamily: "Space Mono, monospace", fontSize: 12, letterSpacing: "0.18em" }}>
              <span className="px-4">{TICKER.repeat(6)}</span>
              <span className="px-4">{TICKER.repeat(6)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="py-28 md:py-36" style={{ backgroundColor: "#F5F1EA", color: "#1C1A26" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="reveal mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="eyebrow text-coral mb-4">OUR WORK</div>
              <h2 className="font-display font-bold leading-[1.02]" style={{ fontSize: "clamp(36px, 5vw, 52px)" }}>
                Things we've shipped.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {SERVICE_FILTERS.map((f) => {
                const active = filter === f;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className="font-mono text-[11px] uppercase tracking-[0.2em] px-3.5 py-2 rounded-full transition-all"
                    style={{
                      background: active ? "#1C1A26" : "transparent",
                      color: active ? "#F5F1EA" : "#1C1A26",
                      border: `1.5px solid ${active ? "#1C1A26" : "rgba(28,26,38,0.2)"}`,
                    }}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="reveal rounded-xl border-2 border-dashed border-[#1C1A26]/15 p-12 text-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1C1A26]/50">
                Nothing here yet for this category — but ask us.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 reveal">
              {visible.map((p, i) => {
                const big = filter === "All" && i === 0;
                return (
                  <ProjectCard
                    key={p.slug}
                    p={p}
                    big={big}
                    className={big ? "md:col-span-2 md:row-span-2 md:min-h-[560px]" : ""}
                    onOpen={() => setSelected(p)}
                  />
                );
              })}
              {filter === "All" && (
                <div className="rounded-xl border-2 border-dashed border-[#1C1A26]/15 flex items-center justify-center p-8 text-center">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#1C1A26]/50">
                    More coming soon — we're just getting started.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <ProjectModal project={selected} open={!!selected} onOpenChange={(o) => !o && setSelected(null)} />


      {/* SERVICES */}
      <section id="services" className="py-28 md:py-36" style={{ backgroundColor: "#1C1A26", color: "#EEE9FF" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="reveal mb-14">
            <div className="eyebrow text-amber mb-4">WHAT WE BUILD</div>
            <h2 className="font-display font-bold leading-[1.02]" style={{ fontSize: "clamp(36px, 5vw, 52px)" }}>
              Pick a problem. We'll fix it.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="group reveal relative p-7 rounded-xl transition-all duration-300 hover:bg-[#322e4d]"
                style={{ backgroundColor: "#2A2740", borderLeft: "3px solid transparent" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderLeftColor = s.color)}
                onMouseLeave={(e) => (e.currentTarget.style.borderLeftColor = "transparent")}
              >
                <div className="mb-6"><Cube color={s.color} /></div>
                <h3 className="font-display font-semibold text-[20px] mb-3 text-near-white">{s.title}</h3>
                <p className="font-body text-[15px] text-near-white/65 leading-relaxed mb-5">{s.desc}</p>
                <div className="eyebrow" style={{ color: s.color }}>{s.stack}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-28 md:py-36" style={{ backgroundColor: "#F5F1EA", color: "#1C1A26" }}>
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="reveal mb-16">
            <div className="eyebrow text-violet mb-4">HOW IT WORKS</div>
            <h2 className="font-display font-bold leading-[1.02]" style={{ fontSize: "clamp(36px, 5vw, 52px)" }}>
              Four steps. No surprises.
            </h2>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
            <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-px border-t-2 border-dashed" style={{ borderColor: "#7B2FFF", opacity: 0.4 }} />
            {STEPS.map((s) => (
              <div key={s.n} className="reveal relative pt-2">
                <div className="font-display font-extrabold absolute -top-4 -left-2 select-none pointer-events-none"
                  style={{ fontSize: 96, color: "rgba(123,47,255,0.12)", lineHeight: 1 }}>
                  {s.n}
                </div>
                <div className="relative">
                  <div className="w-3 h-3 rounded-full mb-6" style={{ background: "#7B2FFF" }} />
                  <h3 className="font-display font-semibold text-[22px] mb-3">{s.title}</h3>
                  <p className="font-body text-[15px] text-[#1C1A26]/70 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="relative py-28 md:py-40 overflow-hidden" style={{ backgroundColor: "#0F0D1A", color: "#EEE9FF" }}>
        <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
          <WireSphere color="#7B2FFF" size={520} />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 md:px-10 text-center">
          <blockquote className="font-display italic font-medium reveal mb-16" style={{ fontSize: "clamp(28px, 3.5vw, 40px)", lineHeight: 1.3 }}>
            "We're not the biggest option. We're the one that picks up the phone and cares how the code ends up."
          </blockquote>
          <div className="grid sm:grid-cols-2 gap-10 text-left reveal">
            {VALUES.map((v) => (
              <div key={v.title} className="flex gap-4">
                <div className="shrink-0 mt-2 w-0 h-0"
                  style={{
                    borderLeft: "10px solid transparent",
                    borderRight: "10px solid transparent",
                    borderBottom: `16px solid ${v.color}`,
                  }} />
                <div>
                  <h4 className="font-display font-semibold text-[20px] mb-1">{v.title}</h4>
                  <p className="font-body text-[15px] text-near-white/65">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-28 md:py-36" style={{ backgroundColor: "#F5F1EA", color: "#1C1A26" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="reveal mb-12">
            <div className="eyebrow text-coral mb-4">BUILT WITH</div>
            <h2 className="font-display font-bold leading-[1.02]" style={{ fontSize: "clamp(36px, 5vw, 52px)" }}>
              The tools we reach for.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 reveal">
            {TECH.map((t, i) => (
              <span
                key={t.name}
                className={`float-soft inline-block font-display font-semibold text-[14px] rounded-full ${tagClass(t.variant)}`}
                style={{
                  padding: "10px 24px",
                  animationDuration: `${3 + (i % 5)}s`,
                  animationDelay: `${(i % 7) * 0.3}s`,
                }}
              >
                {t.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative py-28 md:py-36 overflow-hidden" style={{ backgroundColor: "#1C1A26", color: "#EEE9FF" }}>
        <div className="absolute -bottom-32 -right-32 opacity-40 pointer-events-none">
          <WireSphere color="#FF4D6D" size={420} />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-16">
          <div className="reveal">
            <div className="eyebrow text-amber mb-4">START A PROJECT</div>
            <h2 className="font-display font-bold leading-[1.02] mb-8" style={{ fontSize: "clamp(36px, 5vw, 52px)" }}>
              Tell us what you're building.
            </h2>
            <ul className="space-y-4 mb-10">
              {[
                { c: "#7B2FFF", t: "First conversation is always free." },
                { c: "#FF4D6D", t: "We respond within 24 hours." },
                { c: "#FFB830", t: "No commitment, just a real discussion." },
              ].map((r) => (
                <li key={r.t} className="flex items-center gap-3 font-body text-[16px] text-near-white/80">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: r.c }} />
                  {r.t}
                </li>
              ))}
            </ul>
            <a href="mailto:hello@neuralmeshs.com" className="font-mono text-coral text-[18px] md:text-[22px] break-all hover:underline">
              hello@neuralmeshs.com
            </a>
          </div>

          <form
            className="reveal space-y-5"
            onSubmit={(e) => { e.preventDefault(); alert("Thanks — we'll be in touch within 24 hours."); }}
          >
            <Field label="Name" id="name"><input id="name" required className="contact-input" /></Field>
            <Field label="Email" id="email"><input id="email" type="email" required className="contact-input" /></Field>
            <Field label="What do you need?" id="msg">
              <textarea id="msg" rows={5} required className="contact-input resize-none" />
            </Field>
            <button type="submit" className="w-full font-display font-semibold text-[14px] py-4 px-6"
              style={{ background: "#7B2FFF", color: "#fff" }}>
              Send it →
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#0F0D1A", color: "#EEE9FF" }}>
        <div className="h-px w-full" style={{ background: "rgba(123,47,255,0.55)" }} />
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-2 gap-12">
          <div>
            <img src="/icondark.png" alt="Neural Mesh Tech Logo" className="h-42 w-auto object-contain" />
            <p className="font-body text-near-white/55 text-[14px] mt-4">Software that ships.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:justify-self-end md:text-right">
            {["Services", "Work", "Process", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="eyebrow text-near-white/70 hover:text-coral">{l}</a>
            ))}
          </div>
        </div>
        <div className="border-t border-violet/20 py-6 px-6 text-center font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-near-white/50 leading-relaxed">
          Neural Mesh Tech &copy; {new Date().getFullYear()} <span className="inline-block">· Built with intent, not a template.</span>
        </div>
      </footer>

      <style>{`
        .contact-input {
          width: 100%;
          background: #0F0D1A;
          border: 1px solid rgba(123,47,255,0.6);
          color: #EEE9FF;
          padding: 14px 16px;
          font-family: Manrope, sans-serif;
          font-size: 15px;
          outline: none;
          transition: border-color .2s ease;
        }
        .contact-input:focus { border-color: #FF4D6D; }
      `}</style>
    </div>
  );
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <label htmlFor={id} className="block">
      <span className="eyebrow text-near-white/55 block mb-2">{label}</span>
      {children}
    </label>
  );
}

function ProjectCard({
  p,
  className = "",
  big = false,
  onOpen,
}: {
  p: Project;
  className?: string;
  big?: boolean;
  onOpen?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group relative overflow-hidden rounded-xl bg-white text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_30px_60px_-20px_rgba(28,26,38,0.35)] ${className}`}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ background: p.grad, height: big ? "62%" : 220, minHeight: big ? 360 : 220 }}
      >
        <div className="absolute top-4 left-4 flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/30" />
        </div>
        <div className="absolute inset-x-8 top-14 bottom-8 rounded-lg bg-white/15 backdrop-blur-[2px] border border-white/20" />
        <div className="absolute left-12 top-20 right-12 h-2 rounded bg-white/40" />
        <div className="absolute left-12 top-28 w-2/3 h-2 rounded bg-white/30" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: "rgba(123,47,255,0.7)" }}>
          <span className="font-display font-semibold text-white text-[18px]">Quick look →</span>
        </div>
        <span className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/85 bg-black/25 px-2 py-1 rounded">
          {p.service}
        </span>
      </div>
      <div className="p-6">
        <div className="eyebrow text-[#1C1A26]/60 mb-2">{p.tag}</div>
        <h3 className="font-display font-semibold text-[20px] mb-2">{p.name}</h3>
        <p className="font-body text-[15px] text-[#1C1A26]/70 leading-relaxed mb-3">{p.desc}</p>
        <Link
          to="/work/$slug"
          params={{ slug: p.slug }}
          onClick={(e) => e.stopPropagation()}
          className="eyebrow text-violet hover:text-coral"
        >
          Full case study →
        </Link>
      </div>
    </button>
  );
}

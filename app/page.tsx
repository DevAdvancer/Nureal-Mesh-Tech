"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useReveal } from "@/hooks/use-reveal";
import { PROJECTS, SERVICE_FILTERS, type Project } from "@/data/projects";
import { ProjectModal } from "@/components/ProjectModal";

const HeroCanvas = dynamic(
  () => import("@/components/HeroCanvas").then((mod) => mod.HeroCanvas),
  { ssr: false }
);

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
          href={`/work/${p.slug}`}
          onClick={(e) => e.stopPropagation()}
          className="eyebrow text-violet hover:text-coral"
        >
          Full case study →
        </Link>
      </div>
    </button>
  );
}

export default function HomePage() {
  useReveal();
  const [filter, setFilter] = useState<(typeof SERVICE_FILTERS)[number]>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const visible = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.service === filter)),
    [filter]
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [showCanvas, setShowCanvas] = useState(false);
  useEffect(() => {
    const handleLoad = () => {
      if (window.innerWidth >= 768) {
        setShowCanvas(true);
      }
    };
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad, { passive: true });
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  const [nameVal, setNameVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [messageVal, setMessageVal] = useState("");
  const [sending, setSending] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);
  const [sendProgressStage, setSendProgressStage] = useState("");
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setSendSuccess(false);
    setSendError("");
    setSendProgress(0);
    setSendProgressStage("Resolving mail routing...");

    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 4;
      if (currentProgress >= 90) {
        currentProgress = 90;
        clearInterval(progressInterval);
      }
      setSendProgress(currentProgress);

      if (currentProgress < 25) {
        setSendProgressStage("Establishing TLS handshake...");
      } else if (currentProgress < 55) {
        setSendProgressStage("Authorizing via Resend gateway...");
      } else if (currentProgress < 75) {
        setSendProgressStage("Encrypting payload details...");
      } else {
        setSendProgressStage("Transmitting contact packet...");
      }
    }, 110);

    try {
      const startTime = Date.now();
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameVal,
          email: emailVal,
          message: messageVal,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to transmit message.");

      clearInterval(progressInterval);
      setSendProgressStage("Transmission fully acknowledged!");
      setSendProgress(100);

      const elapsed = Date.now() - startTime;
      const minDuration = 1200;
      if (elapsed < minDuration) {
        await new Promise((resolve) => setTimeout(resolve, minDuration - elapsed));
      }

      setSendSuccess(true);
      setNameVal("");
      setEmailVal("");
      setMessageVal("");
    } catch (err: any) {
      clearInterval(progressInterval);
      setSendError(err.message || "Failed to send inquiry.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div id="top" className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#F5F1EA" }}>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col" style={{ backgroundColor: "#0F0D1A", color: "#EEE9FF" }}>
        <div className="absolute inset-0">
          {showCanvas ? (
            <HeroCanvas />
          ) : (
            <div className="absolute inset-0 opacity-40 pointer-events-none flex items-center justify-end pr-6 overflow-hidden">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0">
                <style>{`
                  @keyframes pulse-node {
                    0%, 100% { transform: scale(1); opacity: 0.65; }
                    50% { transform: scale(1.25); opacity: 1; }
                  }
                  .node-coral { fill: #FF4D6D; animation: pulse-node 3s infinite ease-in-out; transform-origin: 75px 25px; }
                  .node-amber { fill: #FFB830; animation: pulse-node 5s infinite ease-in-out; transform-origin: 58px 42px; }
                  .node-violet1 { fill: #7B2FFF; animation: pulse-node 4s infinite ease-in-out; transform-origin: 44px 58px; }
                  .node-violet2 { fill: #7B2FFF; animation: pulse-node 6s infinite ease-in-out; transform-origin: 78px 68px; }
                `}</style>
                {/* Connections */}
                <line x1="75" y1="25" x2="58" y2="42" stroke="rgba(255, 77, 109, 0.22)" strokeWidth="0.4" strokeDasharray="1 1" />
                <line x1="58" y1="42" x2="44" y2="58" stroke="rgba(255, 184, 48, 0.22)" strokeWidth="0.4" strokeDasharray="1 1" />
                <line x1="44" y1="58" x2="78" y2="68" stroke="rgba(123, 47, 255, 0.22)" strokeWidth="0.4" strokeDasharray="1 1" />
                <line x1="75" y1="25" x2="78" y2="68" stroke="rgba(255, 77, 109, 0.22)" strokeWidth="0.4" strokeDasharray="1 1" />
                <line x1="58" y1="42" x2="78" y2="68" stroke="rgba(255, 184, 48, 0.22)" strokeWidth="0.4" strokeDasharray="1 1" />
                
                {/* Nodes */}
                <circle cx="75" cy="25" r="1.8" className="node-coral" />
                <circle cx="58" cy="42" r="1.4" className="node-amber" />
                <circle cx="44" cy="58" r="1.6" className="node-violet1" />
                <circle cx="78" cy="68" r="1.7" className="node-violet2" />
              </svg>
            </div>
          )}
        </div>
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
          <div className="hidden md:block relative h-[450px] w-full z-10 select-none">

            {/* Floating Service Card 1 (Web Apps) */}
            <div id="hero-card-web" className="absolute top-[8%] right-[5%] p-3.5 rounded-xl bg-[#131124]/80 border border-white/10 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#FF4D6D]/40" style={{ zIndex: 2 }}>
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-[#FF4D6D] bg-[#FF4D6D]/10 px-2.5 py-1 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D] animate-pulse" />
                Web App
              </span>
              <h4 className="font-display font-semibold text-[13.5px] text-near-white mt-2">
                Custom Web Applications
              </h4>
            </div>

            {/* Floating Service Card 2 (Mobile Apps) */}
            <div id="hero-card-mobile" className="absolute top-[42%] left-[-8%] p-3.5 rounded-xl bg-[#131124]/80 border border-white/10 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#FFB830]/40" style={{ zIndex: 2 }}>
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-[#FFB830] bg-[#FFB830]/10 px-2.5 py-1 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB830] animate-pulse" />
                Mobile App
              </span>
              <h4 className="font-display font-semibold text-[13.5px] text-near-white mt-2">
                iOS &amp; Android Native Delivery
              </h4>
            </div>

            {/* Floating Service Card 3 (Backend engineering) */}
            <div id="hero-card-backend" className="absolute bottom-[10%] right-[2%] p-3.5 rounded-xl bg-[#131124]/80 border border-white/10 shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#7B2FFF]/40" style={{ zIndex: 2 }}>
              <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-[#7B2FFF] bg-[#7B2FFF]/10 px-2.5 py-1 rounded-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7B2FFF] animate-pulse" />
                Backend &amp; Cloud
              </span>
              <h4 className="font-display font-semibold text-[13.5px] text-near-white mt-2">
                Scalable APIs &amp; Infrastructure
              </h4>
            </div>
          </div>
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
                Things we&apos;ve shipped.
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
                    More coming soon — we&apos;re just getting started.
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
              Pick a problem. We&apos;ll fix it.
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
            &ldquo;We&apos;re not the biggest option. We&apos;re the one that picks up the phone and cares how the code ends up.&rdquo;
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
              Tell us what you&apos;re building.
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

          {sendSuccess ? (
            <div className="space-y-6 p-6 rounded-xl border border-emerald-500/20 bg-[#161422] text-center w-full max-w-lg">
              <div className="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-emerald-500/30 bg-emerald-500/10 animate-pulse" />
                <span className="text-[28px] text-emerald-400">✓</span>
              </div>
              <h3 className="font-display font-semibold text-[20px] text-near-white">Message Transmitted</h3>
              <p className="font-body text-[14px] text-near-white/60 leading-relaxed max-w-sm mx-auto">
                Your request has been delivered safely via the <span className="text-violet font-semibold">Resend API Portal</span>. We respond within 24 hours.
              </p>

              <div className="text-left font-mono text-[11px] p-4 bg-[#0a0813] border border-white/5 rounded-lg space-y-2 text-near-white/70">
                <div className="flex justify-between">
                  <span className="opacity-40">SMTP_SECURE:</span>
                  <span className="text-emerald-400">TRUE (TLS_1.3)</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-40">SERVER:</span>
                  <span>RESEND_DIRECT</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-40">STATUS:</span>
                  <span className="text-emerald-400">200 OK</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSendSuccess(false)}
                className="w-full font-display font-semibold text-[13px] py-3.5 px-6 rounded-lg cursor-pointer transition-transform active:scale-[0.99]"
                style={{ background: "#7B2FFF", color: "#fff" }}
              >
                Send Another Inquiry
              </button>
            </div>
          ) : sending ? (
            <div className="space-y-6 p-8 rounded-xl border border-violet/20 bg-[#161422] text-center w-full max-w-lg">
              <div className="relative w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-violet/20 border-t-violet animate-spin" />
                <span className="text-[18px]">⚡</span>
              </div>
              <h3 className="font-display font-semibold text-[17px] text-near-white">{sendProgressStage}</h3>
              <p className="font-mono text-[11px] text-near-white/40">Transmission progress: {sendProgress}%</p>

              <div className="w-full h-1.5 bg-white/5 border border-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#7B2FFF] to-[#FF4D6D] transition-all duration-150"
                  style={{ width: `${sendProgress}%`, boxShadow: "0 0 8px #7B2FFF" }}
                />
              </div>
            </div>
          ) : (
            <form className="reveal space-y-5 w-full max-w-lg" onSubmit={handleContactSubmit}>
              {sendError && (
                <div className="p-3.5 rounded-lg border border-red-500/20 bg-red-500/5 text-red-400 text-xs font-semibold">
                  {sendError}
                </div>
              )}
              <Field label="Name" id="name">
                <input
                  id="name"
                  required
                  value={nameVal}
                  onChange={(e) => setNameVal(e.target.value)}
                  className="contact-input"
                />
              </Field>
              <Field label="Email" id="email">
                <input
                  id="email"
                  type="email"
                  required
                  value={emailVal}
                  onChange={(e) => setEmailVal(e.target.value)}
                  className="contact-input"
                />
              </Field>
              <Field label="What do you need?" id="msg">
                <textarea
                  id="msg"
                  rows={5}
                  required
                  value={messageVal}
                  onChange={(e) => setMessageVal(e.target.value)}
                  className="contact-input resize-none"
                />
              </Field>
              <button
                type="submit"
                className="w-full font-display font-semibold text-[14px] py-4 px-6 hover:bg-[#6c28eb] transition-colors cursor-pointer"
                style={{ background: "#7B2FFF", color: "#fff" }}
              >
                Send it →
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "#0F0D1A", color: "#EEE9FF" }}>
        <div className="h-px w-full" style={{ background: "rgba(123,47,255,0.55)" }} />
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-2 gap-12">
          <div>
            <Image
              src="/icondark.png"
              alt="Neural Mesh Tech Logo"
              width={168}
              height={126}
              className="h-28 w-auto object-contain"
            />
            <p className="font-body text-near-white/55 text-[14px] mt-4">Software that ships.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:justify-self-end md:text-right">
            {["Services", "Work", "Process", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="eyebrow text-near-white/70 hover:text-coral">{l}</a>
            ))}
          </div>
        </div>
        <div className="border-t border-violet/20 py-6 px-6 text-center font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.1em] sm:tracking-[0.2em] text-near-white/50 leading-relaxed">
          Neural Mesh Tech &copy; {mounted ? new Date().getFullYear() : "2026"} <span className="inline-block">· Built with intent, not a template.</span>
        </div>
      </footer>
    </div>
  );
}

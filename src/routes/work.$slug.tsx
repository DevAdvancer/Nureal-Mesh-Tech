import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { ProjectStats } from "@/components/ProjectStats";
import { getProject, PROJECTS, type Project } from "@/data/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p
      ? `${p.name} — Neural Mesh Tech case study | Neural Mesh Technologies`
      : "Case study — Neural Mesh Tech | Neural Mesh Technologies";
    const desc =
      p?.desc ?? "A Neural Mesh Tech (Neural Mesh Technologies) project case study.";
    const url = p ? `https://neuralmeshs.com/work/${p.slug}` : "https://neuralmeshs.com/work";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: `${desc} By Neural Mesh Tech (Neural Mesh Technologies).`,
        },
        {
          name: "keywords",
          content:
            "neural mesh tech, neural mesh technologies, nueral mesh tech, neural mesh case study, neural mesh portfolio, software development case study",
        },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: "https://neuralmeshs.com/og-image.png" },
        { property: "og:image:secure_url", content: "https://neuralmeshs.com/og-image.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: `${p?.name ?? "Case study"} — Neural Mesh Tech` },
        { property: "og:site_name", content: "Neural Mesh Tech" },
        { property: "og:locale", content: "en_US" },
        { property: "article:author", content: "Neural Mesh Tech" },
        { property: "article:publisher", content: "https://neuralmeshs.com" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@neuralmeshs" },
        { name: "twitter:creator", content: "@neuralmeshs" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { name: "twitter:image", content: "https://neuralmeshs.com/og-image.png" },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
      ],
      links: p ? [{ rel: "canonical", href: url }] : [],
      scripts: p
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CreativeWork",
                "@id": `${url}#work`,
                name: p.name,
                description: p.desc,
                creator: {
                  "@type": "Organization",
                  "@id": "https://neuralmeshs.com/#organization",
                  name: "Neural Mesh Tech",
                  alternateName: "Neural Mesh Technologies",
                  url: "https://neuralmeshs.com",
                },
                publisher: { "@id": "https://neuralmeshs.com/#organization" },
                dateCreated: p.year,
                url,
                isPartOf: { "@id": "https://neuralmeshs.com/#website" },
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
                  {
                    "@type": "ListItem",
                    position: 2,
                    name: "Work",
                    item: "https://neuralmeshs.com/#work",
                  },
                  {
                    "@type": "ListItem",
                    position: 3,
                    name: p.name,
                    item: url,
                  },
                ],
              }),
            },
          ]
        : [],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F5F1EA" }}>
      <div className="text-center">
        <h1 className="font-display font-bold text-3xl mb-4">Project not found</h1>
        <Link to="/" className="btn-violet">Back home</Link>
      </div>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#F5F1EA" }}>
      <div className="text-center">
        <h1 className="font-display font-bold text-3xl mb-4">Something went wrong</h1>
        <button onClick={reset} className="btn-violet">Try again</button>
      </div>
    </div>
  ),
  component: ProjectPage,
});

function ProjectPage() {
  const { project: p } = Route.useLoaderData() as { project: Project };
  const others = PROJECTS.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#F5F1EA" }}>
      <Navbar />

      {/* HERO */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-28" style={{ backgroundColor: "#0F0D1A", color: "#EEE9FF" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 80% 30%, rgba(123,47,255,0.22), transparent 60%), radial-gradient(ellipse at 10% 90%, rgba(255,77,109,0.14), transparent 55%)" }} />
        <div className="relative max-w-6xl mx-auto px-6 md:px-10">
          <Link to="/" hash="work" className="eyebrow text-coral hover:text-amber inline-block mb-8">
            ← Back to work
          </Link>
          <div className="eyebrow text-amber mb-4">{p.tag} · {p.year}</div>
          <h1 className="font-display font-extrabold leading-[0.98] mb-6"
            style={{ fontSize: "clamp(40px, 6vw, 72px)" }}>
            {p.name}
          </h1>
          <p className="font-display italic text-near-white/85 max-w-3xl"
            style={{ fontSize: "clamp(20px, 2.2vw, 28px)", lineHeight: 1.35 }}>
            {p.hero.headline}
          </p>
          <p className="font-body text-near-white/65 max-w-2xl mt-6" style={{ fontSize: 17, lineHeight: 1.7 }}>
            {p.hero.sub}
          </p>
        </div>
      </section>

      {/* META BAR */}
      <section style={{ backgroundColor: "#1C1A26", color: "#EEE9FF" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { l: "Client", v: p.client },
            { l: "Year", v: p.year },
            { l: "Duration", v: p.duration },
            { l: "Our role", v: p.role },
          ].map((m) => (
            <div key={m.l}>
              <div className="eyebrow text-amber mb-2">{m.l}</div>
              <div className="font-display text-near-white text-[16px]">{m.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HERO IMAGE / FEATURE */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#F5F1EA" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="rounded-2xl overflow-hidden shadow-[0_30px_80px_-30px_rgba(28,26,38,0.4)]"
            style={{ background: p.grad, aspectRatio: "16/9" }}>
            <div className="w-full h-full flex items-center justify-center">
              <div className="font-display font-extrabold text-white/30" style={{ fontSize: "clamp(60px, 12vw, 180px)" }}>
                {p.name}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDY COPY */}
      <section className="pb-20" style={{ backgroundColor: "#F5F1EA", color: "#1C1A26" }}>
        <div className="max-w-3xl mx-auto px-6 md:px-10 space-y-16">
          <div>
            <div className="eyebrow text-coral mb-4">THE CHALLENGE</div>
            <p className="font-body text-[19px] leading-[1.7] text-[#1C1A26]/85">{p.challenge}</p>
          </div>

          <div>
            <div className="eyebrow text-violet mb-4">OUR APPROACH</div>
            <ul className="space-y-4">
              {p.approach.map((a, i) => (
                <li key={i} className="flex gap-4">
                  <span className="shrink-0 font-mono text-[12px] text-violet pt-2">0{i + 1}</span>
                  <span className="font-body text-[17px] leading-[1.7] text-[#1C1A26]/85">{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="eyebrow text-amber-foreground mb-4" style={{ color: "#b6800f" }}>WHAT HAPPENED</div>
            <p className="font-body text-[19px] leading-[1.7] text-[#1C1A26]/85">{p.outcome}</p>
          </div>

          <ProjectStats metrics={p.metrics} />

          <div>
            <div className="eyebrow text-coral mb-4">BUILT WITH</div>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="font-mono text-[12px] px-3 py-1.5 rounded-full border border-[#1C1A26]/15 text-[#1C1A26]/75">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20" style={{ backgroundColor: "#1C1A26", color: "#EEE9FF" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="eyebrow text-amber mb-8">GALLERY</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {p.gallery.map((g, i) => (
              <figure key={i} className={i === 0 ? "md:col-span-2" : ""}>
                <div className="rounded-xl overflow-hidden" style={{ background: g.grad, aspectRatio: i === 0 ? "16/8" : "4/3" }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-3/4 h-3/4 rounded-lg bg-white/12 backdrop-blur-[2px] border border-white/15" />
                  </div>
                </div>
                <figcaption className="font-mono text-[11px] uppercase tracking-[0.2em] text-near-white/55 mt-3">
                  {g.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* MORE WORK */}
      <section className="py-20" style={{ backgroundColor: "#F5F1EA" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display font-bold" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>More work</h2>
            <Link to="/" hash="work" className="eyebrow text-violet hover:text-coral">All projects →</Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {others.map((o) => (
              <Link key={o.slug} to="/work/$slug" params={{ slug: o.slug }}
                className="group rounded-xl overflow-hidden bg-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(28,26,38,0.3)]">
                <div className="h-40" style={{ background: o.grad }} />
                <div className="p-5">
                  <div className="eyebrow text-[#1C1A26]/60 mb-2">{o.tag}</div>
                  <h3 className="font-display font-semibold text-[18px]">{o.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ backgroundColor: "#0F0D1A", color: "#EEE9FF" }}>
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <h2 className="font-display font-bold mb-6" style={{ fontSize: "clamp(28px, 4vw, 44px)" }}>
            Got something similar in mind?
          </h2>
          <Link to="/" hash="contact" className="btn-violet">Start a conversation</Link>
        </div>
      </section>
    </div>
  );
}

import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md" : ""
      }`}
      style={{ backgroundColor: scrolled ? "rgba(15,13,26,0.9)" : "transparent" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="font-display font-bold text-[28px] text-violet leading-none">
          NMT
        </a>
        <nav className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-mono text-[12px] uppercase tracking-[0.18em] text-near-white/80 hover:text-coral transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn-violet !py-2.5 !px-5 !text-[12px]">
          Let's Talk
        </a>
      </div>
      <div className="h-px w-full" style={{ background: "rgba(123,47,255,0.6)" }} />
    </header>
  );
}
